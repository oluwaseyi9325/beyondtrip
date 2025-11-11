// components/advertiser/DocumentCard.tsx
import { HiDocumentText, HiOutlineDocumentDownload, HiOutlineEye } from "react-icons/hi";
import { HiVideoCamera, HiDocument, HiPhotograph } from "react-icons/hi";
import { useState } from "react";
import Image from "next/image";

export interface DocumentCardProps {
  document: {
    id: number;
    title: string;
    description: string;
    date: string;
    typeOfFile: string;
    fileUrl: string;
  };
  isDefaultStyle: boolean;
  onDownload: (fileUrl: DocumentCardProps["document"]) => void;
  onPreview?: (document: DocumentCardProps["document"]) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onDownload,
  isDefaultStyle,
  onPreview,
}) => {
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  console.log("DocumentCard document", document);

  // Get appropriate icon and color based on file type
  const getFileIcon = () => {
    const fileType = document?.typeOfFile?.toLowerCase() || "pdf";
    const iconClass = `${isDefaultStyle ? "lg:w-6 lg:h-6 w-2 h-2" : "w-2 h-2"} text-white`;

    switch (fileType) {
      case "video":
      case "mp4":
      case "avi":
      case "mov":
        return <HiVideoCamera className={iconClass} />;
      case "image":
      case "jpg":
      case "png":
      case "jpeg":
        return <HiPhotograph className={iconClass} />;
      case "doc":
      case "docx":
        return <HiDocument className={iconClass} />;
      default:
        return <HiDocumentText className={iconClass} />;
    }
  };

  const getFileColor = () => {
    const fileType = document?.typeOfFile?.toLowerCase() || "pdf";

    switch (fileType) {
      case "video":
      case "mp4":
      case "avi":
      case "mov":
        return "bg-purple-500";
      case "image":
      case "jpg":
      case "png":
      case "jpeg":
        return "bg-green-500";
      case "doc":
      case "docx":
        return "bg-blue-500";
      default:
        return "bg-red-500";
    }
  };

  const handlePreview = () => {
    if (onPreview) {
      onPreview(document);
    } else {
      // Fallback: show inline preview modal
      setShowPreviewModal(true);
    }
  };

  const handleDownload = () => {
    // Show preview first, then download
    handlePreview();
  };

  const confirmDownload = () => {
    setShowPreviewModal(false);
    onDownload(document);
  };

  const renderPreviewContent = () => {
    const fileType = document?.typeOfFile?.toLowerCase() || "pdf";

    if (fileType.includes("video") || ["mp4", "avi", "mov"].includes(fileType)) {
      return (
        <video
          controls
          className="w-full max-h-96 rounded-lg"
          src={document.fileUrl}
        >
          Your browser does not support the video tag.
        </video>
      );
    } else if (fileType.includes("image") || ["jpg", "png", "jpeg"].includes(fileType)) {
      return (
        <div className="relative w-full h-96">
          <Image
            src={document.fileUrl}
            alt={document.title}
            fill
            className="object-contain rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
      );
    } else if (fileType === "pdf") {
      return (
        <iframe
          src={document.fileUrl}
          className="w-full h-96 rounded-lg"
          title={document.title}
        />
      );
    } else {
      return (
        <div className="text-center p-8">
          <HiDocumentText className="mx-auto text-6xl text-gray-400 mb-4" />
          <p className="text-gray-600">Preview not available for this file type.</p>
          <p className="text-sm text-gray-500 mt-2">Click download to access the file.</p>
        </div>
      );
    }
  };

  return (
    <>
      <div>
        <div className="bg-[#F8F8F8] rounded-2xl border border-[#F3F3F3] hover:shadow-md transition-shadow duration-200">
          <div className={`flex items-center ${isDefaultStyle ? "lg:p-5 p-2" : "p-2"}`}>
            {/* Icon */}
            <div className={`shrink-0 ${isDefaultStyle ? "lg:mr-4 mr-3" : "mr-3"}`}>
              <div className={`${isDefaultStyle ? "lg:w-10 lg:h-12 w-6 h-6" : " w-6 h-6"} ${getFileColor()} rounded flex items-center justify-center`}>
                {getFileIcon()}
              </div>
              <div className={`${isDefaultStyle ? "lg:text-xs text-[7px]" : "text-[7px]"} text-white ${getFileColor()} text-center mt-1 rounded-b px-1`}>
                {document?.typeOfFile?.toUpperCase() || "PDF"}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className={`${isDefaultStyle ? "lg:text-2xl text-[13px]" : "text-[13px]"} font-semibold text-[#171313] group-hover:text-blue-600 transition-colors duration-200`}>
                {document.title}
              </h3>
              <p dangerouslySetInnerHTML={{ __html: document.description }} className={`${isDefaultStyle ? "lg:text-lg text-[13px]" : "text-[13px]"} text-[#8E8E8E] mt-1`} />
              <div className={`flex items-center ${isDefaultStyle ? "lg:mt-2 lg:text-md lg:space-x-4 mt-1 text-[10px] space-x-2" : "mt-1 text-[10px] space-x-2"} text-[#CDCDCD]`}>
                <span>{document.date}</span>
              </div>
            </div>

            {/* Actions */}
            <div className={`flex items-center space-x-2 shrink-0 ${isDefaultStyle ? "lg:ml-4 ml-2" : "ml-2"}`}>
              {/* Preview Button */}
              <button
                onClick={handlePreview}
                className={`${isDefaultStyle ? "p-2" : "p-1"} text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors duration-200`}
                aria-label={`Preview ${document.title}`}
                title="Preview document"
              >
                <HiOutlineEye className={`${isDefaultStyle ? "lg:w-7 lg:h-7 w-5 h-5" : "w-5 h-5"} text-[#059669]`} />
              </button>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className={`${isDefaultStyle ? "p-2" : "p-1"} text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200`}
                aria-label={`Download ${document.title}`}
                title="Preview and download"
              >
                <HiOutlineDocumentDownload className={`${isDefaultStyle ? "lg:w-7 lg:h-7 w-5 h-5" : "w-5 h-5"} text-[#121363]`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-hidden shadow-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{document.title}</h2>
                <p dangerouslySetInnerHTML={{ __html: document.description }} className="text-sm text-gray-600" />
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-auto max-h-[60vh]">
              {renderPreviewContent()}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDownload}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <HiOutlineDocumentDownload className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DocumentCard;