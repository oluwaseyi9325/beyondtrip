import Button from "@/components/button";
import Input from "@/components/input/input";
import Modal from "@/components/modal";
import adminSchema from "@/schemas/admin";
import { useInviteAdmin } from "@/services/admin.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface TModal {
  open: boolean;
  handleClose: () => void;
  refetch?: () => void;
}

export interface TAddAdmin {
  email: string;
}

const AddAdmin = ({ open, handleClose, refetch }: TModal) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TAddAdmin>({
    mode: "onBlur",
    resolver: yupResolver(adminSchema),
  });

  // submit
  const create = useInviteAdmin();

  function onSubmit(data: TAddAdmin) {
    create.mutate(data, {
      onSuccess: () => {
        toast.success("Admin invited successfully!");
        if (refetch) {
          refetch();
        }
        handleClose();
        reset();
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.error?.description ??
            "An error occured while inviting admin"
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
          Invite Admin
        </p>

        <section className="w-full flex flex-col gap-4">
          <Input
            label="Email Address"
            placeholder="Email Address"
            register={register("email")}
            error={errors?.email}
          />
        </section>

        <Button type="submit" className="w-full text-white font-[700]">
          {create.isPending ? "Inviting..." : "Invite Admin"}
        </Button>
      </form>
    </Modal>
  );
};

export default AddAdmin;
