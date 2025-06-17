<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div class="max-w-4xl w-full text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">TOEFL Practice Hub</h1>
      <p class="text-lg text-indigo-700">
        Choose your practice area and start mastering each TOEFL section
      </p>
    </div>

    <div class="relative w-full max-w-2xl aspect-square">
      <!-- Central logo -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="bg-white rounded-full p-6 shadow-xl border-4 border-indigo-200">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/9/9c/TOEFL_Logo.svg" 
            alt="TOEFL Logo" 
            class="w-24 h-24"
          />
        </div>
      </div>

      <!-- Orbiting practice options -->
      <NuxtLink 
        to="/practice/toefl/reading" 
        class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-all duration-300"
      >
        <PracticeCard 
          icon="book-open-text" 
          title="Reading" 
          color="bg-blue-100"
        />
      </NuxtLink>

      <NuxtLink 
        to="/practice/toefl/listening" 
        class="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-all duration-300"
      >
        <PracticeCard 
          icon="headphones" 
          title="Listening" 
          color="bg-purple-100"
        />
      </NuxtLink>

      <NuxtLink 
        to="/practice/toefl/speaking" 
        class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 hover:scale-110 transition-all duration-300"
      >
        <PracticeCard 
          icon="mic-2" 
          title="Speaking" 
          color="bg-green-100"
        />
      </NuxtLink>

      <NuxtLink 
        to="/practice/toefl/writing" 
        class="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-all duration-300"
      >
        <PracticeCard 
          icon="square-pen" 
          title="Writing" 
          color="bg-yellow-100"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// Component logic here
</script>