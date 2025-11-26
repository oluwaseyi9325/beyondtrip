'use client';
import Link from 'next/link';
import Input from '@/components/input/input';
import Button from '@/components/button';
import Password from '@/components/input/password';
import { useLogin } from '@/services/auth.service';
import { TLogin } from '@/types/auth';
import { useForm } from 'react-hook-form';
import { LuLockKeyhole, LuMail } from 'react-icons/lu';
import FormHeader from '@/layout/form/formHeader';
import Text from "@/components/typography";



const LoginForm = () => {
  const login = useLogin();

  const {
    register,
    // control,
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
      email: data.email,
      password: data.password,
    });
  }
  return (
    <div className="flex px-4 lg:px-0 flex-col">
      <FormHeader header="Welcome back!" content="Log in to continue" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mt-6 space-y-4"
      >
        <Input
          label="Email Address"
          placeholder="Input email address"
          type="email"
          register={register("email", { required: "Email is required" })}
          icon={<LuMail size={20} color="#336AEA" />}
          error={errors?.email}
        />
        <Password
          label="Password"
          placeholder="Input your password"
          register={register("password", {
            required: "Password is required",
          })}
          error={errors?.password}
          icon={<LuLockKeyhole size={20} color="#336AEA" />}
        />
        <span className="interFont flex items-end justify-end text-[14px]">
          <Link href={'/drivers/forgot-password'} className=" ml-1 font-bold text-[#336AEA]">
            Forgot Password?
          </Link>
        </span>
        <br /> <br />
        <Button type="submit">
          <Text weight="700" color="white">
            {login.isPending ? "Signing in..." : "Login"}
          </Text>
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
