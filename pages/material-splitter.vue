<template>
  <div class="container mx-auto p-6 min-h-screen">
    <div class="max-w-6xl mx-auto space-y-8">
      <!-- Header Section -->
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold tracking-tight">Material Splitter</h1>
        <p class="text-lg text-muted-foreground">
          Transform your learning materials into organized, digestible sections
        </p>
      </div>

      <!-- Input Section -->
      <Card
        class="backdrop-blur-sm bg-card/80 border-primary/20 shadow-lg hover:shadow-primary/5 transition-all duration-300"
      >
        <CardHeader>
          <CardTitle>Input Material</CardTitle>
          <CardDescription>
            Paste your content below and let AI help organize it into sections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            v-model="inputContent"
            placeholder="Paste your learning material here..."
            class="min-h-[200px] resize-y"
          />
        </CardContent>
        <CardFooter class="flex justify-end space-x-4">
          <Button variant="outline" @click="clearContent">Clear</Button>
          <Button @click="splitContent" :disabled="!inputContent">
            <LucideWand2 class="mr-2 h-4 w-4" />
            Split Content
          </Button>
        </CardFooter>
      </Card>

      <!-- Results Section -->
      <div v-if="sections.length > 0" class="space-y-6">
        <h2 class="text-2xl font-semibold">Split Sections</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            v-for="(section, index) in sections"
            :key="index"
            class="backdrop-blur-sm bg-card/80 border-primary/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <CardHeader>
              <CardTitle class="text-lg">Section {{ index + 1 }}</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="text-muted-foreground" v-html="`<p>${section.content.replace(/\n/g, '<br/>')}</p>`"></div>
            </CardContent>
            <CardFooter class="flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                @click="copySection(section.content)"
              >
                <LucideCopy class="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button variant="ghost" size="sm" @click="editSection(index)">
                <LucidePencil class="h-4 w-4 mr-2" />
                Edit
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>

    <!-- Edit Dialog -->
    <Dialog v-model:open="showEditDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Section</DialogTitle>
        </DialogHeader>
        <div class="py-4">
          <Textarea v-model="editingContent" class="min-h-[150px]" />
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showEditDialog = false"
            >Cancel</Button
          >
          <Button @click="saveEdit">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { LucideWand2, LucideCopy, LucidePencil } from "lucide-vue-next";

import { Groq } from "groq-sdk";
const inputContent = ref("");
const sections = ref<{ content: string }[]>([]);
const showEditDialog = ref(false);
const editingContent = ref("");
const editingIndex = ref(-1);

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const splitC = async () => {
  if (!inputContent.value.trim()) return;

  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that helps organize educational material into structured sections.",
        },
        {
          role: "user",
          content: `Please split the following text into logical sections and return it in JSON format as an array of objects, where each object has a 'content' key:\n\n${inputContent.value}`,
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

    const aiResponse = response.choices?.[0]?.message?.content;
    console.log(aiResponse)
    if (aiResponse) {
      return JSON.parse(aiResponse).sections;
    }
  } catch (error) {
    console.error("Error splitting content:", error);
  }
};
const splitContent = async () => {
  sections.value = await splitC();
};

const clearContent = () => {
  inputContent.value = "";
  sections.value = [];
};

const copySection = async (content: string) => {
  await navigator.clipboard.writeText(content);
};

const editSection = (index: number) => {
  editingIndex.value = index;
  editingContent.value = sections.value[index].content;
  showEditDialog.value = true;
};

const saveEdit = () => {
  if (editingIndex.value >= 0) {
    sections.value[editingIndex.value].content = editingContent.value;
  }
  showEditDialog.value = false;
};
</script>
