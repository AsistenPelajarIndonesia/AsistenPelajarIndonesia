<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpenText, CheckSquare, AlignLeft, ListChecks, Type, FileText, Puzzle } from 'lucide-vue-next' // Example icons

interface IeltsTestType {
  id: string
  title: string
  description: string
  path: string
  icon: any // Using 'any' for Lucide components, or string for image paths
  color?: string // e.g., 'bg-blue-500'
  hoverColor?: string 
}

const router = useRouter()

const ieltsTestTypes = ref<IeltsTestType[]>([
  {
    id: 'multiple-choice',
    title: 'Multiple Choice',
    description: 'Answer questions by choosing the best option from A, B, C, or D based on the passage.',
    path: '/ielts/reading/ielts-multiple-choice-page',
    icon: CheckSquare,
    color: 'bg-sky-100 dark:bg-sky-900',
    hoverColor: 'hover:bg-sky-200 dark:hover:bg-sky-800'
  },
  {
    id: 'matching-headings',
    title: 'Matching Headings',
    description: 'Match headings to the correct paragraphs or sections of a reading passage.',
    path: '/ielts/reading/ielts-matching-headings-page',
    icon: AlignLeft,
    color: 'bg-emerald-100 dark:bg-emerald-900',
    hoverColor: 'hover:bg-emerald-200 dark:hover:bg-emerald-800'
  },
  {
    id: 'sentence-completion',
    title: 'Sentence Completion',
    description: 'Complete sentences with words taken directly from the reading passage.',
    path: '/ielts/reading/ielts-sentence-completion-page',
    icon: Type,
    color: 'bg-amber-100 dark:bg-amber-900',
    hoverColor: 'hover:bg-amber-200 dark:hover:bg-amber-800'
  },
  {
    id: 'short-answer',
    title: 'Short Answer Questions',
    description: 'Answer questions about the passage with a short phrase or a few words.',
    path: '/ielts/reading/ielts-short-answer-page',
    icon: FileText,
    color: 'bg-rose-100 dark:bg-rose-900',
    hoverColor: 'hover:bg-rose-200 dark:hover:bg-rose-800'
  },
  {
    id: 'classification',
    title: 'Classification',
    description: 'Categorize information from the passage into given groups or classes.',
    path: '/ielts/reading/ielts-classification-page',
    icon: ListChecks,
    color: 'bg-indigo-100 dark:bg-indigo-900',
    hoverColor: 'hover:bg-indigo-200 dark:hover:bg-indigo-800'
  },
  {
    id: 'matching-sentence-endings',
    title: 'Matching Sentence Endings',
    description: 'Complete sentences by choosing the correct ending from a list of options.',
    path: '/ielts/reading/ielts-matching-sentence-endings-page',
    icon: Puzzle,
    color: 'bg-purple-100 dark:bg-purple-900',
    hoverColor: 'hover:bg-purple-200 dark:hover:bg-purple-800'
  },
  {
    id: 'text-analysis',
    title: 'Text Analysis',
    description: 'Write which information are on the text',
    path: '/ielts/reading/ielts-text-analysis-page',
    icon: BookOpenText, 
    color: 'bg-teal-100 dark:bg-teal-900',
    hoverColor: 'hover:bg-teal-200 dark:hover:bg-teal-800'
  },
  {
    id: 'table-completion',
    title: 'Table Completion',
    description: 'Fill in the gaps in a table using information from the reading passage.',
    path: '/ielts/reading/ielts-table-completion-page',
    icon: BookOpenText,
    color: 'bg-teal-100 dark:bg-teal-900',
    hoverColor: 'hover:bg-teal-200 dark:hover:bg-teal-800'
  }
])
     
function navigateToTest(path: string) {
  router.push(path)
}

useHead({
  title: 'IELTS Practice Test Selection | Akademi Pelajar',
  meta: [
    { name: 'description', content: 'Choose from various IELTS reading practice test types to sharpen your skills.' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 dark:from-slate-900 dark:to-stone-950 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
          IELTS Reading Practice Sections
        </h1>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Select a test type below to start your practice session and improve your IELTS reading skills.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <Card
          v-for="testType in ieltsTestTypes"
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
          "In silence, refinement finds its voice."
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>