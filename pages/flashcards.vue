<script setup lang="ts">
import { ref, computed } from "vue";
import { useToast } from "@/components/ui/toast/use-toast";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  mastered: boolean;
}

const { toast } = useToast();
const loading = ref(false);
const studyMaterial = ref("");
const flashcards = ref<Flashcard[]>([]);
const currentCardIndex = ref(0);
const showAnswer = ref(false);
const categories = ref<string[]>([]);
const selectedCategory = ref("all");

const filteredCards = computed(() => {
  if (selectedCategory.value === "all") return flashcards.value;
  return flashcards.value.filter(
    (card) => card.category === selectedCategory.value
  );
});

const currentCard = computed(() => {
  if (filteredCards.value.length === 0) return null;
  return filteredCards.value[currentCardIndex.value];
});

const progress = computed(() => {
  const total = filteredCards.value.length;
  const mastered = filteredCards.value.filter((card) => card.mastered).length;
  return total > 0 ? (mastered / total) * 100 : 0;
});

async function generateFlashcards() {
  if (!studyMaterial.value.trim()) {
    toast({
      title: "Error",
      description: "Please enter some study material first",
      variant: "destructive",
    });
    return;
  }

  loading.value = true;
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert at creating educational flashcards. Generate flashcards from the provided content. Each flashcard should have a clear question and a concise but comprehensive answer. Format your response as a JSON array of objects with properties: id (string), question (string), answer (string), category (string), and mastered (boolean set to false).",
        },
        {
          role: "user",
          content: studyMaterial.value,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      stream: false,
      response_format: {
        type: "json_object",
      },
    });

    const response = completion.choices[0].message.content;
    try {
      const parsedResponse = JSON.parse(response);
      // Ensure we have an array of flashcards, either directly or nested in a property
      const parsedCards = Array.isArray(parsedResponse)
        ? parsedResponse
        : parsedResponse.flashcards || [];

      if (!Array.isArray(parsedCards)) {
        throw new Error(
          "Invalid response format: expected an array of flashcards"
        );
      }

      // Validate the structure of each flashcard
      const validatedCards = parsedCards.filter((card) => {
        return (
          card &&
          typeof card.id === "string" &&
          typeof card.question === "string" &&
          typeof card.answer === "string" &&
          typeof card.category === "string"
        );
      });

      if (validatedCards.length === 0) {
        throw new Error("No valid flashcards found in the response");
      }

      flashcards.value = validatedCards;
      categories.value = [
        ...new Set(validatedCards.map((card) => card.category)),
      ];
      toast({
        title: "Success",
        description: `Generated ${validatedCards.length} flashcards`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error parsing AI response:", error);
      toast({
        title: "Error",
        description: "Failed to parse AI response",
        variant: "destructive",
      });
    }
  } catch (error) {
    console.error("Error calling Groq API:", error);
    toast({
      title: "Error",
      description: "Failed to generate flashcards",
      variant: "destructive",
    });
  } finally {
    loading.value = false;
  }
}

function nextCard() {
  showAnswer.value = false;
  if (currentCardIndex.value < filteredCards.value.length - 1) {
    currentCardIndex.value++;
  } else {
    currentCardIndex.value = 0;
  }
}

function previousCard() {
  showAnswer.value = false;
  if (currentCardIndex.value > 0) {
    currentCardIndex.value--;
  } else {
    currentCardIndex.value = filteredCards.value.length - 1;
  }
}

function toggleMastered() {
  if (!currentCard.value) return;
  const card = flashcards.value.find((c) => c.id === currentCard.value.id);
  if (card) {
    card.mastered = !card.mastered;
  }
}

function resetCards() {
  flashcards.value = flashcards.value.map((card) => ({
    ...card,
    mastered: false,
  }));
  currentCardIndex.value = 0;
  showAnswer.value = false;
}
</script>

<template>
  <div class="min-h-screen bg-background p-6 space-y-8">
    <header class="text-center space-y-2">
      <h1 class="text-4xl font-bold tracking-tight">AI Flashcard Generator</h1>
      <p class="text-muted-foreground">
        Transform your study materials into interactive flashcards
      </p>
    </header>

    <div class="max-w-4xl mx-auto grid gap-8">
      <!-- Input Section -->
      <section class="space-y-4">
        <div class="grid gap-4">
          <Textarea
            v-model="studyMaterial"
            placeholder="Enter your study material here..."
            class="min-h-[200px] p-4"
          />
          <Button
            @click="generateFlashcards"
            class="w-full md:w-auto"
            size="lg"
            :disabled="loading"
          >
            <LucideBrain v-if="!loading" class="mr-2 h-4 w-4" />
            <SpinningBar v-else class="mr-2 h-4 w-4 animate-spin" />
            {{ loading ? "Generating..." : "Generate Flashcards" }}
          </Button>
        </div>
      </section>

      <!-- Flashcard Section -->
      <section v-if="flashcards.length > 0" class="space-y-6">
        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <h2 class="text-2xl font-semibold tracking-tight">
              Your Flashcards
            </h2>
            <p class="text-sm text-muted-foreground">
              {{ filteredCards.length }} cards available
            </p>
          </div>
          <div class="flex items-center gap-4">
            <Select v-model="selectedCategory">
              <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem
                  v-for="category in categories"
                  :key="category"
                  :value="category"
                >
                  {{ category }}
                </SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" @click="resetCards">
              <LucideRefreshCw class="mr-2 h-4 w-4" />
              Reset Progress
            </Button>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span>Learning Progress</span>
            <span>{{ Math.round(progress) }}%</span>
          </div>
          <Progress :model-value="progress" />
        </div>

        <!-- Flashcard Display -->
        <div v-if="currentCard" class="relative">
          <div
            class="aspect-[3/2] relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow transition-all"
            :class="{ 'ring-2 ring-primary': currentCard.mastered }"
            @click="showAnswer = !showAnswer"
          >
            <div
              class="absolute inset-0 p-6 flex flex-col justify-center items-center text-center"
            >
              <div class="space-y-2">
                <p class="text-sm text-muted-foreground">
                  {{ showAnswer ? "Answer" : "Question" }}
                </p>
                <p class="text-lg font-medium">
                  {{ showAnswer ? currentCard.answer : currentCard.question }}
                </p>
              </div>
            </div>
          </div>

          <!-- Card Controls -->
          <div class="mt-4 flex items-center justify-between gap-4">
            <Button variant="outline" @click="previousCard">
              <LucideChevronLeft class="h-4 w-4" />
              Previous
            </Button>
            <Button variant="outline" @click="toggleMastered">
              <LucideCheck v-if="currentCard.mastered" class="mr-2 h-4 w-4" />
              <LucideX v-else class="mr-2 h-4 w-4" />
              {{ currentCard.mastered ? "Mastered" : "Not Mastered" }}
            </Button>
            <Button variant="outline" @click="nextCard">
              Next
              <LucideChevronRight class="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped></style>
