import { Profile } from "types";

const API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost/api/v1";
export async function getProfiles(): Promise<Profile[]> {
  const res = await fetch(API_URL + "/profiles", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  }).then((res) => res.json());
  const prof_data: Profile[] = res.data;
  return prof_data;
}
