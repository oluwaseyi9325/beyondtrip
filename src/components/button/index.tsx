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
}: Props) => {
  const VARIANT = {
    filled: "bg-[#336AEA] border-none outline-none text-white",
    border:
      "border border-[#d4d4d4] hover:bg-[#336AEA] hover:text-white hover:border-[#336AEA]",
  };

  const SIZE = {
    lg: "h-14",
    md: "h-9",
  };

  const ROUNDED = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <button
      className={clsx(
        className,
        "w-full cursor-pointer",
        "transition-all ease-in-out duration-500",
        VARIANT[variant],
        SIZE[size],
        ROUNDED[rounded],
        hasIcon && "flex items-center justify-center gap-2",
        disabled && "cursor-not-allowed opacity-50"
      )}
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