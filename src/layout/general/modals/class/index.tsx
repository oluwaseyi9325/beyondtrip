import Button from "@/components/button";
import Select, { Option } from "@/components/input/select";
import Modal from "@/components/modal";
import classSchema from "@/schemas/class";
import { useCreateClass } from "@/services/class.service";
import { useGetCohorts } from "@/services/cohort.service";
import { useGetCourses } from "@/services/course.service";
import useAuthStore from "@/store/useAuthStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface TModal {
  open: boolean;
  handleClose: () => void;
  refetch?: () => void;
}

export interface TAddClass {
  course: string;
  cohort: string;
}

const AddClass = ({ open, handleClose, refetch }: TModal) => {
  const { profile } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TAddClass>({
    mode: "onBlur",
    resolver: yupResolver(classSchema),
  });

  // options
  const [courseOptions, setCourseOptions] = useState<Option[]>([]);
  const [cohortOptions, setCohortOptions] = useState<Option[]>([]);

  const { data: courses } = useGetCourses({ PageSize: 30 });
  const { data: cohorts } = useGetCohorts({ PageSize: 30 });

  useEffect(() => {
    if (courses) {
      const format = courses?.items?.map((item: any) => ({
        label: item.courseName ?? "-",
        value: item.id ?? "-",
      }));

      setCourseOptions(format);
    }
  }, [courses]);

  useEffect(() => {
    if (cohorts) {
      const format = cohorts?.items?.map((item: any) => ({
        label: item.note ?? "-",
        value: item.id ?? "-",
      }));

      setCohortOptions(format);
    }
  }, [cohorts]);

  // submit
  const create = useCreateClass(profile?.id);

  function onSubmit(data: TAddClass) {
    if (!profile && !profile?.id) {
      toast.error("Invalid user profile!");
      return;
    }

    create.mutate(data, {
      onSuccess: (response) => {
        toast.success("Class created successfully!");
        if (refetch) {
          refetch();
        }
        handleClose();
        reset();
        console.log(response, "create class response");
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.error?.description ??
            "An error occured while creating class"
        );
      },
    });
  }

  return (
    <>
      
     <Modal open={open} handleClose={handleClose} className="w-[490px] p-14">
      <form
        className="w-full flex flex-col gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-[32px] font-[700] leading-[36px] text-[#171313]">
          Create Class
        </p>

        <section className="w-full flex flex-col gap-4">
          <Select
            label="Course"
            name="course"
            options={courseOptions}
            control={control}
            error={errors?.course?.message}
            placeholder="Select course"
          />

          <Select
            label="Cohort"
            name="cohort"
            options={cohortOptions}
            control={control}
            error={errors?.cohort?.message}
            placeholder="Select cohort"
          />
        </section>

        <Button type="submit" className="w-full text-white font-[700]">
          {create.isPending ? "Creating..." : "Create Class"}
        </Button>
      </form>
    </Modal>
    </>
  );
};

export default AddClass;
