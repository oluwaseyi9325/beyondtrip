// import Button from "@/components/button";
import Input from "@/components/input/input";
import Modal from "@/components/modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useState } from "react";
import { useChangePassword } from "@/services/auth.service";
import Button from "@/components/button";

interface TUploadModal {
    open: boolean;
    handleClose: () => void;
    refetch?: () => void;
}

export interface TCreateWebinarForm {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

const schema = yup.object().shape({
    currentPassword: yup.string().required("Current password is required"),
    newPassword: yup.string().required("New password is required"),
    confirmNewPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwords must match")
        .required("Confirm new password is required"),
});

const ChangePassword = ({
    open,
    handleClose,
}: TUploadModal) => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TCreateWebinarForm>({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    const create = useChangePassword();

    const onSubmit = (data: TCreateWebinarForm) => {
        const payload = data;
        console.log("Payload:", payload);

        create.mutate(payload, {
            onSuccess: () => {
                toast.success("Password changed successfully!");
                handleClose();
                reset();
            },
            onError: (err: any) => {
                toast.error(
                    err?.response?.data?.error?.description ??
                    "Something went wrong while changing the password"
                );
            },
        });
    };

    return (
        <Modal
            open={open}
            handleClose={handleClose}
            className="w-[570px] lg:p-14 p-6 h-[500px]"
        >
            <form
                className="w-full flex flex-col gap-5"
                onSubmit={handleSubmit(onSubmit)}
            >
                <p className="text-[32px] font-[700] leading-[36px] text-[#171313]">
                    Change Password
                </p>

                <section className="max-h-[73vh] w-full flex flex-col gap-4 overflow-y-auto scrollbar-none">
                    <div className="relative">
                        <Input
                            label="Old Password"
                            placeholder="Enter your current password"
                            type={showCurrentPassword ? "text" : "password"}
                            register={register("currentPassword")}
                            error={errors.currentPassword}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                            {showCurrentPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className="relative">
                        <Input
                            label="New Password"
                            placeholder="Enter your new password"
                            type={showNewPassword ? "text" : "password"}
                            register={register("newPassword")}
                            error={errors.newPassword}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className="relative">
                        <Input
                            label="Confirm Password"
                            placeholder="Confirm your new password"
                            type={showConfirmPassword ? "text" : "password"}
                            register={register("confirmNewPassword")}
                            error={errors.confirmNewPassword}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                </svg>
                            )}
                        </button>
                    </div>
                </section>

                <Button type="submit" className="w-full text-white font-[700]" disabled={create.isPending}>
                    {create.isPending ? "Changing..." : "Change Password"}
                </Button>
            </form>
        </Modal>
    );
};

export default ChangePassword;