import axios from "axios";
import ResponseProps from "../interfaces/ResponseProps";

const getTodos = async (
  page: number,
  priority: string,
  state: string,
  search: string
) => {
  let response: ResponseProps;

  try {
    let query = `http://localhost:9090/api/v1/todos?page=${page}`;
    let addPriorityParam = `&priority=${priority}`;
    let addStateParam = `&state=${state}`;
    let addSearchParam = `&search=${search}`;
    if (priority !== "ALL") {
      //console.log(priority);
      query = query + addPriorityParam;
      //console.log(query);
    }
    if (state !== "ALL") {
      //console.log(state);
      query = query + addStateParam;
    }
    if (search.trim() !== "") {
      //console.log(search);
      query = query + addSearchParam;
    }

    const { data } = await axios.get(query);
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

export default getTodos;
