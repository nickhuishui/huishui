import { describe, expect, test } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { knowledgeItems } from "./knowledge";
import { wechatCollections } from "./wechat";
import { imaKnowledgeBases } from "./ima";

describe("content metadata", () => {
  test("lists the expected local knowledge documents", () => {
    expect(knowledgeItems).toHaveLength(5);
    expect(knowledgeItems.map((item) => item.category)).toEqual([
      "写作与工具",
      "写作与工具",
      "物理笔记",
      "物理笔记",
      "英语学习",
    ]);
  });

  test("points every knowledge document at an existing public PDF", () => {
    for (const item of knowledgeItems) {
      expect(item.fileType).toBe("PDF");
      expect(item.file.endsWith(".pdf")).toBe(true);
      expect(existsSync(join(process.cwd(), "public", item.file))).toBe(true);
    }
  });

  test("lists all WeChat album links", () => {
    expect(wechatCollections).toHaveLength(7);
    expect(
      wechatCollections.every((item) =>
        item.url.startsWith("https://mp.weixin.qq.com/mp/appmsgalbum"),
      ),
    ).toBe(true);
  });

  test("lists all IMA knowledge base links", () => {
    expect(imaKnowledgeBases).toHaveLength(6);
    expect(
      imaKnowledgeBases.every((item) =>
        item.url.startsWith("https://ima.qq.com/wiki/"),
      ),
    ).toBe(true);
  });
});
