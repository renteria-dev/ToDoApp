import { describe, it, expect, vi } from "vitest";
import axios, { AxiosError } from "axios";
import { serverURL } from "../../../api/config";
import { putTodoUndone } from "../../../api/putTodoUndone";
import { Todo } from "../../../interfaces/Todo";

vi.mock("axios");

describe("putTodoUndone", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it("should successfully mark a Todo as undone and return the response", async () => {
    const todo: Todo = {
      id: 1,
      text: "Test Todo",
      priority: "MEDIUM",
      creationDate: "2024-12-17T00:00:00.000Z",
      done: false,
      dueDate: null,
      doneDate: null,
    };

    mockedAxios.put.mockResolvedValueOnce({ data: todo });

    const result = await putTodoUndone(1);

    expect(mockedAxios.put).toHaveBeenCalledWith(`${serverURL}/todos/1/undone`);
    expect(result).toEqual(todo);
  });

  it("should throw an Axios error if the request fails", async () => {
    const errorAxios = new AxiosError();
    const errorMessage="Axios Error";
    errorAxios.message=errorMessage;
    mockedAxios.put.mockRejectedValueOnce(errorAxios);

    await expect(putTodoUndone(1)).rejects.toThrowError(errorMessage);

    expect(mockedAxios.put).toHaveBeenCalledWith(`${serverURL}/todos/1/undone`);
  });

  it("should throw an error if a non-Axios error occurs", async () => {
    mockedAxios.put.mockImplementationOnce(() => {
      throw new Error("Unknown error");
    });

    await expect(putTodoUndone(1)).rejects.toThrowError("Unknown error");

    expect(mockedAxios.put).toHaveBeenCalledWith(`${serverURL}/todos/1/undone`);
  });
});
