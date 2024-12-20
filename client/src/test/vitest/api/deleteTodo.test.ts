import { describe, it, expect, vi } from "vitest";
import axios, { AxiosError } from "axios";
import { serverURL } from "../../../api/config";
import { deleteTodo } from "../../../api/deleteTodo";
import { Todo } from "../../../interfaces/Todo";

vi.mock("axios");

describe("deleteTodo", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it("should successfully delete a Todo and return the response", async () => {
    const todo: Todo = {
      id: 1,
      text: "Test Todo",
      priority: "MEDIUM",
      creationDate: "2024-12-17T00:00:00.000Z",
      done: false,
      dueDate: null,
      doneDate: null,
    };

    mockedAxios.delete.mockResolvedValueOnce({ data: todo });

    const result = await deleteTodo(1);

    expect(mockedAxios.delete).toHaveBeenCalledWith(`${serverURL}/todos/1`);
    expect(result).toEqual(todo);
  });

  it("should throw an Axios error if the request fails", async () => {
    const errorAxios = new AxiosError();
    const errorMessage = "Axios Error";
    errorAxios.message = errorMessage;
    mockedAxios.delete.mockRejectedValueOnce(errorAxios);

    await expect(deleteTodo(1)).rejects.toThrowError(errorMessage);

    expect(mockedAxios.delete).toHaveBeenCalledWith(`${serverURL}/todos/1`);
  });

  it("should throw a non-Axios error if an unknown error occurs", async () => {
    mockedAxios.delete.mockImplementationOnce(() => {
      throw new Error("different error than axios");
    });

    await expect(deleteTodo(1)).rejects.toThrowError(
      "different error than axios"
    );

    expect(mockedAxios.delete).toHaveBeenCalledWith(`${serverURL}/todos/1`);
  });
});
