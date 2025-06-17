<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-12 text-gray-900">Promotional Cards Demo</h1>
      
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Study on the Go Card -->
        <div v-if="showStudyCard">
          <StudyOnTheGoCard 
            @close="showStudyCard = false"
            @text-set="handleTextSet"
          />
        </div>
        
        <!-- Download App Card -->
        <div v-if="showAppCard">
          <DownloadAppCard 
            @close="showAppCard = false"
            @download-app="handleDownloadApp"
          />
        </div>
        
        <!-- Set Goal Card -->
        <div v-if="showGoalCard">
          <SetGoalCard 
            @close="showGoalCard = false"
            @set-goal="handleSetGoal"
          />
        </div>
      </div>
      
      <!-- Reset Button -->
      <div class="text-center mt-12">
        <button 
          @click="resetCards"
          class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Reset All Cards
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showStudyCard = ref(true)
const showAppCard = ref(true)
const showGoalCard = ref(true)

const handleTextSet = () => {
  alert('Text me the set clicked!')
}

const handleDownloadApp = () => {
  alert('Get the app clicked!')
}

const handleSetGoal = () => {
  alert('Let\'s go clicked!')
}

const resetCards = () => {
  showStudyCard.value = true
  showAppCard.value = true
  showGoalCard.value = true
}
</script>