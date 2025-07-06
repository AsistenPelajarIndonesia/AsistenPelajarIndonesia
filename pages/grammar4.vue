<!-- 
  File: pages/unit-4.vue
  Description: An interactive grammar practice page for Nuxt 3, focusing on Modal Verbs of Obligation and Possibility.
  This page features a situation matcher and a certainty slider for interactive learning.
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
            <NuxtLink to="/unit-3" class="text-blue-600 hover:text-blue-800 transition-colors">&larr; Back to Unit 3</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Unit Title -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-purple-500">
        <h2 class="text-3xl font-bold text-slate-800">Unit 4: Modal Verbs</h2>
        <p class="mt-2 text-slate-600">Expressing obligation, advice, and possibility with `must`, `should`, `can`, `might`, etc.</p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <!-- Left Column: Interactive Reference -->
        <div class="space-y-8">
            <!-- Situation Matcher -->
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-2xl font-semibold mb-4 border-b pb-2 text-purple-700">Situation Matcher</h3>
                <p class="text-sm text-slate-500 mb-6">Choose the best modal verb for each situation.</p>
                
                <div v-for="situation in situations" :key="situation.id" class="mb-5">
                    <p class="mb-2 p-4 bg-slate-100 border border-slate-200 rounded-md">{{ situation.text }}</p>
                    <div class="flex flex-wrap gap-2">
                        <button v-for="modal in situation.options" :key="modal" @click="checkSituation(situation, modal)"
                            class="px-3 py-1 text-sm font-semibold rounded-full border-2 transition-colors"
                            :class="getButtonClass(situation, modal)">
                            {{ modal }}
                        </button>
                    </div>
                    <div v-if="situation.feedback" class="mt-2 text-sm" v-html="situation.feedback"></div>
                </div>
            </div>

            <!-- Certainty Slider -->
             <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-2xl font-semibold mb-4 border-b pb-2 text-rose-700">Certainty Slider</h3>
                <p class="text-sm text-slate-500 mb-6">See how modals express different levels of possibility.</p>
                <div class="relative py-4">
                    <div class="h-2 bg-gradient-to-r from-rose-200 to-teal-200 rounded-full"></div>
                    <div class="absolute -top-1 w-full flex justify-between px-2">
                        <span class="text-xs font-bold text-rose-600">LESS CERTAIN</span>
                        <span class="text-xs font-bold text-teal-600">MORE CERTAIN</span>
                    </div>
                </div>
                <div class="mt-6 space-y-4">
                    <p><strong>might:</strong> A small possibility. <em>"It <strong>might</strong> rain later, but the sky is quite clear."</em></p>
                    <p><strong>could:</strong> A general possibility. <em>"We <strong>could</strong> go to the cinema, or we could stay home."</em></p>
                    <p><strong>may:</strong> A formal or polite possibility. <em>"You <strong>may</strong> begin your exam now."</em></p>
                    <p><strong>can:</strong> A general possibility or ability. <em>"It <strong>can</strong> be cold in this room if you don't close the window."</em></p>
                    <p><strong>must be:</strong> A logical conclusion (high certainty). <em>"He's been working all day. He <strong>must be</strong> tired."</em></p>
                </div>
             </div>
        </div>

        <!-- Right Column: Practice Zone -->
        <div class="space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-2xl font-semibold mb-4 border-b pb-2 text-indigo-700">Practice: Rewrite the Sentence</h3>
              <p class="text-sm text-slate-500 mb-6">Rewrite the sentence using the modal verb in brackets. Keep the same meaning.</p>
              
              <div v-for="q in rewriteQuestions" :key="q.id" class="mb-6">
                <p class="italic text-slate-600">"{{ q.original }}"</p>
                <div class="flex items-center gap-2 mt-2">
                    <input type="text" v-model="q.userAnswer" :placeholder="`Rewrite using (${q.modal})`" class="flex-grow p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <button @click="checkRewrite(q)" :disabled="isLoading || !q.userAnswer" class="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-slate-300">Check</button>
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
import { ref, reactive } from 'vue';

const groqApiKey = ref('');
const isLoading = ref(false);

