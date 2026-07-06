import { imaKnowledgeBases } from "./ima";
import { knowledgeItems } from "./knowledge";
import { wechatCollections } from "./wechat";

export const siteStats = [
  {
    label: "知识文档",
    value: knowledgeItems.length,
    href: "knowledge",
  },
  {
    label: "公众号合集",
    value: wechatCollections.length,
    href: "wechat",
  },
  {
    label: "IMA 知识库",
    value: imaKnowledgeBases.length,
    href: "ima",
  },
];
