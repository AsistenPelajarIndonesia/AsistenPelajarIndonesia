<template>
  <div class="flex items-center gap-2 p-2 border-b border-border bg-muted/50 rounded-t-md">
    <Button variant="outline" size="sm" @click="$emit('format', 'bold')" title="Bold">
      <LucideBold class="w-4 h-4" />
    </Button>
    <Button variant="outline" size="sm" @click="$emit('format', 'italic')" title="Italic">
      <LucideItalic class="w-4 h-4" />
    </Button>
    <Button variant="outline" size="sm" @click="$emit('format', 'underline')" title="Underline">
      <LucideUnderline class="w-4 h-4" />
    </Button>
    <!-- Add more buttons for other markdown/formatting options as needed -->
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
// Assuming you have lucide-vue-next or similar for icons
import { Bold as LucideBold, Italic as LucideItalic, Underline as LucideUnderline } from 'lucide-vue-next';

defineEmits(['format']);
</script>