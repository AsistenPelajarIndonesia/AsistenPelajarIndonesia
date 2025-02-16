<script setup lang="ts">
interface Component {
  title: string;
  progressValue: number;
  starred: boolean;
  description: string;
  defaultCourseContentAccordion: string;
  courseContentAccordion: Array<{
    value: string;
    title: string;
    content: Array<{
      name: any;
      props: {
        title: string;
        target: string;
      };
    }>;
  }>;
}
const selectedJenjang = ref();
const selectedBidang = ref("");
const CPNSMaterialRoute = "/dashboard/material/basic_material/cpns/twk";
const components = ref<Component[]>([
  {
    title: "SNBT",
    starred: false,
    progressValue: 10,
    description: "Siap bersaing? Tes SNBT adalah kunci untuk perguruan tinggi!",
    defaultCourseContentAccordion: "item-1",
    courseContentAccordion: [
      {
        value: "item-1",
        title: "Tes Potensi Skolastik",
        content: [
          {
            name: defineAsyncComponent(
              () => import("~/components/MaterialSection.vue")
            ),
            props: {
              title: "Material Section 1",
              target: "/",
            },
          },
          {
            name: defineAsyncComponent(
              () => import("@/components/PracticeSection.vue")
            ),
            props: {
              title: "Practice Section 1",
              target: "/",
            },
          },
          {
            name: defineAsyncComponent(
              () => import("~/components/MaterialSection.vue")
            ),
            props: {
              title: "Material Section 2",
              target: "/",
            },
          },
          {
            name: defineAsyncComponent(
              () => import("@/components/PracticeSection.vue")
            ),
            props: {
              title: "Practice Section 2",
              target: "/",
            },
          },
        ],
      },
      {
        value: "item-2",
        title: "Literasi",
        content: [
          {
            name: defineAsyncComponent(
              () => import("~/components/MaterialSection.vue")
            ),
            props: {
              title: "Material Section 1",
              target: "/",
            },
          },
          {
            name: defineAsyncComponent(
              () => import("@/components/PracticeSection.vue")
            ),
            props: {
              title: "Practice Section 1",
              target: "/",
            },
          },
          {
            name: defineAsyncComponent(
              () => import("~/components/MaterialSection.vue")
            ),
            props: {
              title: "Material Section 2",
              target: "/",
            },
          },
          {
            name: defineAsyncComponent(
              () => import("@/components/PracticeSection.vue")
            ),
            props: {
              title: "Practice Section 2",
              target: "/",
            },
          },
        ],
      },
    ],
  },
  {
    title: "CPNS",
    starred: true,
    progressValue: 30,
    description:
      "Ujian kompetitif ini adalah gerbang menuju karier yang cemerlang!",
    defaultCourseContentAccordion: "item-1",
    courseContentAccordion: [
      {
        value: "item-1",
        title: "Tes Wawasan Kebangsaan",
        content: [
          {
            name: defineAsyncComponent(
              () => import("~/components/MaterialSection.vue")
            ),
            props: {
              title: "Pancasila",
              target: `${CPNSMaterialRoute}/pancasila`,
            },
          },
          {
            name: defineAsyncComponent(
              () => import("@/components/PracticeSection.vue")
            ),
            props: {
              title: "Sumpah Pemuda",
              target: `${CPNSMaterialRoute}/integritas`,
            },
          },
          {
            name: defineAsyncComponent(
              () => import("@/components/PracticeSection.vue")
            ),
            props: {
              title: "Bela Negara",
              target: `${CPNSMaterialRoute}/integritas`,
            },
          },
          {
            name: defineAsyncComponent(
              () => import("@/components/PracticeSection.vue")
            ),
            props: {
              title: "UUD NRI 1945",
              target: `${CPNSMaterialRoute}/integritas`,
            },
          },
          {
            name: defineAsyncComponent(
              () => import("@/components/PracticeSection.vue")
            ),
            props: {
              title: "Integritas",
              target: `${CPNSMaterialRoute}/integritas`,
            },
          },
          {
            name: defineAsyncComponent(
              () => import("@/components/PracticeSection.vue")
            ),
            props: {
              title: "Nasionalisme",
              target: `${CPNSMaterialRoute}/integritas`,
            },
          },
          {
            name: defineAsyncComponent(
              () => import("@/components/PracticeSection.vue")
            ),
            props: {
              title: "Etika Kerja",
              target: `${CPNSMaterialRoute}/integritas`,
            },
          },
          {
            name: defineAsyncComponent(
              () => import("@/components/PracticeSection.vue")
            ),
            props: {
              title: "Kerahasiaan",
              target: `${CPNSMaterialRoute}/integritas`,
            },
          },
        ],
      },
      {
        value: "item-2",
        title: "Tes Intelegensia Umum",
        content: [
          {
            name: defineAsyncComponent(
              () => import("~/components/MaterialSection.vue")
            ),
            props: {
              title: "Material Section 1",
              target: "/",
            },
          },
          {
            name: defineAsyncComponent(
              () => import("@/components/PracticeSection.vue")
            ),
            props: {
              title: "Practice Section 1",
              target: "/",
            },
          },
        ],
      },
      {
        value: "item-3",
        title: "Tes Karakteristik Pribadi",
        content: [
          {
            name: defineAsyncComponent(
              () => import("~/components/MaterialSection.vue")
            ),
            props: {
              title: "Material Section 1",
              target: "/",
            },
          },
          {
            name: defineAsyncComponent(
              () => import("@/components/PracticeSection.vue")
            ),
            props: {
              title: "Practice Section 1",
              target: "/",
            },
          },
        ],
      },
      {
        value: "item-4",
        title: "Seleksi Kompetensi Bidang",
        content: [
          {
            name: defineAsyncComponent(
              () => import("~/components/MaterialSection.vue")
            ),
            props: {
              title: "Material Section 1",
              target: "/",
            },
          },
          {
            name: defineAsyncComponent(
              () => import("@/components/PracticeSection.vue")
            ),
            props: {
              title: "Practice Section 1",
              target: "/",
            },
          },
        ],
      },
    ],
  },
  {
    title: "TOEFL®",
    starred: false,
    progressValue: 80,
    description: "Tingkatkan kemampuan bahasa Inggrismu dan raih skor tinggi!",
    defaultCourseContentAccordion: "item-1",
    courseContentAccordion: [
      {
        value: "item-1",
        title: "Reading Section",
        content: [
          {
            name: defineAsyncComponent(
              () => import("~/components/MaterialSection.vue")
            ),
            props: {
              title: "Material Section 1",
              target: "/",
            },
          },
          {
            name: defineAsyncComponent(
              () => import("@/components/PracticeSection.vue")
            ),
            props: {
              title: "Practice Section 1",
              target: "/",
            },
          },
        ],
      },
      {
        value: "item-2",
        title: "Writing Section",
        content: [
          {
            name: defineAsyncComponent(
              () => import("~/components/MaterialSection.vue")
            ),
            props: {
              title: "Material Section 1",
              target: "/",
            },
          },
          {
            name: defineAsyncComponent(
              () => import("@/components/PracticeSection.vue")
            ),
            props: {
              title: "Practice Section 1",
              target: "/",
            },
          },
        ],
      },
      {
        value: "item-3",
        title: "Listening Section",
        content: [
          {
            name: defineAsyncComponent(
              () => import("~/components/MaterialSection.vue")
            ),
            props: {
              title: "Material Section 1",
              target: "/",
            },
          },
          {
            name: defineAsyncComponent(
              () => import("@/components/PracticeSection.vue")
            ),
            props: {
              title: "Practice Section 1",
              target: "/",
            },
          },
        ],
      },
      {
        value: "item-4",
        title: "Speaking Section",
        content: [
          {
            name: defineAsyncComponent(
              () => import("~/components/MaterialSection.vue")
            ),
            props: {
              title: "Material Section 1",
              target: "/",
            },
          },
          {
            name: defineAsyncComponent(
              () => import("@/components/PracticeSection.vue")
            ),
            props: {
              title: "Practice Section 1",
              target: "/",
            },
          },
        ],
      },
    ],
  },
  {
    title: "IELTS®",
    starred: true,
    progressValue: 70,
    description:
      "Membuka pintu menuju pendidikan dan peluang karier internasional!",
    defaultCourseContentAccordion: "item-1",
    courseContentAccordion: [
      {
        value: "item-1",
        title: "Reading Section",
        content: [
          {
            name: defineAsyncComponent(
              () => import("~/components/MaterialSection.vue")
            ),
            props: {
              title: "Material Section 1",
              target: "/",
            },
          },
          {
            name: defineAsyncComponent(
              () => import("@/components/PracticeSection.vue")
            ),
            props: {
              title: "Practice Section 1",
              target: "/",
            },
          },
        ],
      },
      {
        value: "item-2",
        title: "Writing Section",
        content: [
          {
            name: defineAsyncComponent(
              () => import("~/components/MaterialSection.vue")
            ),
            props: {
              title: "Material Section 1",
              target: "/",
            },
          },
          {
            name: defineAsyncComponent(
              () => import("@/components/PracticeSection.vue")
            ),
            props: {
              title: "Practice Section 1",
              target: "/",
            },
          },
        ],
      },
      {
        value: "item-3",
        title: "Listening Section",
        content: [
          {
            name: defineAsyncComponent(
              () => import("~/components/MaterialSection.vue")
            ),
            props: {
              title: "Material Section 1",
              target: "/",
            },
          },
          {
            name: defineAsyncComponent(
              () => import("@/components/PracticeSection.vue")
            ),
            props: {
              title: "Practice Section 1",
              target: "/",
            },
          },
        ],
      },
      {
        value: "item-4",
        title: "Speaking Section",
        content: [
          {
            name: defineAsyncComponent(
              () => import("~/components/MaterialSection.vue")
            ),
            props: {
              title: "Material Section 1",
              target: "/",
            },
          },
          {
            name: defineAsyncComponent(
              () => import("@/components/PracticeSection.vue")
            ),
            props: {
              title: "Practice Section 1",
              target: "/",
            },
          },
        ],
      },
    ],
  },
]);

