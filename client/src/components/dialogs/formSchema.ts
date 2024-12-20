import dayjs from "dayjs";
import * as Yup from "yup";

export const formSchema = Yup.object({
  checked: Yup.boolean(),
  text: Yup.string()
    .required("Task name is required")
    .trim()
    .min(1, "Minimum 1 character")
    .max(12, "Maximum 12 characters"),
  priority: Yup.string()
    .oneOf(["LOW", "MEDIUM", "HIGH"], "Invalid Priority")
    .required("Priority is required"),
  dueDate: Yup.date()
    .nullable()
    .when("checked", {
      is: true,
      then: (schema) =>
        schema
          .required("Due Date is required")
          .min(dayjs().toDate(), "Due date cannot be in the past"),
      otherwise: (schema) => schema.nullable(),
    }),
}).required();

export default formSchema;
