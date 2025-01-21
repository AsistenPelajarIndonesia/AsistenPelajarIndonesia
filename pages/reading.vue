<script setup lang="ts">
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const TOEFLQuestionPackage = ref({
  passage:
    "The concept of psychological archetypes was introduced by the Swiss psychiatrist Carl Jung, who believed that certain universal symbols, called archetypes, are present in the collective unconscious, a shared psychological reservoir that contains the universal symbols and images that are common to all humans. According to Jung, the collective unconscious is a universal library of human experience, containing the entire range of human knowledge, emotions, and memories. The archetypes that reside in the collective unconscious are thought to be the building blocks of the human psyche, and are believed to have been present in the human mind since the beginning of time. They are universal and timeless, and are shared by all humans, regardless of their cultural, geographical, or historical context. One of the key archetypes identified by Jung is the mother archetype, which represents the universal symbol of nurturing, care, and protection. This archetype is thought to be present in all human societies, and is often associated with the image of a maternal figure, such as a mother, a goddess, or a caregiver. The mother archetype is also associated with the natural world, and is often linked to the cycles of nature, such as birth, growth, and renewal. The mother archetype is a complex and multifaceted concept, and can be seen in various forms of art, literature, and culture. For example, in ancient Greek mythology, the goddess Gaia is often depicted as a maternal figure, who gives birth to the earth and all living things. Similarly, in many indigenous cultures, the earth is seen as a mother figure, who provides sustenance and nourishment to all living beings. The mother archetype is also associated with the concept of the feminine, and is often seen as a symbol of receptivity, intuition, and nurturing. In contrast, the masculine archetype is often associated with the concept of the rational, logical, and analytical. The interplay between the masculine and feminine archetypes is a central theme in Jungian psychology, and is seen as a key aspect of the human psyche. Jung believed that the integration of the opposites, including the masculine and feminine, is essential for achieving psychological wholeness and balance. The concept of archetypes has been influential in many fields, including psychology, anthropology, and literature. Many authors and artists have been inspired by the idea of archetypes, and have used them as a source of inspiration for their work. For example, the author Joseph Campbell was heavily influenced by Jung's concept of archetypes, and used them as a framework for his work on comparative mythology. The concept of archetypes has also been used in psychotherapy, where it is used to help patients understand and integrate their unconscious thoughts and feelings. By exploring the archetypes that reside in the collective unconscious, individuals can gain a deeper understanding of themselves and their place in the world. The collective unconscious is a universal and timeless concept, and its archetypes are present in all human societies. The study of archetypes is a complex and multifaceted field, and one that continues to evolve and grow as our understanding of the human psyche deepens.",
  questions: [
    {
      question: "According to the passage, what is the collective unconscious?",
      options: [
        "A. A repository of individual experiences and memories",
        "B. A universal library of human knowledge, emotions, and memories",
        "C. A concept introduced by Sigmund Freud",
        "D. A type of psychological archetype",
      ],
      answer: "B",
    },
    {
      question:
        "What is the mother archetype associated with, according to the passage?",
      options: [
        "A. The natural world and the cycles of nature",
        "B. The universal symbol of destruction and chaos",
        "C. The image of a paternal figure",
        "D. The concept of the collective unconscious",
      ],
      answer: "A",
    },
    {
      question:
        "According to the passage, what is unique about the archetypes that reside in the collective unconscious?",
      options: [
        "A. They are unique to each individual",
        "B. They are specific to certain cultures or historical contexts",
        "C. They are universal and timeless",
        "D. They are only present in certain types of human societies",
      ],
      answer: "C",
    },
    {
      question:
        "According to the passage, what is the relationship between the masculine and feminine archetypes?",
      options: [
        "A. They are mutually exclusive and cannot be integrated",
        "B. They are identical and interchangeable",
        "C. They are complementary and must be integrated for psychological wholeness",
        "D. They are only relevant in certain cultural contexts",
      ],
      answer: "C",
    },
    {
      question:
        "According to the passage, how has the concept of archetypes been used in psychotherapy?",
      options: [
        "A. To suppress the unconscious thoughts and feelings of patients",
        "B. To help patients understand and integrate their unconscious thoughts and feelings",
        "C. To diagnose and treat mental illnesses",
        "D. To develop new forms of art and literature",
      ],
      answer: "B",
    },
  ],
});

const answers = ref(
  TOEFLQuestionPackage.value.questions.map((_, index) => ({
    index: index,
    answer: null,
  }))
);

function clearSelection(index: number) {
  answers.value[index].answer = null;
}
</script>

<template>
  <section
    class="w-full flex items-center px-2 justify-between min-h-[5vh] bg-indigo-700"
  >
    <Button class="flex gap-1 px-1 m-1 py-0">
        <LucideArrowLeftFromLine />
        <h1 class="font-bold font-sans">Exit</h1>
    </Button>
    <h1 class="font-bold">Reading</h1>
    <Button class="flex gap-1 px-1 m-1 py-0">
      <h1 class="font-bold font-sans">Submit</h1>
      <LucidePlane />
    </Button>
  </section>
  <div class="w-screen flex flex-col md:flex-row p-1 gap-1">
    <ScrollArea
      class="max-h-[50vh] overflow-y-scroll md:max-h-[90vh] w-full rounded-md border p-4"
    >
      <p class="text-lg leading-relaxed font-serif">
        {{ TOEFLQuestionPackage.passage }}
      </p>
    </ScrollArea>
    <ScrollArea
      class="max-h-[50vh] overflow-y-scroll md:max-h-[90vh] w-full rounded-md border p-2"
    >
      <Card
        v-for="(question, questionIndex) in TOEFLQuestionPackage.questions"
        class="mb-4 p-4"
      >
        <CardTitle>{{ question.question }}</CardTitle>
        <div class="flex flex-col">
          <label
            v-for="(option, optionIndex) in question.options"
            :key="optionIndex"
            class="option"
          >
            <input
              type="radio"
              :name="'question-' + optionIndex"
              :value="option"
              v-model="answers[questionIndex].answer"
            />
            {{ option }}
          </label>
        </div>
      </Card>
    </ScrollArea>
  </div>
</template>
