<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useGroqClient } from '@/composables/useGroqClient';
import type { AIToeflIntegratedFeedback, ToeflIntegratedContent, AIFeedbackCriterion } from '@/types/toeflWriting';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronDown, ChevronUp, BookOpen, Headphones, MessageSquare, CheckCircle, AlertCircle, Info, Sparkles, Loader2 } from 'lucide-vue-next';

// If using @vueuse/motion for Framer Motion
// import { useMotion } from '@vueuse/motion';
// Or import `motion` directly from 'framer-motion' if you prefer to use it as a component
// For simplicity, I'll use a simple CSS transition for fade-in, but you can replace with Framer Motion

const { generateIntegratedWritingContent, getIntegratedWritingFeedback } = useGroqClient();

const isLoadingContent = ref(true);
const isLoadingFeedback = ref(false);
const content = ref<ToeflIntegratedContent | null>(null);
const studentEssay = ref('');
const aiFeedback = ref<AIToeflIntegratedFeedback | null>(null);
const errorLoadingContent = ref<string | null>(null);
const errorLoadingFeedback = ref<string | null>(null);

const MAX_WORDS = 300;

const wordCount = computed(() => {
  return studentEssay.value.trim().split(/\s+/).filter(Boolean).length;
});

const isLectureTranscriptOpen = ref(false);

onMounted(async () => {
  try {
    isLoadingContent.value = true;
    errorLoadingContent.value = null;
    content.value = await generateIntegratedWritingContent();
  } catch (err: any) {
    console.error("Error fetching Integrated Writing content:", err);
    errorLoadingContent.value = err.message || "Failed to load writing task content. Please try refreshing the page.";
    // Use placeholder content on error to allow UI to render
    if (!content.value) {
        content.value = {
            readingPassageTitle: "Error Loading Title",
            readingPassageText: "Could not load reading passage. Please check your connection or API key configuration.",
            lectureAudioSrc: '',
            lectureTranscript: "Could not load lecture transcript.",
            writingPrompt: "Summarize the points made in the lecture, and explain how they relate to specific points in the reading."
        };
    }
  } finally {
    isLoadingContent.value = false;
  }
});

const handleSubmitDraft = async () => {
  if (!content.value || !studentEssay.value.trim()) {
    errorLoadingFeedback.value = "Please write your essay before submitting.";
    return;
  }
  isLoadingFeedback.value = true;
  aiFeedback.value = null;
  errorLoadingFeedback.value = null;
  try {
    aiFeedback.value = await getIntegratedWritingFeedback(
      content.value.readingPassageText,
      content.value.lectureTranscript,
      studentEssay.value
    );
  } catch (err: any) {
    console.error("Error getting AI feedback:", err);
    errorLoadingFeedback.value = err.message || "Failed to get feedback. Please try again.";
  } finally {
    isLoadingFeedback.value = false;
  }
};

