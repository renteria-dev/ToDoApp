import axios, { isAxiosError, HttpStatusCode } from "axios";
import ResponseProps from "../interfaces/ResponseProps";

const getTodos = async (page: number) => {
  let response: ResponseProps;
  try {
    let query = `http://localhost:9090/api/v1/todos?page=${page}`;
    const { data } = await axios.get(query);
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

export default getTodos;
