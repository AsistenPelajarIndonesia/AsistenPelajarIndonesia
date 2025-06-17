<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckCircle, XCircle, ListChecks, BookOpen } from 'lucide-vue-next'
import Groq from 'groq-sdk'
const groqApiKey = "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";
 // Replace with your actual API key
const groq = new Groq({ apiKey: groqApiKey, dangerouslyAllowBrowser: true })

interface SummaryOption {
  id: string // e.g., "s1", "s2"
  text: string
  isCorrectMainIdea: boolean // True if this statement is one of the 3 main summary points
}

interface ProseSummaryData {
  passageTitle: string
  passageText: string
  summaryOptions: SummaryOption[] // Exactly 6 options
  overallRationale: string // Explains why the 3 correct options form the best summary
}
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]; // Create a shallow copy
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
const summaryData = ref<ProseSummaryData | null>(null)
const selectedOptions = reactive<Record<string, boolean>>({})
const isLoading = ref(true)
const error = ref<string | null>(null)
const showResult = ref(false)
const submissionResult = ref<{
  correctlySelectedCount: number;
  incorrectlySelectedCount: number;
  missedCorrectCount: number;
  isPerfect: boolean;
} | null>(null)

const numberOfSelected = computed(() => Object.values(selectedOptions).filter(Boolean).length)
const canSubmit = computed(() => numberOfSelected.value === 3 && !showResult.value)

const fetchProseSummaryQuestion = async () => {
  isLoading.value = true
  error.value = null
  showResult.value = false
  submissionResult.value = null
  Object.keys(selectedOptions).forEach(key => delete selectedOptions[key]) // Reset selections

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an expert TOEFL content generator specializing in "Prose Summary" questions. Your task is to create a complete question set. The output MUST be a single JSON object. Do not include any markdown formatting (e.g., \`\`\`json) or any other text outside the JSON object.
          The JSON object should have the following structure:
          {
            "passageTitle": "An academic and engaging title for the passage.",
            "passageText": "A single, coherent academic passage of at least 700 words. The passage should present a main topic with several key supporting ideas. Suitable topics include scientific discoveries, historical analyses, artistic movements, sociological trends, etc.",
            "summaryOptions": [
              // Exactly 6 options. 3 MUST be correct main ideas that accurately summarize key points of the passage. 3 MUST be incorrect (e.g., too specific, inaccurate, not mentioned, contradictory, or a minor detail presented as a main idea).
              { "id": "s1", "text": "A statement representing a correct main idea.", "isCorrectMainIdea": true },
              { "id": "s2", "text": "Another statement representing a correct main idea.", "isCorrectMainIdea": true },
              { "id": "s3", "text": "A third statement representing a correct main idea.", "isCorrectMainIdea": true },
              { "id": "s4", "text": "An incorrect statement (e.g., a minor detail).", "isCorrectMainIdea": false },
              { "id": "s5", "text": "Another incorrect statement (e.g., inaccurate information).", "isCorrectMainIdea": false },
              { "id": "s6", "text": "A third incorrect statement (e.g., overly broad or not supported).", "isCorrectMainIdea": false }
            ],
            "overallRationale": "A concise explanation (2-4 sentences) detailing why the three correct statements, when combined, form the best summary of the passage. It should highlight how these points capture the essence and main arguments of the text."
          }
          Ensure the passage is complex enough to warrant a summary. The correct summary options should truly represent major points, not just any true statement. Incorrect options should be plausible distractors.`
        },
        {
          role: 'user',
          content: 'Generate a TOEFL Prose Summary question set. The passage should be about the cognitive benefits of bilingualism, at least 700 words. Provide 6 summary options (3 correct, 3 incorrect) and an overall rationale.'
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      top_p: 1,
      stream: false,
      response_format: { type: "json_object" },
    })
    const content = chatCompletion.choices[0]?.message?.content
    if (content) {
      const parsedData = JSON.parse(content) as ProseSummaryData
      if (parsedData.summaryOptions && parsedData.summaryOptions.length === 6) {
        summaryData.value = parsedData
        parsedData.summaryOptions.forEach(opt => selectedOptions[opt.id] = false)
        summaryData.value.summaryOptions = shuffleArray(summaryData.value.summaryOptions)
      } else {
        throw new Error('API did not return exactly 6 summary options.')
      }
    } else {
      throw new Error('No content received from API.')
    }
  } catch (err: any) {
    console.error('Error fetching prose summary question:', err)
    error.value = `Failed to load question: ${err.message}. Check API key and credits.`
  } finally {
    isLoading.value = false
  }
}

