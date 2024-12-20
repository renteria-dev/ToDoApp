import React from "react";
import { Formik, Field, Form } from "formik";

import {
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  DialogContent,
  Dialog,
  DialogActions,
  DialogTitle,
  FormHelperText,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { formSchema } from "./formSchema";

interface TodoFormProps {
  initialValues: {
    text: string;
    priority: string;
    dueDate: Dayjs | null;
    checked: boolean;
  };
  onSubmit: (values: {
    text: string;
    priority: string;
    dueDate: Dayjs | null;
    checked: boolean;
  }) => void;
  openDialog: boolean;
  closeDialog: () => void;
  title: string;
  action: string;
}

export const FormDialog: React.FC<TodoFormProps> = ({
  initialValues,
  onSubmit,
  openDialog,
  closeDialog,
  title,
  action,
}) => {
  return (
    <Dialog
      data-testid="form-dialog"
      open={openDialog}
      onClose={closeDialog}
      fullWidth
      disableRestoreFocus
    >
      <DialogTitle>{title}</DialogTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form>
            <DialogContent
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Field
                fullWidth
                name="text"
                label="Name"
                component={TextField}
                variant="outlined"
                error={touched.text && Boolean(errors.text)}
                helperText={touched.text && errors.text}
                value={values.text}
                onChange={(e: { target: { value: string } }) =>
                  setFieldValue("text", e.target.value)
                }
                sx={{ marginBottom: 2 }}
              />

              <FormControl
                fullWidth
                error={touched.priority && Boolean(errors.priority)}
                sx={{ marginBottom: 2 }}
              >
                <InputLabel id="priority-label">Priority</InputLabel>
                <Field
                  name="priority"
                  as={Select}
                  fullWidth
                  labelId="priority-label" // Ensures association with InputLabel
                  id="priority-select" // Unique identifier for testing
                  error={touched.priority && Boolean(errors.priority)}
                  onChange={(e: { target: { value: string } }) =>
                    setFieldValue("priority", e.target.value)
                  }
                >
                  <MenuItem value="LOW">LOW</MenuItem>
                  <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                  <MenuItem value="HIGH">HIGH</MenuItem>
                </Field>
                {touched.priority && errors.priority && (
                  <FormHelperText>{errors.priority}</FormHelperText>
                )}
              </FormControl>

              <FormControlLabel
                label="Add due date"
                sx={{ marginBottom: 2 }}
                control={
                  <Checkbox
                    checked={values.checked}
                    onChange={(e) => {
                      setFieldValue("checked", e.target.checked);
                    }}
                  />
                }
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  disabled={!values.checked}
                  value={values.dueDate}
                  minDate={dayjs()}
                  onChange={(value: Dayjs | null) =>
                    setFieldValue("dueDate", value)
                  }
                  slotProps={{
                    textField: {
                      error: Boolean(touched.dueDate && errors.dueDate),
                      helperText: touched.dueDate ? errors.dueDate : "",
                    },
                  }}
                  sx={{ marginBottom: 2 }}
                />
              </LocalizationProvider>
            </DialogContent>

            <DialogActions sx={{ padding: 3 }}>
              <Button onClick={closeDialog} color="primary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {action}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
