<script setup lang="ts">
const route = useRoute()

function capitalizeFirstLetter(string: string | undefined) : string {
    // @ts-ignore
    return string.charAt(0).toUpperCase() + string.slice(1);
}

definePageMeta({
    middleware: 'auth'
})
useHead({
    title: `API | ${capitalizeFirstLetter(route.fullPath.split("/").at(-1))}`
})
watch(route, value => {
    useHead({
        title: `API | ${capitalizeFirstLetter(route.fullPath.split("/").at(-1))}`
    })
  }, {deep: true, immediate: true})
const layout = "dashboard"
</script>

<template>
    <NuxtLayout :name="layout">
        <NuxtPage />
    </NuxtLayout>
</template>