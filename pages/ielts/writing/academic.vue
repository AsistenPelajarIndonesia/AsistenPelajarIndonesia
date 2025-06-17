<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useStorage } from '@vueuse/core';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import RichTextToolbar from '@/components/writing/academic/RichTextToolbar.vue';
import { useGroqClient, type IeltsWritingFeedback, type IeltsWritingCriterionScore } from '@/composables/useGroqClient';

// Define layout (can be set in <NuxtLayout> in app.vue or here if specific)
// definePageMeta({
//   layout: 'dashboard', // Assuming you have a 'dashboard' layout with Header + Sidebar
// });

const { getIeltsWritingFeedback } = useGroqClient();

const activeTab = ref('task1');

// --- Task 1: Data Description ---
const task1Draft = useStorage('ielts-academic-task1-draft', '');
const task1WordCount = computed(() => task1Draft.value.trim().split(/\s+/).filter(Boolean).length);
const task1CharCount = computed(() => task1Draft.value.length);
const task1Feedback = ref<IeltsWritingFeedback | null>(null);
const task1IsLoading = ref(false);
const task1Error = ref<string | null>(null);

const task1ChartPlaceholder = `
  <svg width="100%" height="300" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#f0f0f0" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="#888">
      Dynamic Chart/Diagram Placeholder
    </text>
    <line x1="50" y1="250" x2="750" y2="250" stroke="#ccc" stroke-width="2" />
    <line x1="50" y1="50" x2="50" y2="250" stroke="#ccc" stroke-width="2" />
    <polyline points="50,200 150,150 250,180 350,120 450,160 550,100 650,130 750,80" fill="none" stroke="#60a5fa" stroke-width="3" />
  </svg>
`;
const task1PromptText = "Summarize the information by selecting and reporting main features, and make comparisons where relevant.";

async function submitTask1() {
  if (!task1Draft.value.trim()) {
    task1Error.value = "Please write a response before submitting.";
    return;
  }
  task1IsLoading.value = true;
  task1Error.value = null;
  task1Feedback.value = null;
  try {
    // For Task 1, the 'prompt' sent to AI is the description of the visual data.
    // Here, we'll use a generic placeholder for the data description.
    // In a real scenario, this would be the actual data/chart description.
    const dataDescriptionForAI = "The provided chart illustrates changes in [describe data, e.g., internet usage] between [year X] and [year Y] in [country/countries]. Overall, [main trend]. Specifically, [detail 1] while [detail 2].";
    task1Feedback.value = await getIeltsWritingFeedback('Task 1', dataDescriptionForAI, task1Draft.value);
  } catch (err: any) {
    task1Error.value = err.message || "An error occurred while fetching feedback.";
  } finally {
    task1IsLoading.value = false;
  }
}

// --- Task 2: Academic Essay ---
const essayPrompts = [
  { id: 'agree-disagree', style: 'Agree/Disagree', text: '"Technology has made people more isolated than ever before." To what extent do you agree or disagree?' },
  { id: 'discuss-both-views', style: 'Discuss Both Views', text: 'Some people believe that university education should be free for all students, while others argue that students should pay tuition fees. Discuss both these views and give your own opinion.' },
  { id: 'advantages-disadvantages', style: 'Advantages/Disadvantages', text: 'In many countries, the amount of time people spend watching television is increasing. What are the advantages and disadvantages of television for individuals and society?' },
  { id: 'problem-solution', style: 'Problem/Solution', text: 'Traffic congestion in major cities is a growing problem. What are the main causes of this issue, and what measures can be taken to address it?' },
  { id: 'direct-question', style: 'Direct Question', text: 'Many people believe that zoos have no useful purpose and should be closed. What is your opinion on this issue? Give reasons for your answer and include any relevant examples from your own knowledge or experience.' },
];
const selectedPromptId = useStorage('ielts-academic-task2-prompt-id', essayPrompts[0].id);
const task2Draft = useStorage('ielts-academic-task2-draft', '');
const task2WordCount = computed(() => task2Draft.value.trim().split(/\s+/).filter(Boolean).length);
const task2Feedback = ref<IeltsWritingFeedback | null>(null);
const task2IsLoading = ref(false);
const task2Error = ref<string | null>(null);

