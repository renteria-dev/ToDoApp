import axios from "axios";
import { Todo } from "../interfaces/Todo";
import { serverURL } from "./config";

export const putTodoUndone = async (id: number) => {
  let response: Todo;
  try {
    let query = `${serverURL}/todos/${id}/undone`;
    const { data } = await axios.put(query);
    response = data;
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw error;
    }
  }
};
