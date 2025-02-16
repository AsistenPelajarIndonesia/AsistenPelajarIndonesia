<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

useHead({
  title: "API | Kebijakan Privasi",
  meta: [
    {
      name: "description",
      content: "Kebijakan privasi penggunaan platform Akademi Pelajar",
    },
  ],
});
</script>

<template>
  <div class="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
    <Card class="mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle class="text-3xl font-bold">Kebijakan Privasi</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-sm dark:prose-invert">
        <h2>1. Informasi yang Kami Kumpulkan</h2>
        <p>
          Akademi Pelajar mengumpulkan informasi yang Anda berikan saat
          mendaftar dan menggunakan layanan kami, termasuk:
        </p>
        <ul>
          <li>Data pribadi (nama, email, nomor telepon)</li>
          <li>Data akademik (riwayat pembelajaran, nilai ujian)</li>
          <li>Data penggunaan platform</li>
        </ul>

        <h2>2. Penggunaan Informasi</h2>
        <p>Kami menggunakan informasi yang dikumpulkan untuk:</p>
        <ul>
          <li>Menyediakan layanan bimbingan belajar yang personal</li>
          <li>Menganalisis dan meningkatkan kualitas pembelajaran</li>
          <li>Berkomunikasi tentang layanan dan pembaruan</li>
          <li>Memberikan dukungan pembelajaran yang sesuai</li>
        </ul>

        <h2>3. Perlindungan Data</h2>
        <p>
          Akademi Pelajar berkomitmen untuk melindungi data pengguna dengan:
        </p>
        <ul>
          <li>Enkripsi data sensitif</li>
          <li>Pembatasan akses data</li>
          <li>Pemantauan keamanan secara berkala</li>
        </ul>

        <h2>4. Berbagi Informasi</h2>
        <p>
          Kami tidak akan menjual atau menyewakan data pribadi Anda. Informasi
          hanya dibagikan dengan:
        </p>
        <ul>
          <li>Penyedia layanan yang membantu operasional platform</li>
          <li>Pihak berwenang sesuai ketentuan hukum</li>
        </ul>

        <h2>5. Hak Pengguna</h2>
        <p>Sebagai pengguna, Anda memiliki hak untuk:</p>
        <ul>
          <li>Mengakses data pribadi Anda</li>
          <li>Memperbarui atau mengoreksi data</li>
          <li>Meminta penghapusan data</li>
          <li>Menolak penggunaan data untuk tujuan tertentu</li>
        </ul>

        <h2>6. Cookies dan Teknologi Pelacakan</h2>
        <p>
          Kami menggunakan cookies untuk meningkatkan pengalaman pembelajaran
          dan menganalisis penggunaan platform. Anda dapat mengatur preferensi
          cookies melalui browser Anda.
        </p>

        <h2>7. Perubahan Kebijakan</h2>
        <p>
          Kebijakan privasi ini dapat diperbarui sewaktu-waktu. Perubahan
          signifikan akan diberitahukan melalui email atau pemberitahuan di
          platform.
        </p>

        <h2>8. Hubungi Kami</h2>
        <p>
          Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan
          hubungi tim dukungan kami melalui email atau formulir kontak di
          platform.
        </p>
      </CardContent>
    </Card>
  </div>
</template>
