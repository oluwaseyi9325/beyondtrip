import * as yup from "yup";

const cohortSchema = yup.object().shape({
  note: yup
    .number()
    .min(0)
    .typeError("Cohort must be a number")
    .required("Cohort is required"),
  startDate: yup.date().required("Field is required"),
  endDate: yup.date().required("Field is required"),
});

export default cohortSchema;
