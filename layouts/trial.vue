<template>
  <div class="flex items-center">
    <main
      class="md:border-gray-900 md:border-x-2 md:border-dashed"
    >
      <HomepageNavbar />
      <div class="md:max-w-5xl">
        <slot />
      </div>
    </main>
  </div>
</template>