const handleCheckboxChange = (optionId: string, checked: boolean) => {
  if (showResult.value) return;
  if (checked && numberOfSelected.value >= 3) {
    // Prevent selecting more than 3, by not updating the model if trying to check a 4th
    // This requires the checkbox component to respect the model's current state
    // For Shadcn/vue Checkbox, we might need to force re-render or handle its internal state if it doesn't auto-revert
    // A simple way is to just not update selectedOptions[optionId] to true here.
    // However, the UI might still show it as checked momentarily. A better UX is to disable other checkboxes.
    return; 
  }
  selectedOptions[optionId] = checked
}

const handleSubmit = () => {
  if (!canSubmit.value || !summaryData.value) return

  let correctlySelected = 0
  let incorrectlySelected = 0
  const correctOptionIds = summaryData.value.summaryOptions.filter(opt => opt.isCorrectMainIdea).map(opt => opt.id)
  
  summaryData.value.summaryOptions.forEach(opt => {
    if (selectedOptions[opt.id]) { // If the user selected this option
      if (opt.isCorrectMainIdea) {
        correctlySelected++
      } else {
        incorrectlySelected++
      }
    }
  })

  const missedCorrect = 3 - correctlySelected
  submissionResult.value = {
    correctlySelectedCount: correctlySelected,
    incorrectlySelectedCount: incorrectlySelected,
    missedCorrectCount: missedCorrect,
    isPerfect: correctlySelected === 3 && incorrectlySelected === 0
  }
  showResult.value = true
}

const getOptionFeedbackClass = (option: SummaryOption) => {
  if (!showResult.value) return ''
  if (selectedOptions[option.id]) { // User selected this
    return option.isCorrectMainIdea ? 'bg-green-100 dark:bg-green-900/30 border-green-400' : 'bg-red-100 dark:bg-red-900/30 border-red-400'
  }
  // User did not select this, but it was correct
  if (option.isCorrectMainIdea) return 'bg-blue-100 dark:bg-blue-900/30 border-blue-400 animate-pulse'
  return 'opacity-70'
}

onMounted(() => {
  fetchProseSummaryQuestion()
})

useHead({
  title: 'TOEFL Prose Summary Practice',
  meta: [
    { name: 'description', content: 'Practice TOEFL prose summary questions. Select the three main ideas from the passage.' }
  ]
})
</script>

