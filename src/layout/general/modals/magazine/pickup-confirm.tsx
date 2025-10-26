"use client";

import Button from "@/components/button";
// import Input from "@/components/input/input";
import Select from "@/components/input/select";
import Modal from "@/components/modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

interface TModal {
  open: boolean;
  handleClose: () => void;
  refetch?: () => void;
  data?: any;
}

export interface TEditBank {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

// Validation Schema
const editBankSchema = yup.object().shape({
  bankName: yup.string().required("Bank name is required"),
  accountName: yup.string().required("Account name is required"),
  accountNumber: yup
    .string()
    .required("Account number is required")
    .matches(/^[0-9]{10}$/, "Account number must be 10 digits"),
});

const PickupConfirm = ({ open, handleClose, refetch, data }: TModal) => {
  const {
    // register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TEditBank>({
    mode: "onBlur",
    resolver: yupResolver(editBankSchema),
  });

  // Bank options - replace with actual API call if needed
  const bankOptions=[
    { label: "Access Bank", value: "access" },
    { label: "GTBank", value: "gtbank" },
    { label: "First Bank", value: "firstbank" },
    { label: "Zenith Bank", value: "zenith" },
    { label: "UBA", value: "uba" },
    { label: "Wema Bank", value: "wema" },
    { label: "Fidelity Bank", value: "fidelity" },
    { label: "Union Bank", value: "union" },
    { label: "Sterling Bank", value: "sterling" },
    { label: "Polaris Bank", value: "polaris" },
  ]

  // Populate form with existing data
  useEffect(() => {
    if (data && open) {
      setValue("bankName", data?.bankName || "");
      setValue("accountName", data?.accountName || "");
      setValue("accountNumber", data?.accountNumber || "");
    }
  }, [data, open, setValue]);

  // Submit function - replace with your actual API call
  const onSubmit = async (formData: TEditBank) => {
    try {
      // Replace with your actual API call
      // await updateBankDetails(formData);
      
      console.log("Submitting bank details:", formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Bank details updated successfully!");
      if (refetch) refetch();
      handleClose();
      reset();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.error?.description ||
        "An error occurred while updating bank details"
      );
    }
  };

  // const handleCancel = () => {
  //   reset();
  //   handleClose();
  // };

  return (
    <Modal open={open} handleClose={handleClose} className="w-[450px] p-8">
      <form
        className="w-full flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Magazine Pickup Confirmation
          </h2>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-[#444444] text-center">
            Please make sure you’ve picked up this magazine edition before clicking the confirm button.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <Select
            label="Pickup location"
            name="bankName"
            options={bankOptions}
            control={control}
            error={errors?.bankName?.message}
            placeholder="Select pickup location"
          />

        
        </div>

        {/* Buttons */}
        <div className="">
          <Button
            type="submit"
            size="lg"
            className="!w-full bg-[#336AEA] text-white rounded-lg font-medium hover:bg-[#2952b8] transition-colors"
          >
            Submit
          </Button>

        
        </div>
      </form>
    </Modal>
  );
};

export default PickupConfirm