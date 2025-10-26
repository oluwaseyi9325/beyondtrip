import Button from "@/components/button";
import Input from "@/components/input/input";
import Modal from "@/components/modal";
import { useAddAmbassador } from "@/services/ambassador.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface TModal {
  open: boolean;
  handleClose: () => void;
  refetch: () => void;
}

export interface TAmbassador {
  email: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
}

import * as yup from "yup";

const ambassadorSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
    firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup
    .string()
    // .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});

const AddAmbassador = ({ open, handleClose, refetch }: TModal) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TAmbassador>({
    mode: "onBlur",
    resolver: yupResolver(ambassadorSchema),
  });

  
  const create = useAddAmbassador();

  function onSubmit(data: TAmbassador) {
    create.mutate(data, {
      onSuccess: () => {
        toast.success("Ambassador addedd successfully!");
        refetch();
        handleClose();
        reset();
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.error?.description ??
          "An error occured while adding ambassador"
        );
      },
    });
  }

  return (
    <Modal open={open} handleClose={handleClose} className="w-[490px] p-14">
      <form
        className="w-full flex flex-col gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-[32px] font-[700] leading-[36px] text-[#171313]">
          Add Ambassador
        </p>

        <section className="w-full flex flex-col gap-4">
          <Input
            label="First Name"
            placeholder="Enter First Name"
            register={register("firstName")}
            error={errors?.firstName}
          />
          <Input
            label="Last Name"
            placeholder="Enter Last Name"
            register={register("lastName")}
            error={errors?.lastName}
          />

          <Input
            label="Email Address"
            placeholder="Email Address"
            register={register("email")}
            error={errors?.email}
          />

          <Input
            label="Phone Number"
            placeholder="Enter Phone Number"
            register={register("phoneNumber")}
            error={errors?.phoneNumber}
          />
        </section>

        <Button type="submit" className="w-full text-white font-[700]">
          {create.isPending ? "Adding..." : "Add Ambassador"}
        </Button>
      </form>
    </Modal>
  );
};

export default AddAmbassador;
