<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <Card class="mb-6">
      <CardHeader>
        <CardTitle class="text-2xl font-bold">IELTS Speaking Practice</CardTitle>
        <CardDescription>Practice your speaking skills with AI-powered evaluation</CardDescription>
      </CardHeader>
    </Card>

    <div class="grid gap-6">
      <!-- Part Selection -->
      <Card class="mb-4">
        <CardHeader>
          <CardTitle>Select Speaking Part</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex gap-4">
            <Button
              v-for="part in parts"
              :key="part.id"
              :class="{
                'bg-primary': currentPart === part.id,
                'bg-secondary': currentPart !== part.id
              }"
              @click="selectPart(part.id)"
            >
              Part {{ part.id }}
            </Button>
          </div>
          <p class="mt-4 text-muted-foreground">{{ getCurrentPartDescription() }}</p>
        </CardContent>
      </Card>

      <!-- Question Section -->
      <Card v-if="currentQuestion">
        <CardHeader>
          <CardTitle>{{ getCurrentPartTitle() }}</CardTitle>
          <CardDescription class="text-lg">
            {{ currentQuestion.question }}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div v-if="currentPart === 2" class="p-4 bg-muted rounded-lg">
              <p class="font-medium mb-2">You should say:</p>
              <ul class="list-disc list-inside space-y-2">
                <li v-for="(point, index) in currentQuestion.talkingPoints" 
                    :key="index"
                    class="text-muted-foreground">
                  {{ point }}
                </li>
              </ul>
            </div>
            <p class="text-muted-foreground">
              {{ currentPart === 2 ? 'Preparation Time: 1 minute' : 'Answer immediately' }}
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
                  'bg-primary hover:bg-primary/90': !isRecording
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
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
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
          <div v-if="isProcessing" class="flex items-center justify-center py-8">
            <div class="space-y-4 text-center">
              <Loader2 class="w-8 h-8 animate-spin mx-auto" />
              <p class="text-sm text-muted-foreground">Processing your response...</p>
            </div>
          </div>
          <div v-else-if="transcription" class="space-y-6">
            <div class="space-y-2">
              <h3 class="font-semibold">Transcription:</h3>
              <p class="text-muted-foreground">{{ transcription }}</p>
            </div>
            <div v-if="evaluation" class="space-y-4">
              <Alert :variant="getBandScoreVariant(evaluation.bandScore)">
                <AlertTitle>Band Score: {{ evaluation.bandScore }}/9</AlertTitle>
                <AlertDescription class="space-y-2">
                  <div v-for="(score, criterion) in evaluation.criteriaScores" :key="criterion">
                    <span class="font-medium">{{ criterion }}:</span> {{ score }}/9
                  </div>
                  <div class="mt-4">
                    <span class="font-medium">Feedback:</span>
                    <p class="mt-1">{{ evaluation.feedback }}</p>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from "vue";
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

const currentPart = ref(1);
const currentQuestionIndex = ref(0);

const parts = [
  { id: 1, description: "Introduction and Interview - General questions about yourself and familiar topics" },
  { id: 2, description: "Individual Long Turn - Speak for 2 minutes on a given topic" },
  { id: 3, description: "Discussion - In-depth questions related to Part 2 topic" }
];

const questions = {
  1: [
    {
      question: "What do you do for work or study?",
      sampleAnswer: "I'm currently in my final year of university, studying computer science. I chose this field because I've always been fascinated by technology and problem-solving. My coursework involves programming, data structures, and artificial intelligence, which I find both challenging and rewarding."
    },
    {
      question: "Tell me about your hometown.",
      sampleAnswer: "I come from a medium-sized city in the coastal region. It's known for its beautiful beaches and seafood restaurants. The city has grown significantly in recent years, but it still maintains its traditional charm with historic buildings in the city center. The weather is typically warm and humid throughout the year."
    }
  ],
  2: [
    {
      question: "Describe a skill you would like to learn.",
      talkingPoints: [
        "What this skill is",
        "Why you want to learn it",
        "How you would learn it",
        "How it would benefit you in the future"
      ],
      sampleAnswer: "I would like to learn photography. I've always been interested in capturing moments and telling stories through images. I plan to take online courses and practice regularly with a DSLR camera. This skill would help me document my travels and possibly lead to freelance opportunities."
    }
  ],
  3: [
    {
      question: "Do you think traditional skills are still important in today's digital age?",
      sampleAnswer: "Yes, I believe traditional skills remain crucial even in our digital era. While technology has transformed many aspects of life, fundamental skills like critical thinking, interpersonal communication, and craftsmanship are timeless. These skills often complement digital capabilities and provide a more well-rounded approach to problem-solving."
    }
  ]
};

const currentQuestion = computed(() => {
  return questions[currentPart.value][currentQuestionIndex.value];
});

function getCurrentPartDescription() {
  const part = parts.find(p => p.id === currentPart.value);
  return part ? part.description : "";
}

function getCurrentPartTitle() {
  switch (currentPart.value) {
    case 1:
      return "Part 1 - Interview";
    case 2:
      return "Part 2 - Individual Long Turn";
    case 3:
      return "Part 3 - Discussion";
    default:
      return "";
  }
}

function selectPart(partId) {
  currentPart.value = partId;
  currentQuestionIndex.value = 0;
  transcription.value = "";
  evaluation.value = null;
}

let timer;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function getBandScoreVariant(score) {
  if (score >= 7) return "default";
  if (score >= 5) return "warning";
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
    alert("Unable to access microphone. Please ensure you have granted permission.");
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
    const audioFile = new File([audioBlob], "recording.wav", {
      type: "audio/wav",
    });

    const transcriptionResponse = await groq.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-large-v3-turbo",
      language: "en",
    });
    transcription.value = transcriptionResponse.text;

    const evaluationResponse = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an IELTS speaking examiner. Evaluate the following response for Part ${currentPart.value}.

Question: "${currentQuestion.value.question}"

Sample answer for reference: "${currentQuestion.value.sampleAnswer}"

Evaluate based on IELTS speaking criteria:
1. Fluency and Coherence
2. Lexical Resource (Vocabulary)
3. Grammatical Range and Accuracy
4. Pronunciation

Provide:
- Overall band score (0-9)
- Individual scores for each criterion (0-9)
- Detailed constructive feedback`
        },
        {
          role: "user",
          content: transcription.value,
        }
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.5,
    });

    const response = evaluationResponse.choices[0].message.content;

    // Parse band score (assuming format "Band Score: X" or similar)
    const bandScoreMatch = response.match(/Band Score:?\s*(\d(\.\d)?)/i);
    const bandScore = bandScoreMatch ? parseFloat(bandScoreMatch[1]) : 0;

    // Parse individual criteria scores
    const criteriaScores = {
      "Fluency and Coherence": 0,
      "Lexical Resource": 0,
      "Grammatical Range": 0,
      "Pronunciation": 0
    };

    Object.keys(criteriaScores).forEach(criterion => {
      const scoreMatch = response.match(new RegExp(`${criterion}:?\s*(\d(\.\d)?)`));
      if (scoreMatch) {
        criteriaScores[criterion] = parseFloat(scoreMatch[1]);
      }
    });

    evaluation.value = {
      bandScore,
      criteriaScores,
      feedback: response
    };
  } catch (error) {
    console.error("Error processing audio:", error);
    alert("An error occurred while processing your response. Please try again.");
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

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.list-move {
  transition: transform 0.3s ease;
}
</style>