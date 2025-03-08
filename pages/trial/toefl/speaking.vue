<template>
    <div class="max-w-7xl mx-auto">
    <Card class="mb-6">
      <CardHeader>
        <CardTitle class="text-2xl font-bold"
          >TOEFL Speaking Practice</CardTitle
        >
        <CardDescription
          >Practice your speaking skills with AI-powered
          evaluation</CardDescription
        >
      </CardHeader>
    </Card>

    <div class="grid gap-6">
      <!-- Question Section -->
      <Card v-if="currentQuestion">
        <CardHeader>
          <CardTitle>Question {{ currentQuestionIndex + 1 }}</CardTitle>
          <CardDescription class="text-lg">
            {{ currentQuestion.question }}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <p class="text-muted-foreground">
              Preparation Time: {{ currentQuestion.prepTime }}s
            </p>
            <p class="text-muted-foreground">
              Speaking Time: {{ currentQuestion.speakTime }}s
            </p>
          </div>
        </CardContent>
      </Card>

      <!-- Recording Controls -->
      <Card>
        <CardContent class="pt-6">
          <div class="flex flex-col items-center space-y-4">
            <div class="relative">
              <Button
                :class="{
                  'bg-red-500 hover:bg-red-600': isRecording,
                  'bg-primary hover:bg-primary/90': !isRecording,
                }"
                size="lg"
                class="rounded-full w-16 h-16 flex items-center justify-center transition-all duration-300"
                @click="toggleRecording"
              >
                <Mic v-if="!isRecording" class="w-6 h-6" />
                <Square v-else class="w-6 h-6" />
              </Button>
              <div v-if="isRecording" class="absolute -top-1 -right-1">
                <span class="flex h-3 w-3">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
                  ></span>
                  <span
                    class="relative inline-flex rounded-full h-3 w-3 bg-red-500"
                  ></span>
                </span>
              </div>
            </div>
            <p class="text-sm text-muted-foreground">
              {{ isRecording ? "Recording..." : "Click to start recording" }}
            </p>
            <div v-if="recordingTime > 0" class="text-lg font-semibold">
              {{ formatTime(recordingTime) }}
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Results Section -->
      <Card v-if="transcription || isProcessing">
        <CardHeader>
          <CardTitle>Your Response</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            v-if="isProcessing"
            class="flex items-center justify-center py-8"
          >
            <div class="space-y-4 text-center">
              <Loader2 class="w-8 h-8 animate-spin mx-auto" />
              <p class="text-sm text-muted-foreground">
                Processing your response...
              </p>
            </div>
          </div>
          <div v-else-if="transcription" class="space-y-6">
            <div class="space-y-2">
              <h3 class="font-semibold">Transcription:</h3>
              <p class="text-muted-foreground">{{ transcription }}</p>
            </div>
            <div v-if="evaluation" class="space-y-4">
              <Alert :variant="getScoreVariant(evaluation.score)">
                <AlertTitle>Score: {{ evaluation.score }}/4</AlertTitle>
                <AlertDescription>{{ evaluation.feedback }}</AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Mic, Square, Loader2 } from "lucide-vue-next";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const isRecording = ref(false);
const recordingTime = ref(0);
const transcription = ref("");
const evaluation = ref(null);
const isProcessing = ref(false);
const mediaRecorder = ref(null);
const audioChunks = ref([]);

const currentQuestionIndex = ref(0);
const questions = ref([
  {
    question:
      "Describe a memorable experience from your childhood and explain why it had a lasting impact on you.",
    prepTime: 15,
    speakTime: 45,
    sampleAnswer:
      "One of the most memorable experiences from my childhood was when I first learned to ride a bicycle. This experience taught me about perseverance and overcoming fears. Despite falling multiple times, I kept trying with my parents' encouragement until I finally succeeded. This experience showed me that with determination and practice, I could overcome challenges.",
  },
  {
    question:
      "What do you think are the most important qualities of a good leader? Use specific examples to support your answer.",
    prepTime: 15,
    speakTime: 45,
    sampleAnswer:
      "I believe the most important qualities of a good leader are communication skills, empathy, and vision. A leader needs to clearly communicate goals and expectations to their team. They must also understand and care about their team members' needs and concerns. Additionally, a good leader should have a clear vision for the future and be able to inspire others to work towards that vision.",
  },
]);

const currentQuestion = computed(
  () => questions.value[currentQuestionIndex.value]
);

let timer;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function getScoreVariant(score) {
  if (score >= 3.5) return "default";
  if (score >= 2.5) return "warning";
  return "destructive";
}

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.value = new MediaRecorder(stream);
    audioChunks.value = [];

    mediaRecorder.value.ondataavailable = (event) => {
      audioChunks.value.push(event.data);
    };

    mediaRecorder.value.onstop = async () => {
      const audioBlob = new Blob(audioChunks.value, { type: "audio/wav" });
      await processAudio(audioBlob);
    };

    mediaRecorder.value.start();
    isRecording.value = true;
    startTimer();
  } catch (error) {
    console.error("Error accessing microphone:", error);
    alert(
      "Unable to access microphone. Please ensure you have granted permission."
    );
  }
}

function stopRecording() {
  if (mediaRecorder.value && mediaRecorder.value.state === "recording") {
    mediaRecorder.value.stop();
    mediaRecorder.value.stream.getTracks().forEach((track) => track.stop());
  }
  isRecording.value = false;
  stopTimer();
}

function toggleRecording() {
  if (isRecording.value) {
    stopRecording();
  } else {
    startRecording();
  }
}

function startTimer() {
  recordingTime.value = 0;
  timer = setInterval(() => {
    recordingTime.value++;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

async function processAudio(audioBlob) {
  isProcessing.value = true;
  try {
    // Create a File object from the audio blob
    const audioFile = new File([audioBlob], "recording.wav", {
      type: "audio/wav",
    });

    // First, get the transcription
    const transcriptionResponse = await groq.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-large-v3-turbo",
      language: "en",
    });
    transcription.value = transcriptionResponse.text;

    // Then, evaluate the response
    const evaluationResponse = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a TOEFL speaking evaluator. Evaluate the following response to this question: "${currentQuestion.value.question}"

Sample answer for reference: "${currentQuestion.value.sampleAnswer}"

Evaluate based on:
1. Topic Development
2. Language Use
3. Delivery

Provide a score from 0-4 and constructive feedback.`,
        },
        {
          role: "user",
          content: transcription.value,
        },
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.5,
    });

    const response = evaluationResponse.choices[0].message.content;

    // Parse the score from the response (assuming it's in the format "Score: X/4")
    const scoreMatch = response.match(/Score:\s*(\d(\.\d)?)\/4/i);
    const score = scoreMatch ? parseFloat(scoreMatch[1]) : 0;

    evaluation.value = {
      score,
      feedback: response,
    };
  } catch (error) {
    console.error("Error processing audio:", error);
    alert(
      "An error occurred while processing your response. Please try again."
    );
  } finally {
    isProcessing.value = false;
  }
}

onUnmounted(() => {
  stopTimer();
  if (mediaRecorder.value) {
    stopRecording();
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
