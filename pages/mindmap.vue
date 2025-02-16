<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as d3 from "d3";

const mindmapContainer = ref<HTMLElement | null>(null);
const width = ref(window.innerWidth);
const height = ref(window.innerHeight);

// Sample data structure
const data = ref({
  id: "root",

  type: "root",

  title: "Undang-Undang Dasar Negara Republik Indonesia 1945",

  content: "Pembukaan Undang-Undang Dasar Negara Republik Indonesia 1945",

  importance: 5,

  children: [
    {
      id: "konsep_kemerdekaan",

      type: "concept",

      title: "Kemerdekaan",

      content:
        "Kemerdekaan adalah hak segala bangsa, dan penjajahan harus dihapuskan karena tidak sesuai dengan perikemanusiaan dan perikeadilan.",

      importance: 5,

      children: [
        {
          id: "sub_konsep_kemerdekaan",

          type: "subconcept",

          title: "Perjuangan Kemerdekaan Indonesia",

          content:
            "Perjuangan pergerakan kemerdekaan Indonesia telah sampailah kepada saat yang berbahagia dengan selamat sentosa mengantarkan rakyat Indonesia ke depan pintu gerbang kemerdekaan negara Indonesia.",

          importance: 4,

          children: [],

          relationships: [
            {
              target_id: "konsep_kemerdekaan",

              type: "related_to",
            },
          ],
        },

        {
          id: "definisi_kemerdekaan",

          type: "definition",

          title: "Definisi Kemerdekaan",

          content:
            "Kemerdekaan adalah keadaan bebas dari penjajahan dan pengaruh luar.",

          importance: 3,

          children: [],

          relationships: [
            {
              target_id: "konsep_kemerdekaan",

              type: "defines",
            },
          ],
        },
      ],

      relationships: [
        {
          target_id: "root",

          type: "related_to",
        },
      ],
    },

    {
      id: "konsep_pemerintahan",

      type: "concept",

      title: "Pemerintahan Negara Indonesia",

      content:
        "Pemerintahan Negara Indonesia yang melindungi segenap bangsa Indonesia dan seluruh tumpah darah Indonesia.",

      importance: 5,

      children: [
        {
          id: "sub_konsep_pemerintahan",

          type: "subconcept",

          title: "Tujuan Pemerintahan",

          content:
            "Memajukan kesejahteraan umum, mencerdaskan kehidupan bangsa, dan ikut melaksanakan ketertiban dunia yang berdasarkan kemerdekaan, perdamaian abadi dan keadilan sosial.",

          importance: 4,

          children: [],

          relationships: [
            {
              target_id: "konsep_pemerintahan",

              type: "related_to",
            },
          ],
        },

        {
          id: "contoh_pemerintahan",

          type: "example",

          title: "Contoh Pemerintahan",

          content:
            "Pemerintahan Negara Republik Indonesia yang berkedaulatan rakyat dengan berdasar kepada Ketuhanan Yang Maha Esa, kemanusiaan yang adil dan beradab, persatuan Indonesia, dan kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan.",

          importance: 3,

          children: [],

          relationships: [
            {
              target_id: "konsep_pemerintahan",

              type: "examples",
            },
          ],
        },
      ],

      relationships: [
        {
          target_id: "root",

          type: "related_to",
        },
      ],
    },

    {
      id: "konsep_ketuhanan",

      type: "concept",

      title: "Ketuhanan Yang Maha Esa",

      content: "Ketuhanan Yang Maha Esa sebagai dasar negara.",

      importance: 4,

      children: [],

      relationships: [
        {
          target_id: "konsep_pemerintahan",

          type: "related_to",
        },
      ],
    },

    {
      id: "konsep_kemanusiaan",

      type: "concept",

      title: "Kemanusiaan yang Adil dan Beradab",

      content: "Kemanusiaan yang adil dan beradab sebagai dasar negara.",

      importance: 4,

      children: [],

      relationships: [
        {
          target_id: "konsep_pemerintahan",

          type: "related_to",
        },
      ],
    },

    {
      id: "konsep_persatuan",

      type: "concept",

      title: "Persatuan Indonesia",

      content: "Persatuan Indonesia sebagai dasar negara.",

      importance: 4,

      children: [],

      relationships: [
        {
          target_id: "konsep_pemerintahan",

          type: "related_to",
        },
      ],
    },

    {
      id: "konsep_kerakyatan",

      type: "concept",

      title: "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan",

      content:
        "Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan sebagai dasar negara.",

      importance: 4,

      children: [],

      relationships: [
        {
          target_id: "konsep_pemerintahan",

          type: "related_to",
        },
      ],
    },
  ],

  relationships: [],
});

