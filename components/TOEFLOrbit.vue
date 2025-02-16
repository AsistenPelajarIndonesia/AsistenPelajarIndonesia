<template>
  <main class="flex flex-col justify-center md:flex-row items-center">
    <div class="max-w-2xl flex flex-col gap-4">
      <h1
        class="text-4xl font-bold"
        style="font-family: Arial, Helvetica, sans-serif"
      >
        TOEFL: Ujian, Peluang, Sukses!
      </h1>
      <p>
        Taklukkan TOEFL dan buka pintu dunia! Tunjukkan kemampuan bahasa
        Inggrismu dan raih skor impian. Berlatih sekarang, masa depan cerah
        menantimu!
      </p>
      <Button>Free Test Simulation <LucideChevronsRight /> </Button>
    </div>
    <div
      class="relative flex w-full flex-col items-center justify-center min-h-[300px]"
    >
      <span
        class="pointer-events-none text-center text-8xl font-semibold leading-none"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/9c/TOEFL_Logo.svg"
          width="70"
          alt=""
        />
      </span>

      <Orbit
        v-for="feature in features"
        class="size-[30px] items-center justify-center border-none bg-transparent"
        :duration="20"
        :delay="feature.delay"
        :radius="feature.radius"
        path
        :direction="feature.direction"
      >
        <NuxtLink :to="feature.link">
          <Button variant="link" v-html="feature.iconSVG" class="dark:text-white">
          </Button>
        </NuxtLink>
      </Orbit>
    </div>
  </main>
</template>

<script>
import { ORBIT_DIRECTION, Orbit } from "@/components/ui/Orbit";

export default {
  data() {
    return {
      features: [
        {
          name: "Reading",
          icon: "book-open-text",
          iconSVG: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-text"><path d="M12 7v14"/><path d="M16 12h2"/><path d="M16 8h2"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/><path d="M6 12h2"/><path d="M6 8h2"/></svg>`,
          radius: 50,
          delay: 10,
          direction: ORBIT_DIRECTION.Clockwise,
          link: "/trial/toefl/reading",
        },
        {
          name: "Speaking",
          icon: "speech",
          iconSVG: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-speech"><path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20"/><path d="M19.8 17.8a7.5 7.5 0 0 0 .003-10.603"/><path d="M17 15a3.5 3.5 0 0 0-.025-4.975"/></svg>`,
          radius: 75,
          delay: 30,
          direction: ORBIT_DIRECTION.CounterClockwise,
          link: "/trial/toefl/speaking",
        },
        {
          name: "Writing",
          icon: "square-pen",
          iconSVG: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>`,
          radius: 100,
          delay: 40,
          direction: ORBIT_DIRECTION.Clockwise,
          link: "/trial/toefl/writing"
        },
        {
          name: "Listening",
          icon: "audio-lines",
          iconSVG: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-audio-lines"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/></svg>`,
          radius: 125,
          delay: 80,
          direction: ORBIT_DIRECTION.CounterClockwise,
          link: "/trial/toefl/listening",
        },
      ],
      a: "<b>bold text here</b>",
      hoveredFeature: null,
    };
  },
  methods: {
    showDetails(index) {
      this.hoveredFeature = index;
    },
    goToFeature(index) {
      this.$router.push(this.features[index].link);
    },
  },
};
</script>
