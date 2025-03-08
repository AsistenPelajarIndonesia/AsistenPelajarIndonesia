<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useToast } from "@/components/ui/toast/use-toast";
import Groq from "groq-sdk";

// Initialize Groq client
const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

// Types for mind map data structures
interface MindMapNode {
  id: string;
  text: string;
  type: 'root' | 'main' | 'sub';
  children: MindMapNode[];
  x?: number;
  y?: number;
  color?: string;
}

interface Connection {
  source: MindMapNode;
  target: MindMapNode;
  path?: string;
}

// State management
const { toast } = useToast();
const loading = ref(false);
const inputText = ref('');
const mindMapData = ref<MindMapNode | null>(null);
const connections = ref<Connection[]>([]);
const svgWidth = ref(1200);
const svgHeight = ref(800);
const zoom = ref(1);
const pan = ref({ x: 0, y: 0 });
const isDragging = ref(false);
const dragStart = ref({ x: 0, y: 0 });

// Color palette for different node types
const colors = {
  root: '#FF6B6B',
  main: '#4ECDC4',
  sub: '#45B7D1'
};

// Generate a unique ID for nodes
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Process the AI response and create mind map data structure
function processMindMapResponse(response: any): MindMapNode {
  const data = typeof response === 'string' ? JSON.parse(response) : response;
  
  function processNode(node: any): MindMapNode {
    return {
      id: generateId(),
      text: node.text,
      type: node.type || 'sub',
      children: (node.children || []).map((child: any) => processNode(child)),
      color: colors[node.type as keyof typeof colors] || colors.sub
    };
  }

  return processNode(data);
}

// Calculate node positions using a radial layout algorithm
function calculateLayout(node: MindMapNode, centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) {
  node.x = centerX;
  node.y = centerY;

  if (node.children.length === 0) return;

  const angleStep = (endAngle - startAngle) / node.children.length;
  const childRadius = radius * 0.8;

  node.children.forEach((child, index) => {
    const angle = startAngle + (index * angleStep);
    const childX = centerX + Math.cos(angle) * radius;
    const childY = centerY + Math.sin(angle) * radius;

    child.x = childX;
    child.y = childY;

    calculateLayout(
      child,
      childX,
      childY,
      childRadius,
      angle - Math.PI / 4,
      angle + Math.PI / 4
    );
  });
}

// Generate connections between nodes
function generateConnections(node: MindMapNode): Connection[] {
  let result: Connection[] = [];

  if (!node.x || !node.y) return result;

  node.children.forEach(child => {
    if (child.x && child.y) {
      result.push({
        source: node,
        target: child,
        path: generateCurvedPath(node, child)
      });
      result = result.concat(generateConnections(child));
    }
  });

  return result;
}

// Generate curved path between two nodes
function generateCurvedPath(source: MindMapNode, target: MindMapNode): string {
  if (!source.x || !source.y || !target.x || !target.y) return '';

  const dx = target.x - source.x;
  const dy = target.y - source.y;
  const curve = Math.sqrt(dx * dx + dy * dy) * 0.3;

  const midX = (source.x + target.x) / 2;
  const midY = (source.y + target.y) / 2;

  const controlX = midX - dy * 0.2;
  const controlY = midY + dx * 0.2;

  return `M${source.x},${source.y} Q${controlX},${controlY} ${target.x},${target.y}`;
}

// Handle zooming
function handleWheel(event: WheelEvent) {
  event.preventDefault();
  const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
  zoom.value = Math.max(0.1, Math.min(2, zoom.value * zoomFactor));
}

// Handle panning
function handleMouseDown(event: MouseEvent) {
  isDragging.value = true;
  dragStart.value = {
    x: event.clientX - pan.value.x,
    y: event.clientY - pan.value.y
  };
}

function handleMouseMove(event: MouseEvent) {
  if (!isDragging.value) return;
  pan.value = {
    x: event.clientX - dragStart.value.x,
    y: event.clientY - dragStart.value.y
  };
}

function handleMouseUp() {
  isDragging.value = false;
}

