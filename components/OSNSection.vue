<template>
  <main class="flex flex-col justify-center md:flex-row items-center">
    <div class="max-w-2xl flex flex-col gap-4">
      <h1
        class="text-4xl font-bold"
        style="font-family: Arial, Helvetica, sans-serif"
      >
        OSN: Petualangan Pikiran, Perjalanan Menuju Bintang!
      </h1>
      <p>
        Lepaskan batasan dan jelajahi jagad ide yang menakjubkan. Di OSN, setiap
        langkah adalah perjalanan menembus langit pengetahuan dan meraih
        bintang!
      </p>
      <NuxtLink to="/trial/osn"
        ><Button>Free Test Simulation <LucideChevronsRight /> </Button
      ></NuxtLink>
    </div>
    <div
      class="relative flex w-full flex-col items-center justify-center min-h-[300px]"
    >
        <OSNIconCloud />
    </div>
  </main>
</template>
