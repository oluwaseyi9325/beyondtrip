"use client";

import {  useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import Input from "@/components/input/input";
import Button from "@/components/button";
import { FiEdit2, FiX } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import Image from "next/image";

// ------------------------------------------------
// Types
// ------------------------------------------------
interface ProfileDetailsForm {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

// ------------------------------------------------
// Validation Schema
// ------------------------------------------------
const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: yup.string().optional(),
    currentPassword: yup.string().optional(),
    newPassword: yup.string().optional(),
    confirmNewPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwords must match")
        .optional(),
});

// ------------------------------------------------
// Component
// ------------------------------------------------
const AccountDetailsTab = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProfileDetailsForm>({
        mode: "onBlur",
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "admin@beyondtrips.com",
            phoneNumber: "",
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error("Max file size is 2MB");
                return;
            }
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setPreview(null);
    };

    const onSubmit = (data: ProfileDetailsForm) => {
        console.log("Profile data:", data);
        toast.success("Profile updated successfully!");
        setIsEditMode(false);
    };

    const handleCancel = () => {
        reset();
        setIsEditMode(false);
    };

    return (
        <div className="w-full ">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="bg-white p-8 rounded-lg space-y-8">
                       {/* Header */}
                <div className="flex flex-wrap gap-2 items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Profile Details</h2>
                    <button
                        type="button"
                        onClick={() => setIsEditMode(!isEditMode)}
                        className="bg-[#336AEA] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#2952b8] transition-colors flex items-center gap-2"
                    >
                        <MdEdit size={16} />
                        Edit Profile
                    </button>
                </div>

                {/* Profile Picture Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Profile Picture
                    </label>
                    <div className="flex items-start gap-6">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                {preview ? (
                                    <Image
                                        src={preview}
                                        alt="Profile"
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <svg
                                            className="w-12 h-12 text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Edit Button */}
                            <label
                                htmlFor="profile-upload"
                                className="absolute bottom-0 right-0 bg-gray-800 text-white rounded-full h-8 w-8 flex items-center justify-center cursor-pointer hover:bg-gray-700 shadow"
                            >
                                <FiEdit2 size={14} />
                                <input
                                    type="file"
                                    id="profile-upload"
                                    accept=".png,.jpg,.jpeg"
                                    className="hidden"
                                    onChange={handleImageChange}
                                    disabled={!isEditMode}
                                />
                            </label>

                            {/* Remove Button */}
                            {preview && (
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center hover:bg-red-600 shadow"
                                >
                                    <FiX size={16} />
                                </button>
                            )}
                        </div>

                        <div className="text-sm text-gray-600">
                            <p>Allowed file types: png, jpg</p>
                            <p>(max. file size of 2MB)</p>
                        </div>
                    </div>
                </div>

                {/* Full Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Full Name
                    </label>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                            label=""
                            placeholder="First Name"
                            register={register("firstName")}
                            error={errors.firstName}
                            disabled={!isEditMode}
                        />
                        <Input
                            label=""
                            placeholder="Last Name"
                            register={register("lastName")}
                            error={errors.lastName}
                            disabled={!isEditMode}
                        />
                    </div>
                </div>

                {/* Email Address */}
                <Input
                    label="Email Address"
                    placeholder="admin@beyondtrips.com"
                    register={register("email")}
                    error={errors.email}
                    disabled={!isEditMode}
                />

                {/* Phone Number */}
                <Input
                    label="Phone Number"
                    placeholder=""
                    register={register("phoneNumber")}
                    error={errors.phoneNumber}
                    disabled={!isEditMode}
                />
             </div>

                {/* Change Password Section */}
                <div className="pt-6 bg-white p-8 rounded-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                        Change Password
                    </h3>
                    <div className="space-y-4">
                        <Input
                            label="Current Password"
                            type="password"
                            placeholder="••••••••••••••••"
                            register={register("currentPassword")}
                            error={errors.currentPassword}
                            disabled={!isEditMode}
                        />
                        <Input
                            label="New Password"
                            type="password"
                            placeholder=""
                            register={register("newPassword")}
                            error={errors.newPassword}
                            disabled={!isEditMode}
                        />
                        <Input
                            label="Confirm New Password"
                            type="password"
                            placeholder=""
                            register={register("confirmNewPassword")}
                            error={errors.confirmNewPassword}
                            disabled={!isEditMode}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                {isEditMode && (
                    <div className="flex gap-4 pt-6">
                        <Button
                            type="submit"
                            size="md"
                            className="!w-auto px-12 bg-[#336AEA] text-white rounded-lg font-medium hover:bg-[#2952b8] transition-colors"
                        >
                            Save Changes
                        </Button>
                        <Button
                            type="button"
                            variant="border"
                            size="md"
                            borderColor="#336AEA"
                            borderWidth="1"
                            className="!w-auto px-12 bg-white text-[#336AEA] rounded-lg font-medium hover:bg-gray-50 transition-colors"
                            handleClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default AccountDetailsTab;