<script></script>
<template>
  <ClientOnly> <PricingTable /></ClientOnly>
  <div class="flex justify-center items-center">
    <main class="max-w-5xl min-w-5xl">
      <div class="flex flex-col items-center justify-center my-6">
        <h1 class="text-5xl font-serif font-bold">SD</h1>
      </div>
      <section class="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        <OSNCard title="IPA" badgeContent="Tryout">
          <LucideMicroscope :size="102" />
        </OSNCard>
        <OSNCard title="MATEMATIKA" badgeContent="Tryout">
          <LucideDraftingCompass :size="102" />
        </OSNCard>
      </section>
      <div class="flex flex-col items-center justify-center my-6">
        <h1 class="text-5xl font-serif font-bold">SMP</h1>
      </div>
      <section class="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        <OSNCard title="IPA" badgeContent="Tryout">
          <LucideMicroscope :size="102" />
        </OSNCard>
        <OSNCard title="IPS" badgeContent="Tryout">
          <LucideHandshake :size="102" />
        </OSNCard>
        <OSNCard title="MATEMATIKA" badgeContent="Tryout">
          <LucideDraftingCompass :size="102" />
        </OSNCard>
      </section>
      <div class="flex flex-col items-center justify-center my-6">
        <h1 class="text-5xl font-serif font-bold">SMA</h1>
      </div>
      <section class="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        <OSNCard title="ASTRONOMI" badgeContent="Tryout">
          <LucideRocket :size="102" />
        </OSNCard>
        <OSNCard title="BIOLOGI" badgeContent="Tryout">
          <LucideFlaskConical :size="102" />
        </OSNCard>
        <OSNCard title="EKONOMI" badgeContent="Tryout">
          <LucideCircleDollarSign :size="102" />
        </OSNCard>
        <OSNCard title="FISIKA" badgeContent="Tryout">
          <LucideAtom :size="102" />
        </OSNCard>
        <OSNCard title="GEOGRAFI" badgeContent="Tryout">
          <LucideMapPinned :size="102" />
        </OSNCard>
        <OSNCard title="KOMPUTER" badgeContent="Tryout">
          <LucideBinary :size="102" />
        </OSNCard>
        <OSNCard title="KEBUMIAN" badgeContent="Tryout">
          <LucideEarth :size="102" />
        </OSNCard>
        <OSNCard title="MATEMATIKA" badgeContent="Tryout">
          <LucideDraftingCompass :size="102" />
        </OSNCard>
      </section>
    </main>
  </div>
</template>
