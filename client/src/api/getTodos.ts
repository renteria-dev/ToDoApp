import axios from "axios";
import { ResponseProps } from "../interfaces/ResponseProps";
import { serverURL } from "./config";

export const getTodos = async (
  page: number,
  priority: string,
  state: string,
  search: string
) => {
  let response: ResponseProps;

  try {
    let query = `${serverURL}/todos?page=${page}`;
    let addPriorityParam = `&priority=${priority}`;
    let addStateParam = `&state=${state}`;
    let addSearchParam = `&search=${search}`;
    if (priority !== "ALL") {
      query = query + addPriorityParam;
    }
    if (state !== "ALL") {
      query = query + addStateParam;
    }
    if (search.trim() !== "") {
      query = query + addSearchParam;
    }

    const { data } = await axios.get(query);
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
