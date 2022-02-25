import { Blogs, Tags } from "types";

const API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost/api/v1";
export async function getBlogs(): Promise<Blogs[]> {
  const res = await fetch(API_URL + "/blogs", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  }).then((res) => res.json());
  const blog_data: Blogs[] = res.data;
  return blog_data;
}

export async function getBlogsTags(): Promise<Tags[]> {
  const res = await fetch(API_URL + "/tags", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  }).then((res) => res.json());
  const tags_data: Tags[] = res.data;
  return tags_data;
}

export async function getBlogBySlug(slug: string): Promise<Blogs> {
  const res = await fetch(API_URL + "/blogs/" + slug, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  }).then((res) => res.json());
  const blog_data: Blogs = res.data;
  return blog_data;
}
