import axios from "axios";

export const loginApi = async (input: object) => {
  try {
    const result = await axios.post("/api/auth/login", input);
    const token = result.data.token;
    localStorage.setItem("token", token);
  } catch (err) {
    alert("Wrong Credentials");
    throw new Error("Wrong Credentials");
  }
};
export const signupApi = async (input: object) => {
  try {
    const result = await axios.post("/api/auth/signup", input);
    const token = result.data.token;
    localStorage.setItem("token", token);
  } catch (err) {
    alert("Wrong Credentials");
    throw new Error("Wrong Credentials");
  }
};

export const verifyToken = async () => {
  try {
    const response = await axios.post(
      "/api/auth/verifyToken",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")!}`,
        },
      }
    );
    if (response.data.valid) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const addTodo = async (input: object) => {
  try {
    const result = await axios.post("/api/todo/create", input, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")!}`,
      },
    });
    return result;
  } catch (err) {
    throw new Error("could not add");
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const result = await axios.delete(`/api/todo/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")!}`,
      },
    });
    return result;
  } catch (err) {
    throw new Error("could not add");
  }
};

export const editTodo = async (id: string, input: object) => {
  try {
    const result = await axios.patch(`/api/todo/update/${id}`, input, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")!}`,
      },
    });
    console.log(result);
    return result;
  } catch (err) {
    throw new Error("could not add");
  }
};
