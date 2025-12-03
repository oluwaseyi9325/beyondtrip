// 'use client';
// import Link from 'next/link';
// import Input from '@/components/input/input';
// import Button from '@/components/button';
// import Password from '@/components/input/password';
// import { useLogin } from '@/services/auth.service';
// import { TLogin } from '@/types/auth';
// import { useForm } from 'react-hook-form';
// import { LuLockKeyhole, LuMail } from 'react-icons/lu';
// import FormHeader from '@/layout/form/formHeader';
// import Text from "@/components/typography";



// const LoginForm = () => {
//   const login = useLogin();

//   const partnerLogin = usePartnerLogin(); // --- IGNORE ---

//   const {
//     register,
//     // control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<TLogin>({
//     mode: "onBlur",
//     defaultValues: {
//       remember: false,
//     },
//   });

//   function onSubmit(data: TLogin) {
//     login.mutate({
//       email: data.email,
//       password: data.password,
//     });
//   }
//   return (
//     <div className="flex px-4 lg:px-0 flex-col">
//       <FormHeader header="Welcome back!" content="Log in to continue" />
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex flex-col mt-6 space-y-4"
//       >
//         <Input
//           label="Email Address"
//           placeholder="Input email address"
//           type="email"
//           register={register("email", { required: "Email is required" })}
//           icon={<LuMail size={20} color="#336AEA" />}
//           error={errors?.email}
//         />
//         <Password
//           label="Password"
//           placeholder="Input your password"
//           register={register("password", {
//             required: "Password is required",
//           })}
//           error={errors?.password}
//           icon={<LuLockKeyhole size={20} color="#336AEA" />}
//         />
//         <span className="interFont flex items-end justify-end text-[14px]">
//           <Link href={'/drivers/forgot-password'} className=" ml-1 font-bold text-[#336AEA]">
//             Forgot Password?
//           </Link>
//         </span>
//         <br /> <br />
//         <Button type="submit">
//           <Text weight="700" color="white">
//             {login.isPending ? "Signing in..." : "Login"}
//           </Text>
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;


'use client';
import Link from 'next/link';
import Input from '@/components/input/input';
import Button from '@/components/button';
import Password from '@/components/input/password';
import { useLogin, usePartnerLogin } from '@/services/auth.service';
import { TLogin } from '@/types/auth';
import { useForm } from 'react-hook-form';
import { LuLockKeyhole, LuMail } from 'react-icons/lu';
import FormHeader from '@/layout/form/formHeader';
import Text from "@/components/typography";

interface LoginFormProps {
  loginType: 'driver' | 'partner';
}

const LoginForm = ({ loginType }: LoginFormProps) => {
  const driverLogin = useLogin();
  const partnerLogin = usePartnerLogin();

  // Select the appropriate login mutation based on role
  const login = loginType === 'driver' ? driverLogin : partnerLogin;

  const {
    register,
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

  const headerText = loginType === 'driver' 
    ? 'Welcome back, Driver!' 
    : 'Welcome back, Partner!';

  return (
    <div className="flex px-4 lg:px-0 flex-col">
      <FormHeader header={headerText} content="Log in to continue" />
      
      {/* Role Badge */}
      {/* <div className="mb-4 inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold w-fit">
        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
        Logging in as {loginType === 'driver' ? 'Driver' : 'Partner'}
      </div> */}

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
          <Link 
            href={loginType === 'driver' ? '/drivers/forgot-password' : '/partners/forgot-password'} 
            className="ml-1 font-bold text-[#336AEA]"
          >
            Forgot Password?
          </Link>
        </span>
        <br /> <br />
        <Button type="submit" disabled={login.isPending}>
          <Text weight="700" color="white">
            {login.isPending ? "Signing in..." : "Login"}
          </Text>
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;