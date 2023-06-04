import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")!}`,
};

export const loginApi = async (input: object) => {
  try {
    const result = await axios.post("/api/auth/login", input);
    const token = result.data.token;
    localStorage.setItem("token", token);
    return;
  } catch (err) {
    throw new Error("Wrong Credentials");
  }
};

export const getAllTodo = async () => {
  try {
    const result = await axios.get("/api/todo/getAll", { headers });
    return result;
  } catch (err) {
    throw err;
  }
};

export const verifyToken = async () => {
  try {
    const response = await axios.post("/api/auth/verifyToken",{},{ headers });
    if (response.data.valid) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const addTodo = async(input:object)=>{
  try {
    const result = await axios.post("/api/todo/create",input, { headers });
    return result;
  } catch (err) {
    throw new Error('could not add')
  }
}

export const deleteTodo = async(id:string)=>{
  try {
    const result = await axios.delete(`/api/todo/delete/${id}`, { headers });
    return result;
  } catch (err) {
    throw new Error('could not add')
  }
}

export const editTodo =async (id:string, input:object) => {
  try {
    const result = await axios.patch(`/api/todo/update/${id}`,input, { headers });
    return result;
  } catch (err) {
    throw new Error('could not add')
  }
}