const createMindMap = () => {
  if (!mindmapContainer.value) return;

  // Clear previous SVG
  d3.select(mindmapContainer.value).selectAll("*").remove();

  // Create SVG container with zoom support
  const svg = d3
    .select(mindmapContainer.value)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", [0, 0, width.value, height.value]);

  const g = svg.append("g");

  // Add zoom behavior
  const zoom = d3
    .zoom()
    .scaleExtent([0.1, 4])
    .on("zoom", (event) => {
      g.attr("transform", event.transform);
    });

  svg.call(zoom);

  // Create tree layout
  const tree = d3
    .tree()
    .size([height.value - 100, width.value - 200])
    .nodeSize([80, 200]);

  // Create hierarchy from data
  const root = d3.hierarchy(data.value);

  // Generate tree layout
  const treeData = tree(root);

  // Draw links
  const links = g
    .selectAll(".link")
    .data(treeData.links())
    .enter()
    .append("path")
    .attr("class", "link")
    .attr(
      "d",
      d3
        .linkHorizontal()
        .x((d) => d.y)
        .y((d) => d.x)
    )
    .attr("fill", "none")
    .attr("stroke", "#ccc")
    .attr("stroke-width", 1.5);

  // Create node groups
  const nodes = g
    .selectAll(".node")
    .data(treeData.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", (d) => `translate(${d.y},${d.x})`);

  // Create tooltip div
  const tooltip = d3
    .select(mindmapContainer.value)
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background-color", "white")
    .style("padding", "10px")
    .style("border-radius", "6px")
    .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
    .style("pointer-events", "none")
    .style("max-width", "300px");

  // Add node circles with hover effects
  nodes
    .append("circle")
    .attr("r", (d) => (d.data.importance || 1) * 5)
    .attr("fill", (d) => getNodeColor(d.data.type))
    .attr("stroke", "#fff")
    .attr("stroke-width", 2)
    .on("mouseover", (event, d) => {
      tooltip.transition().duration(200).style("opacity", 1);
      tooltip
        .html(
          `
        <div class="font-bold text-sm mb-1 text-gray-900">${d.data.title}</div>
        <div class="text-xs text-gray-600">${d.data.content || "No description available"}</div>
        <div class="text-xs text-gray-500 mt-1">Type: ${d.data.type}</div>
      `
        )
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 10 + "px");
    })
    .on("mousemove", (event) => {
      tooltip
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 10 + "px");
    })
    .on("mouseout", () => {
      tooltip.transition().duration(500).style("opacity", 0);
    });

  // Add node labels
  nodes
    .append("text")
    .attr("dy", ".31em")
    .attr("x", (d) => (d.children ? -8 : 8))
    .attr("text-anchor", (d) => (d.children ? "end" : "start"))
    .text((d) => d.data.title)
    .style("font-size", "12px")
    .style("fill", "#333");

  // Draw relationship lines
  if (data.value.relationships) {
    drawRelationships(g, treeData);
  }
};

// Function to determine node color based on type
const getNodeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    root: "#4CAF50",
    concept: "#2196F3",
    subconcept: "#9C27B0",
    definition: "#FF9800",
    example: "#F44336",
  };
  return colors[type] || "#999";
};

// Function to draw relationship lines
const drawRelationships = (
  g: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
  treeData: d3.HierarchyPointNode<any>
) => {
  const nodes = treeData.descendants();
  const nodeById = new Map(nodes.map((node) => [node.data.id, node]));

  nodes.forEach((node) => {
    if (node.data.relationships) {
      node.data.relationships.forEach(
        (rel: { target_id: string; type: string }) => {
          const target = nodeById.get(rel.target_id);
          if (target) {
            g.append("path")
              .attr("class", "relationship")
              .attr(
                "d",
                d3
                  .linkHorizontal()
                  .x((d) => d.y)
                  .y((d) => d.x)({
                  source: { x: node.x, y: node.y },
                  target: { x: target.x, y: target.y },
                })
              )
              .attr("stroke", "#999")
              .attr("stroke-width", 1)
              .attr("stroke-dasharray", "4,4")
              .attr("fill", "none");
          }
        }
      );
    }
  });
};

// Handle window resize
const handleResize = () => {
  width.value = window.innerWidth;
  height.value = window.innerHeight;
  createMindMap();
};

onMounted(() => {
  createMindMap();
  window.addEventListener("resize", handleResize);
});
</script>

<template>
  <div class="min-h-screen w-full bg-background p-4">
    <div
      ref="mindmapContainer"
      class="w-full h-[calc(100vh-2rem)] border rounded-lg bg-white shadow-sm"
    ></div>
  </div>
</template>

<style scoped>
.node circle {
  cursor: pointer;
  transition: r 0.3s ease;
}

.node circle:hover {
  r: 12;
}

.node text {
  cursor: pointer;
  transition: font-size 0.3s ease;
}

.node text:hover {
  font-size: 14px;
  font-weight: bold;
}

.link {
  transition: stroke-width 0.3s ease;
}

.link:hover {
  stroke-width: 2.5;
}

.relationship {
  transition: stroke-width 0.3s ease;
}

.relationship:hover {
  stroke-width: 2;
}
</style>
