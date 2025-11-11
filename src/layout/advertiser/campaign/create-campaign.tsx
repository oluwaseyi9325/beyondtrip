"use client";

import React, { useState } from "react";
import Button from "@/components/button";
import Input from "@/components/input/input";
import Select from "@/components/input/select";
import Modal from "@/components/modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import { IoClose } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa";
import Image from "next/image";

// ------------------------------------------------
// Types
// ------------------------------------------------
export interface TCreateCampaign {
    campaignName: string;
    budget: string;
    startDate: string;
    endDate: string;
    targetAudience?: string;
    adType: string;
}

// ------------------------------------------------
// Validation Schema
// ------------------------------------------------
const schema = yup.object().shape({
    campaignName: yup.string().required("Campaign name is required"),
    budget: yup.string().required("Budget is required"),
    startDate: yup.string().required("Start date is required"),
    endDate: yup.string().required("End date is required"),
    targetAudience: yup.string().optional(),
    adType: yup.string().required("Select an Ad type"),
});

// ------------------------------------------------
// Component
// ------------------------------------------------
const CreateCampaign = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TCreateCampaign>({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    const [files, setFiles] = useState<File[]>([]);
    const [previewFile, setPreviewFile] = useState<File | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const onSubmit = async (data: TCreateCampaign) => {
        if (files.length === 0) {
            toast.error("Please upload at least one creative file!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("CampaignName", data.campaignName);
            formData.append("Budget", data.budget);
            formData.append("StartDate", data.startDate);
            formData.append("EndDate", data.endDate);
            formData.append("TargetAudience", data.targetAudience || "");
            formData.append("AdType", data.adType);

            files.forEach((file) => {
                formData.append("Files", file);
            });

            console.log("Form data:", Object.fromEntries(formData.entries()));

            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success("Campaign created successfully!");

            reset();
            setFiles([]);
        } catch (err: any) {
            toast.error(
                err?.response?.data?.error?.description ||
                "Something went wrong while creating campaign"
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

    const handleRemoveFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handlePreview = (file: File) => {
        setPreviewFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setShowPreview(true);
    };

    const handleClosePreview = () => {
        setShowPreview(false);
        // Clean up object URL to prevent memory leaks
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl("");
        setPreviewFile(null);
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

    const budgetOptions = [
        { label: "₦50,000.00", value: "50000" },
        { label: "₦100,000.00", value: "100000" },
        { label: "₦250,000.00", value: "250000" },
    ];

    return (
        <div className="bg-white p-6 sm:p-12 lg:p-20 rounded-lg">
            <form
                className="w-full flex flex-col gap-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* Header */}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Campaign Details</h2>

                {/* Campaign Name */}
                <Input
                    label="Campaign Name"
                    placeholder="New Ride Xtra Promo"
                    register={register("campaignName")}
                    error={errors.campaignName}
                />

                {/* Budget and Duration */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select
                        label="Budget"
                        name="budget"
                        options={budgetOptions}
                        control={control}
                        error={errors?.budget?.message}
                        placeholder="₦50,000.00"
                    />
                    <div className="md:col-span-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="Start Duration"
                                type="date"
                                placeholder="June 1, 2025"
                                register={register("startDate")}
                                error={errors.startDate}
                            />
                            <Input
                                label="End Duration"
                                type="date"
                                placeholder="August 31, 2025"
                                register={register("endDate")}
                                error={errors.endDate}
                            />
                        </div>
                    </div>
                </div>

                {/* Target Audience */}
                <Input
                    label="Target Audience (Optional)"
                    placeholder=""
                    register={register("targetAudience")}
                    error={errors.targetAudience}
                />

                {/* Upload Creative File */}
                <div>
                    <label className="block text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                        Upload Creative File
                    </label>

                    {/* Drag and Drop Area */}
                    <div
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 sm:p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
                    >
                        <label className="cursor-pointer flex flex-col items-center gap-3">
                            <div>
                                <FaFileUpload size={42} className="text-blue-500"/>
                            </div>
                            <p className="text-sm sm:text-base text-gray-700">
                                Drag and drop or{" "}
                                <span className="text-blue-600 font-medium">click to upload</span>
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">
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

                    {/* File List */}
                    {files.length > 0 && (
                        <div className="mt-4 space-y-3">
                            {files.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4 gap-2"
                                >
                                    <span className="text-gray-700 text-sm break-all">{file.name}</span>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => handlePreview(file)}
                                            className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap"
                                        >
                                            Click to preview
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveFile(index)}
                                            className="text-gray-500 hover:text-red-600 transition"
                                        >
                                            <IoClose size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Preview Area */}
                {files.length > 0 && (
                    <div className="bg-blue-100 rounded-lg p-8 sm:p-12 flex items-center justify-center min-h-[200px] sm:min-h-[300px]">
                        <p className="text-gray-600 text-base sm:text-lg">Preview Area</p>
                    </div>
                )}

                {/* Ad Type */}
                <div>
                    <label className="block text-base font-semibold text-gray-900 mb-3">
                        Ad Type
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="magazine"
                                {...register("adType")}
                                className="w-5 h-5 text-blue-600"
                            />
                            <span className="text-gray-900">Magazine</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="qr"
                                {...register("adType")}
                                className="w-5 h-5 text-blue-600"
                            />
                            <span className="text-gray-900">QR Engagement</span>
                        </label>
                    </div>
                    {errors.adType && (
                        <p className="text-red-500 text-sm mt-1">{errors.adType.message}</p>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <Button
                        type="submit"
                        size="md"
                        className="!w-full sm:!w-auto px-12 bg-[#336AEA] text-white rounded-lg font-medium hover:bg-[#2952b8] transition-colors"
                    >
                        Submit Campaign
                    </Button>

                    <Button
                        type="button"
                        variant="border"
                        size="md"
                        borderColor="#336AEA"
                        borderWidth="1"
                        className="!w-full sm:!w-auto px-12 bg-white text-[#336AEA] rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        handleClick={() => toast.success("Saved as draft")}
                    >
                        Save as draft
                    </Button>
                </div>
            </form>

            {/* Preview Modal */}
            {showPreview && previewFile && (
                <Modal open={showPreview} handleClose={handleClosePreview} className="w-full max-w-[800px]">
                    <div className="p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg sm:text-xl font-bold">File Preview</h3>
                            <button onClick={handleClosePreview}>
                                <IoClose size={24} />
                            </button>
                        </div>
                        {previewFile.type.startsWith("image/") ? (
                            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
                                <Image
                                    src={previewUrl}
                                    alt="Preview"
                                    fill
                                    className="object-contain rounded-lg"
                                    sizes="(max-width: 768px) 100vw, 800px"
                                />
                            </div>
                        ) : (
                            <div className="bg-gray-100 p-8 sm:p-12 rounded-lg text-center">
                                <p className="text-gray-600">Preview not available for this file type</p>
                                <p className="text-sm text-gray-500 mt-2 break-all">{previewFile.name}</p>
                            </div>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CreateCampaign;