<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        <PracticeTypeCard
          title="Penalaran Induktif (PU)"
          description="Uji kemampuan berpikir logis dan analitis Anda."
          icon="brain"
          :gradientColors="['#E0F2FE', '#BAE6FD']" 
          textColor="#0C4A6E"
          :backgroundIconName="Brain"
          link="/snbt/penalaran-umum"
          section="SNBT"
        />
        <PracticeTypeCard
          title="Penalaran Deduktif (PU)"
          description="Uji kemampuan berpikir logis dan analitis Anda."
          icon="brain"
          :gradientColors="['#E0F2FE', '#BAE6FD']" 
          textColor="#0C4A6E"
          :backgroundIconName="Brain"
          link="/snbt/penalaran-umum"
          section="SNBT"
        />
        <PracticeTypeCard
          title="Penalaran Kuantitatif (PU)"
          description="Uji kemampuan berpikir logis dan analitis Anda."
          icon="brain"
          :gradientColors="['#E0F2FE', '#BAE6FD']" 
          textColor="#0C4A6E"
          :backgroundIconName="Brain"
          link="/snbt/penalaran-umum"
          section="SNBT"
        />
        <PracticeTypeCard
          title="Pengetahuan & Pemahaman Umum"
          description="Asah kemampuan memahami teks dan menulis dengan efektif."
          icon="book-marked"
          :gradientColors="['#EA384D', '#D31027']"
          textColor="#FFF"
          :backgroundIconName="BrainCircuit"
          link="/snbt/pemahaman-bacaan-menulis"
          section="SNBT"
        />
        <PracticeTypeCard
          title="Pemahaman Bacaan & Menulis"
          description="Asah kemampuan memahami teks dan menulis dengan efektif."
          icon="book-marked"
          :gradientColors="['#FEF3C7', '#FDE68A']"
          textColor="#78350F"
          :backgroundIconName="BookMarked"
          link="/snbt/pemahaman-bacaan-menulis"
          section="SNBT"
        />
        <PracticeTypeCard
          title="Pengetahuan Kuantitatif"
          description="Tingkatkan kemampuan matematika dasar dan pemecahan masalah."
          icon="sigma"
          :gradientColors="['#E0F7FA', '#B2EBF2']"
          textColor="#006064"
          :backgroundIconName="Sigma"
          link="/snbt/pengetahuan-kuantitatif"
          section="SNBT"
        />
        <PracticeTypeCard
          title="Literasi Bahasa Indonesia"
          description="Perkuat pemahaman literasi Bahasa Indonesia dan Bahasa Inggris."
          icon="languages"
          :gradientColors="['#F3E8FF', '#E9D5FF']"
          textColor="#581C87"
          :backgroundIconName="Languages"
          link="/snbt/literasi-bahasa"
          section="SNBT"
        />
        <PracticeTypeCard
          title="Literasi Bahasa Inggris"
          description="Perkuat pemahaman literasi Bahasa Indonesia dan Bahasa Inggris."
          icon="languages"
          :gradientColors="['#F3E8FF', '#E9D5FF']"
          textColor="#581C87"
          :backgroundIconName="Languages"
          link="/snbt/literasi-bahasa"
          section="SNBT"
        />
        <PracticeTypeCard
          title="Penalaran Matematika"
          description="Perkuat pemahaman literasi Bahasa Indonesia dan Bahasa Inggris."
          icon="languages"
          :gradientColors="['#808080', '#A9A9AC']"
          textColor="#FFF"
          :backgroundIconName="Pi"
          link="/snbt/literasi-bahasa"
          section="SNBT"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import PracticeTypeCard from "@/components/PracticeTypeCard.vue";
// Import Lucide icons you want to use
import { Brain, BookMarked, Sigma, Languages, Pi, BrainCircuit } from 'lucide-vue-next';

// You might want to define page meta for SEO or layout purposes
// definePageMeta({
//   layout: 'home', // or your default layout
// });
</script>

<style scoped>
/* Add any page-specific styles here */
</style>