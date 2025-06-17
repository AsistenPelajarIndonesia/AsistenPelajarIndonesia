<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-black min-h-screen">
    <!-- Task Automation Card -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-8 text-white">
      <!-- Stars decoration -->
      <div class="absolute top-4 right-4 text-white/30">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div class="absolute top-8 right-12 text-white/20">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div class="absolute bottom-8 right-8 text-white/20">
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      
      <!-- Icon -->
      <div class="mb-6">
        <svg class="w-12 h-12 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
        </svg>
      </div>
      
      <h3 class="text-2xl font-bold mb-4">Task Automation</h3>
      <p class="text-blue-100 text-lg leading-relaxed">Automates tasks like scheduling and reminders.</p>
    </div>

    <!-- Multi-language Support Card -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 p-8 text-white">
      <!-- Stars decoration -->
      <div class="absolute top-4 right-4 text-white/30">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div class="absolute top-8 right-12 text-white/20">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div class="absolute bottom-8 right-8 text-white/20">
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      
      <!-- Icon -->
      <div class="mb-6">
        <svg class="w-12 h-12 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
        </svg>
      </div>
      
      <h3 class="text-2xl font-bold mb-4">Multi-language Support</h3>
      <p class="text-orange-100 text-lg leading-relaxed">Communicates fluently in various languages.</p>
    </div>

    <!-- Image Generation Card -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 p-8 text-white">
      <!-- Stars decoration -->
      <div class="absolute top-4 right-4 text-white/30">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div class="absolute top-8 right-12 text-white/20">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div class="absolute bottom-8 right-8 text-white/20">
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      
      <!-- Icon -->
      <div class="mb-6">
        <svg class="w-12 h-12 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      </div>
      
      <h3 class="text-2xl font-bold mb-4">Image Generation</h3>
      <p class="text-purple-100 text-lg leading-relaxed">Creates custom images based on user prompts.</p>
    </div>

    <!-- Code Snippets Card -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 p-8 text-white">
      <!-- Stars decoration -->
      <div class="absolute top-4 right-4 text-white/30">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div class="absolute top-8 right-12 text-white/20">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <div class="absolute bottom-8 right-8 text-white/20">
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      
      <!-- Icon -->
      <div class="mb-6">
        <svg class="w-12 h-12 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
        </svg>
      </div>
      
      <h3 class="text-2xl font-bold mb-4">Code snippets</h3>
      <p class="text-teal-100 text-lg leading-relaxed">Provides quick, functional code examples on demand.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UniqueCard'
}
</script>