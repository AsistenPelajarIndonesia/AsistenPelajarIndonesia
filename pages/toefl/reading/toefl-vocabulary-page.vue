<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Groq from 'groq-sdk'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { AlertCircle, CheckCircle2, BookOpen } from 'lucide-vue-next'

interface VocabularyQuestionData {
  passageTitle: string
  passageText: string // Full passage text
  targetWord: string // The vocabulary word in question
  sentenceContainingWord: string // The sentence where the word appears, for context
  questionText: string // e.g., "The word '...' in the passage is closest in meaning to:"
  options: {
    id: string // e.g., "A", "B", "C", "D"
    text: string // The synonym option
  }[]
  correctOptionId: string
  wordDefinition: string // Dictionary-style definition of the target word
  exampleUsage: string // An example sentence using the target word (can be different from passage)
}

interface VocabularyResult {
  isCorrect: boolean
  selectedOptionId: string
  correctOptionId: string
  targetWord: string
  definition: string
  exampleUsage: string
}
const groqApiKey = "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"; 

const groq = new Groq({ apiKey: groqApiKey, dangerouslyAllowBrowser: true })

const isLoading = ref(true)
const apiError = ref<string | null>(null)
const questionData = ref<VocabularyQuestionData | null>(null)
const userAnswer = ref<string | null>(null)
const result = ref<VocabularyResult | null>(null)
const showResults = ref(false)

const exampleUserPrompt = `Generate a TOEFL Reading 'Vocabulary' question. The passage should be academic, around 700-750 words, on a topic like 'The Evolution of Jazz Music in the 20th Century'. Identify a challenging vocabulary word within the passage. The question should be: 'The word "[target_word]" in the passage is closest in meaning to:'. Provide four distinct synonym options (A, B, C, D), one correct, and three plausible distractors. Also, provide a detailed dictionary-style 'wordDefinition' for the target word and an 'exampleUsage' sentence. Ensure the target word is clearly identifiable. Output in JSON format: { "passageTitle": "String", "passageText": "String (full text, 700-750 words)", "targetWord": "String", "sentenceContainingWord": "String (full sentence with target word)", "questionText": "String (formatted question)", "options": [ { "id": "A", "text": "String" }, ... ], "correctOptionId": "String (e.g., 'B')", "wordDefinition": "String (detailed definition)", "exampleUsage": "String (example sentence)" }`

async function fetchVocabularyQuestion() {
  isLoading.value = true
  apiError.value = null
  showResults.value = false
  userAnswer.value = null
  result.value = null
  questionData.value = null

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant specializing in TOEFL reading test material generation. Create a Vocabulary question set. The passage must be academic, 700+ words. The question asks for the synonym of a target word from the passage. Provide 4 options, a correct answer, and a dictionary-style definition with an example usage for the target word. Return JSON.'
        },
        {
          role: 'user',
          content: exampleUserPrompt,
        }
      ],
      model: 'llama3-70b-8192', // Using a robust model as discussed
      temperature: 0.6,
      max_tokens: 4000,
      top_p: 1,
      stream: false,
      response_format: { type: 'json_object' },
    })

    const content = chatCompletion.choices[0]?.message?.content
    if (content) {
      const parsedContent = JSON.parse(content) as VocabularyQuestionData
      if (!parsedContent.passageText || !parsedContent.targetWord || parsedContent.options?.length !== 4 || !parsedContent.correctOptionId || !parsedContent.wordDefinition) {
        throw new Error('Invalid data structure received from API.')
      }
      questionData.value = parsedContent
    } else {
      throw new Error('No content received from API.')
    }
  } catch (e: any) {
    console.error('Failed to fetch TOEFL vocabulary material:', e)
    apiError.value = e.message || 'An unknown error occurred while fetching data.'
  } finally {
    isLoading.value = false
  }
}

function submitAnswer() {
  if (!userAnswer.value || !questionData.value) return

  const isCorrect = userAnswer.value === questionData.value.correctOptionId
  result.value = {
    isCorrect,
    selectedOptionId: userAnswer.value,
    correctOptionId: questionData.value.correctOptionId,
    targetWord: questionData.value.targetWord,
    definition: questionData.value.wordDefinition,
    exampleUsage: questionData.value.exampleUsage,
  }
  showResults.value = true
}

const passageWithHighlight = computed(() => {
  if (!questionData.value) return ''
  const { passageText, targetWord } = questionData.value
  // Regex to highlight the target word, case-insensitive, whole word only
  const regex = new RegExp(`\\b(${targetWord})\\b`, 'gi')
  return passageText.replace(regex, `<mark class="bg-primary/20 dark:bg-primary/30 px-1 py-0.5 rounded font-semibold">$1</mark>`)
})

onMounted(() => {
  fetchVocabularyQuestion()
})

useHead({
  title: 'TOEFL Reading: Vocabulary | Akademi Pelajar',
  meta: [
    { name: 'description', content: 'Practice TOEFL vocabulary questions with detailed definitions and examples.' }
  ]
})
</script>

