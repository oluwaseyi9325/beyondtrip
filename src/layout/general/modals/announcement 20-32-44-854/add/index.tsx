import Button from "@/components/button";
import Input from "@/components/input/input";
import TextArea from "@/components/input/textArea";
import Modal from "@/components/modal";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateAnnouncement, useUpdateAnnouncement } from "@/services/announcement.service";
import Select, { Option } from "@/components/input/select";
import { TAnnounce } from "@/layout/driver/announcement/card";
import { useEffect } from "react";

interface TModal {
  open: boolean;
  handleClose: () => void;
  refetch?: () => void;
  isdriver?: boolean;
  options?: Option[];
  editData?: TAnnounce | null;
}

export interface TAddAnnouncement {
  topic: string;
  details: string;
  course?: string;
}

const announcementSchema = yup.object().shape({
  topic: yup.string().required("Topic is required"),
  details: yup.string().required("Details are required"),
});

const AddAnnouncement = ({
  open,
  isdriver = false,
  handleClose,
  refetch,
  options = [],
  editData,
}: TModal) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TAddAnnouncement>({
    mode: "onBlur",
    resolver: yupResolver(announcementSchema),
  });

  const create = useCreateAnnouncement();
  console.log("editData", editData?.id);
  const update = useUpdateAnnouncement(editData?.id);

  const isEditing = !!editData;

  // Populate form when editing
  useEffect(() => {
    if (editData) {
      setValue("topic", editData.announcementName);
      setValue("details", editData.announcementInfo);
      if (editData.courseClassId && editData.courseClassId.length > 0) {
        setValue("course", editData.courseClassId[0]);
      }
    } else {
      reset();
    }
  }, [editData, setValue, reset]);

  const onSubmit = (data: TAddAnnouncement) => {
    console.log(data.course, "data course hetre for me")
    const formData = new FormData();
    formData.append("AnnouncementName", data.topic);
    formData.append("AnnouncementInfo", data.details);
    if (data.course) {
      formData.append("CourseClassId", data.course);
    }

    if (isEditing) {
      // Update announcement
      update.mutate(
        formData,
        {
          onSuccess: () => {
            toast.success("Announcement updated successfully!");
            if (refetch) refetch();
            handleClose();
            reset();
          },
          onError: (err: any) => {
            console.error("Update error:", err);
            toast.error(
              err?.response?.data?.error?.description ??
              "Something went wrong while updating the announcement"
            );
          },
        }
      );
    } else {
      // Create new announcement
      create.mutate(formData, {
        onSuccess: () => {
          toast.success("Announcement created successfully!");
          if (refetch) refetch();
          handleClose();
          reset();
        },
        onError: (err: any) => {
          toast.error(
            err?.response?.data?.error?.description ??
            "Something went wrong while creating the announcement"
          );
        },
      });
    }
  };

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      className="w-[530px] lg:p-14 p-6"
    >
      <form
        className="w-full flex flex-col gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-[32px] font-[700] leading-[36px] text-[#171313]">
          {isEditing ? "Edit Announcement" : "Add Announcement"} 🔔
        </p>

        <section className="w-full flex flex-col gap-4">
          <Input
            label="Topic"
            placeholder="Input topic"
            register={register("topic")}
            error={errors.topic}
          />

          {isdriver && (
            <Select
              label="Course"
              name="course"
              options={options}
              control={control}
              placeholder="Select course"
            />
          )}

          <Controller
            name="details"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field, fieldState }) => (
              <TextArea
                label="Details"
                placeholder="Write something..."
                editor
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error}
              />
            )}
          />
        </section>

        <Button type="submit" className="w-full text-white font-[700]">
          {create.isPending || update.isPending
            ? isEditing
              ? "Updating..."
              : "Creating..."
            : isEditing
              ? "Update Announcement"
              : "Create Announcement"}
        </Button>
      </form>
    </Modal>
  );
};

export default AddAnnouncement;