const sortedComponents = ref<Component[]>([]);

function sortByStarred(): void {
  sortedComponents.value = [...components.value].sort(
    (a, b) => Number(b.starred) - Number(a.starred)
  );
}

watch(components, sortByStarred, { deep: true, immediate: true });
onMounted(() => {
  sortByStarred();
});
</script>

<template>
  <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
    <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card v-for="component in sortedComponents" :key="component.title">
        <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <div class="text-2xl font-bold">{{ component.title }}</div>
          <LucideStar
            :size="16"
            fill="#FFD700"
            v-if="component.starred"
            @click="component.starred = !component.starred"
          />
          <LucideStar
            :size="16"
            v-else
            @click="component.starred = !component.starred"
          />
        </CardHeader>
        <CardContent>
          <Progress :model-value="component.progressValue" />
          <div
            v-if="component.title === 'OSN'"
            class="flex flex-col gap-1 mt-2"
          >
            <Select v-model="selectedJenjang">
              <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Pilih Jenjang" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Jenjang</SelectLabel>
                  <SelectItem value="SD"> SD </SelectItem>
                  <SelectItem value="SMP"> SMP </SelectItem>
                  <SelectItem value="SMA"> SMA </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select v-model="selectedBidang" v-if="selectedJenjang === 'SD'">
              <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Pilih Bidang" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Pilih Bidang</SelectLabel>
                  <SelectItem value="IPA"> IPA </SelectItem>
                  <SelectItem value="Matematika"> Matematika </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select v-model="selectedBidang" v-if="selectedJenjang === 'SMP'">
              <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Pilih Bidang" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Pilih Bidang</SelectLabel>
                  <SelectItem value="IPA"> IPA </SelectItem>
                  <SelectItem value="IPS"> IPS </SelectItem>
                  <SelectItem value="Matematika"> Matematika </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select v-model="selectedBidang" v-if="selectedJenjang === 'SMA'">
              <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Pilih Bidang" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Pilih Bidang</SelectLabel>
                  <SelectItem value="Astronomi"> Astronomi </SelectItem>
                  <SelectItem value="Biologi"> Biologi </SelectItem>
                  <SelectItem value="Ekonomi"> Ekonomi </SelectItem>
                  <SelectItem value="Fisika"> Fisika </SelectItem>
                  <SelectItem value="Geografi"> Geografi </SelectItem>
                  <SelectItem value="Informatika"> Informatika </SelectItem>
                  <SelectItem value="Kebumian"> Kebumian </SelectItem>
                  <SelectItem value="Matematika"> Matematika </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div v-if="selectedBidang !== ''">
              <Button>Mulai</Button>
            </div>
          </div>
          <Accordion type="single" class="w-full" collapsible v-else>
            <AccordionItem
              v-for="item in component.courseContentAccordion"
              :key="item.value"
              :value="item.value"
            >
              <AccordionTrigger>{{ item.title }}</AccordionTrigger>
              <AccordionContent>
                <div class="flex flex-col gap-1">
                  <div v-for="(component, index) in item.content" :key="index">
                    <component :is="component.name" v-bind="component.props" />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  </main>
</template>
