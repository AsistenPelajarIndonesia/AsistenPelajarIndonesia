<script setup lang="ts">
import { Groq } from "groq-sdk";
import { ref, onMounted } from "vue";
import { Button } from "@/components/ui/button";

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const content = ref("");
const processedContent = ref(null);
const loading = ref(false);
const error = ref(null);

interface HighlightedSection {
  text: string;
  importance: number;
  type: 'title' | 'subtitle' | 'key_point' | 'example' | 'definition' | 'normal';
  color: string;
}

interface ProcessedContent {
  sections: HighlightedSection[];
  metadata: {
    totalWords: number;
    readingTime: number;
    complexityScore: number;
  };
}

const colorMap = {
  title: 'bg-blue-100 dark:bg-blue-900/50',
  subtitle: 'bg-indigo-100 dark:bg-indigo-900/50',
  key_point: 'bg-green-100 dark:bg-green-900/50',
  example: 'bg-purple-100 dark:bg-purple-900/50',
  definition: 'bg-yellow-100 dark:bg-yellow-900/50',
  normal: ''
};

const processContent = async () => {
  if (!content.value.trim()) return;
  
  loading.value = true;
  error.value = null;
  
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are an expert at analyzing educational content and highlighting important information. Your task is to process the text and identify different types of content (titles, subtitles, key points, examples, definitions) and their importance levels. (Respond in JSON)"
        },
        {
          role: "user",
          content: `Analyze this educational content and break it down into sections with appropriate highlighting. For each section, determine its type (title, subtitle, key_point, example, definition, or normal) and importance level (1-5).

Content to analyze:
${content.value}`
        }
      ],
      temperature: 0.3,
      max_tokens: 32768,
      stream: false,
      response_format: { type: "json_object" },
      top_p: 1
    });

    const response = JSON.parse(completion.choices[0].message.content);
    processedContent.value = response;
  } catch (e) {
    error.value = "Error processing content. Please try again.";
    console.error("Error:", e);
  } finally {
    loading.value = false;
  }
};

const getReadingTime = (words: number) => {
  const wordsPerMinute = 200;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

const getComplexityLabel = (score: number) => {
  if (score <= 2) return "Basic";
  if (score <= 3) return "Intermediate";
  if (score <= 4) return "Advanced";
  return "Expert";
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
    <div class="max-w-4xl mx-auto space-y-8">
      <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-gray-100">
        AI-Powered Text Highlighter
      </h1>
      
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 space-y-4">
        <textarea
          v-model="content"
          class="w-full h-64 p-4 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Enter your educational content here..."
        ></textarea>
        
        <div class="flex justify-end">
          <Button
            @click="processContent"
            :disabled="loading || !content.trim()"
            class="relative"
          >
            <span v-if="loading" class="absolute inset-0 flex items-center justify-center">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            <span :class="{ 'opacity-0': loading }">Process Content</span>
          </Button>
        </div>
      </div>
      
      <div v-if="error" class="bg-red-100 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg">
        {{ error }}
      </div>
      
      <div v-if="processedContent && !loading" class="space-y-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
          <div class="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div class="space-y-1">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Processed Content
              </h2>
            </div>
          </div>
          
          <div class="space-y-4 text-gray-900 dark:text-gray-100">
            <div
              v-for="(section, index) in processedContent.sections"
              :key="index"
              class="relative group"
            >
              <div
                :class="[
                  'p-2 rounded transition-colors duration-200',
                  colorMap[section.type],
                  section.type === 'title' ? 'text-xl font-bold' :
                  section.type === 'subtitle' ? 'text-lg font-semibold' :
                  section.type === 'key_point' ? 'font-medium' : ''
                ]"
              >
                {{ section.text }}
                
                <div
                  class="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <span
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                    :class="{
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': section.type === 'title',
                      'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200': section.type === 'subtitle',
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': section.type === 'key_point',
                      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200': section.type === 'example',
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': section.type === 'definition'
                    }"
                  >
                    {{ section.type.replace('_', ' ') }} · Importance: {{ section.importance }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
