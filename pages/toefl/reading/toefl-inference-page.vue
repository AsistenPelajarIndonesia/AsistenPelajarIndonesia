<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Skeleton } from '@/components/ui/skeleton'
import { ChevronsUpDown, CheckCircle, XCircle } from 'lucide-vue-next'
import Groq from 'groq-sdk'
const groqApiKey = "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"; // IMPORTANT: Use environment variables
 // Replace with your actual API key
const groq = new Groq({ apiKey: groqApiKey, dangerouslyAllowBrowser: true })

interface InferenceOption {
  id: string
  text: string
}

interface InferenceQuestionData {
  passage: string
  question: string
  options: InferenceOption[]
  correctOptionId: string
  rationale: string
}

const passageData = ref<InferenceQuestionData | null>(null)
const selectedOption = ref<string | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)
const showResult = ref(false)
const isCorrect = ref(false)
const isRationaleOpen = ref(false)

const fetchInferenceQuestion = async () => {
  isLoading.value = true
  error.value = null
  showResult.value = false
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an expert TOEFL content generator specializing in "Inference" questions. Your task is to create a complete question set based on the user's request. The output MUST be a single JSON object. Do not include any markdown formatting or any other text outside the JSON object.
          The JSON object should have the following structure:
          {
            "passage": "A 700+ word academic passage on a topic suitable for TOEFL (e.g., science, history, art, literature, social sciences). The passage should contain subtle clues and unstated information that allow for logical inferences to be made. Avoid making the inferable information too obvious or explicitly stated.",
            "question": "An inference question related to the passage, typically starting with 'It can be inferred from the passage that...' or 'The author implies that...'. The question should require test-takers to draw a conclusion based on evidence and reasoning, not just locate information.",
            "options": [
              { "id": "A", "text": "A plausible but incorrect inference or a statement that is too broad/narrow, or contradicts the passage." },
              { "id": "B", "text": "The correct inference, well-supported by implicit information in the passage." },
              { "id": "C", "text": "Another plausible distractor, perhaps one that is partially true but not the best inference, or based on a misinterpretation." },
              { "id": "D", "text": "A third plausible distractor, possibly irrelevant or unsupported by the passage." }
            ],
            "correctOptionId": "The ID of the correct option (e.g., 'B').",
            "rationale": "A detailed explanation (2-3 sentences) of why the correct option is the best inference, citing implicit evidence from the passage. Also, briefly explain why the other options are incorrect, focusing on common inferential errors (e.g., overgeneralization, misinterpretation of tone, relying on outside knowledge not supported by the text)."
          }
          Ensure the passage is challenging and the inference required is sophisticated. The distractors should be tempting. The rationale must be clear and pedagogically sound.`
        },
        {
          role: 'user',
          content: 'Generate a TOEFL Inference question set. Ensure the passage is at least 700 words. The topic should be related to advancements in renewable energy technologies and their socio-economic impacts.'
        }
      ],
      model: "llama-3.3-70b-versatile", // User specified model
      temperature: 0.7,
      top_p: 1,
      stream: false,
      response_format: { type: "json_object" },
    })
    const content = chatCompletion.choices[0]?.message?.content
    if (content) {
      passageData.value = JSON.parse(content) as InferenceQuestionData
    } else {
      throw new Error('No content received from API.')
    }
  } catch (err: any) {
    console.error('Error fetching inference question:', err)
    error.value = `Failed to load question: ${err.message}. Please ensure your API key is correct and has sufficient credits.`
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = () => {
  if (!selectedOption.value || !passageData.value) return
  isCorrect.value = selectedOption.value === passageData.value.correctOptionId
  showResult.value = true
  isRationaleOpen.value = true // Automatically open rationale on submit
}

const getOptionClass = (optionId: string) => {
  if (!showResult.value || selectedOption.value !== optionId) return ''
  return isCorrect.value ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'
}

const getAlertVariant = () => {
  if (!showResult.value) return 'default'
  return isCorrect.value ? 'default' : 'destructive'
}

onMounted(() => {
  fetchInferenceQuestion()
})

useHead({
  title: 'TOEFL Inference Question Practice',
  meta: [
    {
      name: 'description',
      content: 'Practice TOEFL inference questions with detailed explanations and an academic passage.'
    }
  ]
})
</script>

<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <Card class="w-full">
      <CardHeader>
        <CardTitle class="text-2xl font-bold">TOEFL Practice: Inference Question</CardTitle>
        <CardDescription>Read the passage and answer the question that follows. Infer the information not explicitly stated.</CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="isLoading" class="space-y-4">
          <Skeleton class="h-8 w-3/4" />
          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-4 w-5/6" />
          <Skeleton class="h-40 w-full mt-4" /> 
          <Skeleton class="h-8 w-1/2 mt-6" />
          <Skeleton class="h-6 w-full mt-2" />
          <Skeleton class="h-6 w-full mt-2" />
          <Skeleton class="h-6 w-full mt-2" />
          <Skeleton class="h-6 w-full mt-2" />
        </div>
        <div v-else-if="error" class="space-y-4">
          <Alert variant="destructive">
            <XCircle class="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{{ error }}</AlertDescription>
          </Alert>
          <Button @click="fetchInferenceQuestion">Try Again</Button>
        </div>
        <div v-else-if="passageData" class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-2">Passage</h3>
            <div class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none dark:prose-invert p-4 border rounded-md bg-muted/30">
              <p v-for="(paragraph, index) in passageData.passage.split('\n\n')" :key="index" class="mb-4 last:mb-0">
                {{ paragraph }}
              </p>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-3">{{ passageData.question }}</h3>
            <RadioGroup v-model="selectedOption" :disabled="showResult" class="space-y-2">
              <div v-for="option in passageData.options" :key="option.id" class="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted/50 transition-colors" :class="{'bg-muted/60': selectedOption === option.id}">
                <RadioGroupItem :id="`option-${option.id}`" :value="option.id" />
                <Label :for="`option-${option.id}`" class="flex-1 cursor-pointer" :class="getOptionClass(option.id)">
                  {{ option.text }}
                </Label>
                <CheckCircle v-if="showResult && option.id === passageData.correctOptionId" class="h-5 w-5 text-green-500 ml-auto" />
                <XCircle v-if="showResult && selectedOption === option.id && option.id !== passageData.correctOptionId" class="h-5 w-5 text-red-500 ml-auto" />
              </div>
            </RadioGroup>
          </div>

          <Button @click="handleSubmit" :disabled="!selectedOption || showResult" class="w-full sm:w-auto">
            Submit Answer
          </Button>

          <div v-if="showResult">
            <Alert :variant="getAlertVariant()" class="mt-4">
              <component :is="isCorrect ? CheckCircle : XCircle" class="h-5 w-5" />
              <AlertTitle>{{ isCorrect ? 'Correct!' : 'Incorrect' }}</AlertTitle>
              <AlertDescription>
                {{ isCorrect ? 'You have selected the correct inference.' : 'That is not the correct inference. See the explanation below.' }}
              </AlertDescription>
            </Alert>

            <Collapsible v-model:open="isRationaleOpen" class="w-full space-y-2 mt-4">
              <div class="flex items-center justify-between space-x-4 px-1">
                <h4 class="text-md font-semibold">
                  Explanation
                </h4>
                <CollapsibleTrigger as-child>
                  <Button variant="ghost" size="sm" class="w-9 p-0">
                    <ChevronsUpDown class="h-4 w-4" />
                    <span class="sr-only">Toggle Rationale</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent class="space-y-2">
                <div class="rounded-md border px-4 py-3 font-mono text-sm bg-muted/40">
                  {{ passageData.rationale }}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </CardContent>
      <CardFooter v-if="!isLoading && !error">
        <Button variant="outline" @click="fetchInferenceQuestion" :disabled="isLoading">
          Load New Question
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<style scoped>
/* Custom styles if needed, Tailwind's prose plugin handles most typography */
.prose :deep(p) {
  margin-bottom: 1em; /* Ensure paragraphs have bottom margin */
}
</style>