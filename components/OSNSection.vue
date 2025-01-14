<template>
  <main class="flex flex-col justify-center md:flex-row items-center">
    <div class="max-w-2xl flex flex-col gap-4">
      <h1
        class="text-4xl font-bold"
        style="font-family: Arial, Helvetica, sans-serif"
      >
        Raih Mimpi, Tembus Kampus Impian!
      </h1>
      <p>
        Lolos SNBT/SNBP Lebih Mudah dengan AI! Persiapkan dirimu dengan latihan
        cerdas, analisis akurat, dan strategi jitu. Raih kampus impianmu
        sekarang!
      </p>
      <Button>Free Test Simulation <LucideChevronsRight /> </Button>
    </div>
    <div
      class="relative flex w-full flex-col items-center justify-center md:shadow-xl min-h-[300px]"
    >
      <div class="flex items-center justify-center p-4">
        <AnimateGrid :cards>
          <template #logo="{ logo }">
            <img class="logo h-10" :src="logo" />
          </template>
        </AnimateGrid>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
const cards = [
  { logo: "/TU.png" },
  { logo: "/UNAIR.png" },
  { logo: "/UNUD.png" },
  { logo: "/IPB.png" },
  { logo: "/UI.png" },
  { logo: "/ITS.png" },
  { logo: "/BINUS.png" },
  { logo: "/UGM.png" },
  { logo: "/ITB.png" },
  { logo: "/UNHAS.png" },
  { logo: "/UNRAM.png" },
  { logo: "/UNS.png" },
  { logo: "/UINSA.png" },
  { logo: "/UNPAD.png" },
  { logo: "/UNAND.png" },
  { logo: "/UNMUL.png" },
];
</script>
