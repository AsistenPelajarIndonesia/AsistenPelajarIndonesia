<template>
  <div class="bg-background text-foreground min-h-screen flex flex-col font-sans">
    <!-- Header Navigation -->
    <header class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center space-x-4">
        <div class="flex-1">
          <h1 class="text-xl sm:text-2xl font-bold tracking-tight">TOEFL Reading Section</h1>
          <p class="text-sm text-muted-foreground hidden md:block">
            Read the passage and answer the questions that follow.
          </p>
        </div>
        <div class="flex items-center space-x-2 sm:space-x-4">
           <Badge variant="outline">Practice Test #1</Badge>
           <Button variant="outline" size="icon" @click="goBack" :disabled="currentQuestionIndex === 0">
             <ChevronLeft class="h-4 w-4" />
           </Button>
           <Button variant="outline" @click="goNext" :disabled="currentQuestionIndex === questions.length -1">
              Next
             <ChevronRight class="h-4 w-4 ml-2" />
           </Button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid lg:grid-cols-2 gap-8 h-full">
        
        <!-- Left Side: Passage -->
        <div class="lg:overflow-y-auto lg:pr-8 h-full max-h-[calc(100vh-220px)]">
            <Card class="h-full">
                <CardHeader>
                    <CardTitle>The Rise of Ancient Rome</CardTitle>
                    <CardDescription>A brief history of its origins and expansion.</CardDescription>
                </CardHeader>
                <CardContent class="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-justify">
                    <p>The history of Rome is a long and complex one, spanning over two and a half thousand years. Its origins are shrouded in legend, with the tale of Romulus and Remus being the most famous. According to this myth, the twin brothers, sons of the god Mars and a mortal priestess, were abandoned as infants and suckled by a she-wolf. Romulus would eventually kill his brother and found the city of Rome on the Palatine Hill in 753 BC. While this story is largely considered a myth by historians, archaeological evidence suggests that the area around Rome was inhabited from at least the 8th century BC.</p>
                    <p>Early Rome was a small city-state ruled by kings. In 509 BC, the Roman monarchy was overthrown, and the Roman Republic was established. This new form of government was characterized by a complex system of checks and balances, with elected officials, known as magistrates, holding power for limited terms. The most powerful of these were the two consuls, who served as joint heads of state. The Senate, an advisory body composed of the city's elite, also held significant influence.</p>
                    <p>The Roman Republic was a period of immense expansion. Through a series of wars and alliances, Rome came to dominate the Italian peninsula. The Punic Wars against Carthage in the 3rd and 2nd centuries BC were a turning point, establishing Rome as the dominant power in the western Mediterranean. Further conquests in Greece, North Africa, and the Near East followed, transforming the Republic into a vast empire. This rapid expansion, however, also brought significant social and political challenges. The influx of wealth and slaves widened the gap between the rich and the poor, leading to social unrest and civil wars.</p>
                     <p>The late Republic was a turbulent period, marked by the rise of powerful generals like Julius Caesar, who challenged the authority of the Senate. Caesar's assassination in 44 BC plunged Rome into another round of civil wars, which ultimately led to the downfall of the Republic. In 27 BC, Caesar's adopted son, Octavian, was granted the title of Augustus by the Senate, marking the beginning of the Roman Empire. Under the rule of emperors, Rome enjoyed a period of relative peace and prosperity known as the Pax Romana, which lasted for over two centuries. The empire reached its greatest extent in the 2nd century AD, stretching from Britain in the northwest to Mesopotamia in the east.</p>
                </CardContent>
            </Card>
        </div>

        <!-- Right Side: Questions -->
        <div class="lg:overflow-y-auto lg:pl-8 h-full max-h-[calc(100vh-220px)]">
            <Card class="h-full">
                <CardHeader>
                    <CardTitle>Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}</CardTitle>
                    <CardDescription>Choose the best answer for the following question.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="space-y-6">
                        <p class="font-semibold">{{ questions[currentQuestionIndex].text }}</p>
                        <RadioGroup v-model="selectedOption" class="space-y-3">
                            <div v-for="(option, index) in questions[currentQuestionIndex].options" :key="index" class="flex items-center space-x-3">
                                <RadioGroupItem :id="`option-${index}`" :value="option" />
                                <Label :for="`option-${index}`" class="font-normal">{{ option }}</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </CardContent>
                <CardFooter class="flex justify-end">
                    <Button @click="submitAnswer" :disabled="!selectedOption">Submit Answer</Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </main>

    <!-- Bottom: Results Section -->
    <footer class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div v-if="showResults" class="p-6 border rounded-lg bg-card text-card-foreground shadow-md">
            <h3 class="text-lg font-semibold mb-4">Your Results</h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                    <p class="text-sm text-muted-foreground">Correct</p>
                    <p class="text-2xl font-bold text-green-500">{{ correctAnswers }}</p>
                </div>
                <div>
                    <p class="text-sm text-muted-foreground">Incorrect</p>
                    <p class="text-2xl font-bold text-red-500">{{ incorrectAnswers }}</p>
                </div>
                 <div>
                    <p class="text-sm text-muted-foreground">Score</p>
                    <p class="text-2xl font-bold">{{ scorePercentage }}%</p>
                </div>
            </div>
            <div class="mt-6 flex justify-center">
                <Button @click="resetTest">Try Again</Button>
            </div>
        </div>
    </footer>

     <!-- Color Mode Toggle (for demonstration) -->
    <div class="absolute top-20 right-4">
        <Button @click="toggleColorMode" variant="ghost" size="icon">
            <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span class="sr-only">Toggle theme</span>
        </Button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-vue-next'
