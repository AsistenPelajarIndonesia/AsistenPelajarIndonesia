<!-- 
  File: pages/unit-3.vue
  Description: An interactive grammar practice page for Nuxt 3, focusing on Future Forms (will, be going to, Present Continuous).
  This page features an interactive decision tree and contextual dialogue practice.
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
        <h2 class="text-3xl font-bold text-slate-800">Unit 3: Future Forms</h2>
        <p class="mt-2 text-slate-600">Choosing between 'will', 'be going to', and the Present Continuous for future events.</p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <!-- Left Column: Future Form Decision Tree -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-2xl font-semibold mb-4 border-b pb-2 text-cyan-700">Future Form Decision Tree</h3>
          <p class="text-sm text-slate-500 mb-6">Click a reason to see which future form to use.</p>
          
          <div class="space-y-3">
              <div v-for="item in decisionTree" :key="item.reason" 
                   @click="selectReason(item)"
                   class="p-4 border rounded-lg cursor-pointer transition-all duration-200"
                   :class="selectedReason === item ? 'bg-cyan-100 border-cyan-400 shadow' : 'bg-slate-50 hover:bg-cyan-50 hover:border-cyan-200'">
                  <h4 class="font-semibold text-cyan-800">{{ item.reason }}</h4>
              </div>
          </div>
          
          <!-- Explanation Box -->
          <div v-if="selectedReason" class="mt-6 p-4 bg-gray-50 border-t-4 border-gray-600 rounded-b-lg rounded-t-sm transition-opacity duration-300">
              <h5 class="text-xl font-bold text-gray-800">{{ selectedReason.form }}</h5>
              <p class="text-gray-600 mt-2">{{ selectedReason.explanation }}</p>
              <p class="text-sm text-gray-800 mt-3 p-3 bg-white border border-gray-200 rounded-md italic">Example: "{{ selectedReason.example }}"</p>
          </div>
        </div>

        <!-- Right Column: Practice Zone -->
        <div class="space-y-8">
            <!-- Practice 1: Dialogue Completion -->
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-2xl font-semibold mb-4 border-b pb-2 text-pink-700">Practice: Dialogue Completion</h3>
              <p class="text-sm text-slate-500 mb-6">Complete the dialogue. Think about the context!</p>
              
              <div class="space-y-5 p-4 bg-slate-50 rounded-lg border">
                  <div v-for="(line, index) in dialogue" :key="line.id">
                      <p>
                          <span class="font-bold">{{ line.speaker }}:</span> 
                          {{ line.text.split('___')[0] }}
                          <input 
                            v-if="line.verb"
                            type="text" 
                            :placeholder="`(${line.verb})`"
                            v-model="line.userAnswer"
                            @keyup.enter="checkDialogueAnswer(line)"
                            :disabled="isLoading"
                            class="mx-1 w-48 text-center bg-white border-b-2 border-slate-300 focus:border-pink-500 focus:outline-none transition-colors"
                          />
                          {{ line.text.split('___')[1] }}
                      </p>
                      <button v-if="line.verb" @click="checkDialogueAnswer(line)" :disabled="isLoading || !line.userAnswer" class="mt-1 ml-12 px-3 py-1 text-xs font-semibold text-white bg-pink-600 rounded-md hover:bg-pink-700 disabled:bg-slate-300">
                          Check
                      </button>
                      <div v-if="line.feedback" class="mt-2 ml-12" v-html="line.feedback"></div>
                  </div>
              </div>
            </div>

            <!-- Practice 2: What's Your Plan? -->
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-2xl font-semibold mb-4 border-b pb-2 text-green-700">Practice: What's your plan?</h3>
                <p class="text-sm text-slate-500 mb-4">Write a short paragraph about your plans for next weekend. Our AI tutor will check your use of future forms.</p>
                <textarea 
                    v-model="userPlan" 
                    placeholder="e.g., On Saturday, I am meeting my friend. We are going to see a movie..." 
                    class="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows="4"
                ></textarea>
                <button @click="getPlanFeedback" :disabled="isLoading || !userPlan" class="mt-2 px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-slate-300">
                    Get Feedback
                </button>
                <div v-if="planFeedback" class="mt-4 p-4 rounded-md bg-green-50 border-l-4 border-green-500" v-html="planFeedback"></div>
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

