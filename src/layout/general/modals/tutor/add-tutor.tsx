import Button from "@/components/button";
import Input from "@/components/input/input";
import Select, { Option } from "@/components/input/select";
import Modal from "@/components/modal";
import tutorSchema from "@/schemas/tutor";
import { useGetCohorts } from "@/services/cohort.service";
import { useGetCourses } from "@/services/course.service";
import { useInviteTutor } from "@/services/tutor.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface TModal {
  open: boolean;
  handleClose: () => void;
  refetch: () => void;
}

export interface TAddTutor {
  email: string;
  course: string;
  cohort: string;
}

const AddTutor = ({ open, handleClose, refetch }: TModal) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TAddTutor>({
    mode: "onBlur",
    resolver: yupResolver(tutorSchema),
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
  const create = useInviteTutor();

  function onSubmit(data: TAddTutor) {
    create.mutate(data, {
      onSuccess: () => {
        toast.success("Tutor invited successfully!");
        refetch();
        handleClose();
        reset();
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.error?.description ??
            "An error occured while inviting tutor"
        );
      },
    });
  }

  return (
    <Modal open={open} handleClose={handleClose} className="w-[490px] p-14">
      <form
        className="w-full flex flex-col gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-[32px] font-[700] leading-[36px] text-[#171313]">
          Invite Tutor
        </p>

        <section className="w-full flex flex-col gap-4">
          <Input
            label="Email Address"
            placeholder="Email Address"
            register={register("email")}
            error={errors?.email}
          />

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
          {create.isPending ? "Inviting..." : "Invite Tutor"}
        </Button>
      </form>
    </Modal>
  );
};

export default AddTutor;
