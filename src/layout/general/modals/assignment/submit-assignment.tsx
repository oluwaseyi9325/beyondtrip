import Button from "@/components/button";
import FileInput from "@/components/input/file";
import Input from "@/components/input/input";
import TextArea from "@/components/input/textArea";
import Modal from "@/components/modal";
import {  useSubmitAssignment } from "@/services/assignment.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useState } from "react";

interface TUploadModal {
  open: boolean;
  handleClose: () => void;
  classId: string;
  refetch?: () => void;
  refetchSubmissions?: () => void;
}

export interface TAddAssignmentForm {
  Answer: string;
  SubmissionComment: string;

}

const schema = yup.object().shape({
  Answer: yup.string().required("Answer is required"),
  SubmissionComment: yup.string().required("Comment is required"),
});

const SubmitAssignments = ({
  open,
  handleClose,
  classId,
  refetch, refetchSubmissions

}: TUploadModal) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TAddAssignmentForm>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | undefined>();

  const acceptedTypes = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.mp4,.mp3";

  const create = useSubmitAssignment(classId);

  const onSubmit = (data: TAddAssignmentForm) => {
    if (!file) {
      toast.error("Please upload a file for assignment.");
      return;
    }

    const formData = new FormData();
    formData.append("Answer", data.Answer);
    formData.append("SubmissionComment", data.SubmissionComment);
    formData.append("File", file);
    formData.append("CourseClassId", classId);
   console.log("Form Data: ", formData);
    create.mutate(
      { data: formData },
      {
      onSuccess: () => {
        toast.success("Assignment submitted successfully!");
        if (refetch) refetch();
        handleClose();
        reset();
        setFile(null);
          setError(undefined);
          refetchSubmissions?.();
          // refetchSubmissions && refetchSubmissions();
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.error?.description ??
            "Something went wrong while submitting the assignment"
        );
      },
    });
  };

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      className="w-[520px] lg:p-14 p-6"
    >
      <form
        className="w-full flex flex-col gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-[32px] font-[700] leading-[36px] text-[#171313]">
          Submit Assignment
        </p>

        <section className="max-h-[75vh] w-full flex flex-col gap-4 overflow-y-auto scrollbar-none">
          <Input
            label="Answer / Link"
            placeholder="Enter answer or link"
            register={register("Answer")}
            error={errors.Answer}
          />

          <TextArea
            label="Note or Comment"
            placeholder="Enter note or comment"
            register={register("SubmissionComment")}
            error={errors.SubmissionComment}
          />

          <FileInput
            label="Upload Assignment File"
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
          {create.isPending ? "Submitting..." : "Submit Assignment"}
        </Button>
      </form>
    </Modal>
  );
};

export default SubmitAssignments;
