import { describe, it, expect, vi } from "vitest";
import axios, { AxiosError } from "axios";
import { serverURL } from "../../../api/config";
import { postTodoCreate } from "../../../api/postTodoCreate";
import { Todo } from "../../../interfaces/Todo";

vi.mock("axios");

describe("postTodoCreate", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it("should successfully create a Todo and return the created response", async () => {
    const newTodo: Todo = {
      id: 1,
      text: "New Todo",
      priority: "MEDIUM",
      creationDate: "2024-12-17T00:00:00.000Z",
      done: false,
      dueDate: "2024-12-18T00:00:00.000Z",
      doneDate: null,
    };

    mockedAxios.post.mockResolvedValueOnce({ data: newTodo });

    const result = await postTodoCreate(newTodo);

    expect(mockedAxios.post).toHaveBeenCalledWith(`${serverURL}/todos`, newTodo);
    expect(result).toEqual(newTodo);
  });

  it("should throw an Axios error if the request fails", async () => {
    const errorAxios = new AxiosError();
    const errorMessage="Axios Error";
    errorAxios.message=errorMessage;
    mockedAxios.post.mockRejectedValueOnce(errorAxios);

    await expect(postTodoCreate({} as Todo)).rejects.toThrowError(errorMessage);

    expect(mockedAxios.post).toHaveBeenCalledWith(`${serverURL}/todos`, {});
  });

  it("should throw an error if a non-Axios error occurs", async () => {
    mockedAxios.post.mockImplementationOnce(() => {
      throw new Error("Unknown error");
    });

    await expect(postTodoCreate({} as Todo)).rejects.toThrowError("Unknown error");

    expect(mockedAxios.post).toHaveBeenCalledWith(`${serverURL}/todos`, {});
  });
});
