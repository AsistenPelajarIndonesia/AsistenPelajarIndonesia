<template>
  <Dialog>
    <DialogTrigger asChild>
      <Button
        class="text-xl font-bold font-sans shadow-2xl"
        style="padding: 0.8rem !important"
        >Coba Gratis!
      </Button>
    </DialogTrigger>
    <DialogContent
      class="w-[90vw] max-w-[800px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]"
    >
      <DialogHeader class="p-6 pb-0">
        <DialogTitle class="text-xl md:text-2xl font-bold"
          >Pilih Jenis Ujian</DialogTitle
        >
        <DialogDescription class="text-sm md:text-base">
          Pilih jenis ujian yang ingin kamu pelajari
        </DialogDescription>
      </DialogHeader>
      <div class="overflow-y-auto px-6 py-4">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
        >
          <NuxtLink to="/osn" class="w-full">
            <Button
              class="w-full h-24 md:h-32 flex flex-col gap-1 md:gap-2"
              variant="outline"
            >
              <LucideDraftingCompass class="w-6 h-6 md:w-8 md:h-8" />
              <span class="text-lg font-semibold">OSN</span>
            </Button>
          </NuxtLink>
          <NuxtLink to="/dashboard" class="w-full">
            <Button
              class="w-full h-24 md:h-32 flex flex-col gap-1 md:gap-2"
              variant="outline"
            >
              <LucideGraduationCap class="w-6 h-6 md:w-8 md:h-8" />
              <span class="text-lg font-semibold">SNBT</span>
            </Button>
          </NuxtLink>
          <NuxtLink to="/toefl" class="w-full">
            <Button
              class="w-full h-24 md:h-32 flex flex-col gap-1 md:gap-2"
              variant="outline"
            >
              <LucideLanguages class="w-6 h-6 md:w-8 md:h-8" />
              <span class="text-lg font-semibold">TOEFL</span>
            </Button>
          </NuxtLink>
          <NuxtLink to="/dashboard/tests/ielts" class="w-full">
            <Button
              class="w-full h-24 md:h-32 flex flex-col gap-1 md:gap-2"
              variant="outline"
            >
              <LucideCheck class="w-6 h-6 md:w-8 md:h-8" />
              <span class="text-lg font-semibold">IELTS</span>
            </Button>
          </NuxtLink>
          <NuxtLink to="/cpns" class="w-full">
            <Button
              class="w-full h-24 md:h-32 flex flex-col gap-1 md:gap-2"
              variant="outline"
            >
              <LucideBriefcase class="w-6 h-6 md:w-8 md:h-8" />
              <span class="text-lg font-semibold">CPNS</span>
            </Button>
          </NuxtLink>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
</script>
