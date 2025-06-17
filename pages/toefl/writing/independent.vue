<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { useStorage } from '@vueuse/core'; // Import useStorage
import { useGroqClient } from '@/composables/useGroqClient';
import type { 
  AIToeflIndependentFeedback, 
  IndependentWritingPrompt, 
  AIFeedbackCriterion,
  // IndependentWritingDraft // We might not need this specific type if useStorage handles the structure
} from '@/types/toeflWriting';
import MarkdownToolbar from '@/components/writing/MarkdownToolbar.vue';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, AlertCircle, Info, Sparkles, Loader2, Edit2, FileText, Save } from 'lucide-vue-next';

const { generateIndependentWritingPrompts, getIndependentWritingFeedback } = useGroqClient();

const isLoadingPrompts = ref(true);
const isLoadingFeedback = ref(false);
const prompts = ref<IndependentWritingPrompt[]>([]);
const selectedPrompt = ref<IndependentWritingPrompt | null>(null);
// const studentEssay = ref(''); // Replaced by useStorage
const aiFeedback = ref<AIToeflIndependentFeedback | null>(null);
const errorLoadingPrompts = ref<string | null>(null);
const errorLoadingFeedback = ref<string | null>(null);

const essayTextarea = ref<HTMLTextAreaElement | null>(null); // For markdown toolbar

const TARGET_WORDS_MIN = 300;
const TARGET_WORDS_MAX = 350;
const WARNING_WORDS = 250;
const LOCAL_STORAGE_KEY = 'toeflIndependentWritingDraft';

// Reactive storage for the essay
const studentEssay = useStorage(LOCAL_STORAGE_KEY + '_essay', '');
// Reactive storage for the selected prompt ID (optional, can be part of a single draft object)
const storedPromptId = useStorage<string | null>(LOCAL_STORAGE_KEY + '_promptId', null);

const wordCount = computed(() => {
  return studentEssay.value.trim().split(/\s+/).filter(Boolean).length;
});

const handlePromptChange = (promptId: string) => {
  const findPrompt = prompts.value.find(p => p.id === promptId);
  if (findPrompt) {
    selectedPrompt.value = findPrompt;
    studentEssay.value = ''; // Clear essay for new prompt
    storedPromptId.value = findPrompt.id; // Store new prompt ID
    aiFeedback.value = null;
  }
};

// No explicit saveDraft or loadDraft needed with useStorage, it's reactive.
// However, we need to handle initial loading of the prompt based on storedPromptId.

const clearDraft = () => {
  studentEssay.value = '';
  storedPromptId.value = null;
  // Optionally, reset selectedPrompt to the first one or null
  if (prompts.value.length > 0) {
    // selectedPrompt.value = prompts.value[0]; 
  }
  alert('Draft cleared!');
};

onMounted(async () => {
  try {
    isLoadingPrompts.value = true;
    errorLoadingPrompts.value = null;
    prompts.value = await generateIndependentWritingPrompts();
    if (prompts.value.length > 0) {
      if (storedPromptId.value) {
        const previouslySelectedPrompt = prompts.value.find(p => p.id === storedPromptId.value);
        if (previouslySelectedPrompt) {
          selectedPrompt.value = previouslySelectedPrompt;
          // studentEssay.value is already loaded by useStorage
        } else {
          // If stored prompt ID is invalid, clear it and select the first prompt
          storedPromptId.value = null;
          selectedPrompt.value = prompts.value[0];
          studentEssay.value = ''; // Clear essay if prompt was invalid
        }
      } else {
         selectedPrompt.value = prompts.value[0];
         studentEssay.value = ''; // Ensure essay is clear if no draft
      }
    }
  } catch (err: any) {
    console.error("Error fetching Independent Writing prompts:", err);
    errorLoadingPrompts.value = err.message || "Failed to load writing prompts.";
  } finally {
    isLoadingPrompts.value = false;
  }
});

// watch for selectedPrompt changes to update storedPromptId if not already handled by handlePromptChange
watch(selectedPrompt, (newPrompt) => {
  if (newPrompt) {
    storedPromptId.value = newPrompt.id;
  } else {
    storedPromptId.value = null;
  }
});

// studentEssay is automatically saved by useStorage, so no explicit watch needed for saving it.

