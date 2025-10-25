import Button from "@/components/button";
import FileInput from "@/components/input/file";
import Input from "@/components/input/input";
import Select from "@/components/input/select";
import TextArea from "@/components/input/textArea";
import Modal from "@/components/modal";
import { FileTypeOptions } from "@/lib/options/file-types";
import { useCreateMaterial } from "@/services/material.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

interface TUploadModal {
  open: boolean;
  handleClose: () => void;
  classId: string;
  refetch?: () => void;
}

export interface TAddMaterial {
  title: string;
  description: string;
  type: string;
}

const ACCEPT_MAP: Record<string, string> = {
  PDF: ".pdf",
  WORDDOC: ".doc,.docx",
  VIDEO: ".mp4,.mov",
  AUDIO: ".mp3,.wav",
  EXCEL: ".xls,.xlsx",
  PPT: ".ppt,.pptx",
  ZIP: ".zip,.rar",
};

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description required"),
  type: yup.string().required("Select a file type"),
});

const UploadMaterials = ({
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
  } = useForm<TAddMaterial>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | undefined>();

  const selectedType = useWatch({ control, name: "type" });
  const acceptedTypes = selectedType ? ACCEPT_MAP[selectedType] : "";

  const create = useCreateMaterial(classId);

  const onSubmit = (data: TAddMaterial) => {
    if (!file) {
      toast.error("Upload a valid file!");
      return;
    }

    const formData = new FormData();
    formData.append("Title", data.title);
    formData.append("Description", data.description);
    formData.append("File", file);

    create.mutate(
      { type: data.type, data: formData },
      {
        onSuccess: () => {
          toast.success("Material created successfully!");
          if (refetch) refetch();
          handleClose();
          reset();
        },
        onError: (err: any) => {
          toast.error(
            err?.response?.data?.error?.description ??
            "Something went wrong while creating material"
          );
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      className="w-[520px] lg:p-14 p-6"
    >
      <form
        className="w-full flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-[30px] font-[700] leading-[36px] text-[#171313]">
          Upload Material
        </p>

        <section className="max-h-[75vh] w-full flex flex-col gap-4 overflow-y-auto scrollbar-none">
          <Input
            label="Title"
            placeholder="Input title"
            register={register("title")}
            error={errors.title}
          />

          {/* <TextArea
            label="Description"
            placeholder="Input description"
            register={register("description")}
            error={errors.description}
          /> */}

          <Controller
            name="description"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field, fieldState }) => (
              <TextArea
                label="Description"
                placeholder="Write something..."
                editor
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error}
              />
            )}
          />

          <Select
            label="File Type"
            name="type"
            options={FileTypeOptions}
            control={control}
            placeholder="Select a file type"
            error={errors?.type?.message}
          />

          <FileInput
            label="Upload File"
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
          {create.isPending ? "Creating..." : "Create Material"}
        </Button>
      </form>
    </Modal>
  );
};

export default UploadMaterials;
