<template>
  <div class="container mx-auto p-4 max-w-6xl">
    <!-- Test Header Section -->
    <div class="mb-8 space-y-4">
      <h1 class="text-2xl font-bold">TOEFL Writing Practice Test</h1>
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
        <p class="text-muted-foreground">Generating writing prompt...</p>
      </div>
    </div>

    <!-- Test Content -->
    <div v-else-if="testStarted && !testCompleted" class="space-y-6">
      <!-- Reading Passage Section -->
      <Card class="p-6">
        <ScrollArea class="h-[400px] w-full pr-4">
          <div class="space-y-4">
            <CardTitle class="text-xl font-bold">Reading Passage</CardTitle>
            <div class="prose prose-slate dark:prose-invert max-w-none">
              {{ testData.passage }}
            </div>
          </div>
        </ScrollArea>
      </Card>

      <!-- Writing Prompt Section -->
      <Card class="p-6">
        <div class="space-y-4">
          <CardTitle class="text-xl font-bold">Writing Prompt</CardTitle>
          <CardDescription class="text-lg">
            {{ testData.prompt }}
          </CardDescription>
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
          <!-- Overall Score -->
          <div class="text-center">
            <div class="text-5xl font-bold text-primary mb-2">
              {{ evaluationResult.score }}/30
            </div>
            <p class="text-muted-foreground">Overall Score</p>
          </div>

          <!-- Score Breakdown -->
          <div class="grid gap-6 md:grid-cols-2">
            <Card v-for="(score, category) in evaluationResult.breakdown" :key="category">
              <CardHeader>
                <CardTitle class="capitalize">{{ category }}</CardTitle>
              </CardHeader>
              <CardContent>
                <div class="flex items-center justify-between">
                  <span class="text-2xl font-bold">{{ score }}/5</span>
                  <Progress :model-value="(score / 5) * 100" class="w-2/3" />
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
            <DialogTitle>Sample High-Scoring Response</DialogTitle>
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
import { ScrollArea } from '@/components/ui/scroll-area';
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
const timeRemaining = ref(30 * 60); // 30 minutes
const userResponse = ref('');
const showSampleResponse = ref(false);
const timer = ref(null);

// Test Data
const testData = ref({
  passage: '',
  prompt: '',
});

// Evaluation Results
const evaluationResult = ref({
  score: 0,
  breakdown: {
    'task completion': 0,
    'coherence and cohesion': 0,
    'lexical resource': 0,
    'grammatical range': 0,
    'academic style': 0,
  },
  feedback: [],
  sampleResponse: '',
});

// Computed Properties
const currentSection = computed(() => 'Integrated Writing Task');

const wordCount = computed(() => {
  return userResponse.value.trim().split(/\s+/).filter(Boolean).length;
});

const canSubmit = computed(() => {
  return testStarted.value && 
         wordCount.value >= 150 && 
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
          content: "You are an expert TOEFL test creator specializing in challenging integrated writing tasks. Generate content in JSON format."
        },
        {
          role: "user",
          content: `Create a challenging TOEFL integrated writing task with the following JSON format:
            {
              "passage": "[Academic passage about a complex topic]",
              "prompt": "[Writing prompt that requires analysis and integration of the passage]"
            }
            Make the content extremely challenging, suitable for high-level academic English proficiency.`
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
          content: "You are an expert TOEFL writing evaluator. Provide detailed evaluation in JSON format."
        },
        {
          role: "user",
          content: `Evaluate this TOEFL integrated writing response:
            Passage: ${testData.value.passage}
            Prompt: ${testData.value.prompt}
            Response: ${userResponse.value}

            Provide evaluation in this JSON format:
            {
              "score": [Overall score out of 30],
              "breakdown": {
                "task completion": [Score 1-5],
                "coherence and cohesion": [Score 1-5],
                "lexical resource": [Score 1-5],
                "grammatical range": [Score 1-5],
                "academic style": [Score 1-5]
              },
              "feedback": [
                {
                  "type": "strength/weakness/suggestion",
                  "message": "[Detailed feedback]"
                }
              ],
              "sampleResponse": "[A model response]"
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

function startTest() {
  testStarted.value = true;
  generateTest();
  startTimer();
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
  timeRemaining.value = 30 * 60;
  userResponse.value = '';
  testData.value = { passage: '', prompt: '' };
  evaluationResult.value = {
    score: 0,
    breakdown: {
      'task completion': 0,
      'coherence and cohesion': 0,
      'lexical resource': 0,
      'grammatical range': 0,
      'academic style': 0,
    },
    feedback: [],
    sampleResponse: '',
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
  switch (type) {
    case 'strength':
      return 'default';
    case 'weakness':
      return 'destructive';
    case 'suggestion':
      return 'secondary';
    default:
      return 'outline';
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

.prose {
  font-size: 1.125rem;
  line-height: 1.75;
}

.prose p {
  margin-bottom: 1.5em;
}
</style>