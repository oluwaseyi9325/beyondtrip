"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import Stack from "../stack";
import Text from "../typography";
import clsx from "clsx";
import Editor from "react-simple-wysiwyg";

interface Props {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  icon?: React.ReactNode;
  editor?: boolean;
  rows?: number;
  className?: string;
}

const TextArea = ({
  label,
  icon,
  placeholder = "Type here...",
  value,
  onChange,
  register,
  error,
  editor = false,
  rows = 4,
  className,
}: Props) => {
  const errorId = `${label.toLowerCase().replace(/\s+/g, "-")}-error`;

  return (
    <Stack spacing={4}>
      <Text type="span" weight="500">
        {label}
      </Text>

      <div className="relative w-full">
        {icon && <div className="absolute top-3 left-4">{icon}</div>}

        {editor ? (
          <Editor
            value={value || ""}
            onChange={(text: any) => onChange?.(text)}
            placeholder={placeholder}
            className={clsx(
              "bg-white border border-grey-200 text-sm h-[150px] overflow-y-auto",
              icon ? "pl-11" : "",
              className
            )}
          />
        ) : (
          <textarea
            rows={rows}
            placeholder={placeholder}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            {...register}
            className={clsx(
              "w-full resize-none bg-white border border-grey-200 rounded-md outline-none pr-4 py-3 text-sm text-black placeholder:text-grey-300",
              icon ? "pl-11" : "pl-4",
              className
            )}
          />
        )}
      </div>

      {error && (
        <Text type="span" color="red">
          {error.message}
        </Text>
      )}
    </Stack>
  );
};

export default TextArea;
