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
      class="relative flex w-full flex-col items-center justify-center min-h-[300px]"
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
  { logo: "/assets/university/TU.webp" },
  { logo: "/assets/university/UNAIR.webp" },
  { logo: "/assets/university/UNUD.webp" },
  { logo: "/assets/university/IPB.webp" },
  { logo: "/assets/university/UI.webp" },
  { logo: "/assets/university/ITS.webp" },
  { logo: "/assets/university/BINUS.webp" },
  { logo: "/assets/university/UGM.webp" },
  { logo: "/assets/university/ITB.webp" },
  { logo: "/assets/university/UNHAS.webp" },
  { logo: "/assets/university/UNRAM.webp" },
  { logo: "/assets/university/UNS.webp" },
  { logo: "/assets/university/UINSA.webp" },
  { logo: "/assets/university/UNPAD.webp" },
  { logo: "/assets/university/UNAND.webp" },
  { logo: "/assets/university/UNMUL.webp" },
];
</script>
