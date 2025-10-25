import Button from "@/components/button";
import Input from "@/components/input/input";
import Select, { Option } from "@/components/input/select";
import TextArea from "@/components/input/textArea";
import Modal from "@/components/modal";
import tutorSchema from "@/schemas/tutor";
import { useGetCohorts } from "@/services/cohort.service";
import { useGetCourses } from "@/services/course.service";
import { useInviteTutor } from "@/services/tutor.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GoPlus } from "react-icons/go";

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

const AddCurriculum = ({ open, handleClose, refetch }: TModal) => {
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
        <Modal open={open} handleClose={handleClose} className="w-[520px] p-14">
            <div className="max-h-[80vh] overflow-y-auto pr-2 scrollbar-hide">
                <form
                    className="w-full flex flex-col gap-10"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <p className="text-[32px] font-[700] leading-[36px] text-[#171313]">
                    Create Curriculum
                    </p>

                    <section className="w-full flex flex-col gap-4">
                        <div className="flex gap-3">
                            <Input
                                label="Name"
                                placeholder="Enter curriculum name"
                                register={register("email")}
                                error={errors?.email}
                            />
                            <Input
                                label="Title"
                                placeholder="Enter curriculum title"
                                register={register("email")}
                                error={errors?.email}
                            />
                        </div>

                        <Select
                            label="Module"
                            name="course"
                            options={courseOptions}
                            control={control}
                            error={errors?.course?.message}
                            placeholder="Select number of module"
                        />
                        <Button

                            size="md"
                            className="max-w-[160px] my-[-10px] text-[#121363] bg-white text-sm font-[600] ml-[-30px]"
                            hasIcon
                            icon={<GoPlus size={20} />}
                        >
                            Add Module {" "}
                        </Button>
                        <div className="space-y-4 bg-[#FAFAFA] p-3">
                            
                            <Input
                                label="Module Title"
                                placeholder="Enter module title"
                                register={register("email")}
                                error={errors?.email}

                            />
                            <Input
                                // type="file"
                                label="Attachment"
                                placeholder="Email Address"
                                register={register("email")}
                                error={errors?.email}
                            />
                            <TextArea
                                label="Assignment"
                                placeholder="Write something understanding..."
                                register={register("email")}
                                error={errors?.email}
                            />
                            <Button

                                size="md"
                                className="max-w-[160px] py-0 text-[#9292DA] bg-white text-sm font-[600] shadow-lg"
                                hasIcon
                                icon={<GoPlus size={20} />}
                            >
                                Add Sub-module {" "}
                            </Button>
                        </div>
                        
                        <Select
                            label="Module duration"
                            name="cohort"
                            options={cohortOptions}
                            control={control}
                            error={errors?.cohort?.message}
                            placeholder="Select cohort"
                        />
                        <TextArea
                            label="Description"
                            placeholder="Write something understanding about curriculum..."
                            register={register("email")}
                            error={errors?.email}
                        />
                    </section>

                    <Button type="submit" className="w-full text-white font-[700]">
                        {create.isPending ? "Create..." : "Create Curriculum"}
                    </Button>
                </form>
            </div>
        </Modal>
    );
};

export default AddCurriculum;
