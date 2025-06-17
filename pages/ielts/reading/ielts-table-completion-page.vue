<script setup lang="ts">
import { ref, onMounted } from "vue";
import Groq from "groq-sdk";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Will be used if we label inputs explicitly
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-vue-next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// --- Configuration & Initialization ---
const config = useRuntimeConfig();
const groqApiKey = "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"; // Assuming you set this in nuxt.config or .env
let groq: Groq | null = null;

if (groqApiKey && typeof groqApiKey === "string") {
  groq = new Groq({ apiKey: groqApiKey, dangerouslyAllowBrowser: true });
} else {
  console.error("GROQ_API_KEY is not configured or is invalid.");
  // Potentially set an error ref here to display on UI
}

// --- Interfaces ---
interface TableRowData {
  id: string; // e.g., "q34"
  theorist?:
    | string
    | { questionId: string; placeholder: string; correctAnswer: string };
  theory?:
    | string
    | { questionId: string; placeholder: string; correctAnswer: string };
  principle?:
    | string
    | { questionId: string; placeholder: string; correctAnswer: string };
  isQuestionRow: boolean; // To differentiate rows with questions
}

interface TableCompletionData {
  passageTitle: string;
  passageText: string; // Full reading passage
  tableTitle: string;
  columnHeaders: string[]; // e.g., ["Original Theorist", "Theory", "Principle"]
  rows: TableRowData[];
  wordLimit: number;
}

// --- Reactive State ---
const tableData = ref<TableCompletionData | null>(null);
const userAnswers = ref<{ [key: string]: string }>({}); // e.g., { "q34": "user's answer" }
const loading = ref(true);
const error = ref<string | null>(null);
const showResults = ref(false);
const answerFeedback = ref<
  Array<{
    questionId: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }>
>([]);
const score = ref(0);

