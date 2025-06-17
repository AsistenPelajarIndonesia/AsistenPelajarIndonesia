<script setup lang="ts">
useHead({
  title: `API | Beranda`,
  meta: [
    {
      name: "Halaman Utama",
      content: "Halaman utama asisten pelajar indonesia",
    },
  ],
});
const scrollToTarget = () => {
  const target = document.getElementById("target");
  target.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
};
</script>

<template>
  <div class="flex justify-center items-center">
    <main
      class="border-gray-900 max-w-5xl"
      style="padding-left: 1rem !important; padding-right: 1rem !important"
    >
      <HomepageNavbar />
      <div class="landing-page">
        <div class="content flex flex-col gap-2">
          <section class="flex items-center justify-center gap-1">
            <div
              class="inline-flex items-center space-x-2 dark:bg-gray-800/50 border border-gray-700 rounded-full px-4 py-2"
            >
              <span class="text-sm text-primary dark:text-gray-300"
                >✨ Welcome to the beta version!</span
              >
            </div>
          </section>
          <h1 class="font-extrabold text-6xl dark:text-white">
            Ujian Bukan Masalah, <br />
            Mari Lolos
            <FlipWords
              :words="['SNBT!', 'TOEFL!', 'IELTS!']"
              :duration="2500"
              class="text-6xl !text-primary"
            />
          </h1>
          <p class="font-extralight text-lg dark:text-gray-300 max-w-3xl">
            Belajar Lebih Fokus, Lebih Seru, dan Gak Bikin Bingung – Bareng
            Akademi Pelajar dan Teknologi AI Terkini
          </p>
          <section class="flex gap-2 justify-center items-center">
            <SignedOut>
              <CTADialog />
            </SignedOut>
            <SignedIn>
              <NuxtLink to="/dashboard">
                <Button
                  class="text-xl shadow-2xl font-bold font-sans"
                  style="padding: 0.9rem !important"
                  >Dashboard</Button
                >
              </NuxtLink>
            </SignedIn>
            <Button
              variant="outline"
              class="text-xl shadow-2xl font-bold font-sans"
              style="padding: 0.9rem !important"
              @click="scrollToTarget"
            >
              Jelajahi
              <LucideTelescope style="padding-left: 0.2rem" />
            </Button>
          </section>
        </div>
      </div>
      <TOEFLOrbit />
      <div id="target"></div>
      <SNBTSection />
      <IELTSOrbit />
      <HomepageFooter />
    </main>
  </div>
</template>

<style scoped>
body,
html {
  height: 100%;
  width: 100%;
  font-family: Arial, sans-serif;
  overflow: hidden;
  margin: 0;
  padding: 0;
  background: #0f0c29;
}

.landing-page {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  position: relative;
  text-align: center;
}
</style>
