import { describe, it, expect, vi } from "vitest";
import axios, { AxiosError } from "axios";
import { serverURL } from "../../../api/config";
import { postTodoDone } from "../../../api/postTodoDone";
import { Todo } from "../../../interfaces/Todo";

vi.mock("axios");

describe("postTodoDone", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it("should successfully mark a Todo as done and return the response", async () => {
    const todo: Todo = {
      id: 1,
      text: "Test Todo",
      priority: "HIGH",
      creationDate: "2024-12-17T00:00:00.000Z",
      done: true,
      dueDate: "2024-12-18T00:00:00.000Z",
      doneDate: "2024-12-17T10:00:00.000Z",
    };

    mockedAxios.post.mockResolvedValueOnce({ data: todo });

    const result = await postTodoDone(1);

    expect(mockedAxios.post).toHaveBeenCalledWith(`${serverURL}/todos/1/done`);
    expect(result).toEqual(todo);
  });

  it("should throw an Axios error if the request fails", async () => {
    const errorAxios = new AxiosError();
    const errorMessage="Axios Error";
    errorAxios.message=errorMessage;
    mockedAxios.post.mockRejectedValueOnce(errorAxios);

    await expect(postTodoDone(1)).rejects.toThrowError(errorMessage);

    expect(mockedAxios.post).toHaveBeenCalledWith(`${serverURL}/todos/1/done`);
  });

  it("should throw an error if a non-Axios error occurs", async () => {
    mockedAxios.post.mockImplementationOnce(() => {
      throw new Error("Unknown error");
    });

    await expect(postTodoDone(1)).rejects.toThrowError("Unknown error");

    expect(mockedAxios.post).toHaveBeenCalledWith(`${serverURL}/todos/1/done`);
  });
});
