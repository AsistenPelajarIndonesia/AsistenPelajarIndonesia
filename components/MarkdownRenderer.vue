<script setup lang="ts">
const content = `

### Fotometri: Sistem Magnitudo, Luminositas, Indeks Warna & Temperatur, Ekstingsi Atmosfer, Spektrofotometri

#### 1. Pendahuluan
Fotometri adalah cabang astronomi yang mempelajari tentang pengukuran intensitas cahaya dari benda langit. Pengukuran ini penting karena dapat memberikan informasi tentang luminositas, jarak, dan sifat lainnya dari benda tersebut. Dalam fotometri, kita menggunakan sistem magnitudo untuk mengukur kecerahan benda langit secara quantitatif.

#### 2. Sistem Magnitudo
Sistem magnitudo adalah skala logaritmis yang digunakan untuk mengukur kecerahan benda langit. Skala ini dikembangkan oleh astronom Yunani kuno, Hipparchus. Berikut adalah penjelasan singkat tentang sistem ini:

- **Magnitudo Semu (Apparent Magnitude)**: Mengukur kecerahan benda langit yang terlihat dari Bumi.
- **Magnitudo Mutlak (Absolute Magnitude)**: Mengukur kecerahan benda langit jika dilihat dari jarak tertentu (10 parsec).
- **Perbedaan Magnitudo**: Setiap perbedaan 5 magnitudo menyebabkan perbedaan kecerahan 100 kali. Artinya, semakin kecil nilainya, benda tersebut semakin cerah.

#### 3. Luminositas
Luminositas adalah total energi yang dipancarkan oleh benda langit per unit waktu. Ini merupakan ukuran intrinsic dari kecerahan benda langit. Luminositas (L) berhubungan dengan magnitudo mutlak (M) dan jarak (d) melalui persamaan:
$$
\[ L = 4\\pi d^2 \\times F \]
$$
dimana F adalah fluks cahaya yang diterima.

#### 4. Indeks Warna & Temperatur
Indeks warna memberikan informasi tentang suhu permukaan benda langit. Indeks warna paling umum adalah Indeks B-V (Birch-Versandah), yang diukur dalam satuan magnitudo. Semakin kecil indeks B-V, bintang tersebut semakin panas. Sebaliknya, semakin besar indeks B-V, bintang semakin dingin.

#### 5. Ekstingsi Atmosfer
Ekstingsi atmosfer adalah fenomena dimana cahaya dari benda langit tercerai suara atau dipindahtangankan energi saat melewati atmosfer. Ekstingsi atmosfer tergantung pada panjang gelombang cahaya dan sudut elevasi benda. Ekstingsi atmosfer diperhitungkan dalam fotometri untuk memperoleh pengukuran yang teliti.

#### 6. Spektrofotometri
Spektrofotometeri adalah metoda fotometri yang menggabungkan spektroskopi dengan fotometri. Dengan menggunakan spektrofotometer, kita dapat mengetahuai intensitas cahaya seiring dengan panjang gelombang tertentu. Methode ini penting untuk menganalisa komposisi dan kecepatan objek langit.

#### 7. Aplikasi Praktis Fotometri dalam Astronomi
- **Menentukan Jarak Bintang**: Dengan mengukur magnitudo semu dan magnitudo mutlak, kita dapat menghitung jarak bintang menggunakan Modulus jarak.
- **Menganalisa Sifat Bintang**: Dari indeks warna dan luminositas, kita dapat menentukan suhu dan ukuran bintang.
- **Studi Galaksi Jauh**: Fotometri digunakan untuk mengukur kecerahan dan jarak galaksi jauh, sehingga kita dapat memahami evolusi alam semesta.

#### 8. Kesimpulan
Fotometri adalah alat penting dalam astronomi untuk mempelajari sifat benda langit. Dengan memahami sistem magnitudo, luminositas, indeks warna, ekstingsi atmosfer, dan spektroskopi, kita dapat ekstrak berbagai informasi penting tentang alam semesta.

#### Referensi
Untuk memperdalam pemahaman, disarankan membaca teks-teks astronomi yang membahas fotometri secara lebih detail, seperti "Astrophysics in a Nutshell" oleh Maoz atau "The Cosmic Perspective" oleh Bennett.
`;

const { $md } = useNuxtApp();
</script>

<template>
  <div v-html="$md(content)" class="markdown-content"></div>
</template>

<style>
/* Styling to prevent overflow issues with KaTeX */
.markdown-content {
  overflow-x: auto;
}
</style>
