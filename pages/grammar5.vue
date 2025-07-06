<!-- 
  File: pages/unit-1.vue
  Description: An interactive grammar practice page for Nuxt 3, focusing on the Present Continuous tense.
  This page features a dynamic 'Live Scene' description exercise and a sentence unscrambler to help students practice forming sentences about ongoing actions.
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
      <div class="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-green-500">
        <h2 class="text-3xl font-bold text-slate-800">Unit 1: Present Continuous (I am doing)</h2>
        <p class="mt-2 text-slate-600">Use the Present Continuous for actions happening <span class="font-semibold text-green-600">right now</span>, or for temporary situations around the present moment.</p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <!-- Left Column: Interactive Reference & Scene -->
        <div class="space-y-8">
            <!-- Key Concepts -->
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-2xl font-semibold mb-4 border-b pb-2 text-green-700">Key Concepts</h3>
                <p class="text-sm text-slate-500 mb-4">Structure: <code class="bg-green-100 text-green-800 px-2 py-1 rounded">Subject + am/is/are + verb-ing</code></p>
                <ul class="space-y-3 list-disc list-inside text-slate-700">
                    <li><strong class="font-semibold">I</strong> <span class="text-blue-600">am driving</span>.</li>
                    <li><strong class="font-semibold">He / She / It</strong> <span class="text-blue-600">is working</span>.</li>
                    <li><strong class="font-semibold">We / You / They</strong> <span class="text-blue-600">are doing</span> something.</li>
                    <li class="pt-2"><strong>Use for:</strong> Actions right now, temporary projects, and developing situations.</li>
                    <li><strong>Time signals:</strong> <em class="text-slate-500">now, at the moment, today, this week.</em></li>
                </ul>
            </div>
            
            <!-- Live Scene Interaction -->
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-2xl font-semibold mb-4 border-b pb-2 text-teal-700">Live Scene: The Park</h3>
                <p class="text-sm text-slate-500 mb-4">Look at the picture. What are the people doing? Write a full sentence for each person using the Present Continuous.</p>
                
                <!-- A simple representation of a scene -->
                <div class="relative bg-blue-50 border border-blue-200 rounded-lg p-4 h-64 mb-6 text-center flex items-center justify-center">
                    <div class="absolute top-4 left-4 p-2 bg-yellow-200 rounded-full text-xs">☀️</div>
                    <div class="absolute bottom-8 left-8">👤 <span class="text-xs font-bold">(1) Sarah</span></div>
                    <div class="absolute top-12 right-12">👤 <span class="text-xs font-bold">(2) Tom</span></div>
                    <div class="absolute bottom-16 right-24">🐶 <span class="text-xs font-bold">(3) The dog</span></div>
                    <div class="text-slate-400 italic">Imagine a vibrant park scene...</div>
                </div>

                <div v-for="item in sceneItems" :key="item.id" class="mb-6">
                    <label :for="`scene-item-${item.id}`" class="block font-semibold text-slate-700 mb-1">
                      {{ item.id }}. {{ item.subject }} (Hint: {{ item.verb }})
                    </label>
                    <div class="flex items-center gap-2">
                        <input :id="`scene-item-${item.id}`" type="text" v-model="item.userAnswer" placeholder="What is happening?" class="flex-grow p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500">
                        <button @click="checkScene(item)" :disabled="isLoading || !item.userAnswer" class="px-4 py-2 font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 disabled:bg-slate-300">Check</button>
                    </div>
                    <div v-if="item.feedback" class="mt-2 text-sm" v-html="item.feedback"></div>
                </div>
            </div>
        </div>

        <!-- Right Column: Practice Zone -->
        <div class="space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-2xl font-semibold mb-4 border-b pb-2 text-indigo-700">Practice: Sentence Unscrambler</h3>
              <p class="text-sm text-slate-500 mb-6">Put the words in the correct order to make a sentence or question.</p>
              
              <div v-for="q in unscrambleQuestions" :key="q.id" class="mb-6">
                <p class="italic text-slate-500 p-3 bg-slate-100 rounded-md text-center tracking-wider">"{{ q.jumbled }}"</p>
                <div class="flex items-center gap-2 mt-2">
                    <input type="text" v-model="q.userAnswer" placeholder="Unscramble the sentence" class="flex-grow p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <button @click="checkUnscramble(q)" :disabled="isLoading || !q.userAnswer" class="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-slate-300">Check</button>
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

// --- "Live Scene" State ---
const sceneItems = ref([
    { id: 1, subject: 'Sarah', verb: 'read', correctAnswer: "Sarah is reading a book.", userAnswer: "", feedback: null },
    { id: 2, subject: 'Tom', verb: 'eat', correctAnswer: "Tom is eating a sandwich.", userAnswer: "", feedback: null },
    { id: 3, subject: 'The dog', verb: 'play', correctAnswer: "The dog is playing with a ball.", userAnswer: "", feedback: null },
]);

// --- "Sentence Unscrambler" State ---
const unscrambleQuestions = ref([
    { id: 1, jumbled: "watching / television / I / am", correctAnswer: "I am watching television.", userAnswer: "", feedback: null },
    { id: 2, jumbled: "you / are / what / doing / ?", correctAnswer: "What are you doing?", userAnswer: "", feedback: null },
    { id: 3, jumbled: "raining / it / is / not", correctAnswer: "It is not raining.", userAnswer: "", feedback: null },
]);

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
    let content = data.choices[0]?.message?.content || "Sorry, I couldn't get feedback at this moment.";
    
    // Simple sanitization to ensure HTML is safe
    content = content.replace(/<script.*?>.*?<\/script>/gi, '');
    return content;

  } catch (error) {
    console.error("Error fetching AI feedback:", error);
    return `<div class="p-3 rounded-md text-sm bg-red-100 border-l-4 border-red-500 text-red-800"><strong>Tutor Offline:</strong> Could not connect to the AI. Please check your API key and network connection.</div>`;
  } finally {
    isLoading.value = false;
  }
}

async function checkScene(item) {
    const prompt = `You are an expert English grammar tutor for a student learning the Present Continuous tense.
    The student is describing a scene.
    - Scene context: A person named **${item.subject}** is doing something. The action is **'${item.verb}'**.
    - A good answer would be: "${item.correctAnswer}"
    - The student wrote: "${item.userAnswer}"

    Task:
    1. Analyze the student's answer. Is it a grammatically correct Present Continuous sentence? Does it accurately describe the scene?
    2. Provide feedback in a single, encouraging HTML paragraph.
    3. If correct, praise them. e.g., "<p class="text-green-700 font-semibold">Excellent! That's a perfect sentence.</p>"
    4. If there's a small mistake (like a typo), correct it gently. e.g., "<p class="text-orange-700 font-semibold">Very close! Just a small typo. The correct sentence is: <strong>${item.correctAnswer}</strong></p>"
    5. If it's structurally incorrect (e.g., missing 'is', wrong verb form), explain the rule clearly. e.g., "<p class="text-red-700 font-semibold">Not quite. Remember the rule: Subject + am/is/are + verb-ing. The correct sentence is: <strong>${item.correctAnswer}</strong></p>"
    6. Always use <strong> tags for the corrected sentence.`;
    
    item.feedback = await getAIFeedback(prompt);
}

async function checkUnscramble(question) {
    const prompt = `You are a friendly English grammar tutor. A student was asked to unscramble words to form a correct sentence.
    - Jumbled words: "${question.jumbled}"
    - The correct answer is: "${question.correctAnswer}"
    - The student's answer: "${question.userAnswer}"

    Task:
    1. Is the student's answer identical to the correct answer?
    2. Provide feedback in a single HTML paragraph.
    3. If correct, praise them: "<p class="text-green-700 font-semibold">Perfect! You've got the correct word order.</p>"
    4. If incorrect, show the correct answer and give a very brief tip. e.g., "<p class="text-red-700 font-semibold">Good try! For questions, the 'be' verb often comes before the subject. The correct sentence is: <strong>${question.correctAnswer}</strong></p>" or "<p class="text-red-700 font-semibold">Almost there! The correct order is: <strong>${question.correctAnswer}</strong></p>"
    5. Always use <strong> for the corrected sentence.`;
    
    question.feedback = await getAIFeedback(prompt);
}
</script>

<style>
/* Using global styles from a potential main CSS file, or Tailwind's JIT compiler. No extra scoped styles needed for this design. */
</style>
