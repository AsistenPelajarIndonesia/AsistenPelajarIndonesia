<template>
  <div class="container py-8 mx-auto">
    <h1 class="mb-6 text-3xl font-bold">IELTS General Training Writing Practice</h1>

    <Tabs default-value="task1" class="w-full">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="task1">Task 1: Letter Writing</TabsTrigger>
        <TabsTrigger value="task2">Task 2: General Essay</TabsTrigger>
      </TabsList>

      <TabsContent value="task1" class="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Task 1: Letter Writing</CardTitle>
            <CardDescription>Write a letter based on the situation below. Write at least 150 words.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="p-4 border rounded-md bg-muted">
              <p class="mb-2 font-semibold">Letter Prompt:</p>
              <p class="mb-1">{{ currentLetterPrompt.situation }}</p>
              <ul class="pl-5 list-disc">
                <li v-for="(point, index) in currentLetterPrompt.bulletPoints" :key="index">{{ point }}</li>
              </ul>
            </div>

            <div>
              <Label for="letterStyle">Select Letter Style:</Label>
              <RadioGroup v-model="task1Data.selectedStyle" id="letterStyle" class="flex mt-2 space-x-4">
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="formal" value="Formal" />
                  <Label for="formal">Formal</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="semi-formal" value="Semi-Formal" />
                  <Label for="semi-formal">Semi-Formal</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="informal" value="Informal" />
                  <Label for="informal">Informal</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label for="task1Textarea">Your Letter:</Label>
              <Textarea 
                id="task1Textarea" 
                v-model="task1Data.draft" 
                placeholder="Begin your letter here..." 
                class="mt-1 min-h-[200px]"
                :maxlength="task1WordLimit + 20" />
              <div class="flex items-center justify-between mt-1 text-sm">
                <p :class="{'text-destructive': task1WordCount >= task1WordWarningLimit}">
                  Word Count: {{ task1WordCount }} / {{ task1WordLimit }}
                  <span v-if="task1WordCount >= task1WordWarningLimit && task1WordCount < task1WordLimit" class="ml-2 text-orange-500">(Approaching limit)</span>
                  <span v-if="task1WordCount < 150" class="ml-2 text-destructive">(Minimum 150 words)</span>
                </p>
              </div>
            </div>

            <Button @click="submitTask1Letter" :disabled="isLoadingTask1 || task1WordCount < 150">
              <Loader2 v-if="isLoadingTask1" class="w-4 h-4 mr-2 animate-spin" />
              Submit Letter for Feedback
            </Button>

            <div v-if="task1Feedback && !isLoadingTask1" class="mt-6 space-y-4">
              <h3 class="text-xl font-semibold">Feedback:</h3>
              <Alert :variant="task1Feedback.overallBandScore >= 7 ? 'default' : 'destructive'">
                <AlertTitle>Overall Band Score: {{ task1Feedback.overallBandScore }}</AlertTitle>
                <AlertDescription>{{ task1Feedback.summary }}</AlertDescription>
              </Alert>
              <Accordion type="single" collapsible class="w-full">
                <AccordionItem v-for="(criterion, key) in task1FeedbackCriteria" :key="key" :value="key">
                  <AccordionTrigger>{{ criterion.criterion }} - Score: {{ criterion.score }}/9</AccordionTrigger>
                  <AccordionContent>
                    <p class="mb-2">{{ criterion.feedback }}</p>
                    <ul v-if="criterion.suggestions && criterion.suggestions.length" class="pl-5 list-disc">
                      <li v-for="(suggestion, i) in criterion.suggestions" :key="i">{{ suggestion }}</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
             <div v-if="task1Error" class="mt-4">
                <Alert variant="destructive">
                    <AlertCircle class="w-4 h-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{{ task1Error }}</AlertDescription>
                </Alert>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="task2" class="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Task 2: General Essay</CardTitle>
            <CardDescription>Write an essay on the topic below. Write at least 250 words.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div>
              <Label for="essayPrompt">Select Essay Prompt:</Label>
              <Select v-model="task2Data.selectedPromptId">
                <SelectTrigger id="essayPrompt">
                  <SelectValue placeholder="Select a prompt style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="prompt in essayPrompts" :key="prompt.id" :value="prompt.id">
                    {{ prompt.style }} - {{ prompt.title }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <div v-if="currentEssayPrompt" class="p-4 mt-2 border rounded-md bg-muted">
                <p class="font-semibold">{{ currentEssayPrompt.title }}</p>
                <p>{{ currentEssayPrompt.question }}</p>
              </div>
            </div>
            
            <div>
              <Label for="task2Textarea">Your Essay:</Label>
              <RichTextToolbar @format="applyFormatToTask2" class="mb-1" />
              <Textarea 
                id="task2Textarea" 
                ref="task2TextareaRef" 
                v-model="task2Data.draft" 
                placeholder="Begin your essay here... You can use markdown for basic formatting." 
                class="mt-1 min-h-[300px]"
                :maxlength="task2WordLimit + 50" />
              <div class="flex items-center justify-between mt-1 text-sm">
                 <p :class="{'text-destructive': task2WordCount >= task2WordWarningLimit}">
                  Word Count: {{ task2WordCount }} / {{ task2WordLimit }}
                  <span v-if="task2WordCount >= task2WordWarningLimit && task2WordCount < task2WordLimit" class="ml-2 text-orange-500">(Approaching limit)</span>
                  <span v-if="task2WordCount < 250" class="ml-2 text-destructive">(Minimum 250 words)</span>
                </p>
              </div>
            </div>

            <Button @click="submitTask2Essay" :disabled="isLoadingTask2 || !task2Data.selectedPromptId || task2WordCount < 250">
              <Loader2 v-if="isLoadingTask2" class="w-4 h-4 mr-2 animate-spin" />
              Submit Essay for Feedback
            </Button>

            <div v-if="task2Feedback && !isLoadingTask2" class="mt-6 space-y-4">
              <h3 class="text-xl font-semibold">Feedback:</h3>
               <Alert :variant="task2Feedback.overallBandScore >= 7 ? 'default' : 'destructive'">
                <AlertTitle>Overall Band Score: {{ task2Feedback.overallBandScore }}</AlertTitle>
                <AlertDescription>{{ task2Feedback.summary }}</AlertDescription>
              </Alert>
              <Collapsible class="w-full space-y-2">
                <CollapsibleTrigger as-child>
                    <Button variant="outline" class="w-full">
                        Show Detailed Feedback & Tips <ChevronDown class="w-4 h-4 ml-2" />
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent class="p-4 border rounded-md">
                    <Accordion type="single" collapsible class="w-full">
                        <AccordionItem v-for="(criterion, key) in task2FeedbackCriteria" :key="key" :value="key">
                        <AccordionTrigger>{{ criterion.criterion }} - Score: {{ criterion.score }}/9</AccordionTrigger>
                        <AccordionContent>
                            <p class="mb-2">{{ criterion.feedback }}</p>
                            <ul v-if="criterion.suggestions && criterion.suggestions.length" class="pl-5 list-disc">
                            <li v-for="(suggestion, i) in criterion.suggestions" :key="i">{{ suggestion }}</li>
                            </ul>
                        </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <div v-if="task2ActionableTips.length" class="mt-4">
                        <h4 class="font-semibold">Actionable Tips:</h4>
                        <ul class="pl-5 list-disc">
                            <li v-for="(tip, i) in task2ActionableTips" :key="i">{{ tip }}</li>
                        </ul>
                    </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            <div v-if="task2Error" class="mt-4">
                <Alert variant="destructive">
                    <AlertCircle class="w-4 h-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{{ task2Error }}</AlertDescription>
                </Alert>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useStorage } from '@vueuse/core';
