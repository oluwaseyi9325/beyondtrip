"use client";

import React, { useState } from "react";
import Button from "@/components/button";
import Input from "@/components/input/input";
import Select from "@/components/input/select";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import { FaFileUpload } from "react-icons/fa";
// ------------------------------------------------
// Types
// ------------------------------------------------

export interface TUploadCreative {
    campaign: string;
    description: string;
}

// ------------------------------------------------
// Validation Schema
// ------------------------------------------------
const schema = yup.object().shape({
    campaign: yup.string().required("Please select a campaign"),
    description: yup.string().required("Description is required"),
});

// ------------------------------------------------
// Component
// ------------------------------------------------
const UploadCreative = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TUploadCreative>({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    const [files, setFiles] = useState<File[]>([]);

    const onSubmit = async (data: TUploadCreative) => {
        if (files.length === 0) {
            toast.error("Please upload at least one file!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("Campaign", data.campaign);
            formData.append("Description", data.description);

            files.forEach((file) => {
                formData.append("Files", file);
            });

            // Replace with your actual API call
            console.log("Form data:", Object.fromEntries(formData.entries()));

            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success("Creative uploaded successfully!");


            reset();
            setFiles([]);
        } catch (err: any) {
            toast.error(
                err?.response?.data?.error?.description ||
                "Something went wrong while uploading creative"
            );
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            const newFiles = Array.from(selectedFiles);
            setFiles((prev) => [...prev, ...newFiles]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles) {
            const newFiles = Array.from(droppedFiles);
            setFiles((prev) => [...prev, ...newFiles]);
        }
    };

    const handleCancel = () => {
        reset();
        setFiles([]);
        // handleClose();
    };

    // Campaign options - replace with your actual data
    const campaignOptions = [
        { label: "New Ride Xtra Promo", value: "ride-xtra" },
        { label: "Summer Sale Campaign", value: "summer-sale" },
        { label: "Back to School", value: "back-to-school" },
    ];

    return (
        <div className="bg-white rounded-lg p-6 sm:p-12 lg:p-20">
            <form
                className="w-full flex flex-col gap-8"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* Header */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Upload Creative</h2>
                    <div className="border-t border-gray-200 mt-4"></div>
                </div>

                {/* Assign to Campaign */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Assign to Campaign
                    </h3>
                    <Select
                        label=""
                        name="campaign"
                        options={campaignOptions}
                        control={control}
                        error={errors?.campaign?.message}
                        placeholder="Select Campaign"
                    />
                </div>

                {/* Add Descriptions */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Add descriptions
                    </h3>
                    <Input
                        label=""
                        placeholder="e.g. Main banner, promo ads"
                        register={register("description")}
                        error={errors.description}
                    />
                </div>

                {/* Upload Area */}
                <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-16 text-center hover:border-blue-400 transition-colors cursor-pointer"
                >
                    <label className="cursor-pointer flex flex-col items-center gap-4">
                        <div className="">
                            {/* <FiUpload size={32} className="text-white" /> */}
                            <FaFileUpload size={42} className="text-blue-500" />
                        </div>
                        <p className="text-gray-700 text-lg">
                            Drag and drop or{" "}
                            <span className="text-blue-600 font-medium">click to upload</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            (PDF, JPEG, PNG) max. size: 10MB
                        </p>
                        <input
                            type="file"
                            multiple
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                </div>

                {/* File List Preview */}
                {files.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                            {files.length} file(s) selected
                        </p>
                        <div className="space-y-2">
                            {files.map((file, index) => (
                                <p key={index} className="text-sm text-gray-600">
                                    • {file.name} ({(file.size / 1024).toFixed(1)} KB)
                                </p>
                            ))}
                        </div>
                    </div>
                )}

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 mt-4">
                    <Button
                        type="submit"
                        size="md"
                        className="w-auto! px-12 bg-[#336AEA] text-white rounded-lg font-medium hover:bg-[#2952b8] transition-colors"
                    >
                        Update Campaign
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
            </form>
        </div>
    );
};

export default UploadCreative;