// Generate mind map using Groq API
async function generateMindMap() {
  if (!inputText.value.trim()) {
    toast({
      title: "Error",
      description: "Please enter some text to generate a mind map",
      variant: "destructive",
    });
    return;
  }

  loading.value = true;
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert at analyzing text and creating mind maps. Extract key concepts and their relationships from the provided text. Format your response as a JSON object with a hierarchical structure where each node has: text (string), type (root/main/sub), and children (array of nodes). The root node should contain the main topic, main nodes for primary concepts, and sub nodes for related details."
        },
        {
          role: "user",
          content: inputText.value
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      stream: false,
      response_format: {
        type: "json_object"
      }
    });

    const response = completion.choices[0].message.content;
    mindMapData.value = processMindMapResponse(response);

    // Calculate layout
    if (mindMapData.value) {
      calculateLayout(
        mindMapData.value,
        svgWidth.value / 2,
        svgHeight.value / 2,
        200,
        0,
        2 * Math.PI
      );
      connections.value = generateConnections(mindMapData.value);
    }

    toast({
      title: "Success",
      description: "Mind map generated successfully",
      variant: "default",
    });
  } catch (error) {
    console.error("Error generating mind map:", error);
    toast({
      title: "Error",
      description: "Failed to generate mind map",
      variant: "destructive",
    });
  } finally {
    loading.value = false;
  }
}

// Transform value for SVG pan and zoom
const transform = computed(() => {
  return `translate(${pan.value.x}px, ${pan.value.y}px) scale(${zoom.value})`;
});

// Event listeners for pan and zoom
onMounted(() => {
  window.addEventListener('mouseup', handleMouseUp);
  window.addEventListener('mousemove', handleMouseMove);

  return () => {
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('mousemove', handleMouseMove);
  };
});
</script>

<template>
  <div class="min-h-screen bg-background p-6 space-y-8">
    <header class="text-center space-y-2">
      <h1 class="text-4xl font-bold tracking-tight">AI Mind Map Generator</h1>
      <p class="text-muted-foreground">
        Transform your ideas into interactive mind maps
      </p>
    </header>

    <div class="max-w-6xl mx-auto grid gap-8">
      <!-- Input Section -->
      <section class="space-y-4">
        <div class="grid gap-4">
          <Textarea
            v-model="inputText"
            placeholder="Enter your text here..."
            class="min-h-[200px] p-4"
          />
          <Button
            @click="generateMindMap"
            class="w-full md:w-auto"
            size="lg"
            :disabled="loading"
          >
            <LucideBrain v-if="!loading" class="mr-2 h-4 w-4" />
            <SpinningBar v-else class="mr-2 h-4 w-4 animate-spin" />
            {{ loading ? "Generating..." : "Generate Mind Map" }}
          </Button>
        </div>
      </section>

      <!-- Mind Map Display -->
      <section v-if="mindMapData" class="border rounded-lg p-4 bg-card">
        <div class="relative w-full h-[600px] overflow-hidden">
          <svg
            :width="svgWidth"
            :height="svgHeight"
            @wheel="handleWheel"
            @mousedown="handleMouseDown"
            class="cursor-move"
          >
            <g :style="{ transform }">
              <!-- Connections -->
              <path
                v-for="connection in connections"
                :key="connection.source.id + connection.target.id"
                :d="connection.path"
                class="stroke-muted-foreground"
                fill="none"
                stroke-width="2"
              />

              <!-- Nodes -->
              <g
                v-for="node in [mindMapData, ...mindMapData.children]"
                :key="node.id"
                :transform="`translate(${node.x}, ${node.y})`"
              >
                <circle
                  :r="node.type === 'root' ? 60 : node.type === 'main' ? 40 : 30"
                  :fill="node.color"
                  class="opacity-90"
                />
                <text
                  dy=".3em"
                  text-anchor="middle"
                  class="fill-background text-sm font-medium"
                >
                  <tspan
                    v-for="(line, i) in node.text.split(' ')"
                    :key="i"
                    x="0"
                    :dy="i ? '1.2em' : 0"
                  >
                    {{ line }}
                  </tspan>
                </text>
              </g>
            </g>
          </svg>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.cursor-move {
  cursor: move;
}
</style>