<template>
  <TooltipProvider>
    <div class="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl bg-slate-50 dark:bg-slate-900 min-h-screen">
      <Card class="mb-6 shadow-xl border-t-4 border-blue-600 dark:border-blue-500">
        <CardHeader>
          <CardTitle class="text-2xl sm:text-3xl font-bold text-center text-blue-700 dark:text-blue-400">
            TOEFL Reading: Vocabulary Question
          </CardTitle>
          <CardDescription v-if="!isLoading && questionData" class="text-center text-muted-foreground pt-1">
            {{ questionData.passageTitle || 'Read the passage and answer the question about the highlighted word.' }}
          </CardDescription>
        </CardHeader>
      </Card>

      <div v-if="isLoading" class="space-y-6 p-4">
        <Skeleton class="h-8 w-3/4 mx-auto" />
        <Skeleton class="h-6 w-1/2 mx-auto mb-4" />
        <div class="space-y-2">
          <Skeleton v-for="i in 15" :key="`skel-passage-${i}`" class="h-4 w-full" :class="{'w-5/6': i % 3 === 0, 'w-2/3': i % 5 === 0}"/>
        </div>
        <Skeleton class="h-10 w-full mt-6" />
        <div class="space-y-3 mt-4">
          <Skeleton v-for="i in 4" :key="`skel-option-${i}`" class="h-10 w-full" />
        </div>
        <Skeleton class="h-12 w-32 mx-auto mt-6" />
      </div>

      <Alert v-if="apiError" variant="destructive" class="mb-6">
        <AlertCircle class="h-4 w-4" />
        <AlertTitle>Error Fetching Data</AlertTitle>
        <AlertDescription>{{ apiError }}</AlertDescription>
        <Button @click="fetchVocabularyQuestion" variant="outline" size="sm" class="mt-3">Try Again</Button>
      </Alert>

      <div v-if="!isLoading && questionData" class="space-y-6">
        <Card class="shadow-lg">
          <CardHeader>
            <CardTitle class="text-xl font-semibold text-gray-800 dark:text-gray-100">Reading Passage</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="prose prose-sm sm:prose dark:prose-invert max-w-none whitespace-pre-line text-justify leading-relaxed" v-html="passageWithHighlight"></div>
          </CardContent>
        </Card>

        <Card class="shadow-lg">
          <CardHeader>
            <CardTitle class="text-lg font-semibold text-gray-800 dark:text-gray-100">Vocabulary Question</CardTitle>
            <CardDescription class="pt-1 text-gray-600 dark:text-gray-300">
              {{ questionData.questionText.replace('[target_word]', questionData.targetWord) }}
              <br/><em>Context: "{{ questionData.sentenceContainingWord }}"</em>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup v-model="userAnswer" :disabled="showResults" class="space-y-3">
              <div v-for="option in questionData.options" :key="option.id">
                <Label 
                  :for="`option-${option.id}`" 
                  :class="['flex items-center p-3 border rounded-md cursor-pointer transition-colors hover:bg-muted/60 dark:hover:bg-muted/30', 
                           userAnswer === option.id ? 'bg-blue-100 border-blue-500 dark:bg-blue-900/30 dark:border-blue-600' : 'border-gray-300 dark:border-gray-700',
                           showResults && option.id === questionData.correctOptionId ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : '',
                           showResults && userAnswer === option.id && option.id !== questionData.correctOptionId ? 'border-red-500 bg-red-50 dark:bg-red-900/30' : ''
                          ]">
                  <RadioGroupItem :id="`option-${option.id}`" :value="option.id" class="mr-3" />
                  <span class="text-sm text-gray-700 dark:text-gray-200">{{ option.id }}. {{ option.text }}</span>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter class="flex-col items-start sm:flex-row sm:justify-between gap-4 pt-5">
            <Button @click="submitAnswer" :disabled="!userAnswer || showResults" class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              Submit Answer
            </Button>
            <Button v-if="showResults" @click="fetchVocabularyQuestion" variant="outline" class="w-full sm:w-auto">
              Try Another Question
            </Button>
          </CardFooter>
        </Card>

        <div v-if="showResults && result">
          <Alert :variant="result.isCorrect ? 'default' : 'destructive'" class="shadow-md mb-4">
            <component :is="result.isCorrect ? CheckCircle2 : AlertCircle" class="h-5 w-5" />
            <AlertTitle class="font-semibold text-lg">
              {{ result.isCorrect ? 'Correct!' : 'Incorrect' }}
            </AlertTitle>
            <AlertDescription class="mt-1">
              <span v-if="!result.isCorrect">
                You chose '{{ questionData?.options.find(o => o.id === result.selectedOptionId)?.text }}'. The correct answer was '{{ questionData?.options.find(o => o.id === result.correctOptionId)?.text }}'.
              </span>
              <span v-else>
                Excellent! '{{ questionData?.options.find(o => o.id === result.correctOptionId)?.text }}' is the closest in meaning to '{{ result.targetWord }}'.
              </span>
            </AlertDescription>
          </Alert>

          <Card class="shadow-md bg-gray-50 dark:bg-gray-800 border-l-4 border-blue-500">
            <CardHeader>
                <div class="flex items-center">
                    <BookOpen class="h-6 w-6 mr-3 text-blue-600 dark:text-blue-400" />
                    <CardTitle class="text-xl font-semibold text-blue-700 dark:text-blue-300">Word Definition: <span class="italic">{{ result.targetWord }}</span></CardTitle>
                </div>
            </CardHeader>
            <CardContent class="space-y-2">
              <p class="text-gray-700 dark:text-gray-300 prose prose-sm max-w-none">{{ result.definition }}</p>
              <div>
                <h4 class="font-semibold text-gray-600 dark:text-gray-400 text-sm">Example Usage:</h4>
                <p class="italic text-gray-500 dark:text-gray-400 prose prose-sm max-w-none">"{{ result.exampleUsage }}"</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </TooltipProvider>
</template>

<style scoped>
.prose :deep(mark) {
  /* Using Tailwind's primary color with opacity */
  background-color: hsl(var(--primary) / 0.2);
  padding: 0.1em 0.3em;
  border-radius: 0.2em;
  font-weight: 600;
  color: hsl(var(--primary-foreground)); /* Ensure text is visible on highlight */
}

.dark .prose :deep(mark) {
   background-color: hsl(var(--primary) / 0.3);
   color: hsl(var(--primary-foreground));
}

/* Custom styling for the definition card */
</style>