

// import Button from "@/components/button";
// import Input from "@/components/input/input";
// import Text from "@/components/typography";
// import Select from "@/components/input/select";
// import Modal from "@/components/modal";
// import { CoursesOption } from "@/lib/options/courses";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import courseSchema from "@/schemas/course";
// import { useCreateCourse, useUpdateCourse } from "@/services/course.service";
// import toast from "react-hot-toast";
// import { useEffect } from "react";
// import clsx from "clsx";
// import Stack from "@/components/stack";

// interface TModal {
//   open: boolean;
//   handleClose: () => void;
//   refetch: () => void;
//   editData?: any;
// }

// export interface TAddCourse {
//   courseName: string;
//   ngnAppFee: number;
//   ngnTuitionFee: number;
//   ugxAppFee: number;
//   ugxTuitionFee: number;
//   kesAppFee: number;
//   kesTuitionFee: number;
//   usdAppFee: number;
//   usdTuitionFee: number;
//   gbpAppFee: number;
//   gbpTuitionFee: number;
// }

// const AddCourse = ({ open, handleClose, refetch, editData }: TModal) => {
//   const {
//     register,
//     control,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm<TAddCourse>({
//     mode: "onBlur",
//     resolver: yupResolver(courseSchema),
//   });

//   const create = useCreateCourse();
//   console.log("editData structure:......", editData);
//   const update = useUpdateCourse(editData?.id);
//   const isEditing = !!editData;

//   useEffect(() => {
//     if (editData) {
//       console.log("editData structure:", editData);

//       // Remove the .items since editData is now a single course object
//       setValue("courseName", editData.courseName || "");

//       // Handle the fee structure based on your actual data
//       setValue("ngnAppFee", Number(editData.applicationFees?.find((fee: any) => fee.currencyCode === "NGN")?.amount || 0));
//       setValue("ngnTuitionFee", Number(editData.tuitionFees?.find((fee: any) => fee.currencyCode === "NGN")?.amount || 0));
//       setValue("ugxAppFee", Number(editData.applicationFees?.find((fee: any) => fee.currencyCode === "UGX")?.amount || 0));
//       setValue("ugxTuitionFee", Number(editData.tuitionFees?.find((fee: any) => fee.currencyCode === "UGX")?.amount || 0));
//       setValue("kesAppFee", Number(editData.applicationFees?.find((fee: any) => fee.currencyCode === "KES")?.amount || 0));
//       setValue("kesTuitionFee", Number(editData.tuitionFees?.find((fee: any) => fee.currencyCode === "KES")?.amount || 0));
//       setValue("usdAppFee", Number(editData.applicationFees?.find((fee: any) => fee.currencyCode === "USD")?.amount || 0));
//       setValue("usdTuitionFee", Number(editData.tuitionFees?.find((fee: any) => fee.currencyCode === "USD")?.amount || 0));
//       setValue("gbpAppFee", Number(editData.applicationFees?.find((fee: any) => fee.currencyCode === "GBP")?.amount || 0));
//       setValue("gbpTuitionFee", Number(editData.tuitionFees?.find((fee: any) => fee.currencyCode === "GBP")?.amount || 0));
//     } else {
//       reset();
//     }
//   }, [editData, setValue, reset]);

//   const onSubmit = (data: TAddCourse) => {
//     const payloadAdd = {
//       courseName: data.courseName,
//       ngnAppFee: data.ngnAppFee,
//       ngnTuitionFee: data.ngnTuitionFee,
//       ugxAppFee: data.ugxAppFee,
//       ugxTuitionFee: data.ugxTuitionFee,
//       kesAppFee: data.kesAppFee,
//       kesTuitionFee: data.kesTuitionFee,
//       usdAppFee: data.usdAppFee,
//       usdTuitionFee: data.usdTuitionFee,
//       gbpAppFee: data.gbpAppFee,
//       gbpTuitionFee: data.gbpTuitionFee,
//     };

