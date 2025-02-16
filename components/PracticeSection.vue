<script setup lang="ts">
defineProps({
  title: String,
  target: String,
});
</script>

<template>
  <section class="flex justify-between items-center my-1">
    <div class="flex justify-center items-center gap-1">
      <LucidePenSquare />
      <h3>
        {{ title }}
      </h3>
    </div>
    <NuxtLink :to="target">
        <Button variant="outline"><LucidePlayCircle /></Button>
    </NuxtLink>
  </section>
</template>
