import MarkdownIt from "markdown-it";
import MarkdownItKatex from "markdown-it-katex";
import "katex/dist/katex.min.css";

export default defineNuxtPlugin(() => {
  const md = new MarkdownIt().use(MarkdownItKatex);

  return {
    provide: {
      md: (content: string) => md.render(content),
    },
  };
});
