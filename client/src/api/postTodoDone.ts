import axios from "axios";
import { Todo } from "../interfaces/Todo";
import { serverURL } from "./config";

export const postTodoDone = async (id: number) => {
  let response: Todo;
  try {
    let query = `${serverURL}/todos/${id}/done`;
    const { data } = await axios.post(query);
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
