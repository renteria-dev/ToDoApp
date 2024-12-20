import { describe, it, expect, vi } from "vitest";
import axios, { AxiosError } from "axios";
import { serverURL } from "../../../api/config";
import { getTodos } from "../../../api/getTodos";
import { ResponseProps } from "../../../interfaces/ResponseProps";

vi.mock("axios");

describe("getTodos", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it("should fetch todos with the correct query parameters", async () => {
    const mockResponse: ResponseProps = {
      pages: {
        totalPages: 2,
        actualPage: 1,
      },
      content: [
        {
          id: 1,
          text: "Test Todo 1",
          priority: "HIGH",
          creationDate: "2024-12-17T00:00:00.000Z",
          done: false,
          dueDate: "2024-12-18T00:00:00.000Z",
          doneDate: null,
        },
      ],
      metrics: {
        average: "2",
        averageHigh: "1",
        averageMedium: "0",
        averageLow: "1",
      },
    };

    const page = 1;
    const priority = "HIGH";
    const state = "PENDING";
    const search = "Test";

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getTodos(page, priority, state, search);

    const expectedQuery = `${serverURL}/todos?page=${page}&priority=${priority}&state=${state}&search=${search}`;
    
    expect(mockedAxios.get).toHaveBeenCalledWith(expectedQuery);
    expect(result).toEqual(mockResponse);
  });

  it("should call the endpoint with 'ALL' priority if priority is not specified", async () => {
    const mockResponse: ResponseProps = {
      pages: {
        totalPages: 1,
        actualPage: 1,
      },
      content: [],
      metrics: {
        average: "0",
        averageHigh: "0",
        averageMedium: "0",
        averageLow: "0",
      },
    };

    const page = 1;
    const priority = "ALL";
    const state = "ALL";
    const search = "";

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getTodos(page, priority, state, search);

    const expectedQuery = `${serverURL}/todos?page=${page}`;

    expect(mockedAxios.get).toHaveBeenCalledWith(expectedQuery);
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error if the request fails", async () => {
    const errorAxios = new AxiosError();
    const errorMessage="Axios Error";
    errorAxios.message=errorMessage

    mockedAxios.get.mockRejectedValueOnce(errorAxios);

    const page = 1;
    const priority = "MEDIUM";
    const state = "COMPLETED";
    const search = "Test Error";

    await expect(getTodos(page, priority, state, search)).rejects.toThrowError(errorMessage);

    const expectedQuery = `${serverURL}/todos?page=${page}&priority=${priority}&state=${state}&search=${search}`;
    expect(mockedAxios.get).toHaveBeenCalledWith(expectedQuery);
  });

  it("should handle empty search gracefully", async () => {
    const mockResponse: ResponseProps = {
      pages: {
        totalPages: 1,
        actualPage: 1,
      },
      content: [],
      metrics: {
        average: "0",
        averageHigh: "0",
        averageMedium: "0",
        averageLow: "0",
      },
    };

    const page = 1;
    const priority = "HIGH";
    const state = "PENDING";
    const search = "";  // empty search string

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getTodos(page, priority, state, search);

    const expectedQuery = `${serverURL}/todos?page=${page}&priority=${priority}&state=${state}`;

    expect(mockedAxios.get).toHaveBeenCalledWith(expectedQuery);
    expect(result).toEqual(mockResponse);
  });

  it("should handle 'ALL' state gracefully", async () => {
    const mockResponse: ResponseProps = {
      pages: {
        totalPages: 1,
        actualPage: 1,
      },
      content: [],
      metrics: {
        average: "0",
        averageHigh: "0",
        averageMedium: "0",
        averageLow: "0",
      },
    };

    const page = 1;
    const priority = "MEDIUM";
    const state = "ALL";  // state 'ALL'
    const search = "Test State";

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getTodos(page, priority, state, search);

    const expectedQuery = `${serverURL}/todos?page=${page}&priority=${priority}&search=${search}`;

    expect(mockedAxios.get).toHaveBeenCalledWith(expectedQuery);
    expect(result).toEqual(mockResponse);
  });
});