//     const payloadUpdate = {
//         courseName: data.courseName,
//       ngnAppFee: data.ngnAppFee,
//       ngnTuitionFee: data.ngnTuitionFee,
//       ugxAppFee: data.ugxAppFee,
//       ugxTuitionFee: data.ugxTuitionFee,
//       kesAppFee: data.kesAppFee,
//       kesTuitionFee: data.kesTuitionFee,
//       usdAppFee: data.usdAppFee,
//       usdTuitionFee: data.usdTuitionFee,
//       gbpAppFee: data.gbpAppFee,
//       gbpTuitionFee: data.gbpTuitionFee,
//       courseId: editData?.id,
//       feeIdNgnFee: editData?.id
//     };

//     if (isEditing) {
//       // Update course
//       update.mutate(payloadUpdate, {
//         onSuccess: () => {
//           toast.success("Course updated successfully!");
//           if (refetch) refetch();
//           handleClose();
//           reset();
//         },
//         onError: (err: any) => {
//           console.error("Update error:", err);
//           toast.error(
//             err?.response?.data?.error?.description ??
//             "Something went wrong while updating the course"
//           );
//         },
//       });
//     } else {
//       // Create new course
//       create.mutate(payloadAdd, {
//         onSuccess: () => {
//           toast.success("Course created successfully!");
//           if (refetch) refetch();
//           handleClose();
//           reset();
//         },
//         onError: (err: any) => {
//           toast.error(
//             err?.response?.data?.error?.description ??
//             "An error occurred while creating course"
//           );
//         },
//       });
//     }
//   };

//   return (
//     <Modal open={open} handleClose={handleClose} className="w-[490px] p-14">
//       <form
//         className="w-full flex flex-col gap-8"
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         <p className="text-[32px] font-[700] leading-[36px] text-[#171313]">
//           {isEditing ? "Edit Course" : "Add a New Course"}
//         </p>

//         <section className="max-h-[62vh] w-full flex flex-col gap-4 overflow-y-auto scrollbar-none">
    
//           {
//             isEditing ?
//               <Stack spacing={4}>
//                 <Text type="span" weight="500">
//                   Course Name
//                 </Text>

//                 <div className="w-full h-14 bg-white relative">


//                   <input
//                     value={editData?.courseName}
//                     disabled
//                     className={clsx(
//                       "w-full h-full bg-transparent border border-grey-200 rounded-md outline-none pr-4 text-sm text-black placeholder:text-grey-300",
//                       "pl-4"
//                     )}
//                   />
//                 </div>


//               </Stack> : <Select
//                 label="Course Name"
//                 name="courseName"
//                 options={CoursesOption}
//                 control={control}
//                 error={errors?.courseName?.message}
//                 placeholder="Select course"
//               />

//           }
//           {/* <Input
//               disabled
//             label="Course Name"
//             // value={editData.courseName}
//             placeholder="Application Fee (NGN)"
//             register={register("ngnAppFee")}
//             error={errors?.ngnAppFee}
//           /> */}

//           <div className="w-full grid grid-cols-2 gap-4">
//             <Input
//               label="NGN Application Fee"
//               placeholder="Application Fee (NGN)"
//               register={register("ngnAppFee")}
//               error={errors?.ngnAppFee}
//             />

//             <Input
//               label="NGN Tuition Fee"
//               placeholder="Tuition Fee (NGN)"
//               register={register("ngnTuitionFee")}
//               error={errors?.ngnTuitionFee}
//             />
//           </div>

//           <div className="w-full grid grid-cols-2 gap-4">
//             <Input
//               label="UGX Application Fee"
//               placeholder="Application Fee (UGX)"
//               register={register("ugxAppFee")}
//               error={errors?.ugxAppFee}
//             />

//             <Input
//               label="UGX Tuition Fee"
//               placeholder="Tuition Fee (UGX)"
//               register={register("ugxTuitionFee")}
//               error={errors?.ugxTuitionFee}
//             />
//           </div>

