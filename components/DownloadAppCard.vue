<template>
  <PromotionalCard
    category="NO CONNECTION, NO WORRIES"
    title="Download the Quizlet app so you can study anywhere"
    action-text="Get the app"
    illustration-class="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300"
    @close="$emit('close')"
    @action="$emit('downloadApp')"
  >
    <template #illustration>
      <!-- Airplane and Clouds Illustration -->
      <div class="relative w-full h-full bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
        <!-- Clouds -->
        <div class="absolute top-4 left-8">
          <div class="flex space-x-2">
            <div class="w-8 h-4 bg-white rounded-full opacity-80"></div>
            <div class="w-6 h-3 bg-white rounded-full opacity-60"></div>
            <div class="w-4 h-2 bg-white rounded-full opacity-40"></div>
          </div>
        </div>
        
        <div class="absolute top-8 right-12">
          <div class="flex space-x-1">
            <div class="w-6 h-3 bg-white rounded-full opacity-70"></div>
            <div class="w-4 h-2 bg-white rounded-full opacity-50"></div>
          </div>
        </div>
        
        <div class="absolute top-12 left-16">
          <div class="w-10 h-5 bg-white rounded-full opacity-60"></div>
        </div>
        
        <!-- Airplane -->
        <div class="absolute bottom-8 right-8 transform rotate-12">
          <svg width="80" height="40" viewBox="0 0 80 40" class="text-blue-600">
            <!-- Airplane body -->
            <ellipse cx="40" cy="20" rx="35" ry="8" fill="currentColor"/>
            <!-- Wings -->
            <ellipse cx="25" cy="20" rx="15" ry="4" fill="currentColor" opacity="0.8"/>
            <!-- Tail -->
            <polygon points="5,20 15,15 15,25" fill="currentColor" opacity="0.9"/>
            <!-- Windows -->
            <circle cx="45" cy="18" r="2" fill="white" opacity="0.8"/>
            <circle cx="50" cy="18" r="2" fill="white" opacity="0.8"/>
            <circle cx="55" cy="18" r="2" fill="white" opacity="0.8"/>
            <circle cx="60" cy="18" r="2" fill="white" opacity="0.8"/>
          </svg>
        </div>
      </div>
    </template>
  </PromotionalCard>
</template>

<script setup>
defineEmits(['close', 'downloadApp'])
</script>