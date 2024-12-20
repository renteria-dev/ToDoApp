import axios from "axios";
import { Todo } from "../interfaces/Todo";
import { serverURL } from "./config";

export const putTodoEdit = async (id: number, item: Todo) => {
  let response: Todo;
  try {
    let query = `${serverURL}/todos/${id}`;
    const { data } = await axios.put(query, item);
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
