import { request } from "./request";

export async function checkToken(token) {
  try {
    const data = await request("/api/profile", "GET", null, {
      Authorization: `Bearer ${token}`,
    });
    if (data) {
      return data;
    } else {
      throw Error;
    }
  } catch (error) {
    console.error(error);
  }
}