import { Loader2, AlertCircle, ChevronDown } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RichTextToolbar from '@/components/writing/general/RichTextToolbar.vue'; // Path to the new component
// MODIFIED: Import predefinedIndependentPrompts directly
import { useGroqClient, type IeltsGeneralLetterFeedback, type IeltsWritingFeedback, type IeltsWritingCriterionScore } from '@/composables/useGroqClient'; // Adjusted import
import type {
  IndependentWritingPrompt, 
  // IndependentPromptStyle, // Not used directly here, can be removed if not needed elsewhere from this import
} from '@/types/toeflWriting';
// Define layout if not using a global one with Header/Sidebar
// definePageMeta({
//   layout: 'dashboard', // Assuming you have a layout named 'dashboard'
// });
  const predefinedIndependentPrompts: IndependentWritingPrompt[] = [
    {
      id: 'agree-disagree-1',
      style: 'Agree/Disagree',
      title: 'Education: Standardized Testing',
      question: '"Standardized tests are the most effective way to measure a student\'s academic abilities and potential for future success." Do you agree or disagree with this statement? Use specific reasons and examples to support your position. Ensure your essay is at least 300 words long and presents a well-reasoned argument.'
    },
    {
      id: 'preference-1',
      style: 'Preference',
      title: 'Lifestyle: Urban vs. Rural Living',
      question: 'Some people prefer to live in large, bustling cities, while others prefer the tranquility of rural areas. Which do you prefer and why? Discuss the advantages of your preferred living environment and explain why it suits you better than the alternative. Provide specific examples and details in your response of at least 300 words.'
    },
    {
      id: 'problem-solution-1',
      style: 'Problem-Solution',
      title: 'Environment: Plastic Pollution',
      question: 'Plastic pollution in oceans and landfills is a significant global environmental problem. What do you believe are the primary causes of this issue, and what are some feasible solutions that individuals, communities, and governments can implement to mitigate it? Develop your ideas with specific examples in an essay of at least 300 words.'
    },
    {
      id: 'advantage-disadvantage-1',
      style: 'Advantage-Disadvantage',
      title: 'Technology: Social Media Impact',
      question: 'Social media platforms have become integral to modern communication. Discuss the main advantages and disadvantages of the widespread use of social media on individuals and society. Which do you think outweighs the other and why? Support your discussion with concrete examples in an essay of at least 300 words.'
    },
    {
      id: 'describe-explain-1',
      style: 'Describe & Explain',
      title: 'Culture: Importance of Arts',
      question: 'Describe a piece of art (e.g., a painting, a song, a book, a film) that has had a significant impact on you. Explain why it is meaningful to you and what broader insights or understanding it has provided. Ensure your essay is at least 300 words and clearly conveys your personal connection and reflections.'
    }
  ];

