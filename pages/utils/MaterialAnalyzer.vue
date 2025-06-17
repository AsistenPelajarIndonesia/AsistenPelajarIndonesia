<template>
  <div class="min-h-screen bg-background text-foreground p-8 flex flex-col items-center">
    <header class="mb-12 text-center">
      <h1 class="text-4xl font-bold tracking-tight mb-3">
        AI Material Analyzer
      </h1>
      <p class="text-lg text-muted-foreground max-w-xl mx-auto">
        Paste your educational content below, and our AI will identify key sections, rate their importance, and provide explanations.
      </p>
    </header>

    <div class="w-full max-w-3xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Input Material</CardTitle>
          <CardDescription>Enter the text content you want to analyze.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            v-model="textContent"
            placeholder="Paste your educational material here..."
            class="min-h-[200px] text-sm"
            :disabled="isLoading"
          />
        </CardContent>
        <CardFooter class="flex justify-end">
          <Button @click="analyzeContent" :disabled="isLoading || !textContent.trim()">
            <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
            {{ isLoading ? 'Analyzing...' : 'Analyze Content' }}
          </Button>
        </CardFooter>
      </Card>

      <div v-if="errorMesssage" class="w-full">
        <Alert variant="destructive">
          <AlertCircle class="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{{ errorMesssage }}</AlertDescription>
        </Alert>
      </div>

      <div v-if="analysisResult && !isLoading" class="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">{{ analysisResult.summary }}</p>
          </CardContent>
        </Card>

        <h2 class="text-2xl font-semibold tracking-tight">Important Sections</h2>
        <div v-if="analysisResult.sections && analysisResult.sections.length > 0" class="space-y-4">
          <Card v-for="(section, index) in analysisResult.sections" :key="index">
            <CardHeader>
              <CardTitle class="text-lg">Section {{ index + 1 }} - {{ section.category }} (Importance: {{ section.importance }}/5)</CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote class="border-l-4 pl-4 italic text-sm text-muted-foreground mb-3">
                "{{ section.text }}"
              </blockquote>
              <p class="text-sm"><span class="font-semibold">Explanation:</span> {{ section.explanation }}</p>
            </CardContent>
          </Card>
        </div>
        <p v-else class="text-muted-foreground">No important sections identified or the structure was not as expected.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Groq from 'groq-sdk'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Loader2, AlertCircle } from 'lucide-vue-next'

const textContent = ref('')
const analysisResult = ref(null)
const isLoading = ref(false)
const errorMesssage = ref('')

// IMPORTANT: Replace with your actual Groq API key
// Consider using environment variables for securitygsk_MgOhbT1Nn1b3nCy7jGqLWGdyb3FY6lCTyV2M8BDBIA2SRIt8f4tm
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "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";

const groq = new Groq({
  apiKey: GROQ_API_KEY,
  dangerouslyAllowBrowser: true, // Required for client-side usage
})

async function analyzeContent() {
  if (!textContent.value.trim()) {
    errorMesssage.value = 'Please enter some content to analyze.'
    return
  }

  isLoading.value = true
  analysisResult.value = null
  errorMesssage.value = ''

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are an expert at analyzing educational content and highlighting important information.',
        },
        {
          role: 'user',
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
${textContent.value} (Respond as long and complex as possible)`,
        },
      ],
      model: 'qwen-qwq-32b', // Updated to a generally available model, adjust if needed
      temperature: 0.3,
      stream: false,
      response_format: { type: 'json_object' },
      top_p: 1,
    })

    const resultText = completion.choices[0]?.message?.content
    if (resultText) {
      analysisResult.value = JSON.parse(resultText)
    } else {
      throw new Error('No content received from API.')
    }
  } catch (error) {
    console.error('Error analyzing content:', error)
    errorMesssage.value = `Failed to analyze content: ${error.message}. Check console for details.`
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Add any page-specific styles if needed */
</style>