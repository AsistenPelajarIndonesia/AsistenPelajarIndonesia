<template>
  <PromotionalCard
    category="STUDY ON THE GO"
    title="Text yourself this set so you can study while you're offline"
    action-text="Text me the set"
    illustration-class="bg-gradient-to-br from-green-200 via-green-300 to-green-400"
    @close="$emit('close')"
    @action="$emit('textSet')"
  >
    <template #illustration>
      <!-- Park Scene Illustration -->
      <div class="relative w-full h-full bg-gradient-to-br from-green-200 via-green-300 to-green-400">
        <!-- Hills Background -->
        <div class="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 400 120" class="w-full h-full">
            <!-- Background hills -->
            <path d="M0,120 Q100,60 200,80 T400,70 L400,120 Z" fill="#86efac" opacity="0.7"/>
            <path d="M0,120 Q150,40 300,60 T400,50 L400,120 Z" fill="#4ade80"/>
          </svg>
        </div>
        
        <!-- Trees -->
        <div class="absolute bottom-8 right-16">
          <!-- Tree 1 -->
          <div class="relative">
            <div class="w-2 h-8 bg-amber-700 absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
            <div class="w-8 h-12 bg-green-600 rounded-full absolute bottom-6 left-1/2 transform -translate-x-1/2"></div>
          </div>
        </div>
        
        <div class="absolute bottom-8 right-8">
          <!-- Tree 2 -->
          <div class="relative">
            <div class="w-2 h-10 bg-amber-700 absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
            <div class="w-10 h-16 bg-green-700 rounded-full absolute bottom-8 left-1/2 transform -translate-x-1/2"></div>
          </div>
        </div>
        
        <div class="absolute bottom-8 right-24">
          <!-- Tree 3 -->
          <div class="relative">
            <div class="w-2 h-6 bg-amber-700 absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
            <div class="w-6 h-10 bg-green-600 rounded-full absolute bottom-4 left-1/2 transform -translate-x-1/2"></div>
          </div>
        </div>
        
        <!-- Bench -->
        <div class="absolute bottom-12 right-20">
          <div class="w-12 h-2 bg-amber-800 rounded"></div>
          <div class="w-1 h-4 bg-amber-900 absolute left-1 -bottom-4"></div>
          <div class="w-1 h-4 bg-amber-900 absolute right-1 -bottom-4"></div>
        </div>
      </div>
    </template>
  </PromotionalCard>
</template>

<script setup>
defineEmits(['close', 'textSet'])
</script>