import Button from "@/components/button";
import Input from "@/components/input/input";
import Password from "@/components/input/password";
import Logo from "@/components/logo";
import Stack from "@/components/stack";
import Text from "@/components/typography";
import { useRegister } from "@/services/auth.service";
import { TRegister } from "@/types/auth";
import { validatePassword } from "@/utils/validatePassword";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LuLockKeyhole } from "react-icons/lu";

const Registration = () => {
  const searchParams = useSearchParams();

  const code = searchParams.get("registrationCode");
  const role = searchParams.get("userRole");

  const complete = useRegister(String(role));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegister>({
    mode: "onBlur",
  });

  function onSubmit(data: TRegister) {
    if (!role || !code) {
      toast.error("Invalid registration code or role!");
      return;
    }

    complete.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: "-",
      phoneNumber: data.phoneNumber,
      registrationCode: code,
      userRole: role,
      password: data.password,
    });
  }

  return (
    <div className="w-full h-full rounded-4xl bg-white flex flex-col gap-8 items-center justify-center px-4">
      <Stack spacing={40} className="w-full max-w-[375px]">
        <Logo />

        <Stack spacing={12}>
          <Text type="h3" lineHeight="none" weight="800">
            Complete Registration
          </Text>
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={32}>
            <Stack spacing={12}>
              <Input
                label="First Name"
                placeholder="Input first name"
                register={register("firstName", {
                  required: "First name is required",
                })}
                error={errors?.firstName}
              />

              <Input
                label="Last Name"
                placeholder="Input last name"
                register={register("lastName", {
                  required: "Last name is required",
                })}
                error={errors?.lastName}
              />

              <Input
                label="Phone Number"
                placeholder="Input phone number"
                register={register("phoneNumber", {
                  required: "Last name is required",
                  pattern: {
                    value: /^\+?[0-9]{7,15}$/,
                    message: "Enter a valid phone number",
                  },
                })}
                error={errors?.phoneNumber}
              />

              <Password
                label="Password"
                placeholder="Input your password"
                register={register("password", {
                  required: "Password is required",
                  validate: validatePassword,
                })}
                error={errors?.password}
                icon={<LuLockKeyhole size={20} color="#121363" />}
              />
            </Stack>

            <Button type="submit">
              <Text weight="700" color="white">
                {complete.isPending ? "Completing..." : "Complete"}
              </Text>
            </Button>
          </Stack>
        </form>
      </Stack>
    </div>
  );
};

export default Registration;
