<template>
  <div class="min-h-screen bg-background">
    <!-- Navigation Header -->
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container mx-auto px-4 py-3 lg:py-4">
        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center justify-between">
          <!-- Left section: Back button and test info -->
          <div class="flex items-center space-x-4">
            <Button variant="ghost" size="sm" @click="goBack" class="gap-2">
              <ChevronLeft class="h-4 w-4" />
              Back
            </Button>
            <div class="flex flex-col">
              <h1 class="text-lg font-semibold text-foreground">{{ testTitle }}</h1>
              <p class="text-sm text-muted-foreground">{{ testDescription }}</p>
            </div>
          </div>

          <!-- Center section: Category badges -->
          <div class="flex items-center space-x-2">
            <Badge v-for="category in categories" :key="category" variant="secondary">
              {{ category }}
            </Badge>
          </div>

          <!-- Right section: Navigation controls -->
          <div class="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              @click="previousQuestion" 
              :disabled="currentQuestion === 1"
              class="gap-2"
            >
              <ChevronLeft class="h-4 w-4" />
              Previous
            </Button>
            <div class="px-3 py-1 bg-muted rounded-md text-sm font-medium">
              {{ currentQuestion }} / {{ totalQuestions }}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              @click="nextQuestion" 
              :disabled="currentQuestion === totalQuestions"
              class="gap-2"
            >
              Next
              <ChevronRight class="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" @click="toggleTheme">
              <Sun v-if="isDark" class="h-4 w-4" />
              <Moon v-else class="h-4 w-4" />
            </Button>
          </div>
        </div>

        <!-- Mobile & Tablet Navigation -->
        <div class="lg:hidden">
          <!-- First row: Back button, title, and theme toggle -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-3">
              <Button variant="ghost" size="sm" @click="goBack" class="gap-1 px-2">
                <ChevronLeft class="h-4 w-4" />
                <span class="hidden sm:inline">Back</span>
              </Button>
              <div class="flex flex-col">
                <h1 class="text-base sm:text-lg font-semibold text-foreground">{{ testTitle }}</h1>
                <p class="hidden sm:block text-xs text-muted-foreground">{{ testDescription }}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" @click="toggleTheme">
              <Sun v-if="isDark" class="h-4 w-4" />
              <Moon v-else class="h-4 w-4" />
            </Button>
          </div>

          <!-- Second row: Navigation controls and categories -->
          <div class="flex items-center justify-between">
            <!-- Left: Navigation controls -->
            <div class="flex items-center space-x-1 sm:space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                @click="previousQuestion" 
                :disabled="currentQuestion === 1"
                class="gap-1 px-2 sm:px-3"
              >
                <ChevronLeft class="h-3 w-3 sm:h-4 sm:w-4" />
                <span class="hidden sm:inline">Prev</span>
              </Button>
              <div class="px-2 sm:px-3 py-1 bg-muted rounded-md text-xs sm:text-sm font-medium">
                {{ currentQuestion }} / {{ totalQuestions }}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                @click="nextQuestion" 
                :disabled="currentQuestion === totalQuestions"
                class="gap-1 px-2 sm:px-3"
              >
                <span class="hidden sm:inline">Next</span>
                <ChevronRight class="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>

            <!-- Right: Category badges -->
            <div class="flex items-center space-x-1 sm:space-x-2">
              <Badge v-for="category in categories" :key="category" variant="secondary" class="text-xs px-2 py-0.5">
                {{ category }}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="container mx-auto px-4 py-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-200px)]">
        <!-- Passage Container -->
        <Card class="flex flex-col">
          <CardHeader class="pb-3">
            <div class="flex items-center justify-between">
              <CardTitle class="text-base font-medium">Reading Passage</CardTitle>
              <div class="flex items-center space-x-2">
                <Dialog v-model:open="isPassageExpanded">
                  <DialogTrigger as-child>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      class="gap-2"
                      title="Expand passage for better reading"
                    >
                      <Maximize2 class="h-4 w-4" />
                      <span class="hidden sm:inline">Expand</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent class="max-w-[95vw] sm:max-w-4xl max-h-[95vh] flex flex-col p-0 gap-0">
                    <DialogHeader class="px-4 sm:px-6 py-3 sm:py-4 border-b shrink-0">
                      <div class="flex items-center justify-between">
                        <DialogTitle class="text-base sm:text-lg font-semibold pr-4">{{ passageTitle }}</DialogTitle>
                        <div class="text-xs sm:text-sm text-muted-foreground bg-muted px-2 sm:px-3 py-1 rounded shrink-0">
                          {{ passageWordCount }} words
                        </div>
                      </div>
                    </DialogHeader>
                    <div class="flex-1 overflow-hidden min-h-0">
                      <div class="h-full overflow-y-auto overscroll-contain px-4 sm:px-6 py-4 sm:py-6 custom-scrollbar">
                        <div class="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none leading-relaxed">
                          <div v-html="passageContent" class="space-y-4 sm:space-y-6"></div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <div class="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {{ passageWordCount }} words
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent class="flex-1 overflow-hidden">
            <div class="h-full overflow-y-auto overscroll-contain pr-2 sm:pr-4 custom-scrollbar">
              <div class="prose prose-sm dark:prose-invert max-w-none leading-relaxed">
                <h3 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{{ passageTitle }}</h3>
                <div v-html="passageContent" class="space-y-3 sm:space-y-4"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Question Container -->
        <Card class="flex flex-col">
          <CardHeader class="pb-3">
            <div class="flex items-center justify-between">
              <CardTitle class="text-base font-medium">
                Question {{ currentQuestion }}
              </CardTitle>
              <div class="flex items-center space-x-2">
                <Badge variant="outline" class="text-xs">
                  {{ questionType }}
                </Badge>
                <div class="text-xs text-muted-foreground">
                  {{ timeRemaining }}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent class="flex-1">
            <div class="space-y-6">
              <!-- Question Text -->
              <div class="p-4 bg-muted/30 rounded-lg">
                <p class="text-sm font-medium leading-relaxed">{{ questionText }}</p>
              </div>

              <!-- Answer Options -->
              <div class="space-y-3">
                <div 
                  v-for="(option, index) in answerOptions" 
                  :key="index"
                  class="relative"
                >
                  <label 
                    :for="`option-${index}`"
                    class="flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-muted/50"
                    :class="{
                      'border-primary bg-primary/5': selectedAnswer === index,
                      'border-border': selectedAnswer !== index
                    }"
                  >
                    <input
                      :id="`option-${index}`"
                      type="radio"
                      :value="index"
                      v-model="selectedAnswer"
                      class="mt-1 text-primary focus:ring-primary"
                    />
                    <div class="flex-1">
                      <div class="font-medium text-sm mb-1">{{ String.fromCharCode(65 + index) }}</div>
                      <div class="text-sm leading-relaxed">{{ option }}</div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex justify-between pt-4">
                <Button variant="outline" @click="clearAnswer" :disabled="selectedAnswer === null">
                  Clear Answer
                </Button>
                <div class="space-x-2">
                  <Button variant="outline" @click="markForReview">
                    <Flag class="h-4 w-4 mr-2" />
                    Mark for Review
                  </Button>
                  <Button @click="submitAnswer" :disabled="selectedAnswer === null">
                    Submit Answer
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Results Container (Hidden by default) -->
      <Transition name="slide-up">
        <Card v-if="showResults" class="mt-6">
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <CheckCircle class="h-5 w-5 text-green-500" />
              Question Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div class="text-2xl font-bold text-green-600 dark:text-green-400">
                  {{ correctAnswers }}
                </div>
                <div class="text-sm text-muted-foreground">Correct</div>
              </div>
              <div class="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <div class="text-2xl font-bold text-red-600 dark:text-red-400">
                  {{ incorrectAnswers }}
                </div>
                <div class="text-sm text-muted-foreground">Incorrect</div>
              </div>
              <div class="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {{ Math.round((correctAnswers / (correctAnswers + incorrectAnswers)) * 100) }}%
                </div>
                <div class="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Transition>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Moon, 
  Maximize2,
  Flag, 
  CheckCircle 
} from 'lucide-vue-next'

// Page meta
definePageMeta({
  title: 'TOEFL Reading Test',
  description: 'Practice TOEFL Reading comprehension with interactive questions'
})

// Reactive data
const isDark = ref(false)
const isPassageExpanded = ref(false)
const selectedAnswer = ref<number | null>(null)
const currentQuestion = ref(1)
const showResults = ref(false)

// Test configuration
const testTitle = ref('TOEFL Reading Practice')
const testDescription = ref('Academic Reading Comprehension Test')
const categories = ref(['Reading', 'Academic', 'Practice'])
const totalQuestions = ref(10)
const questionType = ref('Multiple Choice')
const timeRemaining = ref('18:24')

// Sample data
const passageTitle = ref('The Evolution of Urban Planning')
const passageWordCount = ref(650)
const passageContent = ref(`
  <p>Urban planning has undergone significant transformations throughout history, evolving from simple settlement patterns to complex, data-driven approaches that consider environmental sustainability, social equity, and economic viability.</p>
  
  <p>In the early 20th century, urban planners focused primarily on addressing the immediate problems of rapid industrialization and population growth. Cities were designed with functional zoning in mind, separating residential, commercial, and industrial areas to improve living conditions and reduce conflicts between different land uses.</p>
  
  <p>The concept of garden cities, introduced by Ebenezer Howard, represented a revolutionary approach to urban design. These planned communities sought to combine the benefits of city and country living, featuring green spaces, affordable housing, and integrated transportation systems.</p>
  
  <p>Modern urban planning has embraced the principles of smart growth and sustainable development. Contemporary planners utilize advanced technologies such as Geographic Information Systems (GIS), computer modeling, and big data analytics to create more livable, resilient, and environmentally responsible urban environments.</p>
`)

