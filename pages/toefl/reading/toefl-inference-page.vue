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

const passageData      = ref<InferenceQuestionData | null>(null)
const selectedOption   = ref<string | null>(null)
const isLoading        = ref(true)
const error            = ref<string | null>(null)
const showResult       = ref(false)
const isCorrect        = ref(false)
const isRationaleOpen  = ref(false)

// 1) fetch helper
const fetchInferenceQuestion = async () => {
  // reset state
  isLoading.value       = true
  error.value           = null
  showResult.value      = false
  selectedOption.value  = null
  isCorrect.value       = false
  isRationaleOpen.value = false

  try {
    // adjust endpoint path as needed
    passageData.value = await $fetch<InferenceQuestionData>('https://flatlystudio.github.io/questions/TOEFL/READING_INFERENCE.output.getter.json')
  } catch (e: any) {
    error.value = e?.message || 'Failed to load question'
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = () => {
  if (!selectedOption.value || !passageData.value) return
  isCorrect.value      = selectedOption.value === passageData.value.correctOptionId
  showResult.value     = true
  isRationaleOpen.value = true
}

const getOptionClass = (optionId: string) => {
  if (!showResult.value || selectedOption.value !== optionId) return ''
  return isCorrect.value
    ? 'text-green-600 font-semibold'
    : 'text-red-600 font-semibold'
}

const getAlertVariant = () => {
  if (!showResult.value) return 'default'
  return isCorrect.value ? 'default' : 'destructive'
}

// 2) call on mount
onMounted(() => {
  fetchInferenceQuestion()
})

// 3) head metadata
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
                &nbsp;&nbsp;&nbsp;&nbsp;{{ paragraph }}
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
    </Card>
  </div>
</template>

<style scoped>
/* Custom styles if needed, Tailwind's prose plugin handles most typography */
.prose :deep(p) {
  margin-bottom: 1em; /* Ensure paragraphs have bottom margin */
}
</style>