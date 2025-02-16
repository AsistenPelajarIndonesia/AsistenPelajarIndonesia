<script setup lang="ts">
interface Component {
  title: string;
  progressValue: number;
  starred: boolean;
  description: string;
  defaultCourseContentAccordion: string;
  color: string;
  courseContentAccordion: Array<{
    value: string;
    title: string;
    color: string;
    completed: boolean;
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
    color: "violet",
    starred: false,
    progressValue: 10,
    description: "Siap bersaing? Tes SNBT adalah kunci untuk perguruan tinggi!",
    defaultCourseContentAccordion: "item-1",
    courseContentAccordion: [
      {
        color: "green",
        value: "item-1",
        title: "Tes Potensi Skolastik",
        completed: true,
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
        color: "red",
        value: "item-2",
        title: "Literasi",
        completed: false,
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
    color: "violet",
    starred: true,
    progressValue: 30,
    description:
      "Ujian kompetitif ini adalah gerbang menuju karier yang cemerlang!",
    defaultCourseContentAccordion: "item-1",
    courseContentAccordion: [
      {
        color: "blue",
        value: "item-1",
        title: "Tes Wawasan Kebangsaan",
        completed: false,
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
        color: "green",
        value: "item-2",
        title: "Tes Intelegensia Umum",
        completed: false,
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
        color: "green",
        value: "item-3",
        title: "Tes Karakteristik Pribadi",
        completed: false,
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
        color: "green",
        value: "item-4",
        title: "Seleksi Kompetensi Bidang",
        completed: false,
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
    color: "violet",
    starred: false,
    progressValue: 80,
    description: "Tingkatkan kemampuan bahasa Inggrismu dan raih skor tinggi!",
    defaultCourseContentAccordion: "item-1",
    courseContentAccordion: [
      {
        color: "green",
        value: "item-1",
        title: "Reading Section",
        completed: false,
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
        color: "green",
        value: "item-2",
        title: "Writing Section",
        completed: false,
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
        color: "green",
        value: "item-3",
        title: "Listening Section",
        completed: false,
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
        color: "green",
        value: "item-4",
        title: "Speaking Section",
        completed: false,
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
    color: "violet",
    starred: true,
    progressValue: 70,
    description:
      "Membuka pintu menuju pendidikan dan peluang karier internasional!",
    defaultCourseContentAccordion: "item-1",
    courseContentAccordion: [
      {
        color: "green",
        value: "item-1",
        title: "Reading Section",
        completed: false,
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
        color: "green",
        value: "item-2",
        title: "Writing Section",
        completed: false,
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
        color: "green",
        value: "item-3",
        title: "Listening Section",
        completed: false,
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
        color: "green",
        value: "item-4",
        title: "Speaking Section",
        completed: false,
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

const searchQuery = ref("");
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-white">My Courses</h1>
        <p class="text-gray-400">Continue your learning journey</p>
      </div>
      <div class="flex items-center gap-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search courses..."
            class="w-64 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <svg
            class="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <NuxtLink to="/dashboard/all-courses">
          <Button class="bg-primary hover:bg-primary/90"
            >Browse All Courses</Button
          >
        </NuxtLink>
      </div>
    </div>

    <!-- Course Timeline -->
    <div class="space-y-6">
      <Card
        v-for="component in components"
        :key="component.title"
        class="border-0 bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-300"
      >
        <CardContent class="p-6">
          <div class="flex items-start gap-6">
            <!-- Course Content -->
            <div class="flex-1 space-y-4">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-lg font-semibold text-white">
                    {{ component.title }}
                  </h3>
                  <p class="text-gray-400">{{ component.description }}</p>
                </div>
                <Button variant="outline" size="sm">Resume</Button>
              </div>

              <!-- Progress Bar -->
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-400">Progress</span>
                  <span class="text-white">{{ component.progressValue }}%</span>
                </div>
                <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <Progress :model-value="component.progressValue"></Progress>
                </div>
              </div>

              <Accordion
                type="single"
                class="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
                collapsible
              >
                <AccordionItem
                  v-for="module in component.courseContentAccordion"
                  :key="module.title"
                  :value="module.value"
                >
                  <AccordionTrigger
                    class="p-3 rounded-lg border border-gray-700 flex gap-2"
                    :class="{
                      'bg-gray-800/50': !module.completed,
                      [`bg-${module.color}-500/10 border-${module.color}-500/30`]:
                        module.completed,
                    }"
                  >
                    <svg
                      v-if="module.completed"
                      class="w-5 h-5"
                      :class="`text-green-500`"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      class="text-sm"
                      :class="{
                        'text-gray-400': !module.completed,
                        'text-white': module.completed,
                      }"
                      >{{ module.title }}</span
                    >
                  </AccordionTrigger>
                  <AccordionContent>
                    <div class="flex flex-col gap-1">
                      <div
                        v-for="(component, index) in module.content"
                        :key="index"
                      >
                        <component
                          :is="component.name"
                          v-bind="component.props"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
