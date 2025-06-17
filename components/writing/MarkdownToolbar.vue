<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Bold, Italic } from 'lucide-vue-next';

const emit = defineEmits(['format']);

const applyFormat = (format: 'bold' | 'italic') => {
  emit('format', format);
};
</script>

<template>
  <div class="flex items-center space-x-1 border border-slate-200 dark:border-slate-700 rounded-md p-1 mb-2 bg-slate-50 dark:bg-slate-800">
    <Button variant="ghost" size="sm" @click="applyFormat('bold')" title="Bold (Ctrl+B)">
      <Bold class="h-4 w-4" />
    </Button>
    <Button variant="ghost" size="sm" @click="applyFormat('italic')" title="Italic (Ctrl+I)">
      <Italic class="h-4 w-4" />
    </Button>
    <!-- Add more buttons for other markdown features like lists, links etc. -->
  </div>
</template>