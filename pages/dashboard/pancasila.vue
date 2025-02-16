<template>
  {{ data }}
</template>
<script setup>
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

async function main() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Anda adalah seorang guru yang akan membuat soal latihan untuk orang-orang dan jawablab dengan format JSON",
      },
      {
        role: "user",
        content: `
        Berikut adalah materi untuk dibuatkan pertanyaan:
        ${data.value}
        Berikut adalah format JSON yang harus anda ikuti!
        {
         "soal": [
            {
              "pertanyaan": "Taruh pertanyaan disini",
              "pilihan": [
                  "A. Taruh pilihan A disini",
                  "B. Taruh pilihan B disini",
                  "C. Taruh pilihan C disini",
                  "D. Taruh pilihan D disini",
              ],
              "jawaban": "A/B/C/D Cukup hurufnya saja",
              "label": ["Label contoh geografi", "Label misal contoh matematika", "Label contoh umum"]
            } dan seterusnya...
          ]
        }
         Buatlah dengan sebanyak dan sesulit mungkin dan hanya jawab saya dengan JSON!
        `,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.6,
    max_completion_tokens: 32768,
    top_p: 0.95,
    response_format: {
      type: "json_object",
    },
  });
}

import { asText } from "prismic-richtext";
const { client } = usePrismic();
const data = ref(null);
client.getByUID("basic_material", "integritas-twk-cpns").then((res) => {
  console.log(res);
  data.value = asText(res.data.content);
  main();
});
</script>