// --- Decision Tree State ---
const decisionTree = ref([
  { reason: 'A spontaneous decision, made at the moment of speaking.', form: 'will', explanation: 'Use "will" for decisions you make on the spot.', example: 'The phone is ringing. I\'ll get it!' },
  { reason: 'A prior plan or intention (something you decided before).', form: 'be going to', explanation: 'Use "be going to" for plans you have already made.', example: 'I\'m going to redecorate my room next month.' },
  { reason: 'A prediction based on present evidence.', form: 'be going to', explanation: 'Use "be going to" when you can see something is about to happen.', example: 'Look at those dark clouds! It\'s going to rain.' },
  { reason: 'A fixed arrangement, often with other people.', form: 'Present Continuous', explanation: 'Use the Present Continuous for future plans that are like appointments.', example: 'I\'m meeting Jane for lunch tomorrow at 1pm.' },
  { reason: 'An offer, promise, or general prediction.', form: 'will', explanation: 'Use "will" for offers, promises, or predictions based on opinion.', example: 'I think Brazil will win the World Cup.' },
]);
const selectedReason = ref(null);

function selectReason(reason) {
  selectedReason.value = reason;
}

// --- Practice Exercises State ---
const dialogue = ref([
    { id: 1, speaker: 'Alex', text: "What are you doing this weekend, Ben?", verb: null },
    { id: 2, speaker: 'Ben', text: "I'm not sure. I think I ___ just stay home and relax.", verb: 'will', correctAnswer: 'will', userAnswer: '', feedback: null },
    { id: 3, speaker: 'Alex', text: "Oh, you should come with me! I ___ my cousin on Saturday.", verb: 'visit', correctAnswer: 'am visiting', userAnswer: '', feedback: null },
    { id: 4, speaker: 'Ben', text: "Really? What ___?", verb: 'you / do', correctAnswer: 'are you going to do', userAnswer: '', feedback: null },
    { id: 5, speaker: 'Alex', text: "We ___ a barbecue if the weather is good. It's all planned.", verb: 'have', correctAnswer: 'are going to have', userAnswer: '', feedback: null },
    { id: 6, speaker: 'Ben', text: "That sounds great! Okay, I ___ with you!", verb: 'come', correctAnswer: 'will come', userAnswer: '', feedback: null },
]);

const userPlan = ref('');
const planFeedback = ref(null);

// --- AI Feedback Logic ---
async function getAIFeedback(prompt, isCorrect = null) {
  if (!groqApiKey.value) {
    return `<div class="p-4 rounded-md text-sm bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800">Please enter your Groq API key to get feedback.</div>`;
  }
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

    if (isCorrect !== null) {
        const feedbackClass = isCorrect 
            ? 'bg-green-50 border-l-4 border-green-500 text-green-800' 
            : 'bg-red-50 border-l-4 border-red-500 text-red-800';
        return `<div class="p-3 rounded-md text-sm ${feedbackClass}">${explanation}</div>`;
    }
    return explanation;

  } catch (error) {
    console.error("Error fetching AI feedback:", error);
    return `<div class="p-3 rounded-md text-sm bg-slate-100 border-l-4 border-slate-500 text-slate-800"><strong>Error:</strong> Could not connect to the AI tutor.</div>`;
  } finally {
    isLoading.value = false;
  }
}

async function checkDialogueAnswer(line) {
    const isCorrect = line.userAnswer.trim().toLowerCase().replace(/ /g, '') === line.correctAnswer.toLowerCase().replace(/ /g, '');
    
    const prompt = `You are a friendly grammar tutor. A student is completing a dialogue to practice future forms.
    The line is: "${line.speaker}: ${line.text.replace('___', `(${line.verb})`)}"
    The student's answer is: "${line.userAnswer}"
    The correct answer is: "${line.correctAnswer}"
    The student's answer is ${isCorrect ? 'correct' : 'incorrect'}.
    
    Provide a short, encouraging feedback in one HTML paragraph. Explain WHY the correct tense is used, referring to the context of the dialogue (e.g., "This is a spontaneous decision," "This is a fixed arrangement."). Use <strong> tags for key terms.`;
    
    line.feedback = await getAIFeedback(prompt, isCorrect);
}

async function getPlanFeedback() {
    planFeedback.value = null;
    const prompt = `You are an expert English grammar tutor. A student has written about their plans for the weekend to practice future forms (will, be going to, Present Continuous).
    The student's text is: "${userPlan.value}"
    
    Your task is to:
    1. Read the student's text carefully.
    2. Provide positive and encouraging feedback overall.
    3. Gently correct any mistakes in the use of future forms. For each correction, explain WHY another form is better (e.g., "For a fixed arrangement like meeting a friend, 'I am meeting' is more natural than 'I will meet'.").
    4. Praise correct usage of the future forms, explaining why it's correct.
    5. Format your response as a single, friendly HTML paragraph. Use <strong> for highlighting correct phrases and <em> for parts you are suggesting to change.`;

    planFeedback.value = await getAIFeedback(prompt);
}

</script>

<style>
/* Scoped styles can be added here if needed */
</style>
