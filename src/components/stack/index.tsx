import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  spacing?: number;
  className?: string;
}

const Stack = ({ children, className, spacing = 16 }: Props) => {
  return (
    <div
      className={clsx("flex flex-col", className)}
      style={{ gap: `${spacing}px` }}
    >
      {children}
    </div>
  );
};

export default Stack;
