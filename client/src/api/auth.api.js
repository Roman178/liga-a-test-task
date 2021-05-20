import { request } from "./request";

export const signup = async (user) => {
  try {
    const data = await request("/api/auth/signup", "POST", user);
    return data;
  } catch (error) {
    console.error(`Ошибка при регистрации ${error.message}`);
  }
};

export const login = async (user) => {
  try {
    const data = await request("/api/auth/login", "POST", user);

    if (data.token && data.userId && data.ok) {
      localStorage.setItem(
        "userData",
        JSON.stringify({ userId: data.userId, token: data.token })
      );
      return data;
    }
    return data;
  } catch (error) {
    console.error(`Ошибка при попытке входа в систему ${error.message}`);
  }
};

export const logout = () => {
  localStorage.removeItem("userData");
};
