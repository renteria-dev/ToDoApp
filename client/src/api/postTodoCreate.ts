import axios from "axios";
import { Todo } from "../interfaces/Todo";
import { serverURL } from "./config";

export const postTodoCreate = async (item: Todo) => {
  let response: Todo;
  try {
    let query = `${serverURL}/todos`;
    const { data } = await axios.post(query, item);
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