const currentEssayPrompt = computed(() => essayPrompts.find(p => p.id === selectedPromptId.value) || essayPrompts[0]);

function handleFormatCommand(command: 'bold' | 'italic' | 'underline') {
  const textarea = document.getElementById('task2Textarea') as HTMLTextAreaElement;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = task2Draft.value.substring(start, end);
  let replacement = selectedText;

  switch (command) {
    case 'bold':
      replacement = `**${selectedText}**`;
      break;
    case 'italic':
      replacement = `*${selectedText}*`;
      break;
    case 'underline': // Markdown doesn't have a standard underline, using HTML <u> for rich text effect
      replacement = `<u>${selectedText}</u>`; // This won't render as underline in plain markdown but shows intent
      break;
  }
  task2Draft.value = task2Draft.value.substring(0, start) + replacement + task2Draft.value.substring(end);
  // Adjust cursor position after replacement
  textarea.focus();
  textarea.setSelectionRange(start + (replacement.length - selectedText.length), start + (replacement.length - selectedText.length));
}

async function submitTask2() {
  if (!task2Draft.value.trim()) {
    task2Error.value = "Please write an essay before submitting.";
    return;
  }
  task2IsLoading.value = true;
  task2Error.value = null;
  task2Feedback.value = null;
  try {
    task2Feedback.value = await getIeltsWritingFeedback('Task 2', currentEssayPrompt.value.text, task2Draft.value);
  } catch (err: any) {
    task2Error.value = err.message || "An error occurred while fetching feedback.";
  } finally {
    task2IsLoading.value = false;
  }
}

// --- General UX ---
onMounted(() => {
  // Drafts are loaded automatically by useStorage
});

const getAlertVariant = (score: number): 'default' | 'destructive' | 'warning' | 'success' => {
  if (score >= 7.5) return 'success';
  if (score >= 6.0) return 'default'; // Or 'warning' for 6.0-6.5
  if (score >= 5.0) return 'warning';
  return 'destructive';
};

const feedbackCriteriaToArray = (feedback: IeltsWritingFeedback | null): IeltsWritingCriterionScore[] => {
  if (!feedback) return [];
  return [
    feedback.taskAchievement,
    feedback.coherenceAndCohesion,
    feedback.lexicalResource,
    feedback.grammaticalRangeAndAccuracy
  ].filter(Boolean) as IeltsWritingCriterionScore[];
};

</script>

