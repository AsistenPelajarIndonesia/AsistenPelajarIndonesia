
<!--
  File: @/layouts/SNBTLayout.vue
  to use import SNBTLayout from '@/layouts/SNBTLayout.vue'
  and to use <SNBTLayout>content inside the layout here</SNBTLayout>
-->
<script setup lang="ts">
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// --- Component Props ---
// These props allow the parent page to configure the layout's content dynamically.
defineProps<{
  testTitle: string
  testDescription: string
  unitTitle: string
  unitDescription: string
  categories?: string[]
  showResult?: boolean
}>()

// --- Component Events ---
// Emitting events allows the parent to handle navigation logic.
const emit = defineEmits(['back', 'next'])
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-muted/40">
    <!-- ======================================================================= -->
    <!-- TOP NAVIGATION & HEADER                                                 -->
    <!-- ======================================================================= -->
    <header class="sticky top-0 z-30 flex h-auto flex-col gap-4 border-b bg-background px-4 py-4 sm:px-6">
      <div class="container mx-auto flex flex-col gap-4">
        <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <!-- Main Title and Description -->
          <div class="flex-1">
            <h1 class="text-xl font-bold tracking-tight md:text-2xl">{{ testTitle }}</h1>
            <p class="text-sm text-muted-foreground">{{ testDescription }}</p>
          </div>
          <!-- Navigation Buttons -->
          <div class="flex items-center gap-2">
            <Button variant="outline" size="sm" @click="emit('back')">
              <ArrowLeft class="h-4 w-4 md:mr-2" />
              <span class="hidden md:inline">Back</span>
            </Button>
            <Button size="sm" @click="emit('next')">
              <span class="hidden md:inline">Next</span>
              <ArrowRight class="h-4 w-4 md:ml-2" />
            </Button>
          </div>
        </div>
        <!-- Category Badges -->
        <div v-if="categories && categories.length" class="flex flex-wrap items-center gap-2">
          <Badge v-for="category in categories" :key="category" variant="secondary">{{ category }}</Badge>
        </div>
      </div>
    </header>

    <!-- ======================================================================= -->
    <!-- MAIN CONTENT AREA                                                       -->
    <!-- ======================================================================= -->
    <main class="flex-1 p-4 sm:p-6">
      <div class="container mx-auto flex flex-col gap-6">
        <!-- Unit Information Card -->
        <Card>
          <CardHeader>
            <CardTitle class="text-lg md:text-xl">{{ unitTitle }}</CardTitle>
            <CardDescription>{{ unitDescription }}</CardDescription>
          </CardHeader>
        </Card>

        <!-- 
          Default Slot Wrapper
          This allows for flexible content arrangement by the parent page.
          The primary content (material and practice) is placed inside this default slot.
        -->
        <slot>
          <!-- Dual-pane container for material and practice. Stacks on mobile/tablet. -->
          <div class="grid flex-1 items-start gap-6 lg:grid-cols-2">
            <!-- 
              Named Slot: 'material'
              Purpose: To display the learning content, examples, and explanations.
            -->
            <div class="grid auto-rows-max items-start gap-6">
              <slot name="material" />
            </div>
            
            <!-- 
              Named Slot: 'practice'
              Purpose: To display interactive practice questions.
            -->
            <div class="grid auto-rows-max items-start gap-6">
              <slot name="practice" />
            </div>
          </div>
        </slot>

        <!-- 
          Named Slot: 'result'
          Purpose: To display the results of the practice session.
          Visibility is controlled by the `showResult` prop, with a smooth transition.
        -->
        <Transition name="fade">
          <div v-if="showResult" class="mt-2">
            <slot name="result" />
          </div>
        </Transition>
      </div>
    </main>
  </div>
</template>