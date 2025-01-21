<template>
  <div class="flex flex-col md:flex-row items-center gap-2 m-4">
    <Card class="flex w-full flex-col p-8 gap-2 items-center justify-center bg-blue-900">
      <LucideBook :size="102" />
      <CardTitle class="text-2xl font-bold">Reading</CardTitle>
    </Card>
    <Card class="flex w-full flex-col p-8 gap-2 items-center justify-center bg-blue-900">
      <LucideAudioLines :size="102" />
      <CardTitle class="text-2xl font-bold">Listening</CardTitle>
    </Card>
    <Card class="flex w-full flex-col p-8 gap-2 items-center justify-center bg-blue-900">
      <LucideSquarePen :size="102" />
      <CardTitle class="text-2xl font-bold">Writing</CardTitle>
    </Card>
    <Card class="flex w-full flex-col p-8 gap-2 items-center justify-center bg-blue-900">
      <LucideMic :size="102" />
      <CardTitle class="text-2xl font-bold">Speaking</CardTitle>
    </Card>
  </div>
</template>
