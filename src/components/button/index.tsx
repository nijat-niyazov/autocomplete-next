import { cn } from "@/utils";
import { ButtonHTMLAttributes } from "react";

type CustomButtonProps = {
  variant?: "success" | "danger" | "warning" | "primary" | "secondary" | "black" | "outlined";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xl2" | "xl3" | "xl4" | "xl5";
  borderRadius?: "sm" | "md" | "lg" | "xl" | "full";
  font?: "normal" | "medium" | "semibold" | "bold";
} & ButtonHTMLAttributes<HTMLButtonElement>;

function createBtnClasses(
  variant: CustomButtonProps["variant"] = "primary",
  size: CustomButtonProps["size"] = "md",
  borderRadius: CustomButtonProps["borderRadius"] = "md",
  font: CustomButtonProps["font"] = "semibold"
) {
  let cls = "";

  const variants = {
    primary: "bg-primary ",
    secondary: "bg-secondary ",
    black: "bg-text ",
    danger: "bg-red-500 ",
    outlined: "bg-outlined text-black ",
    success: "bg-success ",
    warning: "bg-warning ",
  };

  const sizes = {
    xs: "text-xs ",
    sm: "text-sm ",
    md: "text-base ",
    lg: "text-lg ",
    xl: "text-xl ",
    xl2: "text-2xl ",
    xl3: "text-3xl ",
    xl4: "text-4xl ",
    xl5: "text-5xl ",
  };

  const borderRadiuses = {
    sm: "rounded-sm ",
    md: "rounded-md ",
    lg: "rounded-lg ",
    xl: "rounded-xl ",
    full: "rounded-full ",
  };

  const fonts = {
    normal: "font-normal ",
    medium: "font-medium ",
    semibold: "font-semibold ",
    bold: "font-bold ",
  };

  cls += variants[variant] + sizes[size] + borderRadiuses[borderRadius] + fonts[font];

  return cls;
}

const defaultClasses =
  "hover:bg-opacity-90 active:bg-opacity-100  transition-all duration-200  text-white rounded-md md:px-8 py-2 px-6 disabled:opacity-50 disabled:pointer-events-none outline-none ease-in-out w-full text-white disabled:select-none flex items-center gap-2 justify-center";

const CustomButton = ({ variant, type = "button", borderRadius, size, children, className = "", ...rest }: CustomButtonProps) => {
  const cls = createBtnClasses(variant, size, borderRadius);

  return (
    <button type={type} className={cn(defaultClasses, cls, className)} {...rest}>
      {children}
    </button>
  );
};

export default CustomButton;
