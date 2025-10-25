import Button from "@/components/button";
import DateInput from "@/components/input/date";
import Input from "@/components/input/input";
import TextArea from "@/components/input/textArea";
import Modal from "@/components/modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useState } from "react";
import { useAddWebinars } from "@/services/webinars.service";

interface TUploadModal {
    open: boolean;
    handleClose: () => void;
    classId: string; // this will be sent as courseId
    refetch?: () => void;
}

export interface TCreateWebinarForm {
    Name: string;
    Description: string;
    StartDate: string;
    EndDate: string;
    StartTime: string;
    EndTime: string;
    HostNames: string[];
    GuestNames: string[];
}

const schema = yup.object().shape({
    Name: yup.string().required("Webinar name is required"),
    Description: yup.string().required("Description is required"),
    StartDate: yup.string().required("Start date is required"),
    EndDate: yup.string().required("End date is required"),
    StartTime: yup.string().required("Start time is required"),
    EndTime: yup.string().required("End time is required"),
    HostNames: yup.array().of(yup.string().required()).default([]),
    GuestNames: yup.array().of(yup.string().required()).default([]),
});

const CreateWebinar = ({
    open,
    handleClose,
    refetch,
}: TUploadModal) => {
    const [guests, setGuests] = useState<string[]>([]);
    const [hosts, setHosts] = useState<string[]>([]);
    const [guestInput, setGuestInput] = useState("");
    const [hostInput, setHostInput] = useState("");

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<TCreateWebinarForm>({
        mode: "onBlur",
        resolver: yupResolver(schema),
        defaultValues: {
            HostNames: [],
            GuestNames: [],
        },
    });

    const create = useAddWebinars();

    const addGuest = () => {
        if (guestInput.trim() && !guests.includes(guestInput.trim())) {
            const newGuests = [...guests, guestInput.trim()];
            setGuests(newGuests);
            setValue("GuestNames", newGuests);
            setGuestInput("");
        }
    };

    const removeGuest = (guestToRemove: string) => {
        const newGuests = guests.filter(guest => guest !== guestToRemove);
        setGuests(newGuests);
        setValue("GuestNames", newGuests);
    };

    const addHost = () => {
        if (hostInput.trim() && !hosts.includes(hostInput.trim())) {
            const newHosts = [...hosts, hostInput.trim()];
            setHosts(newHosts);
            setValue("HostNames", newHosts);
            setHostInput("");
        }
    };

    const removeHost = (hostToRemove: string) => {
        const newHosts = hosts.filter(host => host !== hostToRemove);
        setHosts(newHosts);
        setValue("HostNames", newHosts);
    };

    const onSubmit = (data: TCreateWebinarForm) => {
        const payload = data;
        console.log("Payload:", payload);

        create.mutate(payload, {
            onSuccess: () => {
                toast.success("Webinar created successfully!");
                if (refetch) refetch();
                handleClose();
                reset();
                setGuests([]);
                setHosts([]);
                setGuestInput("");
                setHostInput("");
            },
            onError: (err: any) => {
                toast.error(
                    err?.response?.data?.error?.description ??
                    "Something went wrong while creating the webinar"
                );
            },
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            action();
        }
    };

    return (
        <Modal
            open={open}
            handleClose={handleClose}
            className="w-[570px] lg:p-14 p-6 h-[810px]"
        >
            <form
                className="w-full flex flex-col gap-5"
                onSubmit={handleSubmit(onSubmit)}
            >
                <p className="text-[32px] font-[700] leading-[36px] text-[#171313]">
                    Create Webinar
                </p>

                <section className="max-h-[73vh] w-full flex flex-col gap-4 overflow-y-auto scrollbar-none">
                    <Input
                        label="Webinar Name"
                        placeholder="Enter webinar name"
                        register={register("Name")}
                        error={errors.Name}
                    />

                    <TextArea
                        label="Description"
                        placeholder="Enter webinar description"
                        register={register("Description")}
                        error={errors.Description}
                    />

                    {/* Guest Names Section */}
                    <div>
                        <div className="mb-2 text-sm font-medium text-gray-700">Guest Names</div>
                        <div className="border rounded p-4 border-gray-200">
                            <div className="flex gap-2 border-b pb-3 border-blue-100">
                                <input 
                                    className="border w-full rounded border-blue-100 p-2 text-sm" 
                                    placeholder="Enter guest name"
                                    value={guestInput}
                                    onChange={(e) => setGuestInput(e.target.value)}
                                    onKeyPress={(e) => handleKeyPress(e, addGuest)}
                                />
                                <button 
                                    type="button"
                                    onClick={addGuest}
                                    className="px-3 py-2 rounded bg-blue-100 hover:bg-blue-200 text-white text-sm whitespace-nowrap"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">
                                {guests.map((guest, index) => (
                                    <div key={index} className="p-2 rounded-lg text-xs bg-blue-100 text-white flex justify-between items-center">
                                        <span className="truncate">{guest}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeGuest(guest)}
                                            className="ml-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-xs"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {guests.length === 0 && (
                                <div className="text-gray-500 text-sm mt-3 text-center">
                                    No guests added yet
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Host Names Section */}
                    <div>
                        <div className="mb-2 text-sm font-medium text-gray-700">Host Names</div>
                        <div className="border rounded p-4 border-gray-200">
                            <div className="flex gap-2 border-b pb-3 border-blue-100">
                                <input 
                                    className="border w-full rounded border-blue-100 p-2 text-sm" 
                                    placeholder="Enter host name"
                                    value={hostInput}
                                    onChange={(e) => setHostInput(e.target.value)}
                                    onKeyPress={(e) => handleKeyPress(e, addHost)}
                                />
                                <button 
                                    type="button"
                                    onClick={addHost}
                                    className="px-3 py-2 rounded bg-blue-100 hover:bg-blue-200 text-white text-sm whitespace-nowrap"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">
                                {hosts.map((host, index) => (
                                    <div key={index} className="p-2 rounded-lg text-xs bg-blue-100 text-white flex justify-between items-center">
                                        <span className="truncate">{host}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeHost(host)}
                                            className="ml-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-xs"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {hosts.length === 0 && (
                                <div className="text-gray-500 text-sm mt-3 text-center">
                                    No hosts added yet
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Date Inputs */}
                    <div className="grid grid-cols-2 gap-4">
                        <DateInput
                            label="Start Date"
                            name="StartDate"
                            placeholder="dd/mm/yyyy"
                            control={control}
                            error={errors.StartDate}
                        />
                        <DateInput
                            label="End Date"
                            name="EndDate"
                            placeholder="dd/mm/yyyy"
                            control={control}
                            error={errors.EndDate}
                        />
                    </div>

                    {/* Time Inputs */}
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            type="time"
                            label="Start Time"
                            placeholder="Start time"
                            register={register("StartTime")}
                            error={errors.StartTime}
                        />
                        <Input
                            type="time"
                            label="End Time"
                            placeholder="End time"
                            register={register("EndTime")}
                            error={errors.EndTime}
                        />
                    </div>
                </section>

                <Button type="submit" className="w-full text-white font-[700]" disabled={create.isPending}>
                    {create.isPending ? "Creating..." : "Create Webinar"}
                </Button>
            </form>
        </Modal>
    );
};

export default CreateWebinar;