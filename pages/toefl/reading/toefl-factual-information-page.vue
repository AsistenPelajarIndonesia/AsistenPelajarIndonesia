<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckCircle, XCircle, BookOpen, HelpCircle } from 'lucide-vue-next'

interface Option {
  id: string // e.g., "A", "B", "C", "D"
  text: string
}

interface Question {
  id: string // Unique ID for the question, e.g., "q1"
  questionText: string
  options: Option[]
  correctOptionId: string
  explanation: string // Explanation for the correct answer
}

interface ReadingSet {
  passageTitle: string
  passageText: string // The full 700+ word passage
  questions: Question[] // Array of factual information questions
}

const userAnswers = reactive<Record<string, { selectedOptionId: string | null; showResult: boolean; isCorrect: boolean }>>({})
const isLoading = ref(true)


const readingSet = ref<ReadingSet | null>(null)
const error        = ref<Error | null>(null)



const handleSubmit = (questionId: string) => {
  if (!readingSet.value || !userAnswers[questionId] || userAnswers[questionId].selectedOptionId === null) return

  const question = readingSet.value.questions.find(q => q.id === questionId)
  if (!question) return

  userAnswers[questionId].isCorrect = userAnswers[questionId].selectedOptionId === question.correctOptionId
  userAnswers[questionId].showResult = true
}

const getOptionClass = (questionId: string, optionId: string) => {
  const answerState = userAnswers[questionId]
  if (!answerState || !answerState.showResult || answerState.selectedOptionId !== optionId) return ''
  return answerState.isCorrect ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'
}

const getAlertVariant = (questionId: string) => {
  const answerState = userAnswers[questionId]
  if (!answerState || !answerState.showResult) return 'default'
  return answerState.isCorrect ? 'default' : 'destructive'
}

const initializeUserAnswers = (questions: Question[]) => {
  questions.forEach(q => {
    userAnswers[q.id] = {
      selectedOptionId: null,
      showResult: false,
      isCorrect: false
    }
  })
}
onMounted(async () => {
  try {
    // fetch and auto‑parse JSON
    readingSet.value = await $fetch<ReadingSet>('https://flatlystudio.github.io/questions/TOEFL/READING_FACTUAL_INFORMATION.output.getter.json')
    initializeUserAnswers(readingSet.value.questions)
    isLoading.value = false
  } catch (err) {
    error.value = err as Error
  } finally {
    loading.value = false
  }
})

useHead({
  title: 'TOEFL Factual Information Practice',
  meta: [
    {
      name: 'description',
      content: 'Practice TOEFL factual information questions with a detailed academic passage and multiple choice questions.'
    }
  ]
})
</script>

<template>
  <div class="container mx-auto p-4 max-w-5xl">
    <Card class="w-full">
      <CardHeader>
        <CardTitle class="text-3xl font-bold flex items-center">
          <BookOpen class="h-8 w-8 mr-3 text-primary" /> TOEFL Reading: Factual Information
        </CardTitle>
        <CardDescription v-if="!isLoading && readingSet?.passageTitle" class="text-lg pt-1">
          {{ readingSet.passageTitle }}
        </CardDescription>
         <CardDescription v-else-if="isLoading">
            Loading passage title...
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-8">
        <div v-if="isLoading" class="space-y-4">
          <Skeleton class="h-6 w-3/4 mb-4" />
          <Skeleton class="h-40 w-full" />
          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-4 w-5/6 mb-6" />
          <Skeleton v-for="i in 3" :key="`skel-q-${i}`" class="h-24 w-full mb-4" />
        </div>
        <div v-else-if="error" class="space-y-4">
          <Alert variant="destructive">
            <XCircle class="h-5 w-5" />
            <AlertTitle>Error Loading Content</AlertTitle>
            <AlertDescription>{{ error }}</AlertDescription>
          </Alert>
          <Button @click="fetchFactualInformationSet">Try Again</Button>
        </div>
        <div v-else-if="readingSet" class="space-y-10">
          <div>
            <h3 class="text-xl font-semibold mb-3 text-primary">Reading Passage</h3>
            <ScrollArea class="h-[400px] w-full rounded-md border p-4 bg-muted/30 prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
              <p v-for="(paragraph, index) in readingSet.passageText.split('\n\n')" :key="index" class="mb-4 last:mb-0">
                {{ paragraph }}
              </p>
            </ScrollArea>
          </div>

          <div class="space-y-8">
            <h3 class="text-xl font-semibold mb-3 text-primary">Questions</h3>
            <Card v-for="(question, qIndex) in readingSet.questions" :key="question.id" class="p-0 overflow-hidden">
              <CardHeader class="bg-muted/40">
                <CardTitle class="text-lg flex items-start">
                    <HelpCircle class="h-5 w-5 mr-2 mt-1 text-primary flex-shrink-0" /> 
                    <span>Question {{ qIndex + 1 }}: {{ question.questionText }}</span>
                </CardTitle>
              </CardHeader>
              <CardContent class="pt-6 pb-4 px-6">
                <RadioGroup 
                    v-model="userAnswers[question.id].selectedOptionId" 
                    :disabled="userAnswers[question.id].showResult" 
                    class="space-y-3"
                >
                  <div 
                    v-for="option in question.options" 
                    :key="option.id" 
                    class="flex items-center space-x-3 p-3 border rounded-md hover:bg-muted/50 transition-colors"
                    :class="{'bg-muted/60': userAnswers[question.id].selectedOptionId === option.id}"
                  >
                    <RadioGroupItem :id="`${question.id}-${option.id}`" :value="option.id" />
                    <Label 
                        :for="`${question.id}-${option.id}`" 
                        class="flex-1 cursor-pointer text-sm"
                        :class="getOptionClass(question.id, option.id)"
                    >
                      {{ option.text }}
                    </Label>
                    <CheckCircle v-if="userAnswers[question.id].showResult && option.id === question.correctOptionId" class="h-5 w-5 text-green-500 ml-auto" />
                    <XCircle v-if="userAnswers[question.id].showResult && userAnswers[question.id].selectedOptionId === option.id && option.id !== question.correctOptionId" class="h-5 w-5 text-red-500 ml-auto" />
                  </div>
                </RadioGroup>

                <Button 
                    @click="handleSubmit(question.id)" 
                    :disabled="!userAnswers[question.id].selectedOptionId || userAnswers[question.id].showResult" 
                    class="mt-5 w-full sm:w-auto"
                >
                  Check Answer
                </Button>

                <Alert v-if="userAnswers[question.id].showResult" :variant="getAlertVariant(question.id)" class="mt-5">
                  <component :is="userAnswers[question.id].isCorrect ? CheckCircle : XCircle" class="h-5 w-5" />
                  <AlertTitle>
                    {{ userAnswers[question.id].isCorrect ? 'Correct!' : 'Incorrect' }}
                  </AlertTitle>
                  <AlertDescription class="text-sm">
                    <span v-if="userAnswers[question.id].isCorrect">{{ question.explanation }}</span>
                    <span v-else>
                        The correct answer is <span class="font-semibold">{{ question.options.find(opt => opt.id === question.correctOptionId)?.text }}</span>.
                        <br/>{{ question.explanation }}
                    </span>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
      <CardFooter v-if="!isLoading && !error">
        <Button variant="outline" @click="fetchFactualInformationSet" :disabled="isLoading">
          Load New Reading Set
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<style scoped>
.prose :deep(p) {
  margin-bottom: 1em; /* Ensure paragraphs have bottom margin */
  line-height: 1.7;
}
</style>