<template>
  <div class="container mx-auto p-4 max-w-5xl">
    <Card class="w-full">
      <CardHeader>
        <CardTitle class="text-3xl font-bold flex items-center">
          <BookOpen class="h-8 w-8 mr-3 text-primary" /> TOEFL Reading: Prose Summary
        </CardTitle>
        <CardDescription v-if="!isLoading && summaryData?.passageTitle" class="text-lg pt-1">
          {{ summaryData.passageTitle }}
        </CardDescription>
        <CardDescription v-else-if="isLoading">Loading passage title...</CardDescription>
        <CardDescription class="pt-2">Read the passage and select the THREE statements that best express the most important ideas in the passage. Some statements will be incorrect because they express minor ideas or incorrect information.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-8">
        <div v-if="isLoading" class="space-y-4">
          <Skeleton class="h-6 w-3/4 mb-4" />
          <ScrollArea class="h-[300px] w-full"><Skeleton class="h-full w-full" /></ScrollArea>
          <Skeleton v-for="i in 6" :key="`skel-opt-${i}`" class="h-10 w-full mb-2" />
        </div>
        <div v-else-if="error" class="space-y-4">
          <Alert variant="destructive">
            <XCircle class="h-5 w-5" />
            <AlertTitle>Error Loading Content</AlertTitle>
            <AlertDescription>{{ error }}</AlertDescription>
          </Alert>
          <Button @click="fetchProseSummaryQuestion">Try Again</Button>
        </div>
        <div v-else-if="summaryData" class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-3 text-primary">Reading Passage</h3>
            <ScrollArea class="h-[350px] w-full rounded-md border p-4 bg-muted/30 prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
              <p v-for="(paragraph, index) in summaryData.passageText.split('\n\n')" :key="index" class="mb-4 last:mb-0">
                {{ paragraph }}
              </p>
            </ScrollArea>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-3 text-primary flex items-center">
              <ListChecks class="h-6 w-6 mr-2" /> Select THREE statements:
            </h3>
            <div class="space-y-3">
              <div
                v-for="option in summaryData.summaryOptions"
                :key="option.id"
                :class="['flex items-start space-x-3 p-3 border rounded-md transition-all', getOptionFeedbackClass(option)]"
              >
                <Checkbox 
                  :id="option.id" 
                  :checked="selectedOptions[option.id]"
                  @update:checked="(checked) => handleCheckboxChange(option.id, checked as boolean)"
                  :disabled="showResult || (numberOfSelected >= 3 && !selectedOptions[option.id])"
                  class="mt-1 shrink-0"
                />
                <label :for="option.id" class="text-sm font-medium leading-normal flex-1 cursor-pointer">
                  {{ option.text }}
                </label>
                <CheckCircle v-if="showResult && option.isCorrectMainIdea && selectedOptions[option.id]" class="h-5 w-5 text-green-600 shrink-0" />
                <XCircle v-if="showResult && !option.isCorrectMainIdea && selectedOptions[option.id]" class="h-5 w-5 text-red-600 shrink-0" />
                 <CheckCircle v-if="showResult && option.isCorrectMainIdea && !selectedOptions[option.id]" class="h-5 w-5 text-blue-500 shrink-0 opacity-70" title="This was a correct option you missed" />
              </div>
            </div>
            <p v-if="numberOfSelected < 3 && !showResult" class="text-sm text-muted-foreground mt-2">
              Please select {{ 3 - numberOfSelected }} more option(s).
            </p>
            <p v-if="numberOfSelected > 3 && !showResult" class="text-sm text-destructive mt-2">
              You have selected too many options. Please unselect {{ numberOfSelected - 3 }} option(s).
            </p>
          </div>

          <Button @click="handleSubmit" :disabled="!canSubmit" class="w-full sm:w-auto">
            Check Answer
          </Button>

          <div v-if="showResult && submissionResult">
            <Alert :variant="submissionResult.isPerfect ? 'default' : 'destructive'" class="mt-4">
              <component :is="submissionResult.isPerfect ? CheckCircle : XCircle" class="h-5 w-5" />
              <AlertTitle>
                {{ submissionResult.isPerfect ? 'Perfect Summary!' : (submissionResult.correctlySelectedCount > 0 ? 'Partially Correct' : 'Incorrect Summary') }}
              </AlertTitle>
              <AlertDescription>
                You correctly identified {{ submissionResult.correctlySelectedCount }} main idea(s).
                <span v-if="submissionResult.incorrectlySelectedCount > 0"> You incorrectly selected {{ submissionResult.incorrectlySelectedCount }} distractor(s).</span>
                <span v-if="submissionResult.missedCorrectCount > 0"> You missed {{ submissionResult.missedCorrectCount }} correct main idea(s).</span>
              </AlertDescription>
            </Alert>
            <Card class="mt-4 bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700">
                <CardHeader class="pb-2">
                    <CardTitle class="text-lg flex items-center"><ListChecks class="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400"/>Overall Rationale</CardTitle>
                </CardHeader>
                <CardContent>
                    <p class="text-sm text-indigo-700 dark:text-indigo-300">{{ summaryData.overallRationale }}</p>
                </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
      <CardFooter v-if="!isLoading && !error">
        <Button variant="outline" @click="fetchProseSummaryQuestion" :disabled="isLoading">
          Load New Question Set
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<style scoped>
.prose :deep(p) {
  margin-bottom: 1em;
  line-height: 1.7;
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}
</style>