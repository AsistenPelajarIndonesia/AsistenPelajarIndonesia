<script setup>
const { client } = usePrismic();
const route = useRoute();
console.log(route.params);
const data = ref(null);

// Fetch data directly in ref()
data.value = await client.getByUID(
  route.params.slug[0],
  `${route.params.slug[3]}-${route.params.slug[2]}-${route.params.slug[1]}`
);
</script>

<template>
  <section class="w-full flex flex-col justify-center items-center">
    <div class="overflow-x-hidden max-w-5xl">
      <AudioPlayer src="/audio.mp3" />
      <prismic-rich-text v-if="data" :field="data.data.content" />
      <NuxtLink :to="`/dashboard/practice/${route.params.slug[0]}/${route.params.slug[1]}/${route.params.slug[2]}/${route.params.slug[3]}`" class="floating-button">Lanjut</NuxtLink>
    </div>
  </section>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.overflow-x-hidden {
  overflow-x: hidden;
}
.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: white;
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 16px;
  background-color: black;
  font-weight: bold;
  text-decoration: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
</style>