const getAlertVariant = (score: number): 'default' | 'destructive' | 'warning' | 'success' => {
  if (score >= 85) return 'success';
  if (score >= 70) return 'default'; // Or 'info' if you have such a variant
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

// Simple fade-in effect (can be replaced with Framer Motion)
const pageLoaded = ref(false);
onMounted(() => {
  setTimeout(() => pageLoaded.value = true, 100); // Delay for transition
});

useHead({
  title: 'TOEFL Integrated Writing Practice | Akademi Pelajar',
  meta: [
    { name: 'description', content: 'Practice the TOEFL iBT Integrated Writing task with AI-generated content and feedback.' }
  ]
});

</script>

<template>
  <div :class="['min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8 transition-opacity duration-500', pageLoaded ? 'opacity-100' : 'opacity-0']">
    <!-- Assuming a default layout provides Header and Sidebar -->
    <!-- <DefaultLayout> <template #header>...</template> <template #sidebar>...</template> -->
    <main class="max-w-7xl mx-auto">
      <h1 class="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-8 text-center">TOEFL iBT Integrated Writing Task</h1>

      <div v-if="isLoadingContent" class="space-y-6">
        <Skeleton class="h-12 w-3/4 mx-auto" />
        <div class="grid md:grid-cols-2 gap-6">
          <Skeleton class="h-96 rounded-2xl" />
          <Skeleton class="h-96 rounded-2xl" />
        </div>
        <Skeleton class="h-10 w-1/2 mx-auto" />
        <Skeleton class="h-40 w-full rounded-lg" />
      </div>
      
      <div v-else-if="errorLoadingContent" class="my-8">
        <Alert variant="destructive">
          <AlertCircle class="h-4 w-4" />
          <AlertTitle>Error Loading Content</AlertTitle>
          <AlertDescription>{{ errorLoadingContent }}</AlertDescription>
        </Alert>
      </div>

      <div v-else-if="content" class="space-y-8">
        <div class="grid md:grid-cols-2 gap-6 lg:gap-8 items-start">
          <!-- Reading Passage Card -->
          <Card class="shadow-lg rounded-2xl p-0 flex flex-col h-full max-h-[70vh] md:max-h-[80vh]">
            <CardHeader class="p-4 border-b dark:border-slate-700">
              <CardTitle class="flex items-center text-xl md:text-2xl text-slate-700 dark:text-slate-200">
                <BookOpen class="w-6 h-6 mr-3 text-blue-500" />
                {{ content.readingPassageTitle }}
              </CardTitle>
            </CardHeader>
            <CardContent class="p-4 flex-grow overflow-hidden">
              <ScrollArea class="h-full max-h-[calc(70vh-100px)] md:max-h-[calc(80vh-120px)] pr-3">
                <article class="prose prose-sm sm:prose-base dark:prose-invert max-w-none" v-html="content.readingPassageText"></article>
              </ScrollArea>
            </CardContent>
          </Card>

          <!-- Lecture Card -->
          <Card class="shadow-lg rounded-2xl p-0 flex flex-col h-full max-h-[70vh] md:max-h-[80vh]">
            <CardHeader class="p-4 border-b dark:border-slate-700">
              <CardTitle class="flex items-center text-xl md:text-2xl text-slate-700 dark:text-slate-200">
                <Headphones class="w-6 h-6 mr-3 text-green-500" />
                Lecture
              </CardTitle>
            </CardHeader>
            <CardContent class="p-4 flex-grow flex flex-col">
              <div v-if="content.lectureAudioSrc">
                <audio controls class="w-full mb-4 rounded-md">
                  <source :src="content.lectureAudioSrc" type="audio/mpeg">
                  Your browser does not support the audio element.
                </audio>
              </div>
              <div v-else class="mb-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-md text-sm text-slate-600 dark:text-slate-300">
                <Info class="inline h-4 w-4 mr-1"/> Audio player will appear here. For now, please use the transcript.
              </div>
              
              <Collapsible v-model:open="isLectureTranscriptOpen">
                <CollapsibleTrigger as-child>
                  <Button variant="outline" class="w-full justify-between mb-2">
                    <span>{{ isLectureTranscriptOpen ? 'Hide' : 'Show' }} Lecture Transcript</span>
                    <component :is="isLectureTranscriptOpen ? ChevronUp : ChevronDown" class="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent class="flex-grow overflow-hidden">
                  <ScrollArea class="h-full max-h-[calc(70vh-200px)] md:max-h-[calc(80vh-220px)] pr-3">
                     <article class="prose prose-sm sm:prose-base dark:prose-invert max-w-none" v-html="content.lectureTranscript"></article>
                  </ScrollArea>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </div>

        <!-- Question and Textarea Section -->
        <Card class="shadow-lg rounded-2xl p-4 md:p-6">
          <CardHeader class="p-0 pb-4">
            <CardTitle class="flex items-center text-xl md:text-2xl text-slate-700 dark:text-slate-200">
              <MessageSquare class="w-6 h-6 mr-3 text-purple-500" />
              Your Task
            </CardTitle>
          </CardHeader>
          <CardContent class="p-0">
            <p class="mb-4 text-slate-600 dark:text-slate-300">{{ content.writingPrompt }}</p>
            <Textarea
              v-model="studentEssay"
              placeholder="Start writing your response here... (Recommended 230-300 words)"
              class="min-h-[200px] md:min-h-[250px] text-base dark:bg-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-600 focus:ring-blue-500 dark:focus:ring-blue-400"
              :maxlength="MAX_WORDS * 7"
            />
            <div class="text-sm text-slate-500 dark:text-slate-400 mt-2 flex justify-between">
              <span>Word count: {{ wordCount }} / ~{{ MAX_WORDS }}</span>
              <span v-if="wordCount > MAX_WORDS" class="text-red-500">Exceeding recommended word count.</span>
            </div>
            <Button @click="handleSubmitDraft" :disabled="isLoadingFeedback || !studentEssay.trim()" class="mt-6 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              <Loader2 v-if="isLoadingFeedback" class="mr-2 h-4 w-4 animate-spin" />
              {{ isLoadingFeedback ? 'Evaluating...' : 'Submit Draft for Feedback' }}
            </Button>
          </CardContent>
        </Card>

        <!-- AI Feedback Section -->
        <div v-if="isLoadingFeedback && !aiFeedback" class="flex justify-center items-center p-8">
            <Loader2 class="h-12 w-12 text-blue-500 animate-spin" />
            <p class="ml-4 text-lg text-slate-600 dark:text-slate-300">Getting your feedback...</p>
        </div>

        <div v-if="errorLoadingFeedback" class="my-6">
          <Alert variant="destructive">
            <AlertCircle class="h-4 w-4" />
            <AlertTitle>Feedback Error</AlertTitle>
            <AlertDescription>{{ errorLoadingFeedback }}</AlertDescription>
          </Alert>
        </div>

        <div v-if="aiFeedback && !isLoadingFeedback" class="space-y-6 mt-8 p-4 md:p-6 bg-white dark:bg-slate-800 shadow-xl rounded-2xl">
          <h2 class="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-100 flex items-center">
            <Sparkles class="w-7 h-7 mr-3 text-yellow-500" /> AI Feedback Report
          </h2>
          
          <Alert :variant="getAlertVariant(aiFeedback.overallScore)" class="border-2">
            <component :is="getIconForVariant(getAlertVariant(aiFeedback.overallScore))" class="h-5 w-5" />
            <AlertTitle class="text-lg font-semibold">Overall Score: {{ aiFeedback.overallScore }} / 100</AlertTitle>
            <AlertDescription class="mt-1">{{ aiFeedback.summary }}</AlertDescription>
          </Alert>

          <div class="grid md:grid-cols-2 gap-4 lg:gap-6">
            <template v-for="(criterionFeedback, key) in aiFeedback" :key="key">
              <Alert 
                v-if="typeof criterionFeedback === 'object' && criterionFeedback !== null && 'criterion' in criterionFeedback && 'score' in criterionFeedback && 'feedback' in criterionFeedback"
                :variant="getAlertVariant((criterionFeedback as AIFeedbackCriterion).score)"
                class="shadow-md"
              >
                <component :is="getIconForVariant(getAlertVariant((criterionFeedback as AIFeedbackCriterion).score))" class="h-4 w-4" />
                <AlertTitle class="font-medium">{{ (criterionFeedback as AIFeedbackCriterion).criterion }} ({{ (criterionFeedback as AIFeedbackCriterion).score }}/100)</AlertTitle>
                <AlertDescription>
                  <p class="mb-1">{{ (criterionFeedback as AIFeedbackCriterion).feedback }}</p>
                  <ul v-if="(criterionFeedback as AIFeedbackCriterion).suggestions && (criterionFeedback as AIFeedbackCriterion).suggestions!.length > 0" class="list-disc list-inside text-xs space-y-0.5 mt-2">
                    <li v-for="(suggestion, i) in (criterionFeedback as AIFeedbackCriterion).suggestions" :key="i">{{ suggestion }}</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </template>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Ensure prose styles apply correctly if not globally configured */
.prose :where(code):not(:where([class~=\"not-prose\"] *))::before {
  content: ""; 
}
.prose :where(code):not(:where([class~=\"not-prose\"] *))::after {
  content: "";
}

/* For simple fade-in, can be replaced by Framer Motion */
.opacity-0 {
  opacity: 0;
}
.opacity-100 {
  opacity: 1;
}
.transition-opacity {
  transition-property: opacity;
}
.duration-500 {
  transition-duration: 500ms;
}

/* Custom scrollbar for webkit browsers */
.prose-scroll::-webkit-scrollbar {
  width: 8px;
}
.prose-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.prose-scroll::-webkit-scrollbar-thumb {
  background-color: hsl(var(--border));
  border-radius: 10px;
  border: 2px solid hsl(var(--background));
}

.prose-scroll {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--border)) hsl(var(--background));
}

/* Ensure audio player is responsive and styled minimally */
audio {
  border-radius: 0.375rem; /* rounded-md */
  border: 1px solid hsl(var(--border));
}
</style>