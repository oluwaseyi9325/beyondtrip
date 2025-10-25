// import * as yup from "yup";

// const courseSchema = yup.object().shape({
//   courseName: yup.string().required("Course is required"),

//   ngnAppFee: yup
//     .number()
//     .min(1)
//     .typeError("Field must be a number")
//     .required("Field is required"),

//   ngnTuitionFee: yup
//     .number()
//     .min(1)
//     .typeError("Field must be a number")
//     .required("Field is required"),

//   ugxAppFee: yup
//     .number()
//     .min(1)
//     .typeError("Field must be a number")
//     .required("Field is required"),

//   ugxTuitionFee: yup
//     .number()
//     .min(1)
//     .typeError("Field must be a number")
//     .required("Field is required"),

//   kesAppFee: yup
//     .number()
//     .min(1)
//     .typeError("Field must be a number")
//     .required("Field is required"),

//   kesTuitionFee: yup
//     .number()
//     .min(1)
//     .typeError("Field must be a number")
//     .required("Field is required"),
  
  
// });

// export default courseSchema;


import * as yup from "yup";

const courseSchema = yup.object().shape({
  courseName: yup.string().required("Course is required"),
  
  ngnAppFee: yup
    .number()
    .min(1)
    .typeError("Field must be a number")
    .required("Field is required"),
  
  ngnTuitionFee: yup
    .number()
    .min(1)
    .typeError("Field must be a number")
    .required("Field is required"),
  
  ugxAppFee: yup
    .number()
    .min(1)
    .typeError("Field must be a number")
    .required("Field is required"),
  
  ugxTuitionFee: yup
    .number()
    .min(1)
    .typeError("Field must be a number")
    .required("Field is required"),
  
  kesAppFee: yup
    .number()
    .min(1)
    .typeError("Field must be a number")
    .required("Field is required"),
  
  kesTuitionFee: yup
    .number()
    .min(1)
    .typeError("Field must be a number")
    .required("Field is required"),
  
  usdAppFee: yup
    .number()
    .min(1)
    .typeError("Field must be a number")
    .required("Field is required"),
  
  usdTuitionFee: yup
    .number()
    .min(1)
    .typeError("Field must be a number")
    .required("Field is required"),
  
  gbpAppFee: yup
    .number()
    .min(1)
    .typeError("Field must be a number")
    .required("Field is required"),
  
  gbpTuitionFee: yup
    .number()
    .min(1)
    .typeError("Field must be a number")
    .required("Field is required"),
});

export default courseSchema;