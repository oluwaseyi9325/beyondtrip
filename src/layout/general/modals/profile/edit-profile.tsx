import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import Modal from "@/components/modal";
import Input from "@/components/input/input";
import Button from "@/components/button";
import useAuthStore from "@/store/useAuthStore";
import { useUpdateProfile } from "@/services/auth.service";
import { useGetadvertisersProfile } from "@/services/advertiser.service";
import { FiEdit2, FiX } from "react-icons/fi";
import Image from "next/image";

interface TUploadModal {
  open: boolean;
  handleClose: () => void;
}

export interface TEditProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  references: string;
  profilePicture?: File | null;
}

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  address: yup.string().required("Address is required"),
  references: yup.string().required("References are required"),
});

const EditProfile = ({ open, handleClose }: TUploadModal) => {
  const { profile, updateProfile: updateUser } = useAuthStore();
  const { data: response, refetch } = useGetadvertisersProfile();
  const updateProfile = useUpdateProfile();

  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TEditProfileForm>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  // Update store when profile data is fetched
  useEffect(() => {
    if (response?.data) {
      updateUser(response.data);
    }
  }, [response, updateUser]);

  // Populate form when modal opens
  useEffect(() => {
    if (open && profile) {
      setValue("firstName", profile.firstName || "");
      setValue("lastName", profile.lastName || "");
      setValue("email", profile.email || "");
      setValue("phone", profile.phone || "");
      setValue("address", profile.address || "");
      setValue("references", profile.references || "");
      setPreview(profile?.avatarUrl || null);
    }
  }, [open, profile, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Max file size is 2MB");
        return;
      }
      setPreview(URL.createObjectURL(file));
      setValue("profilePicture", file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setValue("profilePicture", null);
  };

  const onSubmit = (data: TEditProfileForm) => {
    const payload = { ...data, id: profile?.id };
    
    updateProfile.mutate(payload, {
      onSuccess: (response) => {
        toast.success("Profile updated successfully!");
        if (response?.data) {
          let formatData = { ...profile, ...response.data?.profile }; 
          updateUser(formatData);
          if (response.data.avatarUrl) {
            setPreview(response.data.avatarUrl);
          }
        }
        
        // Refetch to ensure data is in sync
        if (refetch) {
          refetch();
        }
        
        handleClose();
        reset();
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.error?.description ??
          "Something went wrong while updating the profile"
        );
      },
    });
  };

  const handleModalClose = () => {
    reset();
    setPreview(profile?.avatarUrl || null);
    handleClose();
  };

  return (
    <Modal
      open={open}
      handleClose={handleModalClose}
      className="w-[600px] lg:p-9 p-5 h-auto max-h-[100vh]"
    >
      <form
        className="flex flex-col gap-5 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-semibold text-gray-900">
          Edit Personal Information
        </h2>

        {/* Profile Picture Section */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              {preview ? (
                <Image
                  src={preview}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  unoptimized={preview.startsWith('blob:')}
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200" />
              )}
            </div>
            {preview ? (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute bottom-0 right-0 bg-white rounded-full shadow p-1 hover:bg-gray-50"
              >
                <FiX className="text-gray-600 text-sm" />
              </button>
            ) : (
              <label
                htmlFor="profile-upload"
                className="absolute top-0 right-0 bg-white rounded-full shadow p-1 cursor-pointer hover:bg-gray-50"
              >
                <FiEdit2 className="text-gray-600 text-sm" />
                <input
                  type="file"
                  id="profile-upload"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          <p className="text-sm text-gray-500">
            Allowed file types: <b>png, jpg</b> <br />
            (max. file size of 2MB)
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First Name"
              placeholder="First Name"
              register={register("firstName")}
              error={errors.firstName}
            />
            <Input
              label="Last Name"
              placeholder="Last Name"
              register={register("lastName")}
              error={errors.lastName}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Email"
              placeholder="username@email.com"
              register={register("email")}
              error={errors.email}
            />
            <Input
              label="Phone No"
              placeholder="Enter phone number"
              register={register("phone")}
              error={errors.phone}
            />
          </div>
          
          <Input
            label="Address"
            placeholder="Enter address"
            register={register("address")}
            error={errors.address}
          />
          
          <Input
            label="References"
            placeholder="Enter references"
            register={register("references")}
            error={errors.references}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            className="w-32 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
            handleClick={handleModalClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-40 bg-blue-600 text-white font-semibold hover:bg-blue-700"
            disabled={updateProfile.isPending}
          >
            {updateProfile.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProfile;