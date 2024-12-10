import axios from "axios";
import Todo from "../interfaces/Todo";
import { serverURL } from "./config";

const deleteTodo = async (id: number) => {
  let response: Todo;
  try {
    let query = `${serverURL}/todos/${id}`;
    const { data } = await axios.delete(query);
    response = data;
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("different error than axios");
    }
  }
};

export default deleteTodo;
