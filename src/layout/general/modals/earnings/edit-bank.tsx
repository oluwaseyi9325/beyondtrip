"use client";

import Button from "@/components/button";
import Input from "@/components/input/input";
import Select from "@/components/input/select";
import Modal from "@/components/modal";
import { bankOptions } from "@/data/banks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect,} from "react";
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

const EditBank = ({ open, handleClose, refetch, data }: TModal) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TEditBank>({
    mode: "onBlur",
    resolver: yupResolver(editBankSchema),
  });



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

  const handleCancel = () => {
    reset();
    handleClose();
  };

  return (
    <Modal open={open} handleClose={handleClose} className="w-[500px] p-8">
      <form
        className="w-full flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Edit Bank Details (Withdrawal)
          </h2>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700">
            Please, ensure you fill your NEW bank account details correctly.
            Account name must match profile name.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <Select
            label="Name of Bank"
            name="bankName"
            options={bankOptions}
            control={control}
            error={errors?.bankName?.message}
            placeholder="e.g. AAA Finance"
          />

          <Input
            label="Account Name"
            placeholder="e.g. Firstandlastname"
            register={register("accountName")}
            error={errors?.accountName}
          />

          <Input
            label="Account Number"
            placeholder="e.g. 0123456789"
            register={register("accountNumber")}
            error={errors?.accountNumber}
            type="text"
            // maxLength={10}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <Button
            type="submit"
            size="md"
            className="!w-full bg-[#336AEA] text-white rounded-lg font-medium hover:bg-[#2952b8] transition-colors"
          >
            Submit
          </Button>

          <Button
            type="button"
            variant="border"
            size="md"
            borderColor="#336AEA"
            borderWidth="1"
            className="!w-full bg-white text-[#336AEA] rounded-lg font-medium hover:bg-gray-50 transition-colors"
            handleClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditBank;