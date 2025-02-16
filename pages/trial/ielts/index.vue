<script setup lang="ts">
const courses = [
  {
    title: "Reading Mastery",
    description: "Develop advanced reading comprehension and analysis skills",
    icon: "📚",
    link: "/ielts/reading",
    color: "from-emerald-500 to-teal-400",
    features: [
      "Academic passages",
      "General training texts",
      "Time management tips",
    ],
  },
  {
    title: "Writing Excellence",
    description:
      "Master academic and general writing tasks with expert guidance",
    icon: "✍️",
    link: "/ielts/writing",
    color: "from-blue-500 to-indigo-400",
    features: ["Task 1 strategies", "Essay structure", "Band 9 samples"],
  },
  {
    title: "Listening Skills",
    description:
      "Enhance your listening comprehension with diverse audio materials",
    icon: "🎧",
    link: "/ielts/listening",
    color: "from-violet-500 to-purple-400",
    features: [
      "Academic lectures",
      "Daily conversations",
      "Note-taking practice",
    ],
  },
  {
    title: "Speaking Confidence",
    description: "Build fluency and confidence for your speaking test",
    icon: "🎤",
    link: "/ielts/speaking",
    color: "from-rose-500 to-pink-400",
    features: [
      "Interview preparation",
      "Cue card practice",
      "Discussion skills",
    ],
  },
];
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Hero Section with Animation -->
      <div class="text-center mb-16 space-y-6">
        <h1
          class="text-5xl font-extrabold text-white sm:text-6xl md:text-7xl tracking-tight"
        >
          Master
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500"
            >IELTS</span
          >
          with Confidence
        </h1>
        <p class="mt-3 max-w-2xl mx-auto text-xl text-gray-300 sm:mt-5">
          Comprehensive preparation for all IELTS modules with personalized
          feedback and adaptive learning technology.
        </p>
        <div class="flex justify-center gap-4 mt-8">
          <Button size="lg" class="bg-emerald-500 hover:bg-emerald-600">
            Start Free Trial
          </Button>
          <Button size="lg" variant="outline"> View Study Plan </Button>
        </div>
      </div>

      <!-- Course Modules Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <NuxtLink
          v-for="course in courses"
          :key="course.title"
          :to="course.link"
          class="group transform transition-all duration-300 hover:scale-102"
        >
          <Card
            class="h-full overflow-hidden border border-gray-800 bg-gradient-to-br shadow-xl group-hover:shadow-2xl transition-all duration-300"
            :class="course.color"
          >
            <CardContent class="p-8">
              <div class="flex flex-col h-full space-y-4">
                <div class="text-4xl mb-4">{{ course.icon }}</div>
                <h2 class="text-2xl font-bold text-white mb-2">
                  {{ course.title }}
                </h2>
                <p class="text-gray-100 text-lg">{{ course.description }}</p>
                <ul class="mt-4 space-y-2">
                  <li
                    v-for="feature in course.features"
                    :key="feature"
                    class="flex items-center text-gray-200"
                  >
                    <svg
                      class="h-5 w-5 mr-2 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {{ feature }}
                  </li>
                </ul>
                <div
                  class="flex items-center mt-6 text-white space-x-2 group-hover:translate-x-2 transition-transform duration-300"
                >
                  <span>Start Module</span>
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

      <!-- Features Section -->
      <div class="mt-20 text-center">
        <h2 class="text-3xl font-bold text-white mb-12">
          Why Choose Our IELTS Program?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm transform transition-all duration-300 hover:-translate-y-2"
          >
            <div class="text-3xl mb-4">🎯</div>
            <h3 class="text-xl font-semibold text-white mb-4">
              Personalized Learning Path
            </h3>
            <p class="text-gray-300">
              Adaptive study plans tailored to your target band score and
              strengths
            </p>
          </div>
          <div
            class="p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm transform transition-all duration-300 hover:-translate-y-2"
          >
            <div class="text-3xl mb-4">🤖</div>
            <h3 class="text-xl font-semibold text-white mb-4">
              AI-Powered Feedback
            </h3>
            <p class="text-gray-300">
              Instant writing and speaking evaluations with detailed
              improvements
            </p>
          </div>
          <div
            class="p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm transform transition-all duration-300 hover:-translate-y-2"
          >
            <div class="text-3xl mb-4">📊</div>
            <h3 class="text-xl font-semibold text-white mb-4">
              Progress Analytics
            </h3>
            <p class="text-gray-300">
              Track your improvement with detailed performance insights
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hover\:scale-102:hover {
  transform: scale(1.02);
}

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
