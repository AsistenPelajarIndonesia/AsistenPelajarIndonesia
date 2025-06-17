<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpenText, CheckSquare, AlignLeft, ListChecks, Type, FileText, Puzzle, MessageSquareText, ScanText, FilePlus2, ListTree, Edit3 } from 'lucide-vue-next'

interface ToeflTestType {
  id: string
  title: string
  description: string
  path: string
  icon: any
  color?: string
  hoverColor?: string
}

const router = useRouter()

const toeflTestTypes = ref<ToeflTestType[]>([
  {
    id: 'factual-information',
    title: 'Factual Information',
    description: 'Answer questions based on explicitly stated facts and details in the passage.',
    path: '/toefl/reading/toefl-factual-information-page',
    icon: BookOpenText,
    color: 'bg-sky-100 dark:bg-sky-900',
    hoverColor: 'hover:bg-sky-200 dark:hover:bg-sky-800'
  },
  {
    id: 'inference',
    title: 'Inference',
    description: 'Draw conclusions based on information implied but not directly stated in the passage.',
    path: '/toefl/reading/toefl-inference-page',
    icon: MessageSquareText,
    color: 'bg-emerald-100 dark:bg-emerald-900',
    hoverColor: 'hover:bg-emerald-200 dark:hover:bg-emerald-800'
  },
  {
    id: 'sentence-simplification',
    title: 'Sentence Simplification',
    description: 'Choose the sentence that best expresses the essential information in a highlighted sentence.',
    path: '/toefl/reading/toefl-sentence-simplification-page',
    icon: Edit3, // Changed from Type to avoid repetition, Edit3 for simplification
    color: 'bg-amber-100 dark:bg-amber-900',
    hoverColor: 'hover:bg-amber-200 dark:hover:bg-amber-800'
  },
  {
    id: 'insert-text',
    title: 'Insert Text',
    description: 'Insert a sentence into the passage where it fits best logically and grammatically.',
    path: '/toefl/reading/toefl-insert-text-page',
    icon: FilePlus2,
    color: 'bg-rose-100 dark:bg-rose-900',
    hoverColor: 'hover:bg-rose-200 dark:hover:bg-rose-800'
  },
  {
    id: 'prose-summary',
    title: 'Prose Summary',
    description: 'Select the main ideas of the passage by choosing three out of six summary statements.',
    path: '/toefl/reading/toefl-prose-summary-page',
    icon: ListTree,
    color: 'bg-indigo-100 dark:bg-indigo-900',
    hoverColor: 'hover:bg-indigo-200 dark:hover:bg-indigo-800'
  },
  {
    id: 'vocabulary',
    title: 'Vocabulary',
    description: 'Identify the meaning of a specific word or phrase as used in the passage.',
    path: '/toefl/reading/toefl-vocabulary-page', // Placeholder path
    icon: ScanText,
    color: 'bg-purple-100 dark:bg-purple-900',
    hoverColor: 'hover:bg-purple-200 dark:hover:bg-purple-800'
  },
  {
    id: 'rhetorical-purpose',
    title: 'Rhetorical Purpose',
    description: 'Understand why the author presents certain information or uses specific language.',
    path: '/toefl/reading/toefl-rhetorical-purpose-page', // Placeholder path
    icon: AlignLeft,
    color: 'bg-teal-100 dark:bg-teal-900',
    hoverColor: 'hover:bg-teal-200 dark:hover:bg-teal-800'
  },
  {
    id: 'negative-factual-information',
    title: 'Negative Factual Information',
    description: 'Identify which piece of information is NOT true or NOT mentioned in the passage.',
    path: '/toefl/reading/toefl-negative-factual-page', // Placeholder path
    icon: CheckSquare, // Reused, consider a 'not' icon if available or custom
    color: 'bg-pink-100 dark:bg-pink-900',
    hoverColor: 'hover:bg-pink-200 dark:hover:bg-pink-800'
  }
])

function navigateToTest(path: string) {
  router.push(path)
}

useHead({
  title: 'TOEFL Reading Practice | Akademi Pelajar',
  meta: [
    { name: 'description', content: 'Choose from various TOEFL reading practice question types to enhance your skills.' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 dark:from-slate-900 dark:to-stone-950 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
          TOEFL Reading Practice Sections
        </h1>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Select a question type below to start your practice session and improve your TOEFL reading skills.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <Card
          v-for="testType in toeflTestTypes"
          :key="testType.id"
          @click="navigateToTest(testType.path)"
          :class="['cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl rounded-xl overflow-hidden group', testType.color, testType.hoverColor]"
        >
          <CardHeader class="pb-4">
            <div class="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-white/50 dark:bg-black/20 ring-2 ring-white/30 group-hover:ring-white/50 transition-all">
              <component :is="testType.icon" class="w-8 h-8 text-primary group-hover:text-primary-dark transition-colors" />
            </div>
            <CardTitle class="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-primary-dark transition-colors">{{ testType.title }}</CardTitle>
          </CardHeader>
          <CardContent class="pb-4">
            <CardDescription class="text-sm text-gray-600 dark:text-gray-300 min-h-[60px]">
              {{ testType.description }}
            </CardDescription>
          </CardContent>
          <CardFooter :class="['pt-2 pb-4 px-6 flex justify-end', testType.color]">
            <Button variant="ghost" class="text-primary group-hover:text-primary-dark transition-colors">
              Start Practice <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div class="mt-16 text-center">
        <p class="text-gray-500 dark:text-gray-400">
          "Grace is the quiet strength that moves without need for applause.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* You can add additional page-specific styles here if needed */
.group:hover .text-primary {
  /* Example: make icon color contrast on hover if primary changes, adjust as needed for your theme */
  /* color: hsl(var(--primary-foreground)); */
}
</style>