<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

useHead({
  title: "API | Syarat dan Ketentuan",
  meta: [
    {
      name: "description",
      content: "Syarat dan ketentuan penggunaan platform Akademi Pelajar",
    },
  ],
});
</script>

<template>
  <div class="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
    <Card class="mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle class="text-3xl font-bold">Syarat dan Ketentuan</CardTitle>
      </CardHeader>
      <CardContent class="prose prose-sm dark:prose-invert">
        <h2>1. Pendahuluan</h2>
        <p>
          Selamat datang di Akademi Pelajar. Dengan mengakses dan menggunakan
          platform ini, Anda menyetujui untuk terikat oleh syarat dan ketentuan
          berikut.
        </p>

        <h2>2. Layanan Pendidikan</h2>
        <p>
          Akademi Pelajar menyediakan layanan bimbingan belajar online yang
          mencakup materi pembelajaran, latihan soal, dan fitur pembelajaran
          interaktif lainnya untuk persiapan SNBT, CPNS, OSN, TOEFL, dan IELTS.
        </p>

        <h2>3. Keanggotaan dan Akun</h2>
        <p>
          Pengguna wajib memberikan informasi yang akurat saat mendaftar dan
          bertanggung jawab untuk menjaga kerahasiaan akun mereka. Akademi
          Pelajar berhak menonaktifkan akun yang melanggar ketentuan penggunaan.
        </p>

        <h2>4. Materi Pembelajaran</h2>
        <p>
          Seluruh materi pembelajaran yang tersedia di platform ini dilindungi
          hak cipta. Pengguna dilarang mendistribusikan, memodifikasi, atau
          menjual ulang materi tanpa izin tertulis dari Akademi Pelajar.
        </p>

        <h2>5. Pembayaran dan Pengembalian Dana</h2>
        <p>
          Biaya berlangganan dibayarkan sesuai paket yang dipilih. Pengembalian
          dana dapat diproses dalam waktu 7 hari sejak pembelian jika layanan
          belum digunakan.
        </p>

        <h2>6. Tanggung Jawab Pengguna</h2>
        <p>
          Pengguna bertanggung jawab untuk menjaga etika dalam menggunakan
          platform, termasuk dalam diskusi forum dan interaksi dengan pengguna
          lain.
        </p>

        <h2>7. Perubahan Ketentuan</h2>
        <p>
          Akademi Pelajar berhak mengubah syarat dan ketentuan ini
          sewaktu-waktu. Perubahan akan diinformasikan melalui platform atau
          email.
        </p>

        <h2>8. Batasan Tanggung Jawab</h2>
        <p>
          Akademi Pelajar tidak bertanggung jawab atas kegagalan teknis atau
          kerugian yang timbul dari penggunaan platform di luar kendali kami.
        </p>

        <h2>9. Hukum yang Berlaku</h2>
        <p>
          Syarat dan ketentuan ini tunduk pada hukum Republik Indonesia.
          Perselisihan yang timbul akan diselesaikan melalui musyawarah atau
          pengadilan yang berwenang.
        </p>
      </CardContent>
    </Card>
  </div>
</template>
