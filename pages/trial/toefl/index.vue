<template>
  <div class="container px-4 py-8 min-h-screen w-7xl md:max-w-5xl">

    <div
      class="flex flex-col md:flex-row items-center gap-2 m-4"
    >
      <NuxtLink to="/trial/toefl/reading">
        <Card
          class="flex w-full flex-col p-8 gap-2 items-center justify-center hover:opacity-75"
        >
          <LucideBook :size="162" />
          <CardTitle class="text-2xl font-bold">Reading</CardTitle>
        </Card>
      </NuxtLink>
      <NuxtLink to="/trial/toefl/listening">
        <Card
          class="flex w-full flex-col p-8 gap-2 items-center justify-center hover:opacity-75"
        >
          <LucideAudioLines :size="162" />
          <CardTitle class="text-2xl font-bold">Listening</CardTitle>
        </Card>
      </NuxtLink>
      <NuxtLink to="/trial/toefl/writing">
        <Card
          class="flex w-full flex-col p-8 gap-2 items-center justify-center hover:opacity-75"
        >
          <LucideSquarePen :size="162" />
          <CardTitle class="text-2xl font-bold">Writing</CardTitle>
        </Card>
      </NuxtLink>
      <NuxtLink to="/trial/toefl/speaking">
        <Card
          class="flex w-full flex-col p-8 gap-2 items-center justify-center hover:opacity-75"
        >
          <LucideMic :size="162" />
          <CardTitle class="text-2xl font-bold">Speaking</CardTitle>
        </Card>
      </NuxtLink>
    </div>
  </div>
</template>
