<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, XCircle, Lightbulb } from "lucide-vue-next";
import Groq from "groq-sdk";
const groqApiKey = "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"; // IMPORTANT: Use environment variables
// Replace with your actual API key
const groq = new Groq({ apiKey: groqApiKey, dangerouslyAllowBrowser: true });

interface InsertTextQuestionData {
  passageParts: string[]; // Passage split by insertion points. Expect 5 parts for 4 slots.
  sentenceToInsert: string;
  correctSlotIndex: number; // 0-indexed, so 0 for first slot, 1 for second, etc.
  rationale: string;
  passageTitle?: string; // Optional title for the passage
}

const questionData = ref<InsertTextQuestionData | null>(null);
const selectedSlot = ref<number | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);
const showResult = ref(false);
const isCorrect = ref(false);

// This is a sophisticated prompt for the AI to generate high-quality content.
const generatePrompt = () => {
  return {
    messages: [
      {
        role: "system",
        content: `You are an expert TOEFL content generator specializing in "Insert Text" questions. Your task is to create a complete question set. The output MUST be a single JSON object. Do not include any markdown formatting (e.g., \`\`\`json) or any other text outside the JSON object.
        The JSON object should have the following structure:
        {
          "passageTitle": "A concise and relevant title for the academic passage (optional).",
          "passageParts": [
            "Text part 1 (before the first insertion slot ▢).",
            "Text part 2 (between the first ▢ and second ▢).",
            "Text part 3 (between the second ▢ and third ▢).",
            "Text part 4 (between the third ▢ and fourth ▢).",
            "Text part 5 (after the fourth insertion slot ▢)."
          ],
          "sentenceToInsert": "A single, contextually relevant sentence that logically fits into one of the slots. This sentence should contain clear discourse markers or logical connectors (e.g., 'However,' 'Furthermore,' 'As a result,' 'For example,') that help determine its correct placement. It should not fit well in other slots.",
          "correctSlotIndex": Number, // 0-indexed integer (0, 1, 2, or 3) indicating the correct slot for the sentenceToInsert. Slot 0 is after passageParts[0], Slot 1 after passageParts[1], etc.
          "rationale": "A detailed explanation (2-3 sentences) of why the sentenceToInsert best fits in the correctSlotIndex. Explain the logical connection (e.g., cause-effect, contrast, exemplification, addition) provided by the sentenceToInsert with the surrounding text. Briefly explain why it doesn't fit as well in the other slots, referencing cohesion and coherence."
        }
        Ensure the passage is academic, around 700 words in total (sum of passageParts), and presents a coherent argument or narrative. The sentenceToInsert must have strong contextual clues. The distractors (other slots) should be plausible but clearly less optimal upon careful analysis.`,
      },
      {
        role: "user",
        content:
          "Generate a TOEFL Insert Text question set. The passage should discuss the societal and ethical implications of artificial intelligence in creative industries. Ensure there are exactly 4 insertion slots (meaning 5 passageParts).",
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.75,
    max_tokens: 4000, // Increased to accommodate longer passage and detailed JSON
    top_p: 1,
    stream: false,
    response_format: { type: "json_object" },
  };
};

const fetchInsertTextQuestion = async () => {
  isLoading.value = true;
  error.value = null;
  showResult.value = false;
  selectedSlot.value = null;
  try {
    const chatCompletion = await groq.chat.completions.create(
      generatePrompt() as any
    ); // Type assertion for Groq params
    const content = chatCompletion.choices[0]?.message?.content;
    if (content) {
      const parsedData = JSON.parse(content) as InsertTextQuestionData;
      if (parsedData.passageParts && parsedData.passageParts.length === 5) {
        questionData.value = parsedData;
      } else {
        throw new Error(
          "API returned an invalid number of passage parts for 4 slots."
        );
      }
    } else {
      throw new Error("No content received from API.");
    }
  } catch (err: any) {
    console.error("Error fetching insert text question:", err);
    error.value = `Failed to load question: ${err.message}. Please check API key and credits.`;
  } finally {
    isLoading.value = false;
  }
};

const handleSlotSelect = (slotIndex: number) => {
  if (!questionData.value || showResult.value) return;
  selectedSlot.value = slotIndex;
  isCorrect.value = slotIndex === questionData.value.correctSlotIndex;
  showResult.value = true;
};

const passageWithSlots = computed(() => {
  if (!questionData.value) return [];
  const parts = [];
  for (let i = 0; i < questionData.value.passageParts.length; i++) {
    parts.push({ type: "text", content: questionData.value.passageParts[i] });
    if (i < questionData.value.passageParts.length - 1) {
      // Add slot after each part except the last
      parts.push({ type: "slot", index: i });
    }
  }
  return parts;
});

const getSlotClass = (slotIndex: number) => {
  if (!showResult.value) {
    return selectedSlot.value === slotIndex
      ? "bg-primary text-primary-foreground scale-110"
      : "bg-secondary text-secondary-foreground hover:bg-primary/80";
  }
  if (slotIndex === questionData.value?.correctSlotIndex) {
    return "bg-green-500 text-white scale-110 ring-2 ring-green-300";
  }
  if (
    selectedSlot.value === slotIndex &&
    slotIndex !== questionData.value?.correctSlotIndex
  ) {
    return "bg-red-500 text-white scale-110 ring-2 ring-red-300";
  }
  return "bg-muted text-muted-foreground cursor-not-allowed opacity-70";
};

onMounted(() => {
  fetchInsertTextQuestion();
});

useHead({
  title: "TOEFL Insert Text Practice",
  meta: [
    {
      name: "description",
      content:
        "Practice TOEFL insert text questions. Insert the sentence into the correct place in the passage.",
    },
  ],
});
</script>

<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <Card class="w-full">
      <CardHeader>
        <CardTitle class="text-2xl font-bold"
          >TOEFL Practice: Insert Text Question</CardTitle
        >
        <CardDescription>
          Read the passage. Click on the square (▢) where the sentence provided
          below would best fit.
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div v-if="isLoading" class="space-y-4">
          <Skeleton class="h-8 w-3/4" />
          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-40 w-full mt-4" />
          <Skeleton class="h-10 w-full mt-6" />
        </div>
        <div v-else-if="error" class="space-y-4">
          <Alert variant="destructive">
            <XCircle class="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{{ error }}</AlertDescription>
          </Alert>
          <Button @click="fetchInsertTextQuestion">Try Again</Button>
        </div>
        <div v-else-if="questionData" class="space-y-6">
          <div
            class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none dark:prose-invert p-4 border rounded-md bg-muted/30"
          >
            <h3
              v-if="questionData.passageTitle"
              class="text-xl font-semibold mb-4"
            >
              {{ questionData.passageTitle }}
            </h3>
            <p>
              <template v-for="(item, index) in passageWithSlots" :key="index">
                <span v-if="item.type === 'text'">{{ item.content }}</span>
                <Badge
                  v-else-if="item.type === 'slot'"
                  @click="!showResult && handleSlotSelect(item.index)"
                  :class="[
                    'mx-1 p-2 cursor-pointer transition-all transform active:scale-95',
                    getSlotClass(item.index),
                  ]"
                  variant="outline"
                >
                  ▢
                </Badge>
              </template>
            </p>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-2">Insert this sentence:</h3>
            <Card
              class="bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:border-amber-700"
            >
              <CardContent class="p-4">
                <p
                  class="text-base font-medium text-amber-700 dark:text-amber-300"
                >
                  {{ questionData.sentenceToInsert }}
                </p>
              </CardContent>
            </Card>
          </div>

          <div v-if="showResult">
            <Alert
              :variant="isCorrect ? 'default' : 'destructive'"
              class="mt-4"
            >
              <component
                :is="isCorrect ? CheckCircle : XCircle"
                class="h-5 w-5"
              />
              <AlertTitle>{{
                isCorrect ? "Correct!" : "Incorrect"
              }}</AlertTitle>
              <AlertDescription>
                {{
                  isCorrect
                    ? "The sentence fits perfectly here."
                    : "That is not the best place for the sentence."
                }}
              </AlertDescription>
            </Alert>

            <Card
              class="mt-4 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700"
            >
              <CardHeader class="pb-2">
                <CardTitle class="text-lg flex items-center"
                  ><Lightbulb
                    class="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400"
                  />Rationale</CardTitle
                >
              </CardHeader>
              <CardContent>
                <p class="text-sm text-blue-700 dark:text-blue-300">
                  {{ questionData.rationale }}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
      <CardFooter v-if="!isLoading && !error">
        <Button
          variant="outline"
          @click="fetchInsertTextQuestion"
          :disabled="isLoading"
        >
          Load New Question
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<style scoped>
.prose :deep(p) {
  line-height: 1.8;
}
.prose :deep(span) {
  line-height: 1.8;
}
</style>
