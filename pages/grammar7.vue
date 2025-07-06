<!-- 
  File: pages/unit-3.vue
  Description: An interactive grammar page comparing the Present Continuous and Present Simple tenses.
  This page features a 'Tense Detector' to help students choose the correct tense based on context, and a 'Verb Conjugator' for practice.
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
            <NuxtLink to="/unit-2" class="text-blue-600 hover:text-blue-800 transition-colors">&larr; Back to Unit 2</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Unit Title -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-cyan-500">
        <h2 class="text-3xl font-bold text-slate-800">Unit 3: Present Continuous or Present Simple?</h2>
        <p class="mt-2 text-slate-600">Deciding between actions happening <span class="font-semibold text-green-600">Now</span> and actions that happen <span class="font-semibold text-orange-600">In General</span>.</p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <!-- Left Column: Comparison & Rules -->
        <div class="space-y-8">
            <!-- Tense Comparison -->
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-2xl font-semibold mb-4 border-b pb-2 text-cyan-700">When to Use Which?</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <!-- Present Continuous Column -->
                    <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 class="font-bold text-lg text-green-800">Present Continuous</h4>
                        <p class="text-sm text-green-700 italic mb-2">(I am doing)</p>
                        <p class="mb-2">For actions happening <strong>now</strong> or around the time of speaking (temporary).</p>
                        <ul class="list-disc list-inside space-y-1 text-sm">
                            <li>The water <strong>is boiling</strong>. Can you turn it off?</li>
                            <li>I'<strong>m reading</strong> a really good book at the moment.</li>
                            <li>She'<strong>s staying</strong> with her friend for a few days.</li>
                        </ul>
                    </div>
                    <!-- Present Simple Column -->
                    <div class="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <h4 class="font-bold text-lg text-orange-800">Present Simple</h4>
                        <p class="text-sm text-orange-700 italic mb-2">(I do)</p>
                        <p class="mb-2">For habits, routines, facts, and things that are <strong>always</strong> or <strong>generally</strong> true.</p>
                         <ul class="list-disc list-inside space-y-1 text-sm">
                            <li>Water <strong>boils</strong> at 100 degrees Celsius.</li>
                            <li>I <strong>read</strong> a lot of books.</li>
                            <li>She <strong>lives</strong> with her parents.</li>
                        </ul>
                    </div>
                </div>
            </div>

             <!-- State Verbs -->
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-2xl font-semibold mb-4 border-b pb-2 text-red-700">Special Case: State Verbs</h3>
                <p class="text-slate-600">Some verbs describe a state, not an action. We usually use the <strong>Present Simple</strong> for these, even if we mean 'now'.</p>
                <p class="text-sm text-slate-500 mt-2">Common state verbs: <code class="text-red-800">like, want, need, know, prefer, believe, understand</code></p>
                <div class="mt-4">
                    <p class="text-green-600">✔ I <strong>want</strong> to go home now.</p>
                    <p class="text-red-600 line-through">❌ I am wanting to go home now.</p>
                </div>
            </div>
        </div>

        <!-- Right Column: Practice Zone -->
        <div class="space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-2xl font-semibold mb-4 border-b pb-2 text-indigo-700">Practice: Tense Detector</h3>
              <p class="text-sm text-slate-500 mb-6">Read the sentence and choose the correct verb form.</p>
              
              <div v-for="q in detectorQuestions" :key="q.id" class="mb-6">
                <p class="italic text-slate-600">"{{ q.sentence.replace('_____', `[${q.verb}]`) }}"</p>
                <div class="flex items-center gap-2 mt-2">
                    <input type="text" v-model="q.userAnswer" :placeholder="`Type the correct form of '${q.verb}'`" class="flex-grow p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <button @click="checkDetector(q)" :disabled="isLoading || !q.userAnswer" class="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-slate-300">Check</button>
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

const detectorQuestions = ref([
    { id: 1, sentence: "Listen! Somebody _____. (sing)", verb: 'sing', correctAnswer: "is singing", feedback: null, userAnswer: "" },
    { id: 2, sentence: "I _____ to work every day. (drive)", verb: 'drive', correctAnswer: "drive", feedback: null, userAnswer: "" },
    { id: 3, sentence: "Be quiet! The baby _____. (sleep)", verb: 'sleep', correctAnswer: "is sleeping", feedback: null, userAnswer: "" },
    { id: 4, sentence: "She _____ four languages. (speak)", verb: 'speak', correctAnswer: "speaks", feedback: null, userAnswer: "" },
]);

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
        max_tokens: 150,
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

async function checkDetector(question) {
    const prompt = `You are an expert English grammar tutor. A student must choose between Present Simple and Present Continuous.
    - Sentence: "${question.sentence}"
    - The student's answer: "${question.userAnswer}"
    - The correct answer is: "${question.correctAnswer}"

    Task:
    1. Analyze the student's answer. Is it correct?
    2. Provide feedback in a single, encouraging HTML paragraph.
    3. If correct, praise them and briefly explain WHY it's correct based on context clues (like 'Listen!', 'every day'). e.g., "<p class="text-green-700 font-semibold">Perfect! The word 'Listen!' tells us the action is happening now, so we use Present Continuous.</p>"
    4. If incorrect, gently correct them and explain the rule. e.g., "<p class="text-red-700 font-semibold">Not quite. This sentence describes a routine ('every day'), so we use the Present Simple. The correct answer is: <strong>${question.correctAnswer}</strong></p>"
    Use <strong> tags for emphasis.`;
    
    question.feedback = await getAIFeedback(prompt);
}
</script>

<style>
/* Using global styles */
</style>
