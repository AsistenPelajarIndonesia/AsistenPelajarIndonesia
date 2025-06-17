<template>
  <NuxtLink :to="link" class="block group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div 
      class="h-full flex flex-col p-6 relative backdrop-blur-md"
      :style="cardStyle"
    >
      <!-- Background shapes (decorative) -->
      <div 
        class="absolute inset-0 opacity-30 overflow-hidden rounded-lg flex items-center justify-end p-4"
      >
        <component :is="backgroundIconName" v-if="backgroundIconName" class="w-24 h-24 opacity-20" :style="{ color: textColor }" />
      </div>

      <div class="relative z-10 flex-grow flex flex-col">
        <span class="inline-block bg-white bg-opacity-30 text-xs font-semibold px-2 py-1 rounded-md mb-3 self-start" :style="{ color: textColor }">
          {{ section }} Section
        </span>
        <h2 class="text-2xl font-bold mb-2" :style="{ color: textColor }">{{ title }}</h2>
        <p class="text-sm mb-4 flex-grow" :style="{ color: textColor, opacity: 0.8 }">
          {{ description }}
        </p>
        <div class="mt-auto">
          <span class="font-semibold text-sm hover:underline" :style="{ color: textColor }">
            Practice &rarr;
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import { computed } from 'vue';
// Assuming you are using lucide-vue-next. Import specific icons or the generic Icon component.
// For example, to use specific icons:
// import { SquarePen } from 'lucide-vue-next';
// Or, if you pass the component instance directly (more advanced):
// const props = defineProps({ backgroundIconComponent: Object, ... });

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true, 
  },
  gradientColors: {
    type: Array,
    default: () => ['#FFD1B3', '#FF9A8B']
  },
  textColor: {
    type: String,
    default: '#5D4037'
  },
  // Changed from backgroundShapeSVG to backgroundIconName
  backgroundIconName: {
    type: Object, // Or String if you resolve the component differently
    default: null 
  },
  link: {
    type: String,
    required: true,
  },
});

const cardStyle = computed(() => ({
  background: `linear-gradient(135deg, ${props.gradientColors[0]} 0%, ${props.gradientColors[1]} 100%)`,
}));

</script>

<style scoped>
/* Minimal styling, relying on Tailwind and inline styles for dynamic colors */
</style>