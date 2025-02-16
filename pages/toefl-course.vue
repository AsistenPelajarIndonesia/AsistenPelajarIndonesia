<script setup lang="ts">

const courses = [
  {
    title: "Reading Section 1",
    description:
      "Master TOEFL reading comprehension with our structured materials",
    icon: "📚",
    link: "/reading",
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Speaking Practice 2",
    description: "Improve your speaking skills with interactive exercises",
    icon: "🎙️",
    link: "/speakingtoefl",
    color: "from-purple-500 to-pink-400",
  },
];
</script>

<template>
  <div class="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
          Choose Your
          <span class="text-primary">TOEFL Course</span>
        </h1>
        <p
          class="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
        >
          Select the section you want to master. Each course is designed to help
          you excel in different aspects of the TOEFL exam.
        </p>
      </div>

      <!-- Course Grid -->
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <NuxtLink
          v-for="course in courses"
          :key="course.title"
          :to="course.link"
          class="transform transition-all duration-300 hover:scale-105"
        >
          <Card
            class="h-full overflow-hidden border-0 bg-gradient-to-br shadow-xl hover:shadow-2xl transition-shadow duration-300"
            :class="course.color"
          >
            <CardContent class="p-8">
              <div class="flex flex-col h-full space-y-4">
                <div class="text-4xl mb-4">{{ course.icon }}</div>
                <h2 class="text-2xl font-bold text-white mb-2">
                  {{ course.title }}
                </h2>
                <p class="text-gray-100 text-lg">{{ course.description }}</p>
                <div class="flex items-center mt-6 text-white space-x-2">
                  <span>Start Learning</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </NuxtLink>
      </div>

      <!-- Additional Features Section -->
      <div class="mt-20 text-center">
        <h2 class="text-3xl font-bold text-white mb-8">
          Why Choose Our TOEFL Courses?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm">
            <div class="text-2xl mb-4">🎯</div>
            <h3 class="text-xl font-semibold text-white mb-2">
              Targeted Practice
            </h3>
            <p class="text-gray-300">
              Focus on specific sections to improve your weak areas
            </p>
          </div>
          <div class="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm">
            <div class="text-2xl mb-4">⚡</div>
            <h3 class="text-xl font-semibold text-white mb-2">
              Interactive Learning
            </h3>
            <p class="text-gray-300">
              Engage with dynamic content and real-time feedback
            </p>
          </div>
          <div class="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm">
            <div class="text-2xl mb-4">📈</div>
            <h3 class="text-xl font-semibold text-white mb-2">
              Track Progress
            </h3>
            <p class="text-gray-300">
              Monitor your improvement with detailed analytics
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
