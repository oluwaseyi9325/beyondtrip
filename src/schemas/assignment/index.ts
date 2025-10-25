import * as yup from "yup";

const assignmentSchema = yup.object().shape({
    name: yup.string().required("Assignment name is required"),
    date: yup.string().required("Date is required"),
    link: yup.string().required("Assgignment link is required"),
    note: yup.string().required("Note is required"),
});

export default assignmentSchema;
