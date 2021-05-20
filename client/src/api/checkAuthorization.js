import { request } from "./request";

export async function checkToken(token) {
  try {
    const data = await request("/api/profile", "GET", null, {
      Authorization: `Bearer ${token}`,
    });
    if (data.ok) {
      return data;
    } else {
      throw Error("Вы не автоизованы. Войдите в систему");
    }
  } catch (error) {
    console.error(error);
  }
}