//           <div className="w-full grid grid-cols-2 gap-4">
//             <Input
//               label="KES Application Fee"
//               placeholder="Application Fee (KES)"
//               register={register("kesAppFee")}
//               error={errors?.kesAppFee}
//             />

//             <Input
//               label="KES Tuition Fee"
//               placeholder="Tuition Fee (KES)"
//               register={register("kesTuitionFee")}
//               error={errors?.kesTuitionFee}
//             />
//           </div>

//           <div className="w-full grid grid-cols-2 gap-4">
//             <Input
//               label="USD Application Fee"
//               placeholder="Application Fee (USD)"
//               register={register("usdAppFee")}
//               error={errors?.usdAppFee}
//             />

//             <Input
//               label="USD Tuition Fee"
//               placeholder="Tuition Fee (USD)"
//               register={register("usdTuitionFee")}
//               error={errors?.usdTuitionFee}
//             />
//           </div>

//           <div className="w-full grid grid-cols-2 gap-4">
//             <Input
//               label="GBP Application Fee"
//               placeholder="Application Fee (GBP)"
//               register={register("gbpAppFee")}
//               error={errors?.gbpAppFee}
//             />

//             <Input
//               label="GBP Tuition Fee"
//               placeholder="Tuition Fee (GBP)"
//               register={register("gbpTuitionFee")}
//               error={errors?.gbpTuitionFee}
//             />
//           </div>
//         </section>

//         <Button type="submit" className="w-full text-white font-[700]">
//           {(create.isPending || update.isPending)
//             ? `${isEditing ? "Updating" : "Creating"}...`
//             : `${isEditing ? "Update" : "Create"} Course`}
//         </Button>
//       </form>
//     </Modal>
//   );
// };

// export default AddCourse;


import Button from "@/components/button";
import Input from "@/components/input/input";
import Text from "@/components/typography";
import Select from "@/components/input/select";
import Modal from "@/components/modal";
import { CoursesOption } from "@/lib/options/courses";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import courseSchema from "@/schemas/course";
import { useCreateCourse, useUpdateCourse } from "@/services/course.service";
import toast from "react-hot-toast";
import { useEffect } from "react";
import clsx from "clsx";
import Stack from "@/components/stack";

interface TModal {
  open: boolean;
  handleClose: () => void;
  refetch: () => void;
  editData?: any;
}

export interface TAddCourse {
  courseName: string;
  ngnAppFee: number;
  ngnTuitionFee: number;
  ugxAppFee: number;
  ugxTuitionFee: number;
  kesAppFee: number;
  kesTuitionFee: number;
  usdAppFee: number;
  usdTuitionFee: number;
  gbpAppFee: number;
  gbpTuitionFee: number;
}

const AddCourse = ({ open, handleClose, refetch, editData }: TModal) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TAddCourse>({
    mode: "onBlur",
    resolver: yupResolver(courseSchema),
  });

  const create = useCreateCourse();
  console.log("editData structure:......", editData);
  const update = useUpdateCourse(editData?.id);
  const isEditing = !!editData;

  // Helper function to get fee ID by currency code
  const getFeeId = (fees: any[], currencyCode: string) => {
    const fee = fees?.find((fee: any) => fee.currencyCode === currencyCode);
    return fee?.id || null;
  };

  useEffect(() => {
    if (editData) {
      console.log("editData structure:", editData);

      setValue("courseName", editData.courseName || "");

      // Handle the fee structure based on your actual data
      setValue("ngnAppFee", Number(editData.applicationFees?.find((fee: any) => fee.currencyCode === "NGN")?.amount || 0));
      setValue("ngnTuitionFee", Number(editData.tuitionFees?.find((fee: any) => fee.currencyCode === "NGN")?.amount || 0));
      setValue("ugxAppFee", Number(editData.applicationFees?.find((fee: any) => fee.currencyCode === "UGX")?.amount || 0));
      setValue("ugxTuitionFee", Number(editData.tuitionFees?.find((fee: any) => fee.currencyCode === "UGX")?.amount || 0));
      setValue("kesAppFee", Number(editData.applicationFees?.find((fee: any) => fee.currencyCode === "KES")?.amount || 0));
      setValue("kesTuitionFee", Number(editData.tuitionFees?.find((fee: any) => fee.currencyCode === "KES")?.amount || 0));
      setValue("usdAppFee", Number(editData.applicationFees?.find((fee: any) => fee.currencyCode === "USD")?.amount || 0));
      setValue("usdTuitionFee", Number(editData.tuitionFees?.find((fee: any) => fee.currencyCode === "USD")?.amount || 0));
      setValue("gbpAppFee", Number(editData.applicationFees?.find((fee: any) => fee.currencyCode === "GBP")?.amount || 0));
      setValue("gbpTuitionFee", Number(editData.tuitionFees?.find((fee: any) => fee.currencyCode === "GBP")?.amount || 0));
    } else {
      reset();
    }
  }, [editData, setValue, reset]);

  const onSubmit = (data: TAddCourse) => {
    const payloadAdd = {
      courseName: data.courseName,
      ngnAppFee: data.ngnAppFee,
      ngnTuitionFee: data.ngnTuitionFee,
      ugxAppFee: data.ugxAppFee,
      ugxTuitionFee: data.ugxTuitionFee,
      kesAppFee: data.kesAppFee,
      kesTuitionFee: data.kesTuitionFee,
      usdAppFee: data.usdAppFee,
      usdTuitionFee: data.usdTuitionFee,
      gbpAppFee: data.gbpAppFee,
      gbpTuitionFee: data.gbpTuitionFee,
    };

    const payloadUpdate = {
      courseName: data.courseName,
      courseId: editData?.id,
      
      // NGN fees
      ngnAppFee: data.ngnAppFee,
      ngnAppFeeId: getFeeId(editData?.applicationFees, "NGN"),
      ngnTuitionFee: data.ngnTuitionFee,
      ngnTuitionFeeId: getFeeId(editData?.tuitionFees, "NGN"),
      
      // UGX fees
      ugxAppFee: data.ugxAppFee,
      ugxAppFeeId: getFeeId(editData?.applicationFees, "UGX"),
      ugxTuitionFee: data.ugxTuitionFee,
      ugxTuitionFeeId: getFeeId(editData?.tuitionFees, "UGX"),
      
      // KES fees
      kesAppFee: data.kesAppFee,
      kesAppFeeId: getFeeId(editData?.applicationFees, "KES"),
      kesTuitionFee: data.kesTuitionFee,
      kesTuitionFeeId: getFeeId(editData?.tuitionFees, "KES"),
      
      // USD fees
      usdAppFee: data.usdAppFee,
      usdAppFeeId: getFeeId(editData?.applicationFees, "USD"),
      usdTuitionFee: data.usdTuitionFee,
      usdTuitionFeeId: getFeeId(editData?.tuitionFees, "USD"),
      
      // GBP fees
      gbpAppFee: data.gbpAppFee,
      gbpAppFeeId: getFeeId(editData?.applicationFees, "GBP"),
      gbpTuitionFee: data.gbpTuitionFee,
      gbpTuitionFeeId: getFeeId(editData?.tuitionFees, "GBP"),
    };

    if (isEditing) {
      // Update course
      update.mutate(payloadUpdate, {
        onSuccess: () => {
          toast.success("Course updated successfully!");
          if (refetch) refetch();
          handleClose();
          reset();
        },
        onError: (err: any) => {
          console.error("Update error:", err);
          toast.error(
            err?.response?.data?.error?.description ??
            "Something went wrong while updating the course"
          );
        },
      });
    } else {
      // Create new course
      create.mutate(payloadAdd, {
        onSuccess: () => {
          toast.success("Course created successfully!");
          if (refetch) refetch();
          handleClose();
          reset();
        },
        onError: (err: any) => {
          toast.error(
            err?.response?.data?.error?.description ??
            "An error occurred while creating course"
          );
        },
      });
    }
  };

  return (
    <Modal open={open} handleClose={handleClose} className="w-[490px] p-14">
      <form
        className="w-full flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-[32px] font-[700] leading-[36px] text-[#171313]">
          {isEditing ? "Edit Course" : "Add a New Course"}
        </p>

        <section className="max-h-[62vh] w-full flex flex-col gap-4 overflow-y-auto scrollbar-none">
    
          {
            isEditing ?
              <Stack spacing={4}>
                <Text type="span" weight="500">
                  Course Name
                </Text>

                <div className="w-full h-14 bg-white relative">
                  <input
                    value={editData?.courseName}
                    disabled
                    className={clsx(
                      "w-full h-full bg-transparent border border-grey-200 rounded-md outline-none pr-4 text-sm text-black placeholder:text-grey-300",
                      "pl-4"
                    )}
                  />
                </div>
              </Stack> : <Select
                label="Course Name"
                name="courseName"
                options={CoursesOption}
                control={control}
                error={errors?.courseName?.message}
                placeholder="Select course"
              />
          }

          <div className="w-full grid grid-cols-2 gap-4">
            <Input
              label="NGN Application Fee"
              placeholder="Application Fee (NGN)"
              register={register("ngnAppFee")}
              error={errors?.ngnAppFee}
            />

            <Input
              label="NGN Tuition Fee"
              placeholder="Tuition Fee (NGN)"
              register={register("ngnTuitionFee")}
              error={errors?.ngnTuitionFee}
            />
          </div>

          <div className="w-full grid grid-cols-2 gap-4">
            <Input
              label="UGX Application Fee"
              placeholder="Application Fee (UGX)"
              register={register("ugxAppFee")}
              error={errors?.ugxAppFee}
            />

            <Input
              label="UGX Tuition Fee"
              placeholder="Tuition Fee (UGX)"
              register={register("ugxTuitionFee")}
              error={errors?.ugxTuitionFee}
            />
          </div>

          <div className="w-full grid grid-cols-2 gap-4">
            <Input
              label="KES Application Fee"
              placeholder="Application Fee (KES)"
              register={register("kesAppFee")}
              error={errors?.kesAppFee}
            />

            <Input
              label="KES Tuition Fee"
              placeholder="Tuition Fee (KES)"
              register={register("kesTuitionFee")}
              error={errors?.kesTuitionFee}
            />
          </div>

          <div className="w-full grid grid-cols-2 gap-4">
            <Input
              label="USD Application Fee"
              placeholder="Application Fee (USD)"
              register={register("usdAppFee")}
              error={errors?.usdAppFee}
            />

            <Input
              label="USD Tuition Fee"
              placeholder="Tuition Fee (USD)"
              register={register("usdTuitionFee")}
              error={errors?.usdTuitionFee}
            />
          </div>

          <div className="w-full grid grid-cols-2 gap-4">
            <Input
              label="GBP Application Fee"
              placeholder="Application Fee (GBP)"
              register={register("gbpAppFee")}
              error={errors?.gbpAppFee}
            />

            <Input
              label="GBP Tuition Fee"
              placeholder="Tuition Fee (GBP)"
              register={register("gbpTuitionFee")}
              error={errors?.gbpTuitionFee}
            />
          </div>
        </section>

        <Button type="submit" className="w-full text-white font-[700]">
          {(create.isPending || update.isPending)
            ? `${isEditing ? "Updating" : "Creating"}...`
            : `${isEditing ? "Update" : "Create"} Course`}
        </Button>
      </form>
    </Modal>
  );
};

export default AddCourse;