const questionText = ref('According to the passage, what was the primary focus of urban planners in the early 20th century?')
const answerOptions = ref([
  'Creating aesthetically pleasing city layouts with architectural monuments',
  'Addressing problems caused by rapid industrialization and population growth',
  'Implementing advanced technologies for city management',
  'Developing sustainable environmental policies for urban areas'
])

// Results data
const correctAnswers = ref(7)
const incorrectAnswers = ref(3)

// Methods
const goBack = () => {
  // Navigate back logic
  console.log('Going back')
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  // Theme toggle logic
  document.documentElement.classList.toggle('dark')
}

const togglePassageSize = () => {
  isPassageExpanded.value = !isPassageExpanded.value
}

const previousQuestion = () => {
  if (currentQuestion.value > 1) {
    currentQuestion.value--
    selectedAnswer.value = null
  }
}

const nextQuestion = () => {
  if (currentQuestion.value < totalQuestions.value) {
    currentQuestion.value++
    selectedAnswer.value = null
  }
}

const clearAnswer = () => {
  selectedAnswer.value = null
}

const markForReview = () => {
  console.log('Question marked for review')
}

const submitAnswer = () => {
  if (selectedAnswer.value !== null) {
    console.log('Answer submitted:', selectedAnswer.value)
    // Show results after last question
    if (currentQuestion.value === totalQuestions.value) {
      showResults.value = true
    }
  }
}

onMounted(() => {
  // Initialize theme based on system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* Base prose styles */
.prose {
  line-height: 1.7;
}

.prose p {
  margin-bottom: 1rem;
}

.prose h3 {
  color: hsl(var(--foreground));
  margin-bottom: 1rem;
}

/* Responsive prose sizing */
.prose-sm {
  font-size: 0.875rem;
  line-height: 1.6;
}

.prose-sm p {
  margin-bottom: 0.875rem;
}

.prose-base {
  font-size: 1rem;
  line-height: 1.7;
}

.prose-base p {
  margin-bottom: 1rem;
}

.prose-lg {
  font-size: 1.125rem;
  line-height: 1.8;
}

.prose-lg p {
  margin-bottom: 1.25rem;
}

.prose-lg h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

/* Custom scrollbar that works across browsers */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--muted-foreground) / 0.3) hsl(var(--muted) / 0.1);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: hsl(var(--muted) / 0.1);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}

.custom-scrollbar::-webkit-scrollbar-thumb:active {
  background: hsl(var(--muted-foreground) / 0.7);
}

/* Mobile scrollbar adjustments */
@media (max-width: 640px) {
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar {
    scrollbar-width: thin;
  }
}

/* Smooth scrolling behavior */
.custom-scrollbar {
  scroll-behavior: smooth;
}

/* Better touch scrolling on mobile */
.custom-scrollbar {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

/* Focus styles for accessibility */
.custom-scrollbar:focus {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

/* Dark mode adjustments */
.dark .custom-scrollbar::-webkit-scrollbar-track {
  background: hsl(var(--muted) / 0.2);
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.4);
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.6);
}

.dark .custom-scrollbar {
  scrollbar-color: hsl(var(--muted-foreground) / 0.4) hsl(var(--muted) / 0.2);
}
</style>