import Button from "@/components/button";
import Password from "@/components/input/password";
import Logo from "@/components/logo";
import Stack from "@/components/stack";
import Text from "@/components/typography";
import { useSchoorlashipRegister } from "@/services/auth.service";
import { validatePassword } from "@/utils/validatePassword";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LuLockKeyhole } from "react-icons/lu";

interface TValues {
    password: string;
    confirmPassword: string;
}

const ScholarshipRegistration = ({id}:any) => {
    // const searchParams = useSearchParams();
    const code = id;

    const complete = useSchoorlashipRegister();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<TValues>({
        mode: "onBlur",
    });

    const passwordValue = watch("password");

    // Password validation function
   

    function onSubmit(data: TValues) {
        if (!code) {
            toast.error("Invalid Application code!");
            return;
        }

        complete.mutate({
            applicationId: code,
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
                            
                          

                            <Password
                                label="Confirm Password"
                                placeholder="Re-enter your password"
                                register={register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === passwordValue || "Passwords do not match",
                                })}
                                error={errors?.confirmPassword}
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

export default ScholarshipRegistration;