// MODIFIED: Remove predefinedIndependentPrompts from destructuring here
const { getIeltsGeneralLetterFeedback, getIeltsWritingFeedback } = useGroqClient();

// --- Task 1: Letter Writing --- 
const task1WordLimit = 150;
const task1WordWarningLimit = 140;

interface LetterPrompt {
  id: string;
  situation: string;
  bulletPoints: string[];
}

const letterPrompts: LetterPrompt[] = [
  {
    id: 'job-application-complaint',
    situation: 'You recently applied for a job but were not satisfied with the interview process.',
    bulletPoints: [
      'Explain which job you applied for.',
      'Describe what happened during the interview that you were unhappy about.',
      'Suggest what the company should do to improve its interview process.'
    ]
  },
  {
    id: 'neighbor-noise-complaint',
    situation: 'You are experiencing a persistent noise problem with one of your neighbors.',
    bulletPoints: [
      'Describe the noise problem.',
      'Explain how it is affecting you.',
      'Suggest a way to resolve the problem.'
    ]
  },
  // Add more letter prompts as needed
];
const currentLetterPrompt = ref<LetterPrompt>(letterPrompts[0]); // Default to the first prompt

const task1Data = useStorage('ielts-general-task1-data', {
  draft: '',
  selectedStyle: 'Formal' as 'Formal' | 'Semi-Formal' | 'Informal',
  feedback: null as IeltsGeneralLetterFeedback | null,
});

const isLoadingTask1 = ref(false);
const task1Error = ref<string | null>(null);

const task1WordCount = computed(() => task1Data.value.draft.trim().split(/\s+/).filter(Boolean).length);
const task1Feedback = computed(() => task1Data.value.feedback);

const task1FeedbackCriteria = computed(() => {
  if (!task1Data.value.feedback) return [];
  const { taskAchievement, coherenceAndCohesion, lexicalResource, grammaticalRangeAndAccuracy, toneAppropriateness } = task1Data.value.feedback;
  return {
    taskAchievement,
    coherenceAndCohesion,
    lexicalResource,
    grammaticalRangeAndAccuracy,
    toneAppropriateness
  };
});

async function submitTask1Letter() {
  if (task1WordCount.value < task1WordLimit) {
    task1Error.value = `Your letter must be at least ${task1WordLimit} words long.`;
    return;
  }
  isLoadingTask1.value = true;
  task1Error.value = null;
  task1Data.value.feedback = null;
  try {
    const promptText = `${currentLetterPrompt.value.situation}\nBullet points:\n- ${currentLetterPrompt.value.bulletPoints.join('\n- ')}`;
    const feedback = await getIeltsGeneralLetterFeedback(promptText, task1Data.value.draft, task1Data.value.selectedStyle);
    task1Data.value.feedback = feedback;
  } catch (error: any) {
    console.error('Error getting Task 1 feedback:', error);
    task1Error.value = error.message || 'Failed to get feedback. Please try again.';
  } finally {
    isLoadingTask1.value = false;
  }
}

// --- Task 2: General Essay ---
const task2WordLimit = 250;
const task2WordWarningLimit = 230;
const task2TextareaRef = ref<HTMLTextAreaElement | null>(null);

