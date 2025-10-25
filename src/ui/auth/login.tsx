import Button from "@/components/button";
import Checkbox from "@/components/input/checkbox";
import Input from "@/components/input/input";
import Password from "@/components/input/password";
import Logo from "@/components/logo";
import Stack from "@/components/stack";
import Text from "@/components/typography";
import { useLogin } from "@/services/auth.service";
import { TLogin } from "@/types/auth";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LuMail, LuLockKeyhole } from "react-icons/lu";

const Login = () => {
  const login = useLogin();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    mode: "onBlur",
    defaultValues: {
      remember: false,
    },
  });

  function onSubmit(data: TLogin) {
    login.mutate({
      emailAddress: data.email,
      password: data.password,
    });
  }

  return (
    <div className="w-full h-full rounded-4xl bg-white flex flex-col gap-8 items-center justify-center px-5">
      <Stack spacing={40} className="w-full max-w-[375px]">
        <Logo />

        <Stack spacing={12}>
          <Text type="h3" lineHeight="none" weight="800">
            Nice to have you back
          </Text>
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={32}>
            <Stack spacing={12}>
              <Input
                label="Email Address"
                placeholder="Input email address"
                type="email"
                register={register("email", { required: "Email is required" })}
                icon={<LuMail size={20} color="#121363" />}
                error={errors?.email}
              />

              <Password
                label="Password"
                placeholder="Input your password"
                register={register("password", {
                  required: "Password is required",
                })}
                error={errors?.password}
                icon={<LuLockKeyhole size={20} color="#121363" />}
              />

              <div className="flex items-center justify-between">
                <Checkbox
                  name="remember"
                  control={control}
                  label="Remember me"
                />

                <Link href="/forgot-password">
                  <Text type="span" weight="500" color="yellow">
                    Forgot Password
                  </Text>
                </Link>
              </div>
            </Stack>

            <Button type="submit">
              <Text weight="700" color="white">
                {login.isPending ? "Signing in..." : "Login"}
              </Text>
            </Button>
          </Stack>
        </form>
      </Stack>
    </div>
  );
};

export default Login;
