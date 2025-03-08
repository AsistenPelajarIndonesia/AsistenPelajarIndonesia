<script setup>
import { ref, onMounted } from "vue";
import Groq from "groq-sdk";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const passage = ref("");
const statements = ref([]);
const answers = ref([]);
const loading = ref(false);
const submitted = ref(false);
const correctAnswers = ref([]);
const score = ref(0);

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

async function fetchPassageAndStatements() {
  loading.value = true;
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content:
            'Generate a highly challenging IELTS academic reading passage (1000-1200 words) on a complex academic topic (such as advanced scientific research, interdisciplinary environmental issues, or cutting-edge technological innovations). Include sophisticated academic vocabulary, complex sentence structures, and intricate arguments. The passage should feature multiple viewpoints, detailed examples, and technical terminology. Create 10 challenging true/false/not given statements that require advanced inference skills, critical analysis, and careful attention to detail. The statements should test understanding of implicit meanings, author\'s stance, and complex relationships between ideas. Format the response as JSON with "passage", "statements", and "answers" fields. The answers should be an array of "true", "false", or "not given" corresponding to each statement. Format like {"passage": "passage", "statements": ["statement1",...,"statement10"], "answers": ["true", "false", "not given", "true", "false", "true", "false", "not given", "true", "false"]}',
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
    statements.value = response.statements;
    correctAnswers.value = response.answers;
    answers.value = new Array(response.statements.length).fill("");
  } catch (error) {
    console.error("Error fetching content:", error);
  } finally {
    loading.value = false;
  }
}

function setAnswer(index, value) {
  answers.value[index] = value;
}

function submitAnswers() {
  submitted.value = true;
  let correct = 0;
  answers.value.forEach((answer, index) => {
    if (answer === correctAnswers.value[index]) {
      correct++;
    }
  });
  score.value = (correct / statements.value.length) * 100;
}

function getAnswerColor(index) {
  if (!submitted.value) return '';
  return answers.value[index] === correctAnswers.value[index] ? 'text-green-500' : 'text-red-500';
}

onMounted(() => {
  fetchPassageAndStatements();
});
</script>

<template>
  <div class="max-w-4xl mx-auto p-4 md:p-6 space-y-4 md:space-y-6">
    <div v-if="loading" class="text-center">
      <div
        class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"
      ></div>
      <p class="mt-2">Loading content...</p>
    </div>

    <div v-else class="grid gap-4 md:gap-6">
      <div class="bg-card p-4 md:p-6 rounded-lg shadow">
        <h2 class="text-xl md:text-2xl font-bold mb-3 md:mb-4">Reading Passage</h2>
        <div class="prose max-w-none text-sm md:text-base overflow-auto max-h-[60vh] md:max-h-[50vh]">
          {{ passage }}
        </div>
      </div>

      <div class="bg-card p-4 md:p-6 rounded-lg shadow">
        <h2 class="text-xl md:text-2xl font-bold mb-3 md:mb-4">Statements</h2>
        <div class="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Statement</TableHead>
                <TableHead class="w-[200px] md:w-[250px]">Answer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="(statement, index) in statements" :key="index">
                <TableCell class="text-sm md:text-base">{{ statement }}</TableCell>
                <TableCell>
                  <div class="flex flex-col md:flex-row gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      :class="{
                        'bg-primary text-primary-foreground':
                          answers[index] === 'true',
                      }"
                      @click="setAnswer(index, 'true')"
                    >
                      True
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      :class="{
                        'bg-primary text-primary-foreground':
                          answers[index] === 'false',
                      }"
                      @click="setAnswer(index, 'false')"
                    >
                      False
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      :class="{
                        'bg-primary text-primary-foreground':
                          answers[index] === 'not given',
                      }"
                      @click="setAnswer(index, 'not given')"
                    >
                      Not Given
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div class="flex justify-center">
        <Button @click="submitAnswers" :disabled="answers.some(a => !a) || submitted" class="w-full md:w-48">
          Submit Answers
        </Button>
      </div>

      <div v-if="submitted" class="bg-card p-4 md:p-6 rounded-lg shadow">
        <h2 class="text-xl md:text-2xl font-bold mb-3 md:mb-4">Results</h2>
        <p class="text-base md:text-lg mb-3 md:mb-4">Your score: {{ Math.round(score) }}%</p>
        <div class="space-y-2 text-sm md:text-base">
          <p v-for="(answer, index) in answers" :key="index" :class="getAnswerColor(index)">
            Statement {{ index + 1 }}: Your answer: {{ answer }} | Correct answer: {{ correctAnswers[index] }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