// MODIFIED: essayPrompts now directly uses the imported predefinedIndependentPrompts
const essayPrompts = predefinedIndependentPrompts; 

const task2Data = useStorage('ielts-general-task2-data', {
  draft: '',
  // Ensure essayPrompts is not undefined and has items before accessing its properties
  selectedPromptId: essayPrompts && essayPrompts.length > 0 ? essayPrompts[0].id : null as string | null,
  feedback: null as IeltsWritingFeedback | null, // Using the existing essay feedback type
});

const isLoadingTask2 = ref(false);
const task2Error = ref<string | null>(null);

const currentEssayPrompt = computed(() => essayPrompts.find(p => p.id === task2Data.value.selectedPromptId));
const task2WordCount = computed(() => task2Data.value.draft.trim().split(/\s+/).filter(Boolean).length);
const task2Feedback = computed(() => task2Data.value.feedback);

const task2FeedbackCriteria = computed(() => {
  if (!task2Data.value.feedback) return [];
  // Extracting criteria relevant for the general essay feedback structure
  const { taskAchievement, coherenceAndCohesion, lexicalResource, grammaticalRangeAndAccuracy, essayStructure, argumentDevelopment } = task2Data.value.feedback;
  const criteria: Record<string, IeltsWritingCriterionScore | undefined> = {
    taskAchievement,
    coherenceAndCohesion,
    lexicalResource,
    grammaticalRangeAndAccuracy,
  };
  if (essayStructure) criteria.essayStructure = essayStructure;
  if (argumentDevelopment) criteria.argumentDevelopment = argumentDevelopment;
  return criteria;
});

const task2ActionableTips = computed(() => {
    if (!task2Data.value.feedback) return [];
    let tips: string[] = [];
    Object.values(task2FeedbackCriteria.value).forEach(criterion => {
        if (criterion && criterion.suggestions) {
            tips.push(...criterion.suggestions);
        }
    });
    // Limit to 2-3 distinct tips for brevity in the collapsible panel
    return [...new Set(tips)].slice(0, 3);
});

function applyFormatToTask2(format: 'bold' | 'italic' | 'underline') {
  const textarea = task2TextareaRef.value;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = task2Data.value.draft.substring(start, end);
  let replacement = selectedText;

  if (!selectedText) {
    // if no text is selected, do not apply formatting or insert placeholders
    return;
  }

  switch (format) {
    case 'bold':
      replacement = `**${selectedText}**`;
      break;
    case 'italic':
      replacement = `*${selectedText}*`;
      break;
    case 'underline': // Markdown doesn't have a standard underline, using HTML or custom interpretation
      replacement = `<u>${selectedText}</u>`; // This will render as HTML if your Markdown parser supports it
      break;
  }
  task2Data.value.draft = task2Data.value.draft.substring(0, start) + replacement + task2Data.value.draft.substring(end);
  
  // Adjust cursor position after replacement
  nextTick(() => {
    textarea.focus();
    textarea.setSelectionRange(start + (format === 'underline' ? 3 : (format === 'bold' ? 2 : 1)), start + selectedText.length + (format === 'underline' ? 3 : (format === 'bold' ? 2 : 1)));
  });
}

async function submitTask2Essay() {
  if (!currentEssayPrompt.value) {
    task2Error.value = 'Please select an essay prompt.';
    return;
  }
  if (task2WordCount.value < task2WordLimit) {
    task2Error.value = `Your essay must be at least ${task2WordLimit} words long.`;
    return;
  }
  isLoadingTask2.value = true;
  task2Error.value = null;
  task2Data.value.feedback = null;

  try {
    // The getIeltsWritingFeedback expects a generic essay and prompt.
    // We can adapt the system prompt within useGroqClient if more specific General Training context is needed.
    const feedback = await getIeltsWritingFeedback(currentEssayPrompt.value.question, task2Data.value.draft, 'General Training Essay');
    task2Data.value.feedback = feedback;
  } catch (error: any) {
    console.error('Error getting Task 2 feedback:', error);
    task2Error.value = error.message || 'Failed to get feedback. Please try again.';
  } finally {
    isLoadingTask2.value = false;
  }
}

// Watch for changes in selected prompt for Task 2 and clear draft/feedback
watch(() => task2Data.value.selectedPromptId, () => {
  task2Data.value.draft = '';
  task2Data.value.feedback = null;
  task2Error.value = null;
});

</script>

<style scoped>
/* Basic transition for tab content */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* For Framer Motion or VueUse/Motion, you'd define named transitions */
.slide-enter-active {
  transition: all 0.3s ease-out;
}
.slide-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>