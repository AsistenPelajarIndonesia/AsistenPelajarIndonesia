<script setup>
import { ref, onMounted } from "vue";
import Groq from "groq-sdk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const passage = ref("");
const sentences = ref([]);
const answers = ref([]);
const userAnswers = ref([]);
const loading = ref(false);
const submitted = ref(false);
const score = ref(0);

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

async function fetchPassageAndSentences() {
  loading.value = true;
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content:
            'Generate an IELTS reading passage with 5 sentence completion questions. Format the response as JSON with "passage", "sentences", and "answers" fields. The sentences should have gaps marked with "..." where a single word from the passage should be filled in. The answers should be single words that appear in the passage. Format like {"passage": "full passage text", "sentences": ["The researchers discovered that ... was the key element."], "answers": ["uranium"]}',
        },
      ],
      model: "llama-3.3-70b-versatile",
      stream: false,
      response_format: {
        type: "json_object",
      },
    });

    const response = JSON.parse(completion.choices[0].message.content);
    passage.value = response.passage;
    sentences.value = response.sentences;
    answers.value = response.answers;
    userAnswers.value = new Array(response.sentences.length).fill("");
  } catch (error) {
    console.error("Error fetching content:", error);
  } finally {
    loading.value = false;
  }
}

function setAnswer(index, value) {
  userAnswers.value[index] = value.trim().toLowerCase();
}

function submitAnswers() {
  submitted.value = true;
  let correct = 0;
  userAnswers.value.forEach((answer, index) => {
    if (answer === answers.value[index].toLowerCase()) {
      correct++;
    }
  });
  score.value = (correct / sentences.value.length) * 100;
}

function getAnswerColor(index) {
  if (!submitted.value) return '';
  return userAnswers.value[index].toLowerCase() === answers.value[index].toLowerCase() 
    ? 'text-green-500' 
    : 'text-red-500';
}

onMounted(() => {
  fetchPassageAndSentences();
});
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 space-y-6">
    <div v-if="loading" class="text-center">
      <div
        class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"
      ></div>
      <p class="mt-2">Loading content...</p>
    </div>

    <div v-else>
      <div class="bg-card p-6 rounded-lg shadow mb-6">
        <h2 class="text-2xl font-bold mb-4">Reading Passage</h2>
        <div class="prose max-w-none">
          {{ passage }}
        </div>
      </div>

      <div class="bg-card p-6 rounded-lg shadow">
        <h2 class="text-2xl font-bold mb-4">Complete the Sentences</h2>
        <p class="text-muted-foreground mb-4">
          Fill in the gaps with ONE word from the passage.
        </p>
        <div class="space-y-4">
          <div
            v-for="(sentence, index) in sentences"
            :key="index"
            class="flex flex-col space-y-2"
          >
            <p>{{ index + 1 }}. {{ sentence }}</p>
            <div class="flex items-center space-x-2">
              <Input
                :disabled="submitted"
                v-model="userAnswers[index]"
                @input="setAnswer(index, $event.target.value)"
                class="max-w-xs"
                :class="getAnswerColor(index)"
              />
              <p
                v-if="submitted"
                class="text-sm"
                :class="getAnswerColor(index)"
              >
                Correct answer: {{ answers[index] }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex justify-center">
        <Button
          @click="submitAnswers"
          :disabled="userAnswers.some(a => !a) || submitted"
          class="w-48"
        >
          Submit Answers
        </Button>
      </div>

      <div v-if="submitted" class="mt-6 bg-card p-6 rounded-lg shadow">
        <h2 class="text-2xl font-bold mb-4">Results</h2>
        <p class="text-lg mb-4">Your score: {{ Math.round(score) }}%</p>
      </div>
    </div>
  </div>
</template>