import { useColorMode } from '@vueuse/core'

// -- Data for the test --
const questions = ref([
  {
    text: "According to the legend, who founded the city of Rome?",
    options: ["Julius Caesar", "Augustus", "Romulus", "A she-wolf"],
    answer: "Romulus",
    userAnswer: null,
  },
  {
    text: "When was the Roman Republic established?",
    options: ["753 BC", "509 BC", "44 BC", "27 BC"],
    answer: "509 BC",
    userAnswer: null,
  },
  {
    text: "The Punic Wars were fought against which major power?",
    options: ["Greece", "Egypt", "Gaul", "Carthage"],
    answer: "Carthage",
    userAnswer: null,
  },
   {
    text: "Who was the first Roman Emperor?",
    options: ["Julius Caesar", "Octavian (Augustus)", "Mark Antony", "Nero"],
    answer: "Octavian (Augustus)",
    userAnswer: null,
  }
]);

// -- Component State --
const currentQuestionIndex = ref(0);
const selectedOption = ref(null);
const showResults = ref(false);

// -- Navigation --
const goBack = () => {
    if (currentQuestionIndex.value > 0) {
        currentQuestionIndex.value--;
        selectedOption.value = questions.value[currentQuestionIndex.value].userAnswer;
    }
};

const goNext = () => {
    if (currentQuestionIndex.value < questions.value.length - 1) {
        currentQuestionIndex.value++;
        selectedOption.value = questions.value[currentQuestionIndex.value].userAnswer;
    }
};

// -- Answer Submission --
const submitAnswer = () => {
    if (!selectedOption.value) return;

    questions.value[currentQuestionIndex.value].userAnswer = selectedOption.value;

    // Automatically move to the next question or show results if it's the last one
    if (currentQuestionIndex.value < questions.value.length - 1) {
        goNext();
    } else {
        showResults.value = true;
    }
};

// -- Results Calculation --
const correctAnswers = computed(() => {
    return questions.value.filter(q => q.userAnswer === q.answer).length;
});

const incorrectAnswers = computed(() => {
    return questions.value.length - correctAnswers.value;
});

const scorePercentage = computed(() => {
    if (questions.value.length === 0) return 0;
    return Math.round((correctAnswers.value / questions.value.length) * 100);
});

// -- Test Reset --
const resetTest = () => {
    questions.value.forEach(q => q.userAnswer = null);
    currentQuestionIndex.value = 0;
    selectedOption.value = null;
    showResults.value = false;
}

// -- Color Mode --
const colorMode = useColorMode({
  selector: 'html',
  attribute: 'class',
  modes: {
    // custom names
    light: 'light',
    dark: 'dark',
  },
})

const toggleColorMode = () => {
    colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<style>
/* Basic styles for prose to ensure good readability */
.prose {
    line-height: 1.7;
}

/* Enhancing scrollbar for better aesthetics in dark mode */
.lg\:overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.lg\:overflow-y-auto::-webkit-scrollbar-track {
  background-color: transparent;
}

.lg\:overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: hsl(var(--border));
  border-radius: 10px;
}

html.dark .lg\:overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: hsl(var(--border));
}
</style>
