import * as yup from "yup";

const classSchema = yup.object().shape({
  cohort: yup.string().required("Select a cohort"),
  course: yup.string().required("Select a course"),
});

export default classSchema;