const handleSubmitEssay = async () => {
  if (!selectedPrompt.value || !studentEssay.value.trim()) {
    errorLoadingFeedback.value = "Please select a prompt and write your essay before submitting.";
    return;
  }
  if (wordCount.value < WARNING_WORDS) {
    if (!confirm(`Your essay is currently ${wordCount.value} words, which is below the recommended minimum of ${TARGET_WORDS_MIN}. Are you sure you want to submit?`)) {
      return;
    }
  }

  isLoadingFeedback.value = true;
  aiFeedback.value = null;
  errorLoadingFeedback.value = null;
  try {
    aiFeedback.value = await getIndependentWritingFeedback(
      selectedPrompt.value.question,
      studentEssay.value
    );
  } catch (err: any) {
    console.error("Error getting AI feedback:", err);
    errorLoadingFeedback.value = err.message || "Failed to get feedback. Please try again.";
  } finally {
    isLoadingFeedback.value = false;
  }
};

const applyMarkdownFormat = (format: 'bold' | 'italic') => {
  const textarea = essayTextarea.value;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = studentEssay.value.substring(start, end);
  let markdownText = '';

  if (format === 'bold') {
    markdownText = `**${selectedText}**`;
  }
  if (format === 'italic') {
    markdownText = `*${selectedText}*`;
  }

  studentEssay.value = 
    studentEssay.value.substring(0, start) + 
    markdownText + 
    studentEssay.value.substring(end);
  
  // Adjust cursor position after insertion
  nextTick(() => {
    textarea.focus();
    textarea.setSelectionRange(start + (format === 'bold' ? 2 : 1), start + (format === 'bold' ? 2 : 1) + selectedText.length);
  });
};

const getAlertVariant = (score: number): 'default' | 'destructive' | 'warning' | 'success' => {
  if (score >= 85) return 'success';
  if (score >= 70) return 'default';
  if (score >= 50) return 'warning';
  return 'destructive';
};

const getIconForVariant = (variant: 'default' | 'destructive' | 'warning' | 'success') => {
  switch (variant) {
    case 'success': return CheckCircle;
    case 'warning': return AlertCircle;
    case 'destructive': return AlertCircle;
    default: return Info;
  }
};

useHead({
  title: 'TOEFL Independent Writing Practice | Akademi Pelajar',
  meta: [
    { name: 'description', content: 'Practice the TOEFL iBT Independent Writing task with various prompts and AI feedback.' }
  ]
});

