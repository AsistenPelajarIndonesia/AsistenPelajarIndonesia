<template>
  <div class="container py-8 mx-auto">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold">Tes Kepribadian MBTI</h1>
      <Button @click="startNewTest" variant="outline" :disabled="mbtiStore.isLoadingQuestions.value">
        <RefreshCw class="w-4 h-4 mr-2" :class="{'animate-spin': mbtiStore.isLoadingQuestions.value}"/>
        Mulai Tes Baru
      </Button>
    </div>

    <div v-if="mbtiStore.isLoadingQuestions.value" class="flex flex-col items-center justify-center h-64">
      <Loader2 class="w-12 h-12 mb-4 animate-spin text-primary" />
      <p class="text-lg text-muted-foreground">Memuat pertanyaan...</p>
    </div>

    <div v-else-if="mbtiStore.errorLoadingQuestions.value" class="my-6">
      <Alert variant="destructive">
        <AlertCircle class="w-4 h-4" />
        <AlertTitle>Gagal Memuat Pertanyaan</AlertTitle>
        <AlertDescription>
          {{ mbtiStore.errorLoadingQuestions.value }} Silakan coba lagi.
        </AlertDescription>
      </Alert>
    </div>

    <div v-else-if="mbtiStore.questions.value.length === 0 && !mbtiStore.isLoadingQuestions.value" class="flex flex-col items-center justify-center h-64 text-center">
        <p class="mb-4 text-xl text-muted-foreground">Belum ada pertanyaan. Klik "Mulai Tes Baru" untuk memulai.</p>
    </div>

    <div v-else class="space-y-6">
      <ClientOnly>
        <TransitionGroup name="fade-list">
          <Card 
            v-for="(question, index) in mbtiStore.questions.value" 
            :key="question.id" 
            class="overflow-hidden shadow-lg rounded-2xl"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <CardHeader>
              <CardTitle>Pertanyaan {{ index + 1 }}</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="mb-4 text-lg font-medium">Pilih pernyataan yang paling menggambarkan diri Anda:</p>
              <RadioGroup 
                :model-value="getUserAnswerForQuestion(question.id)" 
                @update:model-value="(value) => mbtiStore.selectAnswer(question.id, value)" 
                :disabled="mbtiStore.testCompleted.value"
                class="space-y-4"
              >
                <div class="flex items-start p-4 transition-colors border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem :id="`${question.id}-a`" value="a" class="mt-1" />
                  <Label :for="`${question.id}-a`" class="ml-3 cursor-pointer leading-relaxed">{{ question.optionA }}</Label>
                </div>
                <div class="flex items-start p-4 transition-colors border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem :id="`${question.id}-b`" value="b" class="mt-1" />
                  <Label :for="`${question.id}-b`" class="ml-3 cursor-pointer leading-relaxed">{{ question.optionB }}</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </TransitionGroup>
      </ClientOnly>

      <div v-if="mbtiStore.questions.value.length > 0 && !mbtiStore.testCompleted.value" class="pt-6 text-center">
        <Button 
          @click="mbtiStore.completeTest(getMbtiTypeDescription)" 
          size="lg" 
          class="w-full max-w-xs mx-auto"
          :disabled="!mbtiStore.allQuestionsAnswered.value || mbtiStore.isCalculatingResult.value"
        >
          <Loader2 v-if="mbtiStore.isCalculatingResult.value" class="w-4 h-4 mr-2 animate-spin" />
          {{ mbtiStore.isCalculatingResult.value ? 'Menganalisis...' : 'Selesai & Lihat Hasil' }}
        </Button>
        <p class="mt-2 text-sm text-muted-foreground">
          {{ mbtiStore.answeredCount.value }} / {{ mbtiStore.questions.value.length }} pertanyaan dijawab
        </p>
      </div>

      <div v-if="mbtiStore.testCompleted.value && mbtiStore.result.value" class="p-6 mt-8 border shadow-xl bg-card rounded-2xl">
        <h2 class="mb-4 text-2xl font-bold text-center">Hasil Tes MBTI Anda</h2>
        <div class="text-center mb-6">
          <div class="inline-flex items-center justify-center w-24 h-24 mb-4 text-4xl font-bold text-white rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
            {{ mbtiStore.result.value.type }}
          </div>
          <h3 class="text-xl font-semibold">{{ mbtiStore.result.value.type }}</h3>
        </div>
        
        <Alert class="mb-6">
          <Info class="w-4 h-4" />
          <AlertTitle>Deskripsi Kepribadian Anda</AlertTitle>
          <AlertDescription class="mt-2 leading-relaxed">
            {{ mbtiStore.result.value.description }}
          </AlertDescription>
        </Alert>

        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div v-for="dimension in mbtiStore.result.value.dimensions" :key="dimension.name" class="p-3 text-center border rounded-lg">
            <div class="text-2xl font-bold text-primary">{{ dimension.score }}%</div>
            <div class="text-sm font-medium">{{ dimension.name }}</div>
            <div class="text-xs text-muted-foreground">{{ dimension.preference }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useGroqClient } from '@/composables/useGroqClient';
import { useMbtiStore } from '@/composables/useMbtiStore';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle, RefreshCw, Info } from 'lucide-vue-next';

const { generateMbtiQuestions, getMbtiTypeDescription } = useGroqClient();
const mbtiStore = useMbtiStore();

async function startNewTest() {
  await mbtiStore.fetchQuestions(generateMbtiQuestions, getMbtiTypeDescription);
}

// Load questions on mount if not already loaded
onMounted(async () => {
  if (mbtiStore.questions.value.length === 0) {
    await startNewTest();
  }
});

function getUserAnswerForQuestion(questionId: string): string | null {
  const answer = mbtiStore.userAnswers.value.find(a => a.questionId === questionId);
  return answer ? answer.selectedOption : null;
}

</script>

<style scoped>
.fade-list-enter-active,
.fade-list-leave-active {
  transition: all 0.5s ease;
}
.fade-list-enter-from,
.fade-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>