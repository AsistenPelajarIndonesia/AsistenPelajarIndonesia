<script setup lang="ts">
// Get the Prismic client provided by the Nuxt module
const { client } = usePrismic();


// Use the fetch parameter to only load the UID and title fields.
// Note: Adjust the field paths as necessary based on your custom type.
// For instance, if your custom type is "article", you might use ['my.article.title'].
const data = await client.getAllByType("osn_sd_ipa", {
  fetch: ['my.osn_sd_ipa.title']
})

</script>

<template>
  <div>
    <h1>Document List</h1>
    <ul>
        {{data}}
    </ul>
  </div>
</template>
