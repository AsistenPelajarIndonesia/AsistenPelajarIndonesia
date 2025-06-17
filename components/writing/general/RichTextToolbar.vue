<template>
  <div class="flex items-center gap-2 p-2 border rounded-md bg-background">
    <Button variant="outline" size="sm" @click="$emit('format', 'bold')" title="Bold">
      <Bold class="w-4 h-4" />
    </Button>
    <Button variant="outline" size="sm" @click="$emit('format', 'italic')" title="Italic">
      <Italic class="w-4 h-4" />
    </Button>
    <Button variant="outline" size="sm" @click="$emit('format', 'underline')" title="Underline">
      <Underline class="w-4 h-4" />
    </Button>
    <!-- Add more buttons for lists, headings etc. as needed -->
  </div>
</template>

<script setup lang="ts">
import { Bold, Italic, Underline } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';

defineEmits(['format']);
</script>