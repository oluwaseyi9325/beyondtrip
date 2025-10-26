import * as yup from "yup";

const driverSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  cohort: yup.string().required("Select a cohort"),
  course: yup.string().required("Select a course"),
});

export default driverSchema;
