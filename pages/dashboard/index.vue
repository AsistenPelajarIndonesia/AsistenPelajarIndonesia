<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-center text-gray-800 mb-12">Pilih Jalur Belajarmu</h1>
      
      <div class="grid md:grid-cols-3 gap-8">
        <!-- SNBT Card -->
        <div 
          @click="selectPath('snbt')"
          class="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
        >
          <div class="flex flex-col items-center">
            <!-- You can replace this with an actual icon or image -->
            <div class="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <span class="text-3xl text-white">S</span>
            </div>
            <h2 class="text-2xl font-semibold text-gray-700 mb-2">SNBT</h2>
            <p class="text-gray-600 text-center text-sm">
              Persiapan Seleksi Nasional Berdasarkan Tes untuk masuk Perguruan Tinggi Negeri.
            </p>
          </div>
        </div>

        <!-- TOEFL Card -->
        <div 
          @click="selectPath('toefl')"
          class="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
        >
          <div class="flex flex-col items-center">
            <!-- You can replace this with an actual icon or image -->
            <div class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <span class="text-3xl text-white">T</span>
            </div>
            <h2 class="text-2xl font-semibold text-gray-700 mb-2">TOEFL</h2>
            <p class="text-gray-600 text-center text-sm">
              Test of English as a Foreign Language untuk studi atau karir internasional.
            </p>
          </div>
        </div>

        <!-- IELTS Card -->
        <div 
          @click="selectPath('ielts')"
          class="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
        >
          <div class="flex flex-col items-center">
            <!-- You can replace this with an actual icon or image -->
            <div class="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mb-4">
              <span class="text-3xl text-white">I</span>
            </div>
            <h2 class="text-2xl font-semibold text-gray-700 mb-2">IELTS</h2>
            <p class="text-gray-600 text-center text-sm">
              International English Language Testing System untuk keperluan global.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const selectPath = (path: string) => {
  // You can define where each path should navigate to.
  // For example, navigate to /snbt, /toefl, or /ielts within the dashboard or root.
  // This is just a placeholder navigation.
  if (path === 'snbt') {
    router.push('/snbt'); // Example: navigate to a dedicated SNBT page
  } else if (path === 'toefl') {
    router.push('/toefl'); // Example: navigate to a dedicated TOEFL page
  } else if (path === 'ielts') {
    router.push('/ielts'); // Example: navigate to a dedicated IELTS page
  }
  console.log(`Selected path: ${path}`);
};

definePageMeta({
  layout: 'dashboard',
});
</script>

<style scoped>
/* You can add additional scoped styles here if needed */
</style>