// --- Functions ---
async function fetchTableCompletionMaterial() {
  if (!groq) {
    error.value = "Groq SDK not initialized. Check API key configuration.";
    loading.value = false;
    return;
  }

  loading.value = true;
  error.value = null;
  tableData.value = null;
  userAnswers.value = {};
  showResults.value = false;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an IELTS test content generator. Create a 'Table Completion' task. Provide a reading passage (around 300-500 words) and a table with 3 columns and about 4-5 rows. Some cells in the table should be gaps for the user to fill in (these are the questions). For each gap, provide a questionId (e.g., "q1", "q2"), a placeholder (like "34 ....."), and the correctAnswer (NO MORE THAN THREE WORDS). Format the output as a JSON object with keys: "passageTitle", "passageText", "tableTitle", "columnHeaders" (array of 3 strings), "rows" (array of objects, each with "id", optional "theorist", "theory", "principle" fields - if a field is a question, it should be an object {questionId, placeholder, correctAnswer}), and "wordLimit" (integer, e.g., 3). Ensure at least 4-6 gaps in the table.`,
        },
        {
          role: "user",
          content:
            'Generate an IELTS table completion task about the history of cinema. The table should have columns: "Decade", "Key Development", and "Notable Film/Event". Ensure answers are max 3 words.',
        },
      ],
      model: "llama-3.3-70b-versatile",

      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;
    if (responseContent) {
      const parsedData = JSON.parse(responseContent) as TableCompletionData;
      tableData.value = parsedData;
      const initialUserAnswers: { [key: string]: string } = {};
      parsedData.rows.forEach(row => {
        const potentialQuestionKeys: Array<keyof TableRowData> = ['theorist', 'theory', 'principle'];
        potentialQuestionKeys.forEach(key => {
          const cell = row[key];
          if (isQuestionCell(cell)) {
            initialUserAnswers[cell.questionId] = '';
          }
        });
      });
      userAnswers.value = initialUserAnswers;
    } else {
      throw new Error("No content received from API.");
    }
  } catch (e: any) {
    console.error("Error fetching table completion material:", e);
    error.value = `Failed to fetch material: ${e.message}`;
    tableData.value = null;
  }
  loading.value = false;
}

function getCellContent(
  cellData:
    | string
    | { questionId: string; placeholder: string; correctAnswer: string }
    | undefined
) {
  if (typeof cellData === "string") return cellData;
  if (
    typeof cellData === "object" &&
    cellData !== null &&
    "placeholder" in cellData
  )
    return cellData.placeholder;
  return ""; // Or some default like '-'
}

function isQuestionCell(cellData: any): cellData is {
  questionId: string;
  placeholder: string;
  correctAnswer: string;
} {
  return (
    typeof cellData === "object" &&
    cellData !== null &&
    "questionId" in cellData
  );
}

function submitAnswers() {
  if (!tableData.value) return;

  let correctCount = 0;
  const feedback: Array<{
    questionId: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }> = [];

  tableData.value.rows.forEach((row) => {
    ["theorist", "theory", "principle"].forEach((colKey) => {
      const cell = row[colKey as keyof TableRowData];
      if (isQuestionCell(cell)) {
        const userAnswer = userAnswers.value[cell.questionId]?.trim() || "";
        // Simple word count validation (optional, can be more robust)
        if (
          userAnswer.split(" ").filter(Boolean).length >
          tableData.value!.wordLimit
        ) {
          // alert for this specific question or handle globally
        }
        const isCorrect =
          userAnswer.toLowerCase() === cell.correctAnswer.toLowerCase();
        if (isCorrect) correctCount++;
        feedback.push({
          questionId: cell.questionId,
          userAnswer: userAnswer || "Not Answered",
          correctAnswer: cell.correctAnswer,
          isCorrect,
        });
      }
    });
  });

  answerFeedback.value = feedback;
  score.value =
    feedback.length > 0 ? (correctCount / feedback.length) * 100 : 0;
  showResults.value = true;
}

function tryAnotherTest() {
  fetchTableCompletionMaterial();
}

onMounted(() => {
  if (groq) fetchTableCompletionMaterial();
});
</script>

<template>
  <div
    class="container mx-auto p-4 md:p-8 min-h-screen bg-slate-50 dark:bg-slate-900"
  >
    <Card class="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle
          class="text-3xl font-bold text-center text-primary dark:text-sky-400"
          >IELTS Reading: Table Completion</CardTitle
        >
        <CardDescription
          class="text-center text-lg text-muted-foreground dark:text-slate-400"
        >
          Complete the table below using information from the passage.
          <span v-if="tableData?.wordLimit" class="font-semibold"
            >Choose NO MORE THAN {{ tableData.wordLimit }} WORDS for each
            answer.</span
          >
        </CardDescription>
      </CardHeader>
    </Card>

    <div v-if="loading" class="flex flex-col justify-center items-center h-64">
      <Loader2 class="h-16 w-16 animate-spin text-primary dark:text-sky-500" />
      <p class="ml-4 mt-4 text-xl text-muted-foreground dark:text-slate-300">
        Generating your IELTS task...
      </p>
    </div>

    <Alert
      v-if="error && !loading"
      variant="destructive"
      class="mb-8 shadow-md"
    >
      <AlertTitle class="text-xl">Error</AlertTitle>
      <AlertDescription class="text-md">{{ error }}</AlertDescription>
      <Button @click="fetchTableCompletionMaterial" class="mt-4"
        >Try Again</Button
      >
    </Alert>

    <div v-if="tableData && !loading && !error" class="space-y-8">
      <!-- Reading Passage Section -->
      <Card class="shadow-lg">
        <CardHeader>
          <CardTitle class="text-2xl text-primary dark:text-sky-400">{{
            tableData.passageTitle
          }}</CardTitle>
        </CardHeader>
        <CardContent
          class="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-justify"
        >
          <p>{{ tableData.passageText }}</p>
        </CardContent>
      </Card>

      <!-- Table Completion Section -->
      <Card class="shadow-lg">
        <CardHeader>
          <CardTitle class="text-2xl text-primary dark:text-sky-400">{{
            tableData.tableTitle
          }}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  v-for="header in tableData.columnHeaders"
                  :key="header"
                  class="text-slate-800 dark:text-sky-300 font-semibold text-md"
                  >{{ header }}</TableHead
                >
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="(row, rowIndex) in tableData.rows"
                :key="`row-${rowIndex}`"
              >
                <TableCell
                  v-for="(colHeader, colIndex) in tableData.columnHeaders" 
                  :key="`cell-${rowIndex}-${colIndex}`"
                  class="dark:text-slate-300"
                >
                  <template v-if="colIndex === 0"> <!-- Assuming first column is 'theorist' -->
                    <template v-if="isQuestionCell(row.theorist)">
                      <div class="flex items-center">
                        <span class="mr-2 text-muted-foreground dark:text-slate-400">{{ getCellContent(row.theorist).split(' ')[0] }}</span>
                        <Input
                          :id="row.theorist.questionId"
                          v-model="userAnswers[row.theorist.questionId]"
                          type="text"
                          class="flex-grow dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 focus:ring-primary dark:focus:ring-sky-500"
                          :placeholder="getCellContent(row.theorist).substring(getCellContent(row.theorist).split(' ')[0].length).trim() || 'Your answer...'"
                          :disabled="showResults"
                        />
                      </div>
                    </template>
                    <template v-else>
                      {{ getCellContent(row.theorist) }}
                    </template>
                  </template>
                  <template v-else-if="colIndex === 1"> <!-- Assuming second column is 'theory' -->
                    <template v-if="isQuestionCell(row.theory)">
                      <div class="flex items-center">
                        <span class="mr-2 text-muted-foreground dark:text-slate-400">{{ getCellContent(row.theory).split(' ')[0] }}</span>
                        <Input
                          :id="row.theory.questionId"
                          v-model="userAnswers[row.theory.questionId]"
                          type="text"
                          class="flex-grow dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 focus:ring-primary dark:focus:ring-sky-500"
                          :placeholder="getCellContent(row.theory).substring(getCellContent(row.theory).split(' ')[0].length).trim() || 'Your answer...'"
                          :disabled="showResults"
                        />
                      </div>
                    </template>
                    <template v-else>
                      {{ getCellContent(row.theory) }}
                    </template>
                  </template>
                  <template v-else-if="colIndex === 2"> <!-- Assuming third column is 'principle' -->
                    <template v-if="isQuestionCell(row.principle)">
                      <div class="flex items-center">
                        <span class="mr-2 text-muted-foreground dark:text-slate-400">{{ getCellContent(row.principle).split(' ')[0] }}</span>
                        <Input
                          :id="row.principle.questionId"
                          v-model="userAnswers[row.principle.questionId]"
                          type="text"
                          class="flex-grow dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 focus:ring-primary dark:focus:ring-sky-500"
                          :placeholder="getCellContent(row.principle).substring(getCellContent(row.principle).split(' ')[0].length).trim() || 'Your answer...'"
                          :disabled="showResults"
                        />
                      </div>
                    </template>
                    <template v-else>
                      {{ getCellContent(row.principle) }}
                    </template>
                  </template>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter class="flex justify-end pt-6">
          <Button
            @click="submitAnswers"
            :disabled="
              showResults ||
              Object.values(userAnswers).some((ans) => !ans.trim())
            "
            class="min-w-[150px]"
          >
            {{ showResults ? "View Results Below" : "Submit Answers" }}
          </Button>
        </CardFooter>
      </Card>

      <!-- Results Section -->
      <div v-if="showResults" class="space-y-6 mt-10">
        <Alert
          class="shadow-md"
          :variant="
            score === 100 ? 'default' : score >= 50 ? 'default' : 'destructive'
          "
          :class="{
            'bg-green-100 dark:bg-green-800/30 border-green-500 dark:border-green-600':
              score === 100,
            'bg-yellow-100 dark:bg-yellow-800/30 border-yellow-500 dark:border-yellow-600':
              score > 50 && score < 100,
            'bg-red-100 dark:bg-red-800/30 border-red-500 dark:border-red-600':
              score <= 50,
          }"
        >
          <AlertTitle class="text-2xl font-bold dark:text-slate-100"
            >Your Results</AlertTitle
          >
          <AlertDescription class="text-lg dark:text-slate-200">
            You scored <strong class="text-xl">{{ score.toFixed(0) }}%</strong>.
          </AlertDescription>
        </Alert>

        <Card class="shadow-lg">
          <CardHeader>
            <CardTitle class="text-xl text-primary dark:text-sky-400"
              >Answer Breakdown</CardTitle
            >
          </CardHeader>
          <CardContent class="space-y-4">
            <div
              v-for="(item, index) in answerFeedback"
              :key="index"
              class="p-4 rounded-md border"
              :class="{
                'bg-green-50 dark:bg-green-700/20 border-green-400 dark:border-green-500':
                  item.isCorrect,
                'bg-red-50 dark:bg-red-700/20 border-red-400 dark:border-red-500':
                  !item.isCorrect,
              }"
            >
              <p class="font-semibold text-md text-slate-700 dark:text-sky-300">
                Question ({{ item.questionId.replace("q", "") }}):
              </p>
              <p class="text-slate-600 dark:text-slate-300">
                Your answer:
                <span class="font-medium">"{{ item.userAnswer }}"</span>
              </p>
              <p
                v-if="!item.isCorrect"
                class="text-slate-600 dark:text-slate-300"
              >
                Correct answer:
                <span class="font-medium text-yellow-600 dark:text-yellow-400"
                  >"{{ item.correctAnswer }}"</span
                >
              </p>
              <p
                class="mt-1 font-semibold text-lg"
                :class="{
                  'text-green-600 dark:text-green-400': item.isCorrect,
                  'text-red-600 dark:text-red-400': !item.isCorrect,
                }"
              >
                {{ item.isCorrect ? "Correct!" : "Incorrect." }}
              </p>
            </div>
          </CardContent>
          <CardFooter class="flex justify-end pt-6">
            <Button @click="tryAnotherTest" class="min-w-[150px]"
              >Try Another Test</Button
            >
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose p {
  margin-bottom: 1em;
}
/* Add any additional specific styles if needed */
</style>
