import { Works, Categories } from "types";

const API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost/api/v1";
export async function getWorks(): Promise<Works[]> {
  const res = await fetch(API_URL + "/works", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  }).then((res) => res.json());
  const works_data: Works[] = res.data;
  return works_data;
}
export async function getWorkBySlug(params: number): Promise<Works> {
  const res = await fetch(API_URL + "/works/" + params, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  }).then((res) => res.json());
  const works_data: Works = res.data;
  return works_data;
}

export async function getWorksCategories(): Promise<Categories[]> {
  const res = await fetch(API_URL + "/works_categories", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  }).then((res) => res.json());
  const works_categories_data: Categories[] = res.data;
  return works_categories_data;
}
