<template>
  <div class="min-h-screen bg-background p-4 md:p-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
      <!-- Reading Passage Section -->
      <Card class="h-[85vh] transition-all duration-300 hover:shadow-lg">
        <CardHeader class="border-b">
          <CardTitle class="text-2xl font-serif">Reading Passage</CardTitle>
          <CardDescription>Advanced Academic Text</CardDescription>
        </CardHeader>
        <CardContent class="p-0">
          <ScrollArea class="h-[calc(85vh-5rem)] px-6 py-4">
            <div class="prose prose-lg dark:prose-invert max-w-none">
              {{ passage }}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <!-- Questions Section -->
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-serif font-bold">Questions</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" class="flex items-center gap-2">
                <span class="hidden md:inline">Question Navigator</span>
                <span class="inline md:hidden">Navigate</span>
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Question Navigator</DialogTitle>
                <DialogDescription
                  >Navigate through questions efficiently</DialogDescription
                >
              </DialogHeader>
              <div class="grid grid-cols-5 gap-3 p-4">
                <div v-for="answer in answers" :key="answer.index">
                  <DialogClose asChild>
                    <Button
                      :variant="getButtonVariant(answer)"
                      class="w-full aspect-square flex items-center justify-center text-lg font-medium transition-all duration-200 hover:scale-105"
                      @click="currentQuestionIndex = answer.index - 1"
                    >
                      {{ answer.index }}
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card
          v-if="currentQuestion"
          class="transition-all duration-300 hover:shadow-lg"
        >
          <CardContent class="pt-6">
            <div class="space-y-6">
              <div class="text-lg font-medium space-y-2">
                <span class="text-muted-foreground"
                  >Question {{ currentQuestionIndex + 1 }}</span
                >
                <p class="leading-relaxed">{{ currentQuestion.question }}</p>
              </div>

              <div class="space-y-2">
                <label
                  v-for="option in currentQuestion.options"
                  :key="option"
                  class="flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-accent cursor-pointer"
                >
                  <RadioGroup v-model="answers[currentQuestionIndex].answer">
                    <RadioGroupItem :value="option" />
                    <span>{{ option }}</span>
                  </RadioGroup>
                </label>
              </div>

              <div class="flex items-center justify-between pt-4 border-t">
                <Button
                  @click="prevQuestion"
                  :disabled="currentQuestionIndex === 0"
                  variant="outline"
                  class="w-24"
                >
                  Previous
                </Button>
                <div class="flex items-center space-x-2">
                  <Checkbox
                    id="review"
                    v-model="answers[currentQuestionIndex].review"
                  />
                  <label for="review" class="text-sm">Mark for Review</label>
                </div>
                <Button
                  @click="nextQuestion"
                  :disabled="currentQuestionIndex === questions.length - 1"
                  variant="outline"
                  class="w-24"
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          v-if="currentQuestionIndex === questions.length - 1"
          class="w-full py-6 text-lg font-medium transition-transform duration-200 hover:scale-[1.02]"
          @click="submitTest"
        >
          Submit Test
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Sample TOEFL passage
const passage =
  ref(`The relationship between technology and human cognition has become an increasingly complex and contentious topic in contemporary neuroscience and psychology. At its height, it encompassed territories stretching from Britain to Egypt, from Spain to Iraq. The Romans were master builders and engineers, constructing vast networks of roads, aqueducts, and architectural marvels that have survived to this day. Their language, Latin, formed the basis for many modern European languages, and their legal system influenced the development of law throughout the Western world.

Roman society was highly stratified, with distinct social classes including patricians, plebeians, and slaves. The government evolved from a republic, ruled by elected officials and the Senate, to an empire led by powerful emperors. This transition began with the rise of Julius Caesar and was solidified by his adopted heir, Augustus, who became the first Roman Emperor.

The Romans made significant contributions to art, literature, and philosophy. They adapted many elements of Greek culture while adding their own unique perspectives. Roman writers like Virgil and Ovid created masterpieces that continue to influence literature today. In architecture, they perfected the use of concrete and the arch, enabling them to build massive structures like the Colosseum and Pantheon.

However, the empire faced numerous challenges, including political instability, economic problems, and external threats. By the 3rd century CE, it began to decline. The empire was eventually split into Eastern and Western halves, with the Western portion falling to Germanic invaders in 476 CE. The Eastern half, known as the Byzantine Empire, continued for nearly a thousand years more, preserving much of Roman culture and law.`);

// Sample TOEFL questions
const questions = ref([
  {
    question:
      "What was the main factor that contributed to the Roman Empire's extensive influence?",
    options: [
      "A. Its military conquests and territorial expansion",
      "B. Its contributions to art and literature",
      "C. Its system of government",
      "D. Its architectural achievements",
    ],
    correctAnswer: "A",
  },
  {
    question:
      "According to the passage, how did Roman society change over time?",
    options: [
      "A. It became less stratified",
      "B. It transformed from an empire to a republic",
      "C. It evolved from a republic to an empire",
      "D. It eliminated the class system",
    ],
    correctAnswer: "C",
  },
  {
    question:
      "Which of the following was NOT mentioned as a Roman contribution?",
    options: [
      "A. Road networks",
      "B. Aqueducts",
      "C. Mathematics",
      "D. Legal systems",
    ],
    correctAnswer: "C",
  },
  {
    question: "What role did Augustus play in Roman history?",
    options: [
      "A. He was Julius Caesar's rival",
      "B. He became the first Roman Emperor",
      "C. He was a famous writer",
      "D. He divided the empire into East and West",
    ],
    correctAnswer: "B",
  },
  {
    question: "What happened to the Western Roman Empire?",
    options: [
      "A. It was conquered by the Byzantines",
      "B. It continued for a thousand years",
      "C. It was taken over by Germanic invaders",
      "D. It merged with the Eastern Empire",
    ],
    correctAnswer: "C",
  },
]);

const currentQuestionIndex = ref(0);
const answers = ref(
  questions.value.map((_, index) => ({
    index: index + 1,
    answer: null,
    review: false,
  }))
);

const currentQuestion = computed(
  () => questions.value[currentQuestionIndex.value]
);

function getButtonVariant(answer) {
  if (answer.review) return "destructive";
  if (answer.answer) return "default";
  return "outline";
}

function nextQuestion() {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
  }
}

function prevQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
}

function submitTest() {
  console.log("Test submitted:", answers.value);
  // Add submission logic here
}
</script>

<style scoped>
.prose {
  font-family: "Georgia", serif;
}
</style>
