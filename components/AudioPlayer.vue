<template>
  <Card class="w-full">
    <CardContent class="p-6">
      <div class="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          class="h-10 w-10"
          @click="togglePlay"
        >
          <LucidePlay v-if="!isPlaying" class="h-4 w-4" />
          <LucidePause v-else class="h-4 w-4" />
        </Button>
        
        <div class="flex-1">
          <div class="relative w-full h-2 bg-muted rounded-full">
            <div
              class="absolute h-full bg-primary rounded-full transition-all"
              :style="{ width: `${progress}%` }"
            ></div>
            <input
              type="range"
              min="0"
              max="100"
              v-model="progress"
              @input="seekAudio"
              class="absolute w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div class="flex justify-between text-sm text-muted-foreground mt-1">
            <span>{{ formatTime(currentTime) }}</span>
            <span>{{ formatTime(duration) }}</span>
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          class="h-10 w-10"
          @click="toggleLoop"
        >
          <LucideRepeat
            class="h-4 w-4"
            :class="{ 'text-primary': isLooping }"
          />
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { LucidePlay, LucidePause, LucideRepeat } from 'lucide-vue-next';

const props = defineProps<{
  src: string;
}>();

const audio = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const isLooping = ref(false);
const progress = ref(0);
const currentTime = ref(0);
const duration = ref(0);

onMounted(() => {
  audio.value = new Audio(props.src);
  audio.value.addEventListener('timeupdate', updateProgress);
  audio.value.addEventListener('loadedmetadata', () => {
    duration.value = audio.value?.duration || 0;
  });
  audio.value.addEventListener('ended', () => {
    isPlaying.value = false;
    if (!isLooping.value) {
      progress.value = 0;
      currentTime.value = 0;
    }
  });
});

onUnmounted(() => {
  if (audio.value) {
    audio.value.removeEventListener('timeupdate', updateProgress);
    audio.value.pause();
  }
});

const togglePlay = () => {
  if (!audio.value) return;
  
  if (isPlaying.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

const toggleLoop = () => {
  if (!audio.value) return;
  isLooping.value = !isLooping.value;
  audio.value.loop = isLooping.value;
};

const updateProgress = () => {
  if (!audio.value) return;
  currentTime.value = audio.value.currentTime;
  progress.value = (audio.value.currentTime / audio.value.duration) * 100;
};

const seekAudio = () => {
  if (!audio.value) return;
  const time = (progress.value / 100) * audio.value.duration;
  audio.value.currentTime = time;
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  background: hsl(var(--primary));
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: hsl(var(--primary));
  border-radius: 50%;
  cursor: pointer;
  border: none;
}
</style>