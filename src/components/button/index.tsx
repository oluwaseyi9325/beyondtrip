import clsx from "clsx";

interface Props {
  type?: "button" | "submit";
  children: React.ReactNode;
  variant?: "filled" | "border";
  size?: "lg" | "md";
  rounded?: "sm" | "md" | "lg" | "full";
  disabled?: boolean;
  handleClick?: () => void;
  className?: string;
  hasIcon?: boolean;
  icon?: any;
  borderColor?: string;
  borderWidth?: "1" | "2" | "3" | "4";
}

const Button = ({
  type = "button",
  children,
  variant = "filled",
  size = "lg",
  rounded = "lg",
  disabled,
  handleClick,
  className,
  hasIcon = false,
  icon,
  borderColor,
  borderWidth = "1",
}: Props) => {
  const VARIANT = {
    filled: "bg-[#336AEA] border-none outline-none text-white",
    border: "bg-transparent hover:bg-[#336AEA] hover:text-white",
  };

  const SIZE = {
    lg: "h-14",
    md: "h-10",
  };

  const ROUNDED = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const BORDER_WIDTH = {
    "1": "border",
    "2": "border-2",
    "3": "border-3",
    "4": "border-4",
  };

  // If variant is border, apply border styles
  const borderStyles =
    variant === "border"
      ? {
          borderColor: borderColor || "#336AEA",
          borderWidth: `${borderWidth}px`,
        }
      : {};

  return (
    <button
      className={clsx(
        className,
        "w-full cursor-pointer",
        "transition-all ease-in-out duration-500",
        VARIANT[variant],
        SIZE[size],
        ROUNDED[rounded],
        variant === "border" && BORDER_WIDTH[borderWidth],
        hasIcon && "flex items-center justify-center gap-2",
        disabled && "cursor-not-allowed opacity-50"
      )}
      style={borderStyles}
      type={type}
      disabled={disabled}
      onClick={handleClick}
    >
      {hasIcon && icon}
      {children}
    </button>
  );
};

export default Button;