<template>
  <div class="container mx-auto p-4 md:p-8">
    <h1 class="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">IELTS Academic Writing Practice</h1>

    <Tabs v-model="activeTab" default-value="task1" class="w-full">
      <TabsList class="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="task1">Task 1: Data Description</TabsTrigger>
        <TabsTrigger value="task2">Task 2: Academic Essay</TabsTrigger>
      </TabsList>

      <!-- Task 1 Content -->
      <ClientOnly>
        <TabsContent value="task1">
          <Card class="shadow-lg rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle class="text-2xl">Task 1: Report Writing</CardTitle>
              <CardDescription>You should spend about 20 minutes on this task. Write at least 150 words.</CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
              <div class="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                <h3 class="font-semibold mb-2 text-gray-700 dark:text-gray-300">Chart/Diagram:</h3>
                <div v-html="task1ChartPlaceholder" class="w-full h-auto"></div>
              </div>
              <p class="text-gray-700 dark:text-gray-300">{{ task1PromptText }}</p>
              
              <div>
                <Textarea 
                  id="task1Textarea"
                  v-model="task1Draft" 
                  placeholder="Start writing your report here..."
                  class="min-h-[200px] text-base p-3 border-gray-300 dark:border-gray-600 focus:ring-primary focus:border-primary rounded-lg shadow-sm"
                  :maxlength="300" /> <!-- Soft limit, actual check is on word count -->
                <div class="text-sm mt-2 flex justify-between items-center" 
                     :class="{'text-red-600 dark:text-red-400': task1WordCount > 150 && task1WordCount < 160 || task1WordCount > 140, 'text-gray-500 dark:text-gray-400': task1WordCount <= 140}">
                  <span>Word count: {{ task1WordCount }} / 150</span>
                  <span v-if="task1WordCount > 140 && task1WordCount <= 150" class="text-yellow-600 dark:text-yellow-400">Approaching 150 word minimum!</span>
                  <span v-if="task1WordCount > 150" class="text-green-600 dark:text-green-400">Minimum met. Aim for conciseness.</span>
                </div>
              </div>

              <Button @click="submitTask1" :disabled="task1IsLoading || task1WordCount < 150" class="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-150">
                {{ task1IsLoading ? 'Getting Feedback...' : 'Submit for Feedback' }}
              </Button>

              <div v-if="task1Error" class="mt-4">
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{{ task1Error }}</AlertDescription>
                </Alert>
              </div>

              <div v-if="task1Feedback && !task1IsLoading" class="mt-6 space-y-4">
                <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-100">Feedback Report:</h3>
                <Alert :variant="getAlertVariant(task1Feedback.overallBandScore)" class="shadow-sm rounded-lg">
                  <AlertTitle class="font-bold text-lg">Overall Band Score: {{ task1Feedback.overallBandScore }}</AlertTitle>
                  <AlertDescription>{{ task1Feedback.summary }}</AlertDescription>
                </Alert>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Alert v-for="criterion in feedbackCriteriaToArray(task1Feedback)" :key="criterion.criterion" :variant="getAlertVariant(criterion.score)" class="rounded-lg">
                    <AlertTitle class="font-semibold">{{ criterion.criterion }}: {{ criterion.score }}/9</AlertTitle>
                    <AlertDescription>
                      <p class="mb-1">{{ criterion.feedback }}</p>
                      <ul v-if="criterion.suggestions && criterion.suggestions.length" class="list-disc list-inside text-sm space-y-0.5">
                        <li v-for="(suggestion, i) in criterion.suggestions" :key="i">{{ suggestion }}</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </ClientOnly>

      <!-- Task 2 Content -->
      <ClientOnly>
        <TabsContent value="task2">
          <Card class="shadow-lg rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle class="text-2xl">Task 2: Academic Essay</CardTitle>
              <CardDescription>You should spend about 40 minutes on this task. Write at least 250 words.</CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
              <div>
                <label for="essayPromptSelect" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Essay Prompt:</label>
                <Select v-model="selectedPromptId">
                  <SelectTrigger id="essayPromptSelect" class="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
                    <SelectValue placeholder="Select an essay prompt" />
                  </SelectTrigger>
                  <SelectContent class="bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                    <SelectGroup>
                      <SelectLabel class="text-gray-500 dark:text-gray-400">Essay Prompts</SelectLabel>
                      <SelectItem v-for="prompt in essayPrompts" :key="prompt.id" :value="prompt.id" class="hover:bg-gray-100 dark:hover:bg-gray-600 focus:bg-primary/10 dark:focus:bg-primary/20">
                        {{ prompt.style }}: {{ prompt.text.substring(0, 70) }}...
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <CardDescription class="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p class="font-semibold text-gray-700 dark:text-gray-300">Current Prompt:</p>
                  <p class="text-gray-600 dark:text-gray-400">{{ currentEssayPrompt.text }}</p>
                </CardDescription>
              </div>

              <p class="text-gray-700 dark:text-gray-300">Write a {{ currentEssayPrompt.style === 'Direct Question' ? 'response' : '250-word argumentative essay' }} to the prompt above.</p>
              
              <div>
                <RichTextToolbar @format="handleFormatCommand" class="mb-0.5 rounded-t-lg"/>
                <Textarea 
                  id="task2Textarea"
                  v-model="task2Draft" 
                  placeholder="Start writing your essay here..."
                  class="min-h-[300px] text-base p-3 border-gray-300 dark:border-gray-600 focus:ring-primary focus:border-primary rounded-b-lg shadow-sm rounded-t-none"
                  :maxlength="600" /> <!-- Soft limit -->
                <div class="text-sm mt-2 flex justify-between items-center"
                     :class="{'text-red-600 dark:text-red-400': task2WordCount > 250 && task2WordCount < 260 || task2WordCount > 230, 'text-gray-500 dark:text-gray-400': task2WordCount <= 230}">
                  <span>Word count: {{ task2WordCount }} / 250</span>
                  <span v-if="task2WordCount > 230 && task2WordCount <= 250" class="text-yellow-600 dark:text-yellow-400">Approaching 250 word minimum!</span>
                  <span v-if="task2WordCount > 250" class="text-green-600 dark:text-green-400">Minimum met. Ensure all points are well-developed.</span>
                </div>
              </div>

              <Button @click="submitTask2" :disabled="task2IsLoading || task2WordCount < 250" class="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-150">
                {{ task2IsLoading ? 'Getting Feedback...' : 'Submit Essay for Feedback' }}
              </Button>

              <div v-if="task2Error" class="mt-4">
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{{ task2Error }}</AlertDescription>
                </Alert>
              </div>

              <div v-if="task2Feedback && !task2IsLoading" class="mt-6 space-y-4">
                <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-100">Feedback Report:</h3>
                <Alert :variant="getAlertVariant(task2Feedback.overallBandScore)" class="shadow-sm rounded-lg">
                  <AlertTitle class="font-bold text-lg">Overall Band Score: {{ task2Feedback.overallBandScore }}</AlertTitle>
                  <AlertDescription>{{ task2Feedback.summary }}</AlertDescription>
                </Alert>
                <Accordion type="single" collapsible class="w-full">
                  <AccordionItem v-for="criterion in feedbackCriteriaToArray(task2Feedback)" :key="criterion.criterion" :value="criterion.criterion" class="border-b-0">
                     <AccordionTrigger :class="[
                        'flex items-center justify-between w-full p-4 font-medium text-left transition-all hover:bg-muted/50 rounded-lg',
                        criterion.score >= 7.5 ? 'bg-green-100 dark:bg-green-900/50 hover:bg-green-200/80 dark:hover:bg-green-800/70' :
                        criterion.score >= 6.0 ? 'bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200/80 dark:hover:bg-blue-800/70' :
                        criterion.score >= 5.0 ? 'bg-yellow-100 dark:bg-yellow-900/50 hover:bg-yellow-200/80 dark:hover:bg-yellow-800/70' :
                        'bg-red-100 dark:bg-red-900/50 hover:bg-red-200/80 dark:hover:bg-red-800/70'
                      ]">
                      {{ criterion.criterion }}: {{ criterion.score }}/9
                    </AccordionTrigger>
                    <AccordionContent class="p-4 pt-2 text-sm bg-white dark:bg-gray-800 rounded-b-lg shadow-inner">
                      <p class="mb-2 font-semibold">Feedback:</p>
                      <p class="mb-3">{{ criterion.feedback }}</p>
                      <div v-if="criterion.suggestions && criterion.suggestions.length">
                        <p class="mb-1 font-semibold">Suggestions for Improvement:</p>
                        <ul class="list-disc list-inside space-y-1">
                          <li v-for="(suggestion, i) in criterion.suggestions" :key="i">{{ suggestion }}</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </ClientOnly>
    </Tabs>
  </div>
</template>

<style scoped>
/* Basic transition for tab content */
.tabs-content-enter-active,
.tabs-content-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}
.tabs-content-enter-from,
.tabs-content-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Ensure ClientOnly content is not display:none initially if transitions are desired */
[data-v-app] [value="task1"]:not([data-state="active"]),
[data-v-app] [value="task2"]:not([data-state="active"]) {
  /* display: none; */ /* Default Shadcn behavior, override if using custom transitions */
}
</style>