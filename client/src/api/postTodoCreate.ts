import axios, { isAxiosError, HttpStatusCode } from "axios";
import ResponseProps from "../interfaces/ResponseProps";
import Todo from "../interfaces/Todo";

const postTodoCreate = async (item:Todo) => {
  let response: Todo;
  try {
    let query = `http://localhost:9090/api/v1/todos`;
    const { data } = await axios.post(query,item);
    response = data;
    console.log(response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("different error than axios");
    }
  }
};

export default postTodoCreate;
