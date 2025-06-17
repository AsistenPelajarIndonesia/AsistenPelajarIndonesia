<template>
  <div class="bg-white rounded-2xl shadow-lg overflow-hidden relative max-w-md mx-auto">
    <!-- Close Button -->
    <button 
      class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
      @click="$emit('close')"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>

    <div class="p-8 pb-6">
      <!-- Header -->
      <div class="mb-6">
        <p class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">{{ category }}</p>
        <h2 class="text-2xl font-bold text-gray-900 leading-tight">{{ title }}</h2>
      </div>

      <!-- CTA Button -->
      <button 
        class="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors group"
        @click="$emit('action')"
      >
        {{ actionText }}
        <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>

    <!-- Illustration Area -->
    <div class="relative h-32 overflow-hidden">
      <div :class="illustrationClass" class="absolute inset-0">
        <slot name="illustration">
          <!-- Default illustration if none provided -->
          <div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div class="text-gray-400 text-4xl">📚</div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  category: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  actionText: {
    type: String,
    required: true
  },
  illustrationClass: {
    type: String,
    default: ''
  }
})

defineEmits(['close', 'action'])
</script>