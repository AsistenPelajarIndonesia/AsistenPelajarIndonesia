<template>
  <div class="p-4 bg-white rounded-xl shadow">
    <ul class="space-y-2">
      <li
        v-for="(chapter, chapterTitle) in tocData"
        :key="chapterTitle"
      >
        <div
          class="flex items-center justify-between cursor-pointer"
          @click="toggle(chapterTitle)"
        >
          <div class="flex items-center space-x-2">
            <FolderIcon class="w-5 h-5 text-gray-600" />
            <span class="font-semibold text-gray-800">{{ chapterTitle }}</span>
          </div>
          <svg
            v-if="isOpen(chapterTitle)"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-gray-600 transform rotate-90"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>

        <ul
          v-if="isOpen(chapterTitle)"
          class="mt-1 ml-6 space-y-1"
        >
          <li
            v-for="(pageRange, subTitle) in chapter.subsections"
            :key="subTitle"
            class="flex items-center space-x-2 text-gray-700"
          >
            <DocumentIcon class="w-4 h-4 text-gray-500" />
            <span>{{ subTitle }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  tocData: {
    type: Object,
    required: true
  }
})

const openChapters = ref([])

function toggle(title) {
  if (openChapters.value.includes(title)) {
    openChapters.value = openChapters.value.filter(t => t !== title)
  } else {
    openChapters.value.push(title)
  }
}

function isOpen(title) {
  return openChapters.value.includes(title)
}
</script>

<style scoped>
/* customize colors or spacing if needed */
</style>
