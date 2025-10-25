import Button from "@/components/button";
import DateInput from "@/components/input/date";
import Input from "@/components/input/input";
import Modal from "@/components/modal";
import cohortSchema from "@/schemas/cohort";
import { useCreateCohort, useUpdateCohort } from "@/services/cohort.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect } from "react";

interface TModal {
  open: boolean;
  handleClose: () => void;
  refetch: () => void;
  editData?: any;
}

export interface TAddCohort {
  note: number;
  startDate: Date;
  endDate: Date;
}

const AddCohort = ({ open, handleClose, refetch, editData }: TModal) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TAddCohort>({
    mode: "onBlur",
    resolver: yupResolver(cohortSchema),
  });

  const create = useCreateCohort();
  console.log("editData", editData);
  const update = useUpdateCohort(editData?.id);

  const isEditing = !!editData;

  // Populate form when editing
  useEffect(() => {
    if (editData) {
      setValue("note", editData.note.split(" ").pop());
      setValue("startDate", editData.startDate);
      setValue("endDate", editData.endDate);
    } else {
      reset();
    }
  }, [editData, setValue, reset]);

  const onSubmit = (data: TAddCohort) => {
    const payload = {
      note: data.note,
      startDate: data.startDate,
      endDate: data.endDate,
    };

    if (isEditing) {
      // Update cohort
      update.mutate(payload, {
        onSuccess: () => {
          toast.success("Cohort updated successfully!");
          if (refetch) refetch();
          handleClose();
          reset();
        },
        onError: (err: any) => {
          console.error("Update error:", err);
          toast.error(
            err?.response?.data?.error?.description ??
              "Something went wrong while updating the cohort"
          );
        },
      });
    } else {
      // Create new cohort
      create.mutate(payload, {
        onSuccess: () => {
          toast.success("Cohort created successfully!");
          if (refetch) refetch();
          handleClose();
          reset();
        },
        onError: (err: any) => {
          toast.error(
            err?.response?.data?.error?.description ??
              "Something went wrong while creating the cohort"
          );
        },
      });
    }
  };

  return (
    <Modal open={open} handleClose={handleClose} className="w-[490px] p-14">
      <form
        className="w-full flex flex-col gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-[32px] font-[700] leading-[36px] text-[#171313]">
          {isEditing ? "Edit Cohort" : "Add a New Cohort"}
        </p>

        <section className="max-h-[65vh] w-full flex flex-col gap-4 overflow-y-auto scrollbar-none">
          <Input
            label="Cohort Number"
            placeholder="Cohort Number e.g 8"
            register={register("note")}
            error={errors?.note}
          />

          <div className="w-full grid grid-cols-2 gap-4">
            <DateInput
              label="Start Date"
              name="startDate"
              placeholder="Start Date"
              control={control}
              error={errors?.startDate}
            />

            <DateInput
              label="End Date"
              name="endDate"
              placeholder="End Date"
              control={control}
              error={errors?.endDate}
            />
          </div>
        </section>

        <Button type="submit" className="w-full text-white font-[700]">
          {(create.isPending || update.isPending)
            ? `${isEditing ? "Updating" : "Creating"}...`
            : `${isEditing ? "Update" : "Create"} Cohort`}
        </Button>
      </form>
    </Modal>
  );
};

export default AddCohort;