"use client";

import { GoPlus } from "react-icons/go";
import Button from "@/components/button";
import DocumentCard from "@/layout/tutor/material";
import Skeleton from "react-loading-skeleton";

interface MaterialsTabProps {
    materials: any[];
    isLoading: boolean;
    onAddMaterial: () => void;
}

export const MaterialsTab = ({ materials, isLoading, onAddMaterial }: MaterialsTabProps) => {
    const handleDownload = (doc: any) => {
        if (typeof window !== "undefined") {
          window.open(doc.fileUrl, "_blank");
        }
      };
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Materials</h2>
                <Button
                    size="md"
                    className="max-w-[170px] text-white text-sm font-[600] p-3"
                    hasIcon
                    icon={<GoPlus size={20} />}
                    handleClick={onAddMaterial}
                >
                    Add Material
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-10">
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="w-[350px] h-[150px] rounded-lg overflow-hidden bg-white p-4 shadow"
                        >
                            <Skeleton height={24} width={`70%`} />
                            <Skeleton height={16} width={`100%`} className="mt-4" />
                            <Skeleton height={16} width={`90%`} className="mt-2" />
                        </div>
                    ))
                ) : materials?.length === 0 ? (
                    <div className="w-full flex justify-center items-center py-16 text-center text-gray-500 font-medium">
                        No materials uploaded yet 📚
                        <br />
                        <span className="text-sm mt-2">Upload course materials for your students</span>
                    </div>
                ) : (
                    materials.map((document: any, i:any) => (
                        <DocumentCard
                            isDefaultStyle={true}
                            key={i}
                            document={document}
                            onDownload={handleDownload}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
