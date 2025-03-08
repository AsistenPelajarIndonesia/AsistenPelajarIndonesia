<template>
  <div class="container mx-auto p-4 max-w-6xl">
    <!-- Test Header Section -->
    <div class="mb-8 space-y-4">
      <h1 class="text-2xl font-bold">IELTS Writing Practice Test</h1>
      <div class="flex items-center justify-between">
        <Badge variant="outline" class="text-lg">
          {{ currentSection }}
        </Badge>
        <div class="flex items-center gap-4">
          <Badge variant="secondary" class="text-lg">
            Time Remaining: {{ formatTime(timeRemaining) }}
          </Badge>
          <Button @click="startTest" v-if="!testStarted" size="lg">
            Start Test
          </Button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isGenerating" class="flex justify-center items-center py-8">
      <div class="space-y-4 text-center">
        <SpinningBar />
        <p class="text-muted-foreground">Generating writing task...</p>
      </div>
    </div>

    <!-- Test Content -->
    <div v-else-if="testStarted && !testCompleted" class="space-y-6">
      <!-- Task Type Selection -->
      <Card v-if="!taskSelected" class="p-6">
        <div class="space-y-4">
          <CardTitle class="text-xl font-bold">Select Task Type</CardTitle>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              @click="selectTask('task1')"
              variant="outline"
              class="h-auto p-6 text-left space-y-2"
            >
              <div class="font-bold">Task 1 (20 minutes)</div>
              <div class="text-sm text-muted-foreground">
                {{ isAcademic ? 'Describe visual information (graph, table, chart, or diagram)' : 'Write a letter' }}
              </div>
            </Button>
            <Button
              @click="selectTask('task2')"
              variant="outline"
              class="h-auto p-6 text-left space-y-2"
            >
              <div class="font-bold">Task 2 (40 minutes)</div>
              <div class="text-sm text-muted-foreground">
                Write an essay in response to a point of view, argument, or problem
              </div>
            </Button>
          </div>
        </div>
      </Card>

      <!-- Task Instructions -->
      <Card v-else class="p-6">
        <div class="space-y-4">
          <CardTitle class="text-xl font-bold">Task {{ selectedTask === 'task1' ? '1' : '2' }}</CardTitle>
          <CardDescription class="text-lg whitespace-pre-line">
            {{ testData.prompt }}
          </CardDescription>
          <div v-if="testData.visualData" class="mt-4">
            <img :src="testData.visualData" alt="Task visual data" class="max-w-full h-auto" />
          </div>
        </div>
      </Card>

      <!-- Writing Response Section -->
      <Card class="p-6">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <CardTitle class="text-xl font-bold">Your Response</CardTitle>
            <div class="flex items-center gap-2">
              <Badge variant="outline">
                {{ wordCount }} words
              </Badge>
            </div>
          </div>
          <Textarea
            v-model="userResponse"
            placeholder="Type your response here..."
            class="min-h-[400px] text-lg leading-relaxed"
            :disabled="!testStarted || isSubmitting"
          />
          <Button
            @click="submitTest"
            class="w-full"
            size="lg"
            :disabled="!canSubmit || isSubmitting"
          >
            {{ isSubmitting ? "Evaluating..." : "Submit Response" }}
          </Button>
        </div>
      </Card>
    </div>

    <!-- Results Screen -->
    <TransitionGroup v-else-if="testCompleted" name="fade">
      <Card class="p-6" key="results">
        <CardTitle class="text-2xl font-bold text-center mb-6">
          Writing Evaluation Results
        </CardTitle>

        <div class="space-y-8">
          <!-- Overall Band Score -->
          <div class="text-center">
            <div class="text-5xl font-bold text-primary mb-2">
              Band {{ evaluationResult.bandScore }}
            </div>
            <p class="text-muted-foreground">Overall Band Score</p>
          </div>

          <!-- Score Breakdown -->
          <div class="grid gap-6 md:grid-cols-2">
            <Card v-for="(score, category) in evaluationResult.breakdown" :key="category">
              <CardHeader>
                <CardTitle class="capitalize">{{ category }}</CardTitle>
              </CardHeader>
              <CardContent>
                <div class="flex items-center justify-between">
                  <span class="text-2xl font-bold">{{ score }}</span>
                  <Progress :model-value="(score / 9) * 100" class="w-2/3" />
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- Detailed Feedback -->
          <Card>
            <CardHeader>
              <CardTitle>Detailed Feedback</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <div v-for="(feedback, idx) in evaluationResult.feedback" :key="idx">
                <Alert :variant="getFeedbackVariant(feedback.type)">
                  <AlertTitle class="capitalize">{{ feedback.type }}</AlertTitle>
                  <AlertDescription>{{ feedback.message }}</AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          <!-- Action Buttons -->
          <div class="flex gap-4">
            <Button @click="retryTest" class="flex-1" size="lg">
              Try Another Test
            </Button>
            <Button
              @click="viewSampleResponse"
              variant="outline"
              class="flex-1"
              size="lg"
            >
              View Sample Response
            </Button>
          </div>
        </div>
      </Card>

      <!-- Sample Response Dialog -->
      <Dialog v-model:open="showSampleResponse">
        <DialogContent class="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Sample Band 9 Response</DialogTitle>
          </DialogHeader>
          <div class="prose prose-slate dark:prose-invert max-w-none">
            {{ evaluationResult.sampleResponse }}
          </div>
        </DialogContent>
      </Dialog>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

