<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Groq } from "groq-sdk";

interface HighlightedSection {
  text: string;
  importance: number;
  category: string;
  explanation: string;
}

interface ProcessedContent {
  sections: HighlightedSection[];
  summary: string;
}

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const content = ref("");
const processedContent = ref<ProcessedContent | null>(null);
const loading = ref(false);
const error = ref("");

const processContent = async () => {
  if (!content.value.trim()) return;

  loading.value = true;
  error.value = "";

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert at analyzing educational content and highlighting important information.",
        },
        {
          role: "user",
          content: `Analyze this educational content and identify important sections. For each section:
1. Rate its importance (1-5)
2. Categorize it (key concept, definition, example, fact, or insight)
3. Provide a brief explanation of why it's important

Respond in JSON format with this structure:
{
  "sections": [
    {
      "text": "exact text from the content",
      "importance": 1-5,
      "category": "category name",
      "explanation": "why this is important"
    }
  ],
  "summary": "brief overview of the content"
}

Content to analyze:
${content.value}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 32768,
      stream: false,
      response_format: { type: "json_object" },
      top_p: 1,
    });

    processedContent.value = JSON.parse(completion.choices[0].message.content);
  } catch (e) {
    error.value = "Error processing content. Please try again.";
    console.error("Error:", e);
  } finally {
    loading.value = false;
  }
};

const getImportanceColor = (importance: number): string => {
  const colors = {
    1: "bg-blue-100 border-blue-200",
    2: "bg-green-100 border-green-200",
    3: "bg-yellow-100 border-yellow-200",
    4: "bg-orange-100 border-orange-200",
    5: "bg-red-100 border-red-200",
  };
  return colors[importance as keyof typeof colors] || colors[1];
};

const getCategoryIcon = (category: string): string => {
  const icons = {
    "key concept": "🔑",
    definition: "📚",
    example: "💡",
    fact: "📋",
    insight: "🎯",
  };
  return icons[category as keyof typeof icons] || "📌";
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-6xl mx-auto space-y-8">
      <h1 class="text-4xl font-bold text-center text-gray-800">
        AI-Powered Text Highlighter
      </h1>

      <Card class="p-6 space-y-4">
        <div class="space-y-2">
          <label for="content" class="text-sm font-medium text-gray-700">
            Enter your learning material
          </label>
          <Textarea
            id="content"
            v-model="content"
            placeholder="Paste your text here..."
            class="min-h-[200px] w-full"
          />
        </div>

        <div class="flex justify-end">
          <Button
            @click="processContent"
            :disabled="loading || !content.trim()"
            class="min-w-[150px]"
          >
            <template v-if="loading">
              <div class="animate-spin mr-2">⌛</div>
              Processing...
            </template>
            <template v-else> Analyze Text </template>
          </Button>
        </div>
      </Card>

      <div
        v-if="error"
        class="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        {{ error }}
      </div>

      <TransitionGroup
        v-if="processedContent"
        tag="div"
        class="space-y-6"
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 transform translate-y-4"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform translate-y-4"
      >
        <Card class="p-6" key="summary">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Summary</h2>
          <p class="text-gray-600">{{ processedContent.summary }}</p>
        </Card>

        <div key="highlights" class="space-y-4">
          <h2 class="text-2xl font-semibold text-gray-800">
            Highlighted Sections
          </h2>

          <TransitionGroup
            tag="div"
            class="space-y-4"
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 transform translate-x-4"
            enter-to-class="opacity-100 transform translate-x-0"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 transform translate-x-0"
            leave-to-class="opacity-0 transform translate-x-4"
          >
            <div
              v-for="(section, index) in processedContent.sections"
              :key="index"
              class="p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md"
              :class="getImportanceColor(section.importance)"
            >
              <div class="flex items-start justify-between">
                <div class="space-y-2 flex-1">
                  <div class="flex items-center gap-2">
                    <span class="text-xl">{{
                      getCategoryIcon(section.category)
                    }}</span>
                    <span class="text-sm font-medium text-gray-600 capitalize">
                      {{ section.category }}
                    </span>
                    <div class="flex items-center gap-1">
                      <span
                        v-for="n in section.importance"
                        :key="n"
                        class="w-2 h-2 rounded-full bg-yellow-400"
                      />
                    </div>
                  </div>

                  <p class="text-gray-800 font-medium">{{ section.text }}</p>
                  <p class="text-sm text-gray-600">{{ section.explanation }}</p>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <div key="legend" class="bg-white rounded-lg shadow p-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Legend</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div class="flex items-center gap-2">
              <span
                class="w-4 h-4 rounded bg-blue-100 border border-blue-200"
              ></span>
              <span class="text-sm text-gray-600">Low Importance</span>
            </div>
            <div class="flex items-center gap-2">
              <span
                class="w-4 h-4 rounded bg-green-100 border border-green-200"
              ></span>
              <span class="text-sm text-gray-600">Moderate-Low</span>
            </div>
            <div class="flex items-center gap-2">
              <span
                class="w-4 h-4 rounded bg-yellow-100 border border-yellow-200"
              ></span>
              <span class="text-sm text-gray-600">Moderate</span>
            </div>
            <div class="flex items-center gap-2">
              <span
                class="w-4 h-4 rounded bg-orange-100 border border-orange-200"
              ></span>
              <span class="text-sm text-gray-600">Moderate-High</span>
            </div>
            <div class="flex items-center gap-2">
              <span
                class="w-4 h-4 rounded bg-red-100 border border-red-200"
              ></span>
              <span class="text-sm text-gray-600">High Importance</span>
            </div>
          </div>
        </div>
      </TransitionGroup>
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
