<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        <PracticeTypeCard
          title="Sekolah Dasar"
          description="Sharpen your comprehension of academic texts and passages."
          icon="book-open-text" 
          :gradientColors="['#9B2A2A', '#FF0000']"
          textColor="#FFF"
          :backgroundIconName="Tally1" 
          link="/ielts/reading"
          section="AKM"
        />
        <PracticeTypeCard
          title="Sekolah Menengah Pertama"
          description="Improve understanding of lectures, classroom discussions, and conversations."
          icon="headphones"
          :gradientColors="['#020024', '#090979']"
          textColor="#FFF"
          :backgroundIconName="Tally2" 
          link="/ielts/listening"
          section="AKM"
        />
        <PracticeTypeCard
          title="Sekolah Menengah Atas"
          description="Practice responding to questions and expressing your ideas clearly and coherently."
          icon="mic-2"
          :gradientColors="['#363636', '#919090']"
          textColor="#FFF"
          :backgroundIconName="Tally3" 
          link="/ielts/speaking"
          section="AKM"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import PracticeTypeCard from "@/components/PracticeTypeCard.vue";
import { Tally1, Tally2, Tally3 } from 'lucide-vue-next';
</script>
