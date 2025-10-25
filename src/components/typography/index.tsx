import clsx from "clsx";

interface Props {
  type?: "h3" | "h6" | "p" | "span";
  weight?: "400" | "500" | "600" | "700" | "800";
  lineHeight?: "none" | "normal";
  children: React.ReactNode;
  color?: "black" | "grey" | "red" | "yellow" | "white";
}

const Text = ({
  type = "p",
  color = "black",
  weight = "400",
  lineHeight = "normal",
  children,
}: Props) => {
  const SIZING = {
    h3: "text-[32px]",
    h6: "text-lg",
    p: "",
    span: "text-sm",
  };

  const WEIGHT = {
    400: "font-[400]",
    500: "font-[500]",
    600: "font-[600]",
    700: "font-[700]",
    800: "font-[800]",
  };

  const COLOR = {
    black: "text-black-100",
    grey: "text-grey-100",
    red: "text-red-500",
    yellow: "text-yellow-100",
    white: "text-white",
  };

  const LINE_HEIGHT = {
    none: "leading-none",
    normal: "leading-[145%]",
  };

  return (
    <p
      className={clsx(
        SIZING[type],
        COLOR[color],
        WEIGHT[weight],
        LINE_HEIGHT[lineHeight]
      )}
    >
      {children}
    </p>
  );
};

export default Text;
