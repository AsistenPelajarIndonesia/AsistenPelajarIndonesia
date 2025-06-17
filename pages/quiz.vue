<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto py-8">
      <div class="max-w-4xl mx-auto">
        <div v-if="!quizStarted" class="text-center space-y-6">
          <h1 class="text-4xl font-bold">Sample Quiz</h1>
          <p class="text-lg text-muted-foreground">
            Test your knowledge with this interactive quiz featuring math and markdown support.
          </p>
          <div class="space-y-4">
            <div class="flex items-center justify-center gap-4">
              <label for="time-setting" class="text-sm font-medium">Time per question:</label>
              <select 
                id="time-setting"
                v-model="timePerQuestion" 
                class="px-3 py-2 border rounded-md"
              >
                <option :value="15">15 seconds</option>
                <option :value="30">30 seconds</option>
                <option :value="60">60 seconds</option>
                <option :value="120">2 minutes</option>
              </select>
            </div>
            <Button @click="startQuiz" size="lg" class="px-8">
              Start Quiz
            </Button>
          </div>
        </div>

        <Quiz
          v-if="quizStarted"
          :questions="questions"
          :time-per-question="timePerQuestion"
          @quiz-complete="onQuizComplete"
        />

        <div v-if="quizCompleted" class="mt-8 text-center">
          <Button @click="resetDemo" variant="outline">
            Back to Start
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Quiz from '@/components/Quiz.vue'
import { Button } from '@/components/ui/button'
import sampleData from '@/data/quiz.json'
import type { Question, QuizResult } from '@/types/quiz'

// Meta
useHead({
  title: 'Interactive Quiz Demo',
  meta: [
    { name: 'description', content: 'Interactive quiz component with timer, progress tracking, and math support' }
  ]
})

// State
const questions = ref<Question[]>(sampleData)
const quizStarted = ref(false)
const quizCompleted = ref(false)
const timePerQuestion = ref(30)

// Methods
const startQuiz = () => {
  quizStarted.value = true
  quizCompleted.value = false
}

const onQuizComplete = (results: QuizResult[]) => {
  console.log('Quiz Complete!', results)
  quizCompleted.value = true
  
  // Calculate score
  const score = results.filter(r => r.isCorrect).length
  const total = results.length
  const percentage = Math.round((score / total) * 100)
  
  console.log(`Final Score: ${score}/${total} (${percentage}%)`)
  
  // You could navigate to a results page or show a modal here
  // navigateTo('/quiz/results', { query: { score, total } })
}

const resetDemo = () => {
  quizStarted.value = false
  quizCompleted.value = false
}
</script>