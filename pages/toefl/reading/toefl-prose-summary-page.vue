<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckCircle, XCircle, ListChecks, BookOpen } from 'lucide-vue-next'

interface SummaryOption {
  id: string
  text: string
  isCorrectMainIdea: boolean
}

interface ProseSummaryData {
  passageTitle: string
  passageText: string
  summaryOptions: SummaryOption[]
  overallRationale: string
}

// reactive state
const summaryData        = ref<ProseSummaryData | null>(null)
const selectedOptions    = reactive<Record<string, boolean>>({})
const isLoading          = ref(true)
const error              = ref<string | null>(null)
const showResult         = ref(false)
const submissionResult   = ref<{
  correctlySelectedCount: number
  incorrectlySelectedCount: number
  missedCorrectCount: number
  isPerfect: boolean
} | null>(null)

// helpers
const numberOfSelected = computed(() =>
  Object.values(selectedOptions).filter(Boolean).length
)
const canSubmit = computed(() =>
  numberOfSelected.value === 3 && !showResult.value
)

// 1) your new fetch helper
async function fetchProseSummaryQuestion() {
  // reset everything
  error.value            = null
  summaryData.value      = null
  Object.keys(selectedOptions).forEach(k => delete selectedOptions[k])
  showResult.value       = false
  submissionResult.value = null

  try {
    // adjust endpoint path as needed
    summaryData.value = await $fetch<ProseSummaryData>('https://flatlystudio.github.io/questions/TOEFL/READING_PROSE_SUMMARY.output.getter.json')
    // shuffle options so they appear in random order:
    summaryData.value.summaryOptions = shuffleArray(summaryData.value.summaryOptions)
    isLoading.value   = false

  } catch (err: any) {
    error.value = err.message || 'Failed to load question set'
  } finally {
    isLoading.value = false
  }
}

// existing handlers
function handleCheckboxChange(optionId: string, checked: boolean) {
  if (showResult.value) return
  if (checked && numberOfSelected.value >= 3) return
  selectedOptions[optionId] = checked
}

function handleSubmit() {
  if (!canSubmit.value || !summaryData.value) return
  let correctly = 0, incorrectly = 0
  const correctIds = summaryData.value.summaryOptions
    .filter(o => o.isCorrectMainIdea)
    .map(o => o.id)

  summaryData.value.summaryOptions.forEach(opt => {
    if (selectedOptions[opt.id]) {
      opt.isCorrectMainIdea ? correctly++ : incorrectly++
    }
  })

  const missed = correctIds.length - correctly
  submissionResult.value = {
    correctlySelectedCount: correctly,
    incorrectlySelectedCount: incorrectly,
    missedCorrectCount: missed,
    isPerfect: correctly === correctIds.length && incorrectly === 0
  }
  showResult.value = true
}

// lifecycle
onMounted(() => {
  fetchProseSummaryQuestion()
})

// SEO
useHead({
  title: 'TOEFL Prose Summary Practice',
  meta: [
    { name: 'description', content: 'Select the three main ideas from the passage.' }
  ]
})

// shuffle utility
function shuffleArray<T>(array: T[]): T[] {
  const a = [...array]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
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
                &nbsp;&nbsp;&nbsp;&nbsp;{{ paragraph }}
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
                :class="['flex items-start space-x-3 p-3 border rounded-md transition-all']"
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