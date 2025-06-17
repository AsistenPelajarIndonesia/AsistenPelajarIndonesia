<template>
  <div class="container py-12 mx-auto">
    <div class="mb-10 text-center">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
        TOEFL Writing Practice
      </h1>
      <p class="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
        Choose the type of TOEFL writing task you want to practice.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
      <NuxtLink to="/toefl/writing/integrated" class="block group">
        <Card class="transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:-translate-y-1 rounded-2xl">
          <CardHeader>
            <div class="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full dark:bg-blue-900">
              <BookCopy class="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle class="text-2xl font-semibold text-center">Integrated Writing</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-center text-gray-600 dark:text-gray-400">
              Practice writing an essay based on a reading passage and a lecture.
            </p>
          </CardContent>
          <CardFooter class="mt-6">
            <Button class="w-full text-lg" variant="outline">
              Start Integrated Task
              <ArrowRight class="w-4 h-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </NuxtLink>

      <NuxtLink to="/toefl/writing/independent" class="block group">
        <Card class="transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:-translate-y-1 rounded-2xl">
          <CardHeader>
            <div class="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full dark:bg-green-900">
              <PenTool class="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle class="text-2xl font-semibold text-center">Independent Writing</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-center text-gray-600 dark:text-gray-400">
              Practice writing an essay expressing and supporting your opinion on a topic.
            </p>
          </CardContent>
          <CardFooter class="mt-6">
            <Button class="w-full text-lg" variant="outline">
              Start Independent Task
              <ArrowRight class="w-4 h-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookCopy, PenTool, ArrowRight } from 'lucide-vue-next';

useHead({
  title: 'TOEFL Writing Practice Selection',
  meta: [
    {
      name: 'description',
      content: 'Choose between TOEFL Integrated Writing and Independent Writing tasks to practice for your exam.',
    },
  ],
});

// You might want to define a layout if you have one for these types of pages
// definePageMeta({
//   layout: 'dashboard', // or your specific layout
// });
</script>

<style scoped>
/* Add any specific styles if needed */
.group:hover .lucide {
  transform: scale(1.1);
  transition: transform 0.3s ease-in-out;
}
</style>