import axios from "axios";
import Todo from "../interfaces/Todo";

const putTodoUndone = async (id: number) => {
  let response: Todo;
  try {
    let query = `http://localhost:9090/api/v1/todos/${id}/undone`;
    const { data } = await axios.put(query);
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

export default putTodoUndone;
