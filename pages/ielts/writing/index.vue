<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 flex flex-col items-center">
    <div class="w-full max-w-4xl">
      <header class="mb-12 text-center">
        <h1 class="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          IELTS Writing Task Selection
        </h1>
        <p class="mt-4 text-xl text-slate-300">
          Choose the type of IELTS Writing task you want to practice.
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NuxtLink to="/ielts/writing/academic" class="block group">
          <Card class="bg-slate-800/70 border-slate-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-purple-500/30 overflow-hidden">
            <CardHeader class="pb-4">
              <div class="flex items-center space-x-4 mb-3">
                <Icon name="heroicons:academic-cap-solid" class="w-10 h-10 text-purple-400" />
                <CardTitle class="text-2xl font-semibold text-slate-100 group-hover:text-purple-400 transition-colors">
                  Academic Writing
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p class="text-slate-300 mb-6 text-sm leading-relaxed">
                Practice tasks typically found in academic contexts, such as describing graphs, charts, or processes (Task 1) and writing an essay in response to a point of view, argument, or problem (Task 2).
              </p>
            </CardContent>
            <CardFooter class="pt-4">
              <Button variant="outline" class="w-full bg-purple-600 hover:bg-purple-700 text-white border-purple-600 group-hover:border-purple-500 transition-colors">
                Start Academic Writing
                <Icon name="heroicons:arrow-right-solid" class="ml-2 w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        </NuxtLink>

        <NuxtLink to="/ielts/writing/general" class="block group">
          <Card class="bg-slate-800/70 border-slate-700 hover:border-pink-500 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-pink-500/30 overflow-hidden">
            <CardHeader class="pb-4">
              <div class="flex items-center space-x-4 mb-3">
                <Icon name="heroicons:briefcase-solid" class="w-10 h-10 text-pink-400" />
                <CardTitle class="text-2xl font-semibold text-slate-100 group-hover:text-pink-400 transition-colors">
                  General Training Writing
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p class="text-slate-300 mb-6 text-sm leading-relaxed">
                Focus on everyday situations, such as writing letters (Task 1) and an essay in response to a point of view, argument, or problem (Task 2), often more personal in tone.
              </p>
            </CardContent>
            <CardFooter class="pt-4">
              <Button variant="outline" class="w-full bg-pink-600 hover:bg-pink-700 text-white border-pink-600 group-hover:border-pink-500 transition-colors">
                Start General Training Writing
                <Icon name="heroicons:arrow-right-solid" class="ml-2 w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        </NuxtLink>
      </div>

      <footer class="mt-16 text-center text-slate-400 text-sm">
        <p>&copy; {{ new Date().getFullYear() }} AkademiPelajar. All rights reserved.</p>
        <p class="mt-1">
          Prepare for your IELTS exam with targeted writing practice.
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

useHead({
  title: 'IELTS Writing Task Selection | AkademiPelajar',
  meta: [
    { name: 'description', content: 'Choose between IELTS Academic Writing and General Training Writing tasks to practice for your exam.' }
  ]
})

// Optional: Define a layout if you have one specific for these test pages
// definePageMeta({
//   layout: 'test-layout'
// });
</script>

<style scoped>
/* You can add specific styles here if needed */
.group:hover .icon-hover-effect {
  transform: translateX(2px);
}
</style>