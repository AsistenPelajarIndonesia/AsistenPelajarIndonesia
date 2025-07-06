<!-- 
  File: pages/index.vue
  Description: An interactive grammar practice page for Nuxt 3, focusing on Present Continuous vs. Present Simple.
  This page is inspired by "English Grammar in Use" and features AI-powered feedback.
-->
<template>
  <div class="bg-slate-50 min-h-screen font-sans text-slate-800">
    <header class="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 class="text-2xl font-bold text-blue-600">Grammar In Action</h1>
            <p class="text-sm text-slate-500">Your interactive guide to mastering English grammar.</p>
          </div>
          <div class="w-full sm:w-auto">
             <label for="api-key" class="block text-xs font-medium text-slate-600 mb-1">Enter Groq API Key</label>
             <input 
                id="api-key"
                type="password" 
                v-model="groqApiKey" 
                placeholder="gsk_..." 
                class="w-full sm:w-72 px-3 py-2 text-sm bg-slate-100 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
          </div>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Unit Title -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-blue-500">
        <h2 class="text-3xl font-bold text-slate-800">Unit 1: Present Continuous vs. Present Simple</h2>
        <p class="mt-2 text-slate-600">Understanding when to use 'I am doing' and when to use 'I do'.</p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <!-- Left Column: Reference Guide -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-2xl font-semibold mb-4 border-b pb-2 text-blue-700">Reference Guide</h3>
          
          <!-- Section A: Present Continuous -->
          <div class="mb-6">
            <h4 class="text-xl font-semibold text-slate-700 mb-2">A. Present Continuous (I am doing)</h4>
            <p class="mb-3">We use the Present Continuous for actions or events happening <strong class="text-blue-600">at or around the time of speaking</strong>. The action is not finished.</p>
            <div class="bg-slate-50 border border-slate-200 rounded-md p-4 space-y-2">
              <p class="italic">"The water <strong class="font-mono">is boiling</strong>. Can you turn it off?"</p>
              <p class="italic">"Listen to those people. What language <strong class="font-mono">are they speaking</strong>?"</p>
              <p class="italic">"I'm busy right now. I<strong class="font-mono">'m studying</strong> for my exam."</p>
            </div>
            <p class="mt-3 text-sm text-slate-500"><strong>Signal words:</strong> now, at the moment, right now, Look!, Listen!</p>
          </div>

          <!-- Section B: Present Simple -->
          <div class="mb-6">
            <h4 class="text-xl font-semibold text-slate-700 mb-2">B. Present Simple (I do)</h4>
            <p class="mb-3">We use the Present Simple for things in <strong class="text-purple-600">general or things that happen repeatedly</strong>. This includes habits, routines, and general truths.</p>
            <div class="bg-slate-50 border border-slate-200 rounded-md p-4 space-y-2">
              <p class="italic">"Water <strong class="font-mono">boils</strong> at 100 degrees Celsius." (General truth)</p>
              <p class="italic">"Excuse me, <strong class="font-mono">do you speak</strong> English?" (General ability)</p>
              <p class="italic">"I usually <strong class="font-mono">get up</strong> at 7 o'clock." (Habit/Routine)</p>
            </div>
             <p class="mt-3 text-sm text-slate-500"><strong>Signal words:</strong> always, usually, often, sometimes, never, every day</p>
          </div>
        </div>

        <!-- Right Column: Practice Exercises -->
        <div class="space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-2xl font-semibold mb-4 border-b pb-2 text-purple-700">Practice Exercises</h3>
              <p class="text-sm text-slate-500 mb-6">Complete the sentences with the correct form of the verb in brackets. Click 'Check Answer' for AI-powered feedback.</p>

              <!-- Loading Indicator -->
              <div v-if="isLoading" class="flex items-center justify-center bg-slate-100 p-4 rounded-md mb-4">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="text-slate-600">Our AI tutor is thinking...</span>
              </div>

              <!-- API Key Warning -->
              <div v-if="showApiKeyWarning" class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md mb-4" role="alert">
                <p class="font-bold">API Key Required</p>
                <p>Please enter your Groq API key above to get feedback.</p>
              </div>

              <!-- Exercise List -->
              <div v-for="(question, index) in practiceQuestions" :key="question.id" class="mb-6">
                <p class="mb-2">
                  <span class="font-bold">{{ index + 1 }}.</span> {{ question.sentence.split('___')[0] }}
                  <input 
                    type="text" 
                    :placeholder="`(${question.verb})`"
                    v-model="question.userAnswer"
                    @keyup.enter="checkAnswer(question)"
                    :disabled="isLoading"
                    class="mx-1 w-40 text-center bg-white border-b-2 border-slate-300 focus:border-blue-500 focus:outline-none transition-colors"
                  >
                  {{ question.sentence.split('___')[1] }}
                </p>
                <button 
                  @click="checkAnswer(question)"
                  :disabled="isLoading || !question.userAnswer"
                  class="px-4 py-1 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                >
                  Check Answer
                </button>

                <!-- Feedback Area -->
                <div v-if="question.feedback" class="mt-3 p-4 rounded-md text-sm transition-all duration-500"
                  :class="{
                    'bg-green-50 border-l-4 border-green-500 text-green-800': question.status === 'correct',
                    'bg-red-50 border-l-4 border-red-500 text-red-800': question.status === 'incorrect',
                    'bg-slate-100 border-l-4 border-slate-500 text-slate-800': question.status === 'error'
                  }"
                >
                  <strong class="block mb-1">{{ question.feedback.title }}</strong>
                  <p v-html="question.feedback.explanation"></p>
                </div>
              </div>
            </div>

            <!-- AI Sandbox -->
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-2xl font-semibold mb-4 border-b pb-2 text-emerald-700">AI Sandbox</h3>
                <p class="text-sm text-slate-500 mb-4">
                    Describe a situation and our AI tutor will help you create a sentence using the correct tense. 
                    For example: "Me, at a cafe, now" or "My friend, works in a bank".
                </p>
                <textarea 
                    v-model="aiPrompt" 
                    placeholder="Describe a situation..." 
                    class="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    rows="2"
                ></textarea>
                <button 
                    @click="generateWithAI"
                    :disabled="isLoading || !aiPrompt"
                    class="mt-2 px-4 py-2 font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 disabled:bg-slate-300 transition-colors"
                >
                    Generate Sentence
                </button>
                <div v-if="aiResult" class="mt-4 p-4 rounded-md bg-slate-50 border border-slate-200">
                    <p v-html="aiResult"></p>
                </div>
            </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// --- STATE MANAGEMENT ---
const groqApiKey = ref('');
const practiceQuestions = ref([
  { id: 1, sentence: "Listen! Somebody ___ in the next room.", verb: 'sing', correctAnswer: "is singing", userAnswer: '', feedback: null, status: 'pending' },
  { id: 2, sentence: "Sarah is tired. She ___ to go to bed now.", verb: 'want', correctAnswer: "wants", userAnswer: '', feedback: null, status: 'pending' },
  { id: 3, sentence: "I usually ___ coffee in the morning, but today I ___ tea.", verb: 'drink / have', correctAnswer: "drink / am having", userAnswer: '', feedback: null, status: 'pending' },
  { id: 4, sentence: "How often ___ to the cinema?", verb: 'you / go', correctAnswer: "do you go", userAnswer: '', feedback: null, status: 'pending' },
  { id: 5, sentence: "Look at the river. It ___ very fast today.", verb: 'flow', correctAnswer: "is flowing", userAnswer: '', feedback: null, status: 'pending' },
]);

const isLoading = ref(false);
const showApiKeyWarning = ref(false);

const aiPrompt = ref('');
const aiResult = ref(null);

// --- API & LOGIC ---

// Function to check the user's answer using the Groq API
async function checkAnswer(question) {
  if (!groqApiKey.value) {
    showApiKeyWarning.value = true;
    return;
  }
  showApiKeyWarning.value = false;
  isLoading.value = true;
  question.feedback = null; // Clear previous feedback

  // For multi-verb answers, we can split them. For simplicity, we'll check the whole string.
  const isCorrect = question.userAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase();

  const prompt = `
    You are a friendly, encouraging English grammar tutor named 'GrammarBot'. A student is learning the difference between Present Simple and Present Continuous.

    The original sentence was: "${question.sentence.replace('___', `(${question.verb})`)}"
    The correct answer is: "${question.correctAnswer}"
    The student's answer was: "${question.userAnswer}"

    Your task is to provide feedback in a specific format. 
    1. First, analyze if the student's answer is correct.
    2. If it's correct: 
       - Start with "Correct!".
       - Briefly explain WHY it's correct, referencing the rule (e.g., 'action happening now', 'habit or general truth').
       - Provide another example sentence using the same tense.
    3. If it's incorrect:
       - Start with "Not quite.".
       - Gently explain why their answer is incorrect, relating it back to the grammar rules.
       - Provide the correct answer and explain why it's correct.
       - Provide another example sentence using the correct tense for reinforcement.

    Keep your explanation concise, clear, and very encouraging. Use HTML bold tags (<strong>) to highlight key terms.
  `;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqApiKey.value}`,
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192', // As requested: llama-3.3-70b is mapped to llama3-70b-8192 on Groq
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const explanation = data.choices[0]?.message?.content || "Sorry, I couldn't generate feedback right now.";
    
    // Set feedback based on the AI's response
    question.status = isCorrect ? 'correct' : 'incorrect';
    question.feedback = {
      title: isCorrect ? 'Excellent!' : 'Good try!',
      explanation: explanation,
    };

  } catch (error) {
    console.error("Error fetching AI feedback:", error);
    question.status = 'error';
    question.feedback = {
      title: 'An Error Occurred',
      explanation: 'Could not connect to the AI tutor. Please check your API key and network connection.',
    };
  } finally {
    isLoading.value = false;
  }
}

// Function for the AI Sandbox
async function generateWithAI() {
    if (!groqApiKey.value) {
        showApiKeyWarning.value = true;
        return;
    }
    showApiKeyWarning.value = false;
    isLoading.value = true;
    aiResult.value = null;

    const prompt = `
        You are a helpful English sentence creator. A student has provided a situation. 
        Your task is to create a grammatically correct English sentence based on that situation, using either the Present Simple or Present Continuous.
        
        Situation provided by student: "${aiPrompt.value}"

        Analyze the situation to determine if it's an action happening now (Present Continuous) or a habit/general truth (Present Simple).
        Then, generate a correct sentence and briefly explain why you chose that tense.
        Format your response using HTML. For example: "Here is a sentence for your situation: <br><strong>She is reading a book right now.</strong><br><em>I used the Present Continuous because the action is happening now.</em>"
    `;

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${groqApiKey.value}`,
            },
            body: JSON.stringify({
                model: 'llama3-70b-8192',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.8,
            }),
        });

        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

        const data = await response.json();
        aiResult.value = data.choices[0]?.message?.content || "Could not generate a sentence.";

    } catch (error) {
        console.error("Error with AI Sandbox:", error);
        aiResult.value = "<strong>Error:</strong> Could not generate a sentence. Please check your API key.";
    } finally {
        isLoading.value = false;
    }
}
</script>

<style>
/* Using Tailwind utility classes, so no global styles are strictly necessary. 
   Adding a style block for any potential future custom CSS. 
   For example, custom transitions or animations. */
body {
  @apply bg-slate-50;
}
</style>
