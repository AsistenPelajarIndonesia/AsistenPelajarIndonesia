<template>
  <PromotionalCard
    category="SET A GOAL"
    title="Tell us your goal and we'll recommend the best way to study"
    action-text="Let's go"
    illustration-class="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600"
    @close="$emit('close')"
    @action="$emit('setGoal')"
  >
    <template #illustration>
      <!-- Mountain with Flag Illustration -->
      <div class="relative w-full h-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
        <!-- Mountains -->
        <div class="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 400 120" class="w-full h-full">
            <!-- Back mountain -->
            <polygon points="0,120 100,40 200,60 300,20 400,50 400,120" fill="#1e40af" opacity="0.7"/>
            <!-- Front mountain -->
            <polygon points="0,120 150,30 250,50 400,40 400,120" fill="#1d4ed8"/>
            <!-- Snow caps -->
            <polygon points="140,35 160,35 150,25" fill="white" opacity="0.9"/>
            <polygon points="240,55 260,55 250,45" fill="white" opacity="0.8"/>
          </svg>
        </div>
        
        <!-- Flag on peak -->
        <div class="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <!-- Flag pole -->
          <div class="w-0.5 h-12 bg-gray-700 absolute left-1/2 transform -translate-x-1/2"></div>
          <!-- Flag -->
          <div class="w-8 h-5 bg-yellow-400 absolute top-0 left-1/2 transform -translate-x-1/2 clip-path-flag">
            <div class="w-full h-full bg-gradient-to-r from-yellow-400 to-orange-400"></div>
          </div>
        </div>
        
        <!-- Additional mountain details -->
        <div class="absolute bottom-8 right-8">
          <div class="w-2 h-2 bg-white rounded-full opacity-60"></div>
        </div>
        <div class="absolute bottom-12 left-8">
          <div class="w-1 h-1 bg-white rounded-full opacity-40"></div>
        </div>
      </div>
    </template>
  </PromotionalCard>
</template>

<script setup>
defineEmits(['close', 'setGoal'])
</script>

<style scoped>
.clip-path-flag {
  clip-path: polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%);
}
</style>