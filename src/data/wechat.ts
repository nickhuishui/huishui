export interface WeChatCollection {
  title: string;
  summary: string;
  tags: string[];
  url: string;
  source: "微信公众号合集";
}

export const wechatCollections: WeChatCollection[] = [
  {
    title: "公众号合集 01",
    summary: "来自公众号的精选文章合集入口，后续可以补充真实标题、封面和主题说明。",
    tags: ["公众号", "文章合集"],
    url: "https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzk2NDE3NTM4Ng==&action=getalbum&album_id=3808824475836006404#wechat_redirect",
    source: "微信公众号合集",
  },
  {
    title: "公众号合集 02",
    summary: "用于集中展示已经发布在公众号中的系列内容，方便从个人站跳转阅读。",
    tags: ["公众号", "系列文章"],
    url: "https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzk2NDE3NTM4Ng==&action=getalbum&album_id=4049275144705933330#wechat_redirect",
    source: "微信公众号合集",
  },
  {
    title: "公众号合集 03",
    summary: "公众号文章集合链接，适合作为个人文章归档和主题阅读入口。",
    tags: ["公众号", "归档"],
    url: "https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzk2NDE3NTM4Ng==&action=getalbum&album_id=3890797972052770820#wechat_redirect",
    source: "微信公众号合集",
  },
  {
    title: "公众号合集 04",
    summary: "面向外部读者的公众号合集导航，后续可按主题继续细分。",
    tags: ["公众号", "合集导航"],
    url: "https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzk2NDE3NTM4Ng==&action=getalbum&album_id=4150909657818595329#wechat_redirect",
    source: "微信公众号合集",
  },
  {
    title: "公众号合集 05",
    summary: "可用于承载学习笔记、知识分享或随笔类公众号内容。",
    tags: ["公众号", "知识分享"],
    url: "https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzk2NDE3NTM4Ng==&action=getalbum&album_id=3893714539623219203#wechat_redirect",
    source: "微信公众号合集",
  },
  {
    title: "公众号合集 06",
    summary: "公众号历史内容的外部阅读入口，保持与站内知识库互补。",
    tags: ["公众号", "外部阅读"],
    url: "https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzk2NDE3NTM4Ng==&action=getalbum&album_id=3888029283578544131#wechat_redirect",
    source: "微信公众号合集",
  },
  {
    title: "公众号合集 07",
    summary: "用于展示新的公众号专题合集，可在后续补充更具体的主题名称。",
    tags: ["公众号", "专题"],
    url: "https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzk2NDE3NTM4Ng==&action=getalbum&album_id=4265048027833827349#wechat_redirect",
    source: "微信公众号合集",
  },
];
