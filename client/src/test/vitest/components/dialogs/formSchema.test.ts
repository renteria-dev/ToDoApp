import dayjs from "dayjs";
import { formSchema } from "../../../../components/dialogs/formSchema";

describe("formSchema", () => {
  const today = dayjs();

  const defaultValues = {
    checked: false,
    text: "",
    priority: "",
    dueDate: null,
  };

  it("validates successfully when all fields are correct and 'checked' is false", async () => {
    const validData = {
      ...defaultValues,
      text: "Test Task",
      priority: "MEDIUM",
    };

    await expect(formSchema.validate(validData)).resolves.toEqual(validData);
  });

  it("fails validation when 'priority' is missing", async () => {
    const invalidData = {
      ...defaultValues,
      checked: true,
      dueDate: today.add(3, "days").toDate(),
    };

    await expect(formSchema.validate(invalidData)).rejects.toThrow(
      "Invalid Priority"
    );
  });

  it("validates 'text' when 'checked' is true and the field is populated", async () => {
    const validData = {
      ...defaultValues,
      checked: true,
      text: "Test Task",
      priority: "HIGH",
      dueDate: today.add(3, "days").toDate(),
    };

    await expect(formSchema.validate(validData)).resolves.toEqual(validData);
  });

  it("fails validation for 'text' when it exceeds the maximum length", async () => {
    const invalidData = {
      ...defaultValues,
      checked: false,
      text: "This is way too long",
      priority: "LOW",
    };

    await expect(formSchema.validate(invalidData)).rejects.toThrow(
      "Maximum 12 characters"
    );
  });

  it("fails validation for 'text' when it is empty", async () => {
    const invalidData = {
      ...defaultValues,
      checked: false,
      text: "",
      priority: "HIGH",
    };

    await expect(formSchema.validate(invalidData)).rejects.toThrow(
      "Task name is required"
    );
  });

  it("validates 'dueDate' when it is in the future and 'checked' is true", async () => {
    const validData = {
      ...defaultValues,
      checked: true,
      text: "Valid Task",
      priority: "LOW",
      dueDate: today.add(3, "days").toDate(),
    };

    await expect(formSchema.validate(validData)).resolves.toEqual(validData);
  });

  it("fails validation for 'dueDate' when it is in the past", async () => {
    const invalidData = {
      ...defaultValues,
      checked: true,
      text: "Past Task",
      priority: "MEDIUM",
      dueDate: today.subtract(1, "day").toDate(),
    };

    await expect(formSchema.validate(invalidData)).rejects.toThrow(
      "Due date cannot be in the past"
    );
  });

  it("passes validation when 'dueDate' is null and 'checked' is false", async () => {
    const validData = {
      ...defaultValues,
      text: "No Due Date",
      priority: "HIGH",
    };

    await expect(formSchema.validate(validData)).resolves.toEqual(validData);
  });

  it("fails validation for 'priority' when an invalid value is provided", async () => {
    const invalidData = {
      ...defaultValues,
      checked: false,
      text: "Test Task",
      priority: "INVALID",
    };

    await expect(formSchema.validate(invalidData)).rejects.toThrow(
      "Invalid Priority"
    );
  });
});