</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
    <main class="max-w-4xl mx-auto">
      <h1 class="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-6 text-center">TOEFL iBT Independent Writing Task</h1>

      <div v-if="isLoadingPrompts" class="space-y-4 mb-6">
        <Skeleton class="h-10 w-1/2" />
        <Skeleton class="h-24 w-full" />
      </div>
      <div v-else-if="errorLoadingPrompts" class="my-6">
        <Alert variant="destructive">
          <AlertCircle class="h-4 w-4" />
          <AlertTitle>Error Loading Prompts</AlertTitle>
          <AlertDescription>{{ errorLoadingPrompts }}</AlertDescription>
        </Alert>
      </div>
      <template v-else-if="prompts.length > 0">
        <!-- Prompt Selector -->
        <div class="mb-6">
          <Select :defaultValue="selectedPrompt?.id" @update:modelValue="handlePromptChange">
            <SelectTrigger class="w-full md:w-[320px] bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
              <SelectValue placeholder="Select a prompt style..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Prompt Styles</SelectLabel>
                <SelectItem v-for="prompt in prompts" :key="prompt.id" :value="prompt.id">
                  {{ prompt.style }} - {{ prompt.title }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <!-- Question Card -->
        <Card v-if="selectedPrompt" class="shadow-lg rounded-xl mb-6 bg-white dark:bg-slate-800/50">
          <CardHeader>
            <CardTitle class="flex items-center text-xl text-slate-700 dark:text-slate-200">
              <FileText class="w-5 h-5 mr-2 text-blue-500" />
              Essay Prompt: {{ selectedPrompt.title }}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea class="h-auto max-h-[150px] pr-3">
              <p class="text-slate-600 dark:text-slate-300 whitespace-pre-line">{{ selectedPrompt.question }}</p>
            </ScrollArea>
            <p class="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Guidance: Write a well-organized essay of at least {{ TARGET_WORDS_MIN }} words (ideally {{ TARGET_WORDS_MIN }}–{{ TARGET_WORDS_MAX }} words).
            </p>
          </CardContent>
        </Card>

        <!-- Essay Editor -->
        <Card class="shadow-lg rounded-xl mb-6 bg-white dark:bg-slate-800/50">
          <CardHeader>
            <CardTitle class="flex items-center text-xl text-slate-700 dark:text-slate-200">
              <Edit2 class="w-5 h-5 mr-2 text-green-500" />
              Your Essay
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MarkdownToolbar @format="applyMarkdownFormat" />
            <Textarea
              ref="essayTextarea"
              v-model="studentEssay"
              placeholder="Begin your essay here..."
              class="min-h-[300px] md:min-h-[350px] text-base dark:bg-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-600 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <div class="text-sm text-slate-500 dark:text-slate-400 mt-2 flex justify-between items-center">
              <span>Word count: {{ wordCount }}</span>
              <span v-if="wordCount > 0 && wordCount < WARNING_WORDS" class="text-orange-500">
                Keep writing! Aim for at least {{ TARGET_WORDS_MIN }} words.
              </span>
               <span v-else-if="wordCount > TARGET_WORDS_MAX + 50" class="text-red-500">
                Essay is quite long. Consider conciseness.
              </span>
            </div>
            <div class="mt-4 flex flex-col sm:flex-row gap-2">
                <Button @click="handleSubmitEssay" :disabled="isLoadingFeedback || !studentEssay.trim() || !selectedPrompt" class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                  <Loader2 v-if="isLoadingFeedback" class="mr-2 h-4 w-4 animate-spin" />
                  {{ isLoadingFeedback ? 'Evaluating...' : 'Submit Essay for Feedback' }}
                </Button>
                <Button variant="outline" @click="clearDraft" :disabled="!studentEssay.trim() && !storedPromptId" class="w-full sm:w-auto">
                    <Save class="mr-2 h-4 w-4" /> Clear Saved Draft
                </Button>
            </div>
          </CardContent>
        </Card>
      </template>
      <div v-else-if="!isLoadingPrompts && prompts.length === 0" class="my-6">
         <Alert variant="warning">
            <AlertCircle class="h-4 w-4" />
            <AlertTitle>No Prompts Available</AlertTitle>
            <AlertDescription>Could not load any writing prompts. Please try refreshing or check configuration.</AlertDescription>
        </Alert>
      </div>

      <!-- AI Feedback Section -->
      <div v-if="isLoadingFeedback && !aiFeedback" class="flex justify-center items-center p-8">
          <Loader2 class="h-10 w-10 text-blue-500 animate-spin" />
          <p class="ml-3 text-md text-slate-600 dark:text-slate-300">Analyzing your essay...</p>
      </div>
      <div v-if="errorLoadingFeedback" class="my-6">
        <Alert variant="destructive">
          <AlertCircle class="h-4 w-4" />
          <AlertTitle>Feedback Error</AlertTitle>
          <AlertDescription>{{ errorLoadingFeedback }}</AlertDescription>
        </Alert>
      </div>
      <div v-if="aiFeedback && !isLoadingFeedback" class="space-y-5 mt-8 p-4 md:p-6 bg-white dark:bg-slate-800 shadow-xl rounded-xl">
        <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-100 flex items-center">
          <Sparkles class="w-6 h-6 mr-2 text-yellow-500" /> AI Feedback Report
        </h2>
        <Alert :variant="getAlertVariant(aiFeedback.overallScore)" class="border-2">
          <component :is="getIconForVariant(getAlertVariant(aiFeedback.overallScore))" class="h-5 w-5" />
          <AlertTitle class="text-lg font-semibold">Overall Score: {{ aiFeedback.overallScore }} / 100</AlertTitle>
          <AlertDescription class="mt-1">{{ aiFeedback.summary }}</AlertDescription>
        </Alert>
        <div class="grid md:grid-cols-2 gap-4">
          <template v-for="(criterionFeedback, key) in aiFeedback" :key="key">
            <Alert 
              v-if="typeof criterionFeedback === 'object' && criterionFeedback !== null && 'criterion' in criterionFeedback && 'score' in criterionFeedback && 'feedback' in criterionFeedback"
              :variant="getAlertVariant((criterionFeedback as AIFeedbackCriterion).score)"
              class="shadow-md"
            >
              <component :is="getIconForVariant(getAlertVariant((criterionFeedback as AIFeedbackCriterion).score))" class="h-4 w-4" />
              <AlertTitle class="font-medium">{{ (criterionFeedback as AIFeedbackCriterion).criterion }} ({{ (criterionFeedback as AIFeedbackCriterion).score }}/100)</AlertTitle>
              <AlertDescription>
                <p class="mb-1 text-sm">{{ (criterionFeedback as AIFeedbackCriterion).feedback }}</p>
                <ul v-if="(criterionFeedback as AIFeedbackCriterion).suggestions && (criterionFeedback as AIFeedbackCriterion).suggestions!.length > 0" class="list-disc list-inside text-xs space-y-0.5 mt-2">
                  <li v-for="(suggestion, i) in (criterionFeedback as AIFeedbackCriterion).suggestions" :key="i">{{ suggestion }}</li>
                </ul>
              </AlertDescription>
            </Alert>
          </template>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Add any page-specific styles if needed */
.whitespace-pre-line {
  white-space: pre-line;
}
</style>