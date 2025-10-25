import Button from "@/components/button";
import Input from "@/components/input/input";
import Logo from "@/components/logo";
import Stack from "@/components/stack";
import Text from "@/components/typography";
import { useCompletePassword } from "@/services/auth.service";
import Link from "next/link";
import { useForm, FieldError } from "react-hook-form";
import { useRouter } from "next/router";
import { LuLockKeyhole, LuMail } from "react-icons/lu";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import Password from "@/components/input/password";
import { validatePassword } from "@/utils/validatePassword";

const Reset = () => {
  const router = useRouter();
  const { token } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<any>({
    mode: "onBlur",
  });
  
  // Fixed: Watch the correct field name that matches the register
  const newPasswordValue = watch("newPassword");
  const create = useCompletePassword();

  const [isValidToken, setIsValidToken] = useState(true);

  // Check if token exists on component mount
  useEffect(() => {
    if (router.isReady && !token) {
      setIsValidToken(false);
      toast.error("Invalid or missing reset token. Please request a new password reset link.");
    }
  }, [router.isReady, token]);

  const onSubmit = (data: any) => {
    if (!token) {
      toast.error("Reset token is missing. Please request a new password reset link.");
      return;
    }

    const payload = {
      emailAddress: data.emailAddress,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
      token: token as string,
    };

    console.log("Payload:", payload);

    create.mutate(payload, {
      onSuccess: () => {
        toast.success("Password reset successful! You can now login with your new password.");
        reset();
        router.push("/");
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.error?.description ??
          "An error occurred while resetting your password. Please try again."
        );
      },
    });
  };

  // Show error message if no token
  if (!isValidToken) {
    return (
      <div className="w-full h-full rounded-4xl bg-white flex flex-col gap-8 items-center justify-center px-4">
        <Stack spacing={40} className="w-full max-w-[375px]">
          <Link href="/">
            <Logo />
          </Link>
          <Stack spacing={12}>
            <Text type="h3" lineHeight="none" weight="800">
              Invalid Reset Link
            </Text>
            <Text type="h6" weight="500">
              This password reset link is invalid or has expired. Please request a new one.
            </Text>
          </Stack>
          <Link href="/forgot-password">
            <Button className="w-full">
              <Text weight="700" color="white">
                Request New Reset Link
              </Text>
            </Button>
          </Link>
        </Stack>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-4xl bg-white flex flex-col gap-8 items-center justify-center px-4">
      <Stack spacing={40} className="w-full max-w-[375px]">
        <Link href="/">
          <Logo />
        </Link>

        <Stack spacing={12}>
          <Text type="h3" lineHeight="none" weight="800">
            Reset your password!
          </Text>
          <Text type="h6" weight="500">
            Set your new password to get access to your dashboard.
          </Text>
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={20}>
            <Input
              label="Email Address"
              placeholder="Input email address"
              type="email"
              register={register("emailAddress", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              icon={<LuMail size={20} color="#121363" />}
              error={errors.emailAddress as FieldError}
            />

            <Password
              label="New Password"
              placeholder="Input your new password"
              register={register("newPassword", {
                required: "Password is required",
                validate: validatePassword,
              })}
              error={errors.newPassword as FieldError} // Fixed: was errors?.password
              icon={<LuLockKeyhole size={20} color="#121363" />}
            />

            <Password
              label="Confirm New Password"
              placeholder="Re-enter your new password"
              register={register("confirmNewPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === newPasswordValue || "Passwords do not match", // Fixed: use newPasswordValue
              })}
              error={errors.confirmNewPassword as FieldError} // Fixed: was errors?.confirmPassword
              icon={<LuLockKeyhole size={20} color="#121363" />}
            />

            <Button
              type="submit"
              className="w-full text-white font-[700]"
              disabled={create.isPending}
            >
              {create.isPending ? "Processing..." : "Reset Password"}
            </Button>
          </Stack>
        </form>
      </Stack>
    </div>
  );
};

export default Reset;