<template>
  <div class="w-full max-w-4xl bg-indigo-700 rounded-lg shadow-lg p-8 text-white font-sans relative overflow-hidden">
    <!-- Top accent bars -->
    <div class="absolute top-0 left-0 h-1.5 w-1/4 bg-pink-500"></div>
    <div class="absolute top-0 right-0 h-1.5 w-1/4 bg-cyan-400"></div>

    <div class="flex items-center">
      <!-- Icon Section -->
      <div class="w-1/4 flex justify-center items-center pr-8">
        <div class="w-24 h-24 rounded-full border-2 border-purple-400 flex items-center justify-center bg-purple-600 bg-opacity-50">
          <slot name="icon">
            <!-- Default cloud icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 15.592C3 18.58 5.419 21 8.408 21h7.184C18.58 21 21 18.58 21 15.592c0-2.663-1.934-4.903-4.523-5.408C16.17 8.03 14.095 6 11.5 6 9.172 6 7.171 7.658 6.603 9.868 4.553 10.29 3 12.272 3 15.592zM8.5 15.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM15.5 13.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            </svg>
          </slot>
        </div>
      </div>

      <!-- Text Content Section -->
      <div class="w-2/3">
        <h2 class="text-3xl font-bold mb-3">{{ title }}</h2>
        <p class="text-purple-300 text-base leading-relaxed mb-6">
          {{ description }}
        </p>
        <div class="flex items-center space-x-4">
          <button class="relative group bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2.5 px-6 rounded-lg flex items-center transition-all duration-300 ease-in-out overflow-hidden">
            {{ buttonText }}
            <span class="absolute right-0 top-0 bottom-0 w-10 bg-pink-600 group-hover:bg-pink-700 flex items-center justify-center transform transition-transform duration-300 ease-in-out">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
          <span 
            v-for="tag in tags" 
            :key="tag"
            class="bg-purple-600 text-purple-300 text-xs font-semibold px-3 py-1.5 rounded-full"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Read Time Section -->
      <div class="w-1/12 flex flex-col items-center justify-start pl-4 pt-2 self-start">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyan-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div class="text-3xl font-bold text-white">{{ readTime }}</div>
        <div class="text-xs text-purple-300 tracking-wider">MIN</div>
        <div class="text-xs text-purple-300 tracking-wider">READ</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Multi-Cloud Security'
  },
  description: {
    type: String,
    default: 'Curabitur eu est eu tortor rutrum eleifend phasellus dapibus at lobortis mauris lacus accumsan lacinia.'
  },
  buttonText: {
    type: String,
    default: 'Read more'
  },
  tags: {
    type: Array,
    default: () => ['SECURITY', 'CLOUD TECHNOLOGY']
  },
  readTime: {
    type: String,
    default: '04'
  }
})
</script>

<style scoped>
.font-sans {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}
</style>