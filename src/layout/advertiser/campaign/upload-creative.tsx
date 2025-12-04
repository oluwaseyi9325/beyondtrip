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
import { FaFileUpload } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Image from "next/image";

// ------------------------------------------------
// Types
// ------------------------------------------------
export interface TUploadCreative {
  campaign: string;
  description: string;
}

interface FileWithPreview extends File {
  preview?: string;
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

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [previewFile, setPreviewFile] = useState<FileWithPreview | null>(null);
  const [showPreview, setShowPreview] = useState(false);

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

      console.log("Form data:", Object.fromEntries(formData.entries()));

      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Creative uploaded successfully!");

      reset();
      handleClearFiles();
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
      const newFiles = Array.from(selectedFiles).map((file) => {
        const fileWithPreview = file as FileWithPreview;
        if (file.type.startsWith("image/")) {
          fileWithPreview.preview = URL.createObjectURL(file);
        }
        return fileWithPreview;
      });
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
      const newFiles = Array.from(droppedFiles).map((file) => {
        const fileWithPreview = file as FileWithPreview;
        if (file.type.startsWith("image/")) {
          fileWithPreview.preview = URL.createObjectURL(file);
        }
        return fileWithPreview;
      });
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => {
      const file = prev[index];
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const handlePreview = (file: FileWithPreview) => {
    setPreviewFile(file);
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setPreviewFile(null);
  };

  const handleClearFiles = () => {
    files.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setFiles([]);
  };

  const handleCancel = () => {
    reset();
    handleClearFiles();
  };

  const campaignOptions = [
    { label: "New Ride Xtra Promo", value: "ride-xtra" },
    { label: "Summer Sale Campaign", value: "summer-sale" },
    { label: "Back to School", value: "back-to-school" },
  ];

  return (
    <>
      <div className="bg-white rounded-lg p-6 sm:p-12 lg:p-20">
        <div className="p-6 sm:p-12 lg:p-20 border border-[#00000040] rounded-3xl">
          <form
            className="w-full flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Header */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Upload Creative
              </h2>
              <div className="border-t border-gray-200 mt-4"></div>
            </div>

            <div className="">
              {/* Left Column - Form */}
              <div className="space-y-8">
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
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
                >
                  <label className="cursor-pointer flex flex-col items-center gap-4">
                    <div className=" p-4">
                      <FaFileUpload size={32} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-gray-700 text-base">
                        Drag and drop or{" "}
                        <span className="text-blue-600 font-medium">
                          click to upload
                        </span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        (PDF, JPEG, PNG) max. size: 10MB
                      </p>
                    </div>
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
                  <div className="space-y-3">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 font-medium truncate">
                            {file.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {file.type.startsWith("image/") && (
                            <button
                              type="button"
                              onClick={() => handlePreview(file)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Click to preview
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="text-gray-400 hover:text-red-600 transition"
                          >
                            <IoClose size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                type="submit"
                size="md"
                className="!w-full sm:!w-auto px-12 bg-[#336AEA] text-white rounded-lg font-medium hover:bg-[#2952b8] transition-colors"
              >
                Update Campaign
              </Button>

              <Button
                type="button"
                variant="border"
                size="md"
                borderColor="#336AEA"
                borderWidth="1"
                className="!w-full sm:!w-auto px-12 bg-white text-[#336AEA] rounded-lg font-medium hover:bg-gray-50 transition-colors"
                handleClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Full Screen Preview Modal */}
      {showPreview && previewFile && (
        <Modal
          open={showPreview}
          handleClose={handleClosePreview}
          className="w-full max-w-4xl"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Preview: {previewFile.name}</h3>
              <button onClick={handleClosePreview}>
                <IoClose size={24} />
              </button>
            </div>
            {previewFile.preview ? (
              <div className="relative w-full h-[500px]">
                <Image
                  src={previewFile.preview}
                  alt="Full Preview"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            ) : (
              <div className="bg-gray-100 p-12 rounded-lg text-center">
                <p className="text-gray-600">
                  Preview not available for this file type
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default UploadCreative;
