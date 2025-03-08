<script setup lang="ts">
function capitalizeFirstLetter(string: string | undefined): string {
  // @ts-ignore
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const route = useRoute();
useHead({
  title: `API | ${capitalizeFirstLetter(route.fullPath.split("/").at(-1))}`,
});
watch(
  route,
  (value) => {
    useHead({
      title: `API | ${capitalizeFirstLetter(route.fullPath.split("/").at(-1))}`,
    });
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <NuxtPage />
</template>
