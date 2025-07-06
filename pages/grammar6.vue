<!-- 
  File: pages/unit-2.vue
  Description: An interactive grammar practice page for Nuxt 3, focusing on the Present Simple tense.
  This page features a 'Habit Matcher' for verb conjugation and a 'Question & Negative Former' for practicing sentence structures with do/does.
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
            <NuxtLink to="/unit-1" class="text-blue-600 hover:text-blue-800 transition-colors">&larr; Back to Unit 1</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Unit Title -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-orange-500">
        <h2 class="text-3xl font-bold text-slate-800">Unit 2: Present Simple (I do)</h2>
        <p class="mt-2 text-slate-600">Use the Present Simple for things in general, or things that happen <span class="font-semibold text-orange-600">repeatedly (habits & routines)</span>.</p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <!-- Left Column: Interactive Reference & Habit Matcher -->
        <div class="space-y-8">
            <!-- Key Concepts -->
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-2xl font-semibold mb-4 border-b pb-2 text-orange-700">Key Concepts</h3>
                <p class="text-sm text-slate-500 mb-4">Structure: <code class="bg-orange-100 text-orange-800 px-2 py-1 rounded">Subject + base verb (+s/es)</code></p>
                <ul class="space-y-3 list-disc list-inside text-slate-700">
                    <li><strong class="font-semibold">I / You / We / They</strong> <span class="text-blue-600">work / go / do</span>.</li>
                    <li><strong class="font-semibold">He / She / It</strong> <span class="text-blue-600">work<span class="text-red-500 font-bold">s</span> / go<span class="text-red-500 font-bold">es</span> / do<span class="text-red-500 font-bold">es</span></span>.</li>
                    <li class="pt-2"><strong>Use for:</strong> Habits, routines, facts, and general truths.</li>
                    <li><strong>Time signals:</strong> <em class="text-slate-500">always, usually, often, sometimes, never, every day.</em></li>
                    <li><strong>Questions & Negatives:</strong> Use <code class="bg-slate-200 px-1 rounded">do</code> and <code class="bg-slate-200 px-1 rounded">does</code>.</li>
                </ul>
            </div>
            
            <!-- Habit Matcher -->
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-2xl font-semibold mb-4 border-b pb-2 text-rose-700">Habit Matcher</h3>
                <p class="text-sm text-slate-500 mb-6">Choose the correct verb form for the habit or routine.</p>
                
                <div v-for="habit in habitQuestions" :key="habit.id" class="mb-5">
                    <p class="mb-2 p-4 bg-slate-100 border border-slate-200 rounded-md">{{ habit.sentence }}</p>
                    <div class="flex flex-wrap gap-2">
                        <button v-for="option in habit.options" :key="option" @click="checkHabit(habit, option)"
                            class="px-3 py-1 text-sm font-semibold rounded-full border-2 transition-colors"
                            :class="getButtonClass(habit, option)">
                            {{ option }}
                        </button>
                    </div>
                    <div v-if="habit.feedback" class="mt-2 text-sm" v-html="habit.feedback"></div>
                </div>
            </div>
        </div>

        <!-- Right Column: Practice Zone -->
        <div class="space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-2xl font-semibold mb-4 border-b pb-2 text-purple-700">Practice: Question & Negative Former</h3>
              <p class="text-sm text-slate-500 mb-6">Rewrite the sentence as a question or a negative sentence.</p>
              
              <div v-for="q in transformQuestions" :key="q.id" class="mb-6">
                <p class="italic text-slate-600">"{{ q.original }}"</p>
                <div class="flex items-center gap-2 mt-2">
                    <input type="text" v-model="q.userAnswer" :placeholder="`Rewrite as a ${q.transformType}`" class="flex-grow p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <button @click="checkTransform(q)" :disabled="isLoading || !q.userAnswer" class="px-4 py-2 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:bg-slate-300">Check</button>
                </div>
                 <div v-if="q.feedback" class="mt-2 text-sm" v-html="q.feedback"></div>
              </div>
            </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const groqApiKey = ref('');
const isLoading = ref(false);

