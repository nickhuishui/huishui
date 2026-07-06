import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../config";
import { getCollection } from "astro:content";
import createSlug from "../lib/createSlug";
import { withBase } from "../lib/paths";

export async function GET() {
  const blog = await getCollection("blog");
  const siteUrl = new URL(withBase(), import.meta.env.SITE).toString();

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: siteUrl,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: withBase(`blog/${createSlug(post.data.title, post.slug)}/`),
    })),
  });
}
