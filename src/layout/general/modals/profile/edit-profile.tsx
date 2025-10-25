import Button from "@/components/button";
import Input from "@/components/input/input";
import Modal from "@/components/modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useEffect } from "react";
import {  useUpdateProfile } from "@/services/auth.service";
import useAuthStore from "@/store/useAuthStore";
import { useGetStudentsProfile } from "@/services/student.service";

interface TUploadModal {
    open: boolean;
    handleClose: () => void;
    classId: string; // keeping for interface compatibility
    refetch?: () => void;
}

export interface TCreateWebinarForm {
    firstName: string;
    middleName: string;
    phoneNumber: string;
}

const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    middleName: yup.string().required("Middle name is required"),
    phoneNumber: yup.string().required("Phone number is required"),
});

const EditProfile = ({
    open,
    handleClose,
    refetch,
}: TUploadModal) => {
    const { profile, } = useAuthStore();
//    console.log("Profile Data:", profile?.id);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<TCreateWebinarForm>({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });
    const { updateProfile: updateUser } = useAuthStore();
    const updateProfile = useUpdateProfile(profile?.id);
    // const { data: responseData } = useGetTutorMe();
    const { data: response } = useGetStudentsProfile();
    useEffect(() => {
        if (response) {
          updateUser(response?.data);
        }
      }, [response, updateUser, profile]);
    // Pre-populate form with existing profile data
    useEffect(() => {
        if (open && profile) {
            setValue("firstName", profile.firstName || "");
            setValue("middleName", profile.lastName || "");
            setValue("phoneNumber", profile.phoneNumber || "");
        }
    }, [open, profile, setValue]);

    const onSubmit = (data: TCreateWebinarForm) => {
        const payload = { ...data, id: profile?.id };
        console.log("Payload:", payload);

        updateProfile.mutate(payload, {
            onSuccess: (response) => {
                toast.success("Profile updated successfully!");
                console.log(response, "this ois editging")
                //  updateStore(responseData?.data)
                
                // console.log("profilellll", profile)
                if (refetch) refetch();
                handleClose();
                reset();
            },
            onError: (err: any) => {
                toast.error(
                    err?.response?.data?.error?.description ??
                    "Something went wrong while updating the profile"
                );
            },
        });
    };

    const handleModalClose = () => {
        reset();
        handleClose();
    };

    return (
        <Modal
            open={open}
            handleClose={handleModalClose}
            className="w-[570px] lg:p-14 p-6 h-auto max-h-[90vh]"
        >
            <form
                className="w-full flex flex-col gap-5"
                onSubmit={handleSubmit(onSubmit)}
            >
                <p className="text-[32px] font-[700] leading-[36px] text-[#171313]">
                    Edit Profile
                </p>

                <section className="max-h-[60vh] w-full flex flex-col gap-4 overflow-y-auto scrollbar-none">
                    <Input
                        label="First Name"
                        placeholder="Enter first name"
                        register={register("firstName")}
                        error={errors.firstName}
                    />
                    <Input
                        label="Middle Name"
                        placeholder="Enter middle name"
                        register={register("middleName")}
                        error={errors.middleName}
                    />
                    <Input
                        label="Phone Number"
                        placeholder="Enter phone number"
                        register={register("phoneNumber")}
                        error={errors.phoneNumber}
                    />
                </section>

                <div className="flex gap-4">
                    <Button 
                        type="button" 
                        // variant="outline" 
                        className="w-full" 
                        handleClick={handleModalClose}
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        className="w-full text-white font-[700]" 
                        disabled={updateProfile.isPending}
                    >
                        {updateProfile.isPending ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default EditProfile;