// --- Interactive Reference State ---
const situations = ref([
    { id: 1, text: 'You are giving strong advice to a sick friend.', options: ['should', 'must', 'might'], correct: 'should', userAnswer: null, feedback: null },
    { id: 2, text: 'This is a rule in a library: "Silence is necessary."', options: ['should', 'must', 'can'], correct: 'must', userAnswer: null, feedback: null },
    { id: 3, text: 'It\'s possible, but not certain, that your team will win.', options: ['must', 'have to', 'might'], correct: 'might', userAnswer: null, feedback: null },
]);

// --- Practice Zone State ---
const rewriteQuestions = ref([
    { id: 1, original: "It's a good idea for you to see a doctor.", modal: "should", correctAnswer: "You should see a doctor.", userAnswer: "", feedback: null },
    { id: 2, original: "Perhaps we will go on holiday in August.", modal: "may", correctAnswer: "We may go on holiday in August.", userAnswer: "", feedback: null },
    { id: 3, original: "It is obligatory for passengers to show their passports.", modal: "must", correctAnswer: "Passengers must show their passports.", userAnswer: "", feedback: null },
]);

// --- UI Logic ---
function getButtonClass(situation, modal) {
    if (situation.userAnswer === null) {
        return 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100';
    }
    if (modal === situation.correct) {
        return 'bg-green-500 border-green-500 text-white';
    }
    if (modal === situation.userAnswer && modal !== situation.correct) {
        return 'bg-red-500 border-red-500 text-white line-through';
    }
    return 'bg-white border-slate-300 text-slate-700 opacity-50';
}

// --- AI Feedback & Checking Logic ---
async function getAIFeedback(prompt) {
  if (!groqApiKey.value) {
    return `<div class="p-3 rounded-md text-sm bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800">Please enter your Groq API key to get feedback.</div>`;
  }
  isLoading.value = true;
  
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${groqApiKey.value}` },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.6,
      }),
    });

    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    const data = await response.json();
    return data.choices[0]?.message?.content || "Sorry, I couldn't get feedback.";

  } catch (error) {
    console.error("Error fetching AI feedback:", error);
    return `<div class="p-3 rounded-md text-sm bg-slate-100 border-l-4 border-slate-500 text-slate-800"><strong>Error:</strong> Could not connect to the AI tutor.</div>`;
  } finally {
    isLoading.value = false;
  }
}

async function checkSituation(situation, modal) {
    situation.userAnswer = modal;
    const isCorrect = situation.correct === modal;
    
    const prompt = `You are a concise grammar tutor. A student chose a modal verb for a situation.
    Situation: "${situation.text}"
    Student chose: "${modal}"
    Correct answer: "${situation.correct}"
    The student was ${isCorrect ? 'correct' : 'incorrect'}.
    
    Provide a one-sentence explanation for why the correct modal is the best choice. For example: "Correct! We use 'should' for strong advice." or "Not quite. We use 'must' for rules and obligations." Format as a single HTML paragraph. Use <strong> for the modal verb.`;
    
    situation.feedback = await getAIFeedback(prompt);
    
    const feedbackClass = isCorrect ? 'text-green-700' : 'text-red-700';
    situation.feedback = `<p class="font-semibold ${feedbackClass}">${situation.feedback}</p>`;
}

async function checkRewrite(question) {
    const prompt = `You are an expert English grammar evaluator. A student was asked to rewrite a sentence using a specific modal verb.
    Original sentence: "${question.original}"
    Instruction: Rewrite using "${question.modal}"
    Student's answer: "${question.userAnswer}"
    A good correct answer is: "${question.correctAnswer}"

    Task:
    1. Analyze if the student's answer is grammatically correct and successfully incorporates the modal verb while keeping the original meaning.
    2. Provide feedback in a single, encouraging HTML paragraph.
    3. If correct, praise them. e.g., "Perfect! That's exactly right."
    4. If incorrect, gently correct them and explain the mistake. e.g., "That's close! The structure should be 'Subject + modal + base verb'. The correct sentence is: <strong>${question.correctAnswer}</strong>"
    Use <strong> tags for emphasis.`;
    
    question.feedback = await getAIFeedback(prompt);
}

</script>

<style>
/* Scoped styles for this component */
</style>
