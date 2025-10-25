import * as yup from "yup";

// Updated schema to handle multiple days
const courseSchema = yup.object().shape({
    meetingLink: yup
        .string()
        .url("Please enter a valid URL")
        .required("Meeting link is required"),

    days: yup.array().of(
        yup.object().shape({
            weekday: yup.string().required("Day is required"),
            startTime: yup.string().required("Start time is required"),
            endTime: yup.string().required("End time is required"),
        })
    ).min(1, "At least one day must be scheduled").required("Days are required"),
});

const dayOptions: any = [
    { value: "Sunday", label: "Sunday" },
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" }
];

// Updated interface for the form
export interface TScheduleClass {
    meetingLink: string;
    days: {
        weekday: string;
        startTime: string;
        endTime: string;
    }[];
}

// Updated CreateSchedule component
import Button from "@/components/button";
import Input from "@/components/input/input";
import Modal from "@/components/modal";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import Select from "@/components/input/select";
import { useCreateClassSchedule } from "@/services/class.service";

interface TModal {
    open: boolean;
    handleClose: () => void;
    refetch: () => void;
    classId?: string;
}

const CreateSchedule = ({ open, handleClose, refetch, classId }: TModal) => {
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TScheduleClass>({
        mode: "onBlur",
        resolver: yupResolver(courseSchema),
        defaultValues: {
            meetingLink: "",
            days: [
                { weekday: "", startTime: "", endTime: "" },
                { weekday: "", startTime: "", endTime: "" },
                { weekday: "", startTime: "", endTime: "" }
            ]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "days"
    });

    const create = useCreateClassSchedule(classId as string);

    function convertToCustomTime(time: string) {
        // time is like "02:45"
        return `${time}:00.0000000`; // add seconds and 7 decimal places
    }

    function onSubmit(data: TScheduleClass) {
        // Filter out empty days and transform data to match backend format
        const validDays = data.days.filter(day => 
            day.weekday && day.startTime && day.endTime
        );

        if (validDays.length === 0) {
            toast.error("Please add at least one valid day schedule");
            return;
        }

        const transformedData = {
            classSchedules: validDays.map(day => ({
                weekday: day.weekday,
                timeSlots: [
                    {
                        // startTime: day.startTime,
                        // endTime: day.endTime
                        startTime: convertToCustomTime(day.startTime),
                        endTime: convertToCustomTime(day.endTime)
                    }
                ]
            })),
            meetingLink: data.meetingLink
        };
   console.log(transformedData,"get transformed data");
        create.mutate(transformedData, {
            onSuccess: (res) => {
                console.log("Schedule created successfully:", res);
                toast.success("Class Schedule created successfully!");
                refetch();
                handleClose();
                reset();
            },
            onError: (err: any) => {
                toast.error(
                    err?.response?.data?.error?.description ??
                    "An error occurred while scheduling class"
                );
            },
        });
    }

    const addDay = () => {
        append({ weekday: "", startTime: "", endTime: "" });
    };

    const removeDay = (index: number) => {
        if (fields.length > 1) {
            remove(index);
        }
    };

    return (
        <Modal open={open} handleClose={handleClose} className="w-[590px] p-14">
            <form
                className="w-full flex flex-col gap-10"
                onSubmit={handleSubmit(onSubmit)}
            >
                <p className="text-[32px] font-[700] leading-[36px] text-[#171313]">
                    Schedule Class
                </p>

                <section className="max-h-[65vh] w-full flex flex-col gap-4 overflow-y-auto scrollbar-none">
                    <Input
                        label="Link (Google meet link)"
                        placeholder="Input link to attend class"
                        register={register("meetingLink")}
                        error={errors?.meetingLink}
                    />

                    {fields.map((field, index) => (
                        <div key={field.id} className="border-b pb-4 mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-[16px] font-[600] text-[#171313]">
                                    Day {index + 1}
                                </p>
                                {fields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeDay(index)}
                                        className="text-red-500 text-sm hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            
                            <div className="mb-3">
                                <Select
                                    label="Day"
                                    name={`days.${index}.weekday`}
                                    options={dayOptions}
                                    control={control}
                                    error={errors?.days?.[index]?.weekday?.message}
                                    placeholder="Select day"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <Input
                                    type="time"
                                    label="Start Time"
                                    placeholder="Start time"
                                    register={register(`days.${index}.startTime`)}
                                    error={errors?.days?.[index]?.startTime}
                                />
                                <Input
                                    type="time"
                                    label="End Time"
                                    placeholder="End time"
                                    register={register(`days.${index}.endTime`)}
                                    error={errors?.days?.[index]?.endTime}
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addDay}
                        className="text-blue-500 text-sm hover:text-blue-700 self-start"
                    >
                        + Add Another Day
                    </button>
                </section>

                <Button type="submit" className="w-full text-white font-[700]">
                    {create.isPending ? "Scheduling..." : "Schedule Class"}
                </Button>
            </form>
        </Modal>
    );
};

export default CreateSchedule;