// --- "Habit Matcher" State ---
const habitQuestions = ref([
    { id: 1, sentence: 'She _____ to the gym every morning.', options: ['go', 'goes'], correct: 'goes', userAnswer: null, feedback: null },
    { id: 2, sentence: 'We _____ coffee with breakfast.', options: ['drink', 'drinks'], correct: 'drink', userAnswer: null, feedback: null },
    { id: 3, sentence: 'He never _____ his homework on time.', options: ['finish', 'finishes'], correct: 'finishes', userAnswer: null, feedback: null },
]);

// --- "Question & Negative Former" State ---
const transformQuestions = ref([
    { id: 1, original: "You play the guitar.", transformType: "question", correctAnswer: "Do you play the guitar?", userAnswer: "", feedback: null },
    { id: 2, original: "He works in an office.", transformType: "negative", correctAnswer: "He doesn't work in an office.", userAnswer: "", feedback: null },
    { id: 3, original: "They live in London.", transformType: "question", correctAnswer: "Where do they live?", userAnswer: "", feedback: null },
]);


// --- UI Logic for Buttons ---
function getButtonClass(question, option) {
    if (question.userAnswer === null) {
        return 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100';
    }
    if (option === question.correct) {
        return 'bg-green-500 border-green-500 text-white';
    }
    if (option === question.userAnswer && option !== question.correct) {
        return 'bg-red-500 border-red-500 text-white line-through';
    }
    return 'bg-white border-slate-300 text-slate-700 opacity-50';
}


// --- AI Feedback & Checking Logic ---
async function getAIFeedback(prompt) {
  if (!groqApiKey.value) {
    return `<div class="p-3 rounded-md text-sm bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800">Please enter your Groq API key to get AI-powered feedback.</div>`;
  }
  isLoading.value = true;
  
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${groqApiKey.value}` },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
        max_tokens: 100,
      }),
    });

    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    const data = await response.json();
    return data.choices[0]?.message?.content || "Sorry, I couldn't get feedback right now.";

  } catch (error) {
    console.error("Error fetching AI feedback:", error);
    return `<div class="p-3 rounded-md text-sm bg-red-100 border-l-4 border-red-500 text-red-800"><strong>Tutor Offline:</strong> Could not connect to the AI. Please check your API key and network connection.</div>`;
  } finally {
    isLoading.value = false;
  }
}

async function checkHabit(habit, option) {
    habit.userAnswer = option;
    const isCorrect = habit.correct === option;
    
    const prompt = `You are a concise grammar tutor for Present Simple. A student chose a verb form.
    Sentence: "${habit.sentence.replace('_____', `<strong>${option}</strong>`)}"
    The student's choice was ${isCorrect ? 'correct' : 'incorrect'}.
    The correct answer is "${habit.correct}".

    Provide a one-sentence explanation.
    - If correct, explain WHY. e.g., "Correct! We add '-es' for 'he/she/it' subjects."
    - If incorrect, explain the rule. e.g., "Not quite. For 'we/they/I/you', we use the base verb without 's'."
    Format as a single HTML paragraph. Use <strong> for the verb.`;
    
    habit.feedback = await getAIFeedback(prompt);
}

async function checkTransform(question) {
    const prompt = `You are an expert English grammar evaluator. A student was asked to rewrite a sentence as a ${question.transformType}.
    Original sentence: "${question.original}"
    Student's answer: "${question.userAnswer}"
    A good correct answer is: "${question.correctAnswer}"

    Task:
    1. Analyze if the student's answer is grammatically correct and follows the instruction.
    2. Provide feedback in a single, encouraging HTML paragraph.
    3. If correct, praise them. e.g., "Excellent! That's a perfect ${question.transformType}."
    4. If incorrect, gently correct them and explain the mistake, focusing on 'do/does' and word order. e.g., "That's close! For negatives with 'he', we use 'doesn't' + base verb. The correct sentence is: <strong>${question.correctAnswer}</strong>"
    Use <strong> tags for emphasis.`;
    
    question.feedback = await getAIFeedback(prompt);
}

</script>

<style>
/* Using global styles */
</style>
