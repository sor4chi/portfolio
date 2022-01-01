import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkRehype from "remark-rehype";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import rehypeShiki from "@leafac/rehype-shiki";
import * as shiki from "shiki";

export default async function markdownToHtml(markdown: string) {
  const result = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeShiki, {
      highlighter: await shiki.getHighlighter({
        theme: "github-dark",
      }),
    })
    .use(rehypeStringify)
    .processSync(markdown);
  return result.toString();
}
