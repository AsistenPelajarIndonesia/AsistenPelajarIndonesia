<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        <PracticeTypeCard
          title="Reading"
          description="Sharpen your comprehension of academic texts and passages."
          icon="book-open-text" 
          :gradientColors="['#FFF0E0', '#FFDAB9']"
          textColor="#8B4513"
          :backgroundIconName="BookMarked" 
          link="/toefl/reading"
          section="TOEFL"
        />
        <PracticeTypeCard
          title="Listening"
          description="Improve understanding of lectures, classroom discussions, and conversations."
          icon="headphones"
          :gradientColors="['#E6E6FA', '#D8BFD8']"
          textColor="#483D8B"
          :backgroundIconName="Headphones" 
          link="/toefl/listening"
          section="TOEFL"
        />
        <PracticeTypeCard
          title="Speaking"
          description="Practice responding to questions and expressing your ideas clearly and coherently."
          icon="mic-2"
          :gradientColors="['#E0FFF0', '#B9FFD9']"
          textColor="#006400"
          :backgroundIconName="Mic2" 
          link="/toefl/speaking"
          section="TOEFL"
        />
        <PracticeTypeCard
          title="Writing"
          description="Develop your skills in integrated and independent essay writing tasks."
          icon="square-pen"
          :gradientColors="['#FFF0F5', '#FFD9E6']"
          textColor="#C71585"
          :backgroundIconName="SquarePen" 
          link="/toefl/writing"
          section="TOEFL"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import PracticeTypeCard from "@/components/PracticeTypeCard.vue";
// Import Lucide icons you want to use
import { BookMarked, Headphones, Mic2, SquarePen } from 'lucide-vue-next';
</script>
