import Button from "@/components/button";
import DateInput from "@/components/input/date";
import FileInput from "@/components/input/file";
import Input from "@/components/input/input";
import TextArea from "@/components/input/textArea";
import Modal from "@/components/modal";
import { useCreateAssignment } from "@/services/assignment.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

interface TUploadModal {
  open: boolean;
  handleClose: () => void;
  classId: string; // this will be sent as courseId
  refetch?: () => void;
}

export interface TAddAssignmentForm {
  AssignmentTitle: string;
  AssignmentDescription: string;
  dueDate: string;
  MaxGrade: string;
}

const schema = yup.object().shape({
  AssignmentTitle: yup.string().required("Title is required"),
  AssignmentDescription: yup.string().required("Description is required"),
  dueDate: yup.string().required("Due date is required"),
  MaxGrade: yup.string().required("Mark is required"),
});

const CreateAssignments = ({
  open,
  handleClose,
  classId,
  refetch,
}: TUploadModal) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TAddAssignmentForm>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const ACCEPT_MAP: Record<string, string> = {
    PDF: ".pdf",
    WORDDOC: ".doc,.docx",
    VIDEO: ".mp4,.mov",
    AUDIO: ".mp3,.wav",
    EXCEL: ".xls,.xlsx",
    PPT: ".ppt,.pptx",
    ZIP: ".zip,.rar",
  };

  const create = useCreateAssignment();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | undefined>();

  // Accept all file types for assignments (you can modify this as needed)
  const acceptedTypes = Object.values(ACCEPT_MAP).join(",");

  const onSubmit = (data: TAddAssignmentForm) => {
    // Check if file upload is required (optional - remove this check if file is optional)
    // if (!file) {
    //   toast.error("Please upload a file!");
    //   return;
    // }

    // Create FormData if file is present, otherwise use regular payload
    if (file) {
      const formData = new FormData();
      formData.append("AssignmentTitle", data.AssignmentTitle);
      formData.append("AssignmentDescription", data.AssignmentDescription);
      formData.append("dueDate", data.dueDate);
      formData.append("MaxGrade", data.MaxGrade);
      formData.append("CourseClassId", classId);
      formData.append("File", file);

      create.mutate(formData, {
        onSuccess: () => {
          toast.success("Assignment created successfully!");
          if (refetch) refetch();
          handleClose();
          reset();
          setFile(null);
          setError(undefined);
        },
        onError: (err: any) => {
          toast.error(
            err?.response?.data?.error?.description ??
            "Something went wrong while creating the assignment"
          );
        },
      });
    } else {
      // If no file, send regular JSON payload
      const payload = {
        ...data,
        CourseClassId: classId,
      };

      create.mutate(payload, {
        onSuccess: () => {
          toast.success("Assignment created successfully!");
          if (refetch) refetch();
          handleClose();
          reset();
          setFile(null);
          setError(undefined);
        },
        onError: (err: any) => {
          toast.error(
            err?.response?.data?.error?.description ??
            "Something went wrong while creating the assignment"
          );
        },
      });
    }
  };

  const handleModalClose = () => {
    reset();
    setFile(null);
    setError(undefined);
    handleClose();
  };

  return (
    <Modal
      open={open}
      handleClose={handleModalClose}
      className="w-[520px] lg:p-14 p-6"
    >
      <form
        className="w-full flex flex-col gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-[32px] font-[700] leading-[36px] text-[#171313]">
          Create Assignment
        </p>

        <section className="max-h-[75vh] w-full flex flex-col gap-4 overflow-y-auto scrollbar-none">
          <Input
            label="Title"
            placeholder="Input title"
            register={register("AssignmentTitle")}
            error={errors.AssignmentTitle}
          />

          <Controller
            name="AssignmentDescription"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field, fieldState }) => (
              <TextArea
                label="Description"
                placeholder="Input description..."
                editor
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error}
              />
            )}
          />

          <div className="flex justify-between gap-4">
            <DateInput
              label="Due Date"
              name="dueDate"
              placeholder="dd/mm/yy"
              control={control}
              error={errors.dueDate}
            />
            <Input
              label="Allocated Mark"
              placeholder="Allocated Mark"
              register={register("MaxGrade")}
              error={errors.MaxGrade}
            />
          </div>

          <FileInput
            label="Upload File (Optional)"
            value={file}
            onChange={(f) => {
              setFile(f);
              setError(undefined);
            }}
            error={error}
            accept={acceptedTypes}
          />
        </section>

        <Button type="submit" className="w-full text-white font-[700]">
          {create.isPending ? "Creating..." : "Create Assignment"}
        </Button>
      </form>
    </Modal>
  );
};

export default CreateAssignments;