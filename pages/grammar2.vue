<!-- 
  File: pages/unit-2.vue
  Description: An interactive grammar practice page for Nuxt 3, focusing on Past Simple vs. Present Perfect.
  This page emphasizes practice and sentence structure templates.
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
         <nav class="mt-4">
            <NuxtLink to="/" class="text-blue-600 hover:text-blue-800 transition-colors">&larr; Back to Unit 1</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Unit Title -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-teal-500">
        <h2 class="text-3xl font-bold text-slate-800">Unit 2: Past Simple vs. Present Perfect</h2>
        <p class="mt-2 text-slate-600">Understanding 'I did' vs. 'I have done'.</p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <!-- Left Column: Template Explorer -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-2xl font-semibold mb-4 border-b pb-2 text-teal-700">Template Explorer</h3>
          <p class="text-sm text-slate-500 mb-6">Click on the parts of a sentence to understand its structure.</p>
          
          <!-- Template for Past Simple -->
          <div class="mb-8">
            <h4 class="text-xl font-semibold text-slate-700 mb-3">Past Simple Template</h4>
            <p class="mb-3">Used for <strong class="text-red-600">finished actions</strong> at a <strong class="text-red-600">specific time</strong> in the past (e.g., yesterday, last year, in 2010).</p>
            <div class="flex flex-wrap gap-1 p-3 bg-slate-50 border rounded-lg">
              <span class="p-2 bg-sky-200 rounded-md font-mono cursor-pointer hover:bg-sky-300" @click="showExplanation('subject')">[Subject]</span>
              <span class="p-2 text-2xl font-thin">+</span>
              <span class="p-2 bg-rose-200 rounded-md font-mono cursor-pointer hover:bg-rose-300" @click="showExplanation('verb-ed')">[verb-ed]</span>
               <span class="p-2 text-2xl font-thin">+</span>
              <span class="p-2 bg-amber-200 rounded-md font-mono cursor-pointer hover:bg-amber-300" @click="showExplanation('time-expression')">[Time Expression]</span>
            </div>
            <p class="mt-2 text-sm italic">Example: We <strong class="text-rose-600">visited</strong> Paris <strong class="text-amber-600">last year</strong>.</p>
          </div>

          <!-- Template for Present Perfect -->
           <div class="mb-6">
            <h4 class="text-xl font-semibold text-slate-700 mb-3">Present Perfect Template</h4>
            <p class="mb-3">Used for actions in the past with a <strong class="text-green-600">result in the present</strong>, or when the <strong class="text-green-600">time is not specific</strong>.</p>
            <div class="flex flex-wrap gap-1 p-3 bg-slate-50 border rounded-lg">
              <span class="p-2 bg-sky-200 rounded-md font-mono cursor-pointer hover:bg-sky-300" @click="showExplanation('subject')">[Subject]</span>
              <span class="p-2 text-2xl font-thin">+</span>
              <span class="p-2 bg-lime-200 rounded-md font-mono cursor-pointer hover:bg-lime-300" @click="showExplanation('have-has')">[have/has]</span>
               <span class="p-2 text-2xl font-thin">+</span>
              <span class="p-2 bg-violet-200 rounded-md font-mono cursor-pointer hover:bg-violet-300" @click="showExplanation('past-participle')">[past participle]</span>
            </div>
            <p class="mt-2 text-sm italic">Example: I <strong class="text-lime-600">have lost</strong> my keys. (The result is I can't get in my house now).</p>
          </div>

          <!-- Explanation Box -->
          <div v-if="explanation" class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg transition-opacity duration-300">
              <h5 class="font-bold text-blue-800">{{ explanation.title }}</h5>
              <p class="text-sm text-blue-700 mt-1">{{ explanation.text }}</p>
          </div>
        </div>

        <!-- Right Column: Practice Zone -->
        <div class="space-y-8">
            <!-- Practice 1: Fill in the blanks -->
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-2xl font-semibold mb-4 border-b pb-2 text-purple-700">Practice: Fill in the Blanks</h3>
              <div v-for="(question, index) in practiceQuestions" :key="question.id" class="mb-6">
                 <p class="mb-2">
                  <span class="font-bold">{{ index + 1 }}.</span> {{ question.sentence.split('___')[0] }}
                  <input 
                    type="text" 
                    :placeholder="`(${question.verb})`"
                    v-model="question.userAnswer"
                    @keyup.enter="checkAnswer(question)"
                    :disabled="isLoading"
                    class="mx-1 w-48 text-center bg-white border-b-2 border-slate-300 focus:border-purple-500 focus:outline-none transition-colors"
                  >
                  {{ question.sentence.split('___')[1] }}
                </p>
                <button @click="checkAnswer(question)" :disabled="isLoading || !question.userAnswer" class="px-4 py-1 text-sm font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:bg-slate-300">
                  Check
                </button>
                <div v-if="question.feedback" class="mt-3" v-html="question.feedback"></div>
              </div>
            </div>

            <!-- Practice 2: Sentence Scramble -->
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-2xl font-semibold mb-4 border-b pb-2 text-indigo-700">Practice: Sentence Scramble</h3>
                <p class="text-sm text-slate-500 mb-6">Click the words to build a correct sentence.</p>
                
                <div v-for="scramble in scrambleSentences" :key="scramble.id" class="mb-8">
                    <div class="p-4 border-2 border-dashed bg-slate-50 rounded-lg min-h-[50px] mb-2 flex flex-wrap gap-2 items-center">
                        <span v-for="(word, i) in scramble.userSentence" :key="i" @click="returnWord(scramble, word, i)"
                            class="px-3 py-1 bg-white border shadow-sm rounded-md cursor-pointer hover:bg-red-100">
                            {{ word }}
                        </span>
                    </div>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span v-for="(word, i) in scramble.scrambled" :key="i" @click="selectWord(scramble, word, i)"
                            class="px-3 py-1 bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-md cursor-pointer hover:bg-indigo-200">
                            {{ word }}
                        </span>
                    </div>
                    <button @click="checkScramble(scramble)" :disabled="isLoading" class="px-4 py-1 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-slate-300">Check Sentence</button>
                    <div v-if="scramble.feedback" class="mt-3" v-html="scramble.feedback"></div>
                </div>
            </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const groqApiKey = ref('');
const isLoading = ref(false);
const showApiKeyWarning = ref(false);

// --- Template Explorer State ---
const explanation = ref(null);
const explanations = {
  subject: { title: 'Subject', text: 'The person, place, or thing that performs the action (e.g., I, you, the cat, my friend).' },
  'verb-ed': { title: 'Past Simple Verb', text: 'The action that was completed in the past. For regular verbs, this often ends in "-ed". For irregular verbs, it has a special form (e.g., went, saw, ate).' },
  'time-expression': { title: 'Specific Time Expression', text: 'A word or phrase that tells us WHEN the action happened (e.g., yesterday, last week, in 1999).' },
  'have-has': { title: 'Auxiliary Verb (have/has)', text: 'The helper verb. Use "have" for I, you, we, they. Use "has" for he, she, it.' },
  'past-participle': { title: 'Past Participle', text: 'The main verb form used after have/has. For regular verbs, it looks like the past simple (-ed). For irregular verbs, it has its own form (e.g., gone, seen, eaten).' }
};

function showExplanation(part) {
  explanation.value = explanations[part];
}


// --- Practice Exercises State ---
const practiceQuestions = ref([
  { id: 1, sentence: "I ___ a great film yesterday.", verb: 'see', correctAnswer: "saw", userAnswer: '', feedback: null },
  { id: 2, sentence: "She ___ to Japan, so she knows a lot about it.", verb: 'be', correctAnswer: "has been", userAnswer: '', feedback: null },
  { id: 3, sentence: "My brother ___ for this company for three years.", verb: 'work', correctAnswer: "has worked", userAnswer: '', feedback: null },
  { id: 4, sentence: "We ___ them at the party last Friday.", verb: 'meet', correctAnswer: "met", userAnswer: '', feedback: null },
]);

const scrambleSentences = reactive([
    { id: 1, scrambled: ['my', 'I', 'wallet', 'lost', 'have'], userSentence: [], correctAnswer: "I have lost my wallet", feedback: null },
    { id: 2, scrambled: ['finished', 'work', 'at', '6pm', 'he'], userSentence: [], correctAnswer: "he finished work at 6pm", feedback: null },
]);

function selectWord(scramble, word, index) {
    scramble.userSentence.push(word);
    scramble.scrambled.splice(index, 1);
}

function returnWord(scramble, word, index) {
    scramble.scrambled.push(word);
    scramble.userSentence.splice(index, 1);
}

async function checkScramble(scramble) {
    const userAnswer = scramble.userSentence.join(' ');
    const isCorrect = userAnswer.toLowerCase() === scramble.correctAnswer.toLowerCase();
    
    const prompt = `You are a friendly grammar tutor. A student tried to unscramble a sentence.
    The correct sentence is: "${scramble.correctAnswer}"
    The student's sentence is: "${userAnswer}"
    Is the student correct? ${isCorrect ? 'Yes.' : 'No.'}
    Provide a very short, encouraging feedback. If correct, praise them. If incorrect, gently guide them to the correct answer without just giving it away. Highlight the correct answer with <strong>. Format response as a single HTML paragraph.`;

    scramble.feedback = await getAIFeedback(prompt, isCorrect);
}


// --- AI Feedback Logic ---
async function getAIFeedback(prompt, isCorrect) {
  if (!groqApiKey.value) {
    showApiKeyWarning.value = true;
    return `<div class="mt-3 p-4 rounded-md text-sm bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800">Please enter your Groq API key above.</div>`;
  }
  showApiKeyWarning.value = false;
  isLoading.value = true;
  
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${groqApiKey.value}` },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    const data = await response.json();
    const explanation = data.choices[0]?.message?.content || "Sorry, I couldn't get feedback.";

    const feedbackClass = isCorrect 
        ? 'bg-green-50 border-l-4 border-green-500 text-green-800' 
        : 'bg-red-50 border-l-4 border-red-500 text-red-800';

    return `<div class="p-4 rounded-md text-sm ${feedbackClass}">${explanation}</div>`;

  } catch (error) {
    console.error("Error fetching AI feedback:", error);
    return `<div class="p-4 rounded-md text-sm bg-slate-100 border-l-4 border-slate-500 text-slate-800"><strong>Error:</strong> Could not connect to the AI tutor.</div>`;
  } finally {
    isLoading.value = false;
  }
}

async function checkAnswer(question) {
    const isCorrect = question.userAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase();
    const prompt = `You are a friendly English grammar tutor. A student is learning Past Simple vs Present Perfect.
    The sentence was: "${question.sentence.replace('___', `(${question.verb})`)}"
    The correct answer is: "${question.correctAnswer}"
    The student's answer was: "${question.userAnswer}"
    Is the student's answer correct? ${isCorrect ? 'Yes.' : 'No.'}
    Provide a short, encouraging feedback in one paragraph. Explain WHY the tense is correct (e.g., 'finished action with a specific time', 'past action with a present result'). Use <strong> tags for key terms. Format the entire response as a single HTML paragraph.`;
    
    question.feedback = await getAIFeedback(prompt, isCorrect);
}
</script>

<style>
/* Scoped styles can be added here if needed */
</style>