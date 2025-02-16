<template>
  <div class="flex max-h-[100%] bg-white dark:bg-zinc-900">
    <!-- Mobile Sidebar Toggle Button -->
    <button
      @click="isSidebarOpen = !isSidebarOpen"
      class="fixed left-4 top-4 z-20 rounded-full bg-black p-2 text-white hover:bg-gray-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 lg:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>

    <!-- Sidebar -->
    <div
      class="fixed inset-y-0 left-0 z-10 w-64 transform border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out dark:border-zinc-800 dark:bg-zinc-900 lg:static lg:translate-x-0"
      :class="{
        'translate-x-0': isSidebarOpen,
        '-translate-x-full': !isSidebarOpen,
      }"
    >
      <div
        class="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-zinc-800"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          Chat History
        </h2>
        <button
          @click="createNewChat"
          class="rounded-full bg-black p-2 text-white hover:bg-gray-800 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
      <div class="h-[calc(100vh-4rem)] overflow-y-auto p-4">
        <div
          v-for="chat in chats"
          :key="chat.id"
          @click="selectChat(chat.id)"
          class="mb-2 cursor-pointer rounded-lg p-3 transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800"
          :class="{
            'bg-gray-100 dark:bg-zinc-800': selectedChatId === chat.id,
          }"
        >
          <p class="truncate text-sm text-gray-900 dark:text-white">
            {{ chat.title || "New Chat" }}
          </p>
          <p class="mt-1 truncate text-xs text-gray-500 dark:text-zinc-400">
            {{ new Date(chat.timestamp).toLocaleDateString() }}
          </p>
        </div>
      </div>
    </div>

    <!-- Overlay for mobile -->
    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
    ></div>

    <!-- Main Chat Area -->
    <div class="flex flex-1 flex-col">
      <div class="flex-1 overflow-y-auto p-4">
        <div
          v-for="message in currentChat?.messages"
          :key="message.id"
          class="mb-6 flex"
          :class="{
            'justify-end': message.role === 'user',
          }"
        >
          <div
            class="max-w-[80%] rounded-lg px-4 py-2 sm:max-w-[70%] md:max-w-[60%]"
            :class="{
              'bg-black text-white dark:bg-zinc-800': message.role === 'user',
              'bg-gray-100 text-gray-900 dark:bg-zinc-800 dark:text-white':
                message.role === 'assistant',
            }"
          >
            <p class="whitespace-pre-wrap">{{ message.content }}</p>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="border-t border-gray-200 p-4 dark:border-zinc-800">
        <vanishinginput
          v-model="userInput"
          :placeholders="[
            'Ask me anything...',
            'What would you like to know?',
            'How can I help you today?',
          ]"
          @submit="sendMessage"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import Groq from "groq-sdk";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  timestamp: number;
}

const userInput = ref("");
const chats = ref<Chat[]>([]);
const selectedChatId = ref<string>("");
const isSidebarOpen = ref(false);

// Initialize sidebar state based on screen size
onMounted(() => {
  const savedChats = localStorage.getItem("chats");
  if (savedChats) {
    chats.value = JSON.parse(savedChats);
    if (chats.value.length > 0) {
      selectedChatId.value = chats.value[0].id;
    }
  }
});

// Save chats to localStorage whenever they change
watch(
  chats,
  (newChats) => {
    localStorage.setItem("chats", JSON.stringify(newChats));
  },
  { deep: true }
);

const currentChat = computed(() => {
  return chats.value.find((chat) => chat.id === selectedChatId.value);
});

function createNewChat() {
  const newChat: Chat = {
    id: uuidv4(),
    title: "New Chat",
    messages: [],
    timestamp: Date.now(),
  };
  chats.value.unshift(newChat);
  selectedChatId.value = newChat.id;
}

function selectChat(chatId: string) {
  selectedChatId.value = chatId;
}

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

async function sendMessage(message: string) {
  if (!message.trim() || !selectedChatId.value) return;

  const chat = chats.value.find((c) => c.id === selectedChatId.value);
  if (!chat) return;

  // Add user message
  const userMessage: Message = {
    id: uuidv4(),
    role: "user",
    content: message,
    timestamp: Date.now(),
  };
  chat.messages.push(userMessage);

  try {
    // Call Groq API using SDK
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    // Add assistant message
    const assistantMessage: Message = {
      id: uuidv4(),
      role: "assistant",
      content:
        completion.choices[0]?.message?.content || "No response generated",
      timestamp: Date.now(),
    };
    chat.messages.push(assistantMessage);

    // Update chat title if it's the first message
    if (chat.messages.length === 2) {
      chat.title = message.slice(0, 30) + (message.length > 30 ? "..." : "");
    }
  } catch (error) {
    console.error("Error calling Groq API:", error);
    // Add error message
    chat.messages.push({
      id: uuidv4(),
      role: "assistant",
      content: "Sorry, I encountered an error. Please try again.",
      timestamp: Date.now(),
    });
  }
}

// Create initial chat if none exists
if (chats.value.length === 0) {
  createNewChat();
}
</script>
