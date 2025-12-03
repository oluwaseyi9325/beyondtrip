// import { useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import Modal from "@/components/modal";
import Password from "@/components/input/password";
import Button from "@/components/button";
import { useChangePassword } from "@/services/auth.service";
// import { validatePassword } from "@/utils/validatePassword";
import { LuLockKeyhole } from "react-icons/lu";
import { useRouter } from "next/router";

interface TUploadModal {
  open: boolean;
  handleClose: () => void;
  refetch?: () => void;
}

export interface TChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm new password is required"),
});

const ChangePassword = ({ open, handleClose }: TUploadModal) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TChangePasswordForm>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const create = useChangePassword();
  const newPasswordValue = watch("newPassword");

  const onSubmit = (data: TChangePasswordForm) => {
    const payload = { ...data };
    create.mutate(payload, {
      onSuccess: () => {
        toast.success("Password changed successfully!");
        handleClose();
        reset();
        router.push("/");

      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.error?.description ??
            "Something went wrong while changing the password"
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
        className="w-full flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-[28px] font-[700] text-[#171313] mb-2">
          Change Password
        </h2>

        <section className="flex flex-col gap-5 overflow-y-auto scrollbar-none">
          {/* Current Password */}
          <Password
            label="Current Password"
            placeholder="Enter your current password"
            register={register("currentPassword")}
            error={errors.currentPassword as FieldError}
            icon={<LuLockKeyhole size={20} color="#121363" />}
          />

          {/* New Password */}
          <Password
            label="New Password"
            placeholder="Enter your new password"
            register={register("newPassword")}
            error={errors.newPassword as FieldError}
            icon={<LuLockKeyhole size={20} color="#121363" />}
          />

          {/* Confirm New Password */}
          <Password
            label="Confirm New Password"
            placeholder="Re-enter your new password"
            register={register("confirmPassword", {
              validate: (value) =>
                value === newPasswordValue || "Passwords do not match",
            })}
            error={errors.confirmPassword as FieldError}
            icon={<LuLockKeyhole size={20} color="#121363" />}
          />
        </section>

        <div className="flex justify-end mt-4">
          <Button
            type="submit"
            className="w-full text-white font-[700]"
            disabled={create.isPending}
          >
            {create.isPending ? "Update..." : "Update Password"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangePassword;
