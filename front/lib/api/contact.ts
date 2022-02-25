import { Contact } from "types";
const API_URL =
  process.env.NEXT_PUBLIC_BASE_BROWSER_API_URL || "http://localhost/api/v1";
export async function postContact(data: Contact): Promise<string> {
  const res = await fetch(API_URL + "/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
  return res.status;
}
