import { useRef, useEffect } from "react";
import clsx from "clsx";
import { LuFileText } from "react-icons/lu";

interface FileInputProps {
  label: string;
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  accept?: string;
  className?: string;
}

const FileInput = ({
  label,
  value,
  onChange,
  error,
  accept,
  className,
}: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onChange(file || null);
  };

  useEffect(() => {
    if (fileInputRef.current?.files?.[0]) {
      onChange(fileInputRef.current.files[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={clsx("w-full", className)}>
      <label className="block font-medium text-gray-700 mb-1">{label}</label>

      <div
        onClick={handleClick}
        className={clsx(
          "border border-dashed border-gray-400 rounded-md px-4 py-6 text-center cursor-pointer hover:border-blue-500 transition-colors",
          error && "border-red-500"
        )}
      >
        {value ? (
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <LuFileText size={20} />
            <span className="text-sm truncate max-w-[240px]">{value.name}</span>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600">Click to upload a file</p>
            <p className="text-xs text-gray-400 mt-1">
              Supported: PDF, DOCX, MP4, MP3, ZIP, etc.
            </p>
          </>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FileInput;
