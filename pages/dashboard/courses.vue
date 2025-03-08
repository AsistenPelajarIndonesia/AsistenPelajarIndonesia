<script setup lang="ts">
interface Course {
  starred: boolean;
  courseDataType: string;
  courseCodeName: string;
  sections: Array<{
    courseSubSection: string;
    contents: Array<string>;
  }>;
}
const CPNSTWK = [
  "Pancasila",
  "Sumpah Pemuda",
  "Bela Negara",
  "UUD NRI 1945",
  "Integritas",
  "Nasionalisme",
  "Etika Kerja",
  "Kerahasiaan",
];
const selectedJenjang = ref();
const selectedBidang = ref("");
const courses = ref<Course[]>([
  {
    starred: false,
    courseDataType: "basic_material",
    courseCodeName: "cpns",
    sections: [
      {
        courseSubSection: "Tes Wawasan Kebangsaan",
        contents: CPNSTWK,
      },
      {
        courseSubSection: "Tes Intelegensia Umum",
        contents: CPNSTWK,
      },
      {
        courseSubSection: "Tes Karakteristik Pribadi",
        contents: CPNSTWK,
      },
      {
        courseSubSection: "Seleksi Kompetensi Bidang",
        contents: CPNSTWK,
      },
    ],
  },
  {
    starred: false,
    courseDataType: "basic_material",
    courseCodeName: "snbt tps",
    sections: [
      {
        courseSubSection: "Penalaran Umum",
        contents: CPNSTWK,
      },
      {
        courseSubSection: "Pengetahuan & Pemahaman Umum ",
        contents: CPNSTWK,
      },
      {
        courseSubSection: "Pemahaman Bacaan & Menulis",
        contents: CPNSTWK,
      },
      {
        courseSubSection: "Penalaran Kuantitatif",
        contents: CPNSTWK,
      },
    ],
  },
  {
    starred: false,
    courseDataType: "basic_material",
    courseCodeName: "snbt literasi",
    sections: [
      {
        courseSubSection: "Literasi Bahasa Indonesia",
        contents: CPNSTWK,
      },
      {
        courseSubSection: "Literasi Bahasa Inggris",
        contents: CPNSTWK,
      },
      {
        courseSubSection: "Penalaran Matematika",
        contents: CPNSTWK,
      },
    ],
  },
  {
    starred: false,
    courseDataType: "basic_material",
    courseCodeName: "ielts",
    sections: [
      {
        courseSubSection: "Reading",
        contents: CPNSTWK,
      },
      {
        courseSubSection: "Writing",
        contents: CPNSTWK,
      },
      {
        courseSubSection: "Listening",
        contents: CPNSTWK,
      },
      {
        courseSubSection: "Speaking",
        contents: CPNSTWK,
      },
    ],
  },
  {
    starred: true,
    courseDataType: "basic_material",
    courseCodeName: "toefl",
    sections: [
      {
        courseSubSection: "Reading",
        contents: CPNSTWK,
      },
      {
        courseSubSection: "Writing",
        contents: CPNSTWK,
      },
      {
        courseSubSection: "Listening",
        contents: CPNSTWK,
      },
      {
        courseSubSection: "Speaking",
        contents: CPNSTWK,
      },
    ],
  },
]);
function convertString(str: string) {
  return str.toLowerCase().replace(/\s+/g, "-");
}
const sortedComponents = ref<Course[]>([]);

function sortByStarred(): void {
  sortedComponents.value = [...courses.value].sort(
    (a, b) => Number(b.starred) - Number(a.starred)
  );
}

watch(courses, sortByStarred, { deep: true, immediate: true });
onMounted(() => {
  sortByStarred();
});
</script>

<template>
  <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
    <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      <Card v-for="course in sortedComponents" class="p-4" :key="course.courseCodeName">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold font-serif">
            {{ course.courseCodeName.toUpperCase() }}
          </h1>
          <LucideStar
            :size="16"
            fill="#FFD700"
            v-if="course.starred"
            @click="course.starred = !course.starred"
          />
          <LucideStar
            :size="16"
            v-else
            @click="course.starred = !course.starred"
          />
        </div>
        <div v-for="section in course.sections">
          <Accordion type="single" collapsible>
            <AccordionItem :value="section.courseSubSection">
              <AccordionTrigger
                ><div>
                  <h1>{{ section.courseSubSection.toUpperCase() }}</h1>
                </div>
              </AccordionTrigger>
              <AccordionContent
                class="flex flex-col gap-3"
                :value="content"
                v-for="content in section.contents"
              >
                <div class="flex justify-between items-center">
                  <p><Badge variant="default">Materi</Badge> {{ content }}</p>
                  <NuxtLink
                    :to="`/dashboard/material/${course.courseDataType}/${course.courseCodeName}/${section.courseSubSection}/${convertString(content)}`"
                    ><Button variant="default"><LucideBookOpen /></Button
                  ></NuxtLink>
                </div>
                <div class="flex justify-between items-center">
                  <p>
                    <Badge variant="secondary">Latihan</Badge> {{ content }}
                  </p>
                  <NuxtLink
                    :to="`/dashboard/practice/${course.courseDataType}/${course.courseCodeName}/${section.courseSubSection}/${convertString(content)}`"
                    ><Button variant="secondary"><LucideSquarePen /></Button>
                  </NuxtLink>
                </div>
              </AccordionContent>
              <AccordionContent>
                <div class="flex justify-between items-center">
                  <p>
                    <Badge variant="destructive">Simulasi</Badge> Simulasi Tes
                  </p>
                  <NuxtLink
                    :to="`/dashboard/practice/${course.courseDataType}/${course.courseCodeName}/${section.courseSubSection}/`"
                    ><Button variant="destructive"><LucidePlayCircle /></Button>
                  </NuxtLink>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Card>
    </div>
  </main>
</template>
