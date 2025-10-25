import Button from "@/components/button";
import Input from "@/components/input/input";
import Logo from "@/components/logo";
import Stack from "@/components/stack";
import Text from "@/components/typography";
import { useForgotPassword } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LuMail } from "react-icons/lu";
import * as yup from "yup";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  emailAddress: yup.string().required("Email is required"),
  
});
const Forgot = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
} = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(schema),
});
  const create = useForgotPassword();

  const onSubmit = (data: any) => {
    const payload = data;
    console.log("Payload:", payload);

    create.mutate(payload, {
        onSuccess: () => {
            toast.success("Password reset link sent to your email!");
            // handleClose();
            reset();
        },
        onError: (err: any) => {
            toast.error(
                err?.response?.data?.error?.description ??
                "An error occurred while sending the reset link. Please try again."
            );
        },
    });
};

  return (
    <div className="w-full h-full rounded-4xl bg-white flex flex-col gap-8 items-center justify-center px-4">
      <Stack spacing={40} className="w-full max-w-[375px]">
        <Link href="/">
          <Logo />
        </Link>

        <Stack spacing={12}>
          <Text type="h3" lineHeight="none" weight="800">
            You forgot password?
          </Text>
          <Text type="h6" weight="500">
            Worry not, input your mail to reset it.
          </Text>
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={32}>
            <Input
              label="Email Address"
              placeholder="Input email address"
              type="email"
              register={register("emailAddress")}
              icon={<LuMail size={20} color="#121363" />}
            />
{/* 
            <Button>
              <Text weight="700" color="white">
                Continue
              </Text>
            </Button> */}

            <Button type="submit" className="w-full text-white font-[700]" disabled={create.isPending}>
                    {create.isPending ? "Processing" : "Continue"}
                </Button>
          </Stack>
        </form>
      </Stack>
    </div>
  );
};

export default Forgot;
