export async function request(url, method = "GET", body = null, headers = {}) {
  try {
    if (body) {
      body = JSON.stringify(body);
      headers["Content-type"] = "application/json";
    }
    const response = await fetch(url, { method, body, headers });
    const data = await response.json();
    data.ok = response.ok;
    return data;
  } catch (error) {
    throw new Error(error.message, " Что-то пошло не так.");
  }
}
