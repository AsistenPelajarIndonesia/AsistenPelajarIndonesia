<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const id = route.query.id;
</script>

<template>
  <div
    class="flex justify-between items-center"
    style="padding: 0.5rem !important"
  >
    <div class="flex gap-1">
      <Button variant="secondary" size="icon">
        <LucideArrowLeft />
      </Button>
      <Button variant="outline" size="icon">
        <LucideHome />
      </Button>
    </div>
    <div>
      <NuxtLink to="/" class="mr-6 flex items-center space-x-2">
        <img class="h-6 w-6" src="/logo.svg" />
        <span class="font-bold sm:inline-block">AkademiPelajar</span>
      </NuxtLink>
    </div>
    <Button variant="secondary">
      <LucideArrowRight />
    </Button>
  </div>
  <iframe :src="id" class="fullscreen-iframe"></iframe>
</template>

<style>
.fullscreen-iframe {
  width: 100vw; /* Full width of viewport */
  height: 100vh; /* Full height of viewport */
  border: none; /* Remove default border */
  margin: 0;
  padding: 0;
  z-index: 9999; /* Optional: Bring to front */
}
</style>
