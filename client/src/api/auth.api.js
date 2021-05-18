import { request } from "./request";

export const signup = async (user) => {
  try {
    const data = await request("/api/auth/signup", "POST", user);

    if (!data.ok) {
      if (data.errors) {
        data.errors.forEach((item) => {
          console.log(item.msg);
        });
      } else {
        console.log(data.message);
      }
      throw new Error("The entered data is incorrect.");
    }

    if (data.ok) {
      console.log(data.message);
      return data;
    } else {
      throw new Error("Something went wrong.");
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const login = async (user) => {
  try {
    const data = await request("/api/auth/login", "POST", user);

    console.log(data);

    if (!data.ok) {
      if (data.errors) {
        data.errors.forEach((item) => {
          console.log(item.msg);
        });
      } else {
        console.log(data.message);
      }
      throw new Error("The entered data is incorrect.");
    }

    if (data.token && data.userId) {
      localStorage.setItem(
        "userData",
        JSON.stringify({ userId: data.userId, token: data.token })
      );
      console.log(data.message);
      return data;
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const logout = () => {
  localStorage.removeItem("userData");
};
