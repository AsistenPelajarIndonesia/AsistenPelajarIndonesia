<template>
  <footer class="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
    <div class="px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <img src="/logo.svg" alt="Akademi Pelajar Logo" class="w-8 h-8" />
            <h3 class="text-lg font-semibold">Akademi Pelajar</h3>
          </div>
          <p class="text-sm text-muted-foreground">
            Platform bimbingan belajar online untuk persiapan SNBT, TOEFL, dan IELTS.
          </p>
          <div class="flex space-x-4 pt-2">
            <a href="#" class="text-muted-foreground hover:text-primary transition-colors">
              <LucideInstagram :size="20" />
            </a>
            <a href="#" class="text-muted-foreground hover:text-primary transition-colors">
              <LucideTwitter :size="20" />
            </a>
            <a href="#" class="text-muted-foreground hover:text-primary transition-colors">
              <LucideYoutube :size="20" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Tautan Cepat</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/terms"
                class="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <LucideFileText :size="16" class="group-hover:translate-x-1 transition-transform" />
                Syarat dan Ketentuan
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/privacy"
                class="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <LucideShieldCheck :size="16" class="group-hover:translate-x-1 transition-transform" />
                Kebijakan Privasi
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Programs -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Program</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/snbt"
                class="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <LucideGraduationCap :size="16" class="group-hover:translate-x-1 transition-transform" />
                SNBT
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/toefl"
                class="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <LucideLanguages :size="16" class="group-hover:translate-x-1 transition-transform" />
                TOEFL
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Berlangganan</h3>
          <p class="text-sm text-muted-foreground">
            Dapatkan informasi terbaru tentang program dan promo kami.
          </p>
          <form @submit.prevent class="space-y-2">
            <div class="flex gap-2">
              <Input
                type="email"
                placeholder="Email kamu"
                class="flex-1"
              />
              <Button type="submit" variant="default">
                <LucideSend :size="16" />
              </Button>
            </div>
          </form>
          <div class="pt-4">
            <p class="text-sm text-muted-foreground">
              Email: info@akademipelajar.com
            </p>
            <p class="text-sm text-muted-foreground">
              Telepon: +62 812-3456-7890
            </p>
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-8 border-t">
        <p class="text-sm text-muted-foreground">
          © {{ new Date().getFullYear() }} Akademi Pelajar. Hak Cipta Dilindungi.
        </p>
        <div class="flex items-center space-x-4">
          <Button variant="ghost" size="sm" class="text-muted-foreground hover:text-primary">
            <LucideHelpCircle :size="16" class="mr-2" />
            Bantuan
          </Button>
          <Button variant="ghost" size="sm" class="text-muted-foreground hover:text-primary">
            <LucideMessageCircle :size="16" class="mr-2" />
            Kontak
          </Button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
</script>
