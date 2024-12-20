import { describe, it, expect, vi } from "vitest";
import axios, { AxiosError } from "axios";
import { serverURL } from "../../../api/config";
import { putTodoEdit } from "../../../api/putTodoEdit";
import { Todo } from "../../../interfaces/Todo";

vi.mock("axios");

describe("putTodoEdit", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it("should successfully update a Todo and return the updated response", async () => {
    const updatedTodo: Todo = {
      id: 1,
      text: "Updated Todo",
      priority: "LOW",
      creationDate: "2024-12-17T00:00:00.000Z",
      done: false,
      dueDate: "2024-12-18T00:00:00.000Z",
      doneDate: null,
    };

    mockedAxios.put.mockResolvedValueOnce({ data: updatedTodo });

    const result = await putTodoEdit(1, updatedTodo);

    expect(mockedAxios.put).toHaveBeenCalledWith(`${serverURL}/todos/1`, updatedTodo);
    expect(result).toEqual(updatedTodo);
  });

  it("should throw an Axios error if the request fails", async () => {
    const errorAxios = new AxiosError();
    const errorMessage="Axios Error";
    errorAxios.message=errorMessage;
    mockedAxios.put.mockRejectedValueOnce(errorAxios);

    await expect(putTodoEdit(1, {} as Todo)).rejects.toThrowError(errorMessage);

    expect(mockedAxios.put).toHaveBeenCalledWith(`${serverURL}/todos/1`, {});
  });

  it("should throw an error if a non-Axios error occurs", async () => {
    mockedAxios.put.mockImplementationOnce(() => {
      throw new Error("Unknown error");
    });

    await expect(putTodoEdit(1, {} as Todo)).rejects.toThrowError("Unknown error");

    expect(mockedAxios.put).toHaveBeenCalledWith(`${serverURL}/todos/1`, {});
  });
});
