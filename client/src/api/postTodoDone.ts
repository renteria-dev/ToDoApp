import axios from "axios";
import Todo from "../interfaces/Todo";

const postTodoDone = async (id: number) => {
  let response: Todo;
  try {
    let query = `http://localhost:9090/api/v1/todos/${id}/done`;
    const { data } = await axios.post(query);
    response = data;
    //console.log(response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("different error than axios");
    }
  }
};

export default postTodoDone;
