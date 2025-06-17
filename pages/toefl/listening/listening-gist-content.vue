<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-white p-8 flex flex-col items-center">
    <div class="w-full max-w-3xl bg-slate-800 shadow-2xl rounded-lg p-8">
      <h1 class="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        TOEFL Listening: Gist-Content
      </h1>

      <div v-if="loading" class="flex flex-col items-center justify-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
        <p class="mt-4 text-lg">Generating audio passage...</p>
      </div>

      <div v-if="!loading && passageData">
        <div class="mb-8 p-6 bg-slate-700 rounded-lg shadow-inner">
          <h2 class="text-2xl font-semibold mb-4 text-purple-300">Listen to the Passage</h2>
          <p class="mb-4 text-slate-300 italic">Imagine an audio player here. For now, please read the passage content below while we work on the audio integration.</p>
          <!-- Placeholder for actual audio player -->
          <audio v-if="audioSrc" :src="audioSrc" controls class="w-full"></audio>
          <div v-else class="p-4 bg-slate-600 rounded text-slate-400">
            Audio player will appear here once the passage is processed.
          </div>
        </div>

        <div class="mb-8 p-6 bg-slate-700 rounded-lg shadow-inner">
          <h3 class="text-xl font-semibold mb-4 text-purple-300">Passage Content (for reference):</h3>
          <pre class="whitespace-pre-wrap text-slate-300 text-sm bg-slate-600 p-4 rounded">{{ passageData.passage }}</pre>
        </div>

        <div class="p-6 bg-slate-700 rounded-lg shadow-inner">
          <h2 class="text-2xl font-semibold mb-6 text-purple-300">{{ passageData.question.stem }}</h2>
          <RadioGroup v-model="selectedAnswer" class="space-y-3">
            <div v-for="(option, index) in passageData.question.options" :key="index" class="flex items-center space-x-3 p-4 bg-slate-600 rounded-md hover:bg-slate-500 transition-colors duration-200">
              <RadioGroupItem :id="`option-${index}`" :value="option.text" />
              <Label :for="`option-${index}`" class="text-slate-200 text-lg">{{ option.text }}</Label>
            </div>
          </RadioGroup>

          <Button @click="checkAnswer" class="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg text-lg transition-transform transform hover:scale-105">
            Submit Answer
          </Button>

          <div v-if="feedback" :class="['mt-6 p-4 rounded-lg text-center font-medium', isCorrect ? 'bg-green-700 text-green-200' : 'bg-red-700 text-red-200']">
            {{ feedback }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Groq from 'groq-sdk';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// This is a placeholder for the actual Groq API key
// In a real application, this should be handled securely (e.g., environment variables)
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "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";

let groq: Groq;

if (GROQ_API_KEY && GROQ_API_KEY !== 'YOUR_GROQ_API_KEY') {
  groq = new Groq({ apiKey: GROQ_API_KEY, dangerouslyAllowBrowser: true });
} else {
  console.warn('Groq API key not provided. TTS functionality will be mocked.');
}

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  stem: string;
  options: Option[];
}

interface PassageData {
  passage: string;
  question: Question;
}

const loading = ref(true);
const passageData = ref<PassageData | null>(null);
const audioSrc = ref<string | null>(null);
const selectedAnswer = ref<string | null>(null);
const feedback = ref<string | null>(null);
const isCorrect = ref(false);
// Mock function to simulate passage generation from 'qwen-qwq-32b'
async function generatePassageAndQuestion(): Promise<PassageData> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Placeholder data - in a real scenario, this would come from an AI model
  return {
    passage: "Universities are increasingly focusing on interdisciplinary studies. This approach encourages students to combine knowledge from different fields, like art and engineering, or biology and computer science. The idea is that complex real-world problems often require solutions that draw on multiple disciplines. For example, developing sustainable energy sources might involve physics, chemistry, economics, and public policy. While specialization is still important, a broader understanding can lead to more innovative thinking and better problem-solving skills. Some argue that this can dilute deep expertise in a single area, but proponents believe the benefits of cross-disciplinary collaboration outweigh these concerns, preparing students for a more interconnected world.",
    question: {
      stem: "What is this lecture mainly about?",
      options: [
        { text: "The importance of specialization in university studies.", isCorrect: false }, // Plausible subtopic (related, but opposite of main idea)
        { text: "The development of sustainable energy sources.", isCorrect: false }, // True detail, but not the main idea
        { text: "The rise and benefits of interdisciplinary studies in universities.", isCorrect: true }, // Correct answer
        { text: "The history of art and engineering programs.", isCorrect: false } // Never mentioned
      ]
    }
  };
}

// Function to simulate text-to-speech using Groq SDK (PlayAI TTS)
async function generateSpeech(text: string): Promise<string | null> {
  if (!groq) {
    console.log("Groq client not initialized. Skipping actual TTS call.");
    // Simulate audio generation for mock environment
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real scenario without API key, you might provide a default/error state or a pre-recorded sample.
    // For this example, we'll return a placeholder indicating no audio was generated.
    return null; 
  }
  try {
    console.log("Attempting to generate speech with PlayAI TTS...");
    const wav = await groq.audio.speech.create({
      model: "playai-tts",
      voice: "Aaliyah-PlayAI",
      response_format: "wav",
      input: text,
    });
    console.log("Speech generated successfully.");
    const audioBlob = await wav.blob();
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error("Error generating speech:", error);
    // Fallback or error handling - e.g., use a pre-recorded message or notify user
    return null; // Indicate failure
  }
}

onMounted(async () => {
  loading.value = true;
  try {
    const data = await generatePassageAndQuestion();
    passageData.value = data;
    if (data && data.passage) {
      const speechAudioSrc = await generateSpeech(data.passage);
      if (speechAudioSrc) {
        audioSrc.value = speechAudioSrc;
      } else {
        console.warn("Audio could not be generated. Displaying passage text only.");
        // Optionally, set a message for the user that audio isn't available
      }
    }
  } catch (error) {
    console.error("Error loading page data:", error);
    // Handle error (e.g., show an error message to the user)
  } finally {
    loading.value = false;
  }
});

function checkAnswer() {
  if (!selectedAnswer.value || !passageData.value) return;

  const correctAnswer = passageData.value.question.options.find(opt => opt.isCorrect);
  if (correctAnswer && selectedAnswer.value === correctAnswer.text) {
    feedback.value = "Correct! That's the main idea.";
    isCorrect.value = true;
  } else {
    feedback.value = "Not quite. Try to think about the overall topic discussed.";
    isCorrect.value = false;
  }
}

</script>

<style scoped>
/* Add any additional mesmerizing styles here */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>