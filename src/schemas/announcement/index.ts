import * as yup from "yup";

const announcementSchema = yup.object().shape({
    topic: yup.string().required("Topic is required"),
    details: yup.string().required("Details are required"),
    createdAt: yup.date().required("Creation date is required"),
    expiryDate: yup.date().required("Expiry date is required"),
});

export default announcementSchema