// State Management
const testStarted = ref(false);
const testCompleted = ref(false);
const isGenerating = ref(false);
const isSubmitting = ref(false);
const taskSelected = ref(false);
const selectedTask = ref(null);
const isAcademic = ref(true); // Toggle between Academic and General Training
const timeRemaining = ref(0);
const userResponse = ref('');
const showSampleResponse = ref(false);
const timer = ref(null);

// Test Data
const testData = ref({
  prompt: '',
  visualData: null, // For Task 1 Academic (graphs, charts, etc.)
});

// Evaluation Results
const evaluationResult = ref({
  bandScore: 0,
  breakdown: {
    'task achievement': 0,
    'coherence and cohesion': 0,
    'lexical resource': 0,
    'grammatical range and accuracy': 0,
  },
  feedback: [],
  sampleResponse: '',
});

// Computed Properties
const currentSection = computed(() => {
  if (!taskSelected.value) return 'Select Task Type';
  return `Writing ${selectedTask.value === 'task1' ? 'Task 1' : 'Task 2'}`;
});

const wordCount = computed(() => {
  return userResponse.value.trim().split(/\s+/).filter(Boolean).length;
});

const canSubmit = computed(() => {
  const minWords = selectedTask.value === 'task1' ? 150 : 250;
  return testStarted.value && 
         taskSelected.value && 
         wordCount.value >= minWords && 
         !isSubmitting.value;
});

// Methods
async function generateTest() {
  isGenerating.value = true;
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert IELTS test creator specializing in writing tasks. Generate content in JSON format."
        },
        {
          role: "user",
          content: `Create an IELTS ${selectedTask.value === 'task1' ? 
            (isAcademic.value ? 'Academic Task 1 (describe visual information)' : 'General Training Task 1 (letter writing)') : 
            'Task 2 (essay)'} with the following JSON format:
            {
              "prompt": "[Detailed task instructions]",
              ${isAcademic.value && selectedTask.value === 'task1' ? '"visualData": "[URL to graph/chart image]",' : ''}
              "expectedWordCount": ${selectedTask.value === 'task1' ? '150' : '250'}
            }
            Make the content challenging and authentic to real IELTS tests.`
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_completion_tokens: 32768,
      top_p: 0.95,
      response_format: { type: "json_object" }
    });

    const response = JSON.parse(completion.choices[0]?.message?.content || "");
    testData.value = response;
  } catch (error) {
    console.error("Error generating test:", error);
  } finally {
    isGenerating.value = false;
  }
}

async function evaluateResponse() {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert IELTS writing evaluator. Provide detailed evaluation in JSON format."
        },
        {
          role: "user",
          content: `Evaluate this IELTS ${selectedTask.value} response:
            Task: ${testData.value.prompt}
            Response: ${userResponse.value}

            Provide evaluation in this JSON format:
            {
              "bandScore": [Overall band score 1-9],
              "breakdown": {
                "task achievement": [Score 1-9],
                "coherence and cohesion": [Score 1-9],
                "lexical resource": [Score 1-9],
                "grammatical range and accuracy": [Score 1-9]
              },
              "feedback": [
                {
                  "type": "strength/weakness/suggestion",
                  "message": "[Detailed feedback]"
                }
              ],
              "sampleResponse": "[A model band 9 response]"
            }`
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_completion_tokens: 32768,
      top_p: 0.95,
      response_format: { type: "json_object" }
    });

    const response = JSON.parse(completion.choices[0]?.message?.content || "");
    evaluationResult.value = response;
  } catch (error) {
    console.error("Error evaluating response:", error);
  }
}

function selectTask(task) {
  selectedTask.value = task;
  taskSelected.value = true;
  timeRemaining.value = task === 'task1' ? 20 * 60 : 40 * 60; // 20 or 40 minutes
  generateTest();
  startTimer();
}

function startTest() {
  testStarted.value = true;
}

function startTimer() {
  timer.value = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--;
    } else {
      submitTest();
    }
  }, 1000);
}

async function submitTest() {
  if (!canSubmit.value) return;

  isSubmitting.value = true;
  clearInterval(timer.value);

  await evaluateResponse();
  
  testCompleted.value = true;
  isSubmitting.value = false;
}

function retryTest() {
  testStarted.value = false;
  testCompleted.value = false;
  taskSelected.value = false;
  selectedTask.value = null;
  timeRemaining.value = 0;
  userResponse.value = '';
  testData.value = { prompt: '', visualData: null };
  evaluationResult.value = {
    bandScore: 0,
    breakdown: {
      'task achievement': 0,
      'coherence and cohesion': 0,
      'lexical resource': 0,
      'grammatical range and accuracy': 0
    },
    feedback: [],
    sampleResponse: ''
  };
}

function viewSampleResponse() {
  showSampleResponse.value = true;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function getFeedbackVariant(type) {
  switch (type.toLowerCase()) {
    case 'strength':
      return 'success';
    case 'weakness':
      return 'destructive';
    case 'suggestion':
      return 'info';
    default:
      return 'default';
  }
}

// Cleanup
onBeforeUnmount(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>