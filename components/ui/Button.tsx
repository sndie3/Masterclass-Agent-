import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
;

type ButtonSize = "sm" | "md" | "lg";

type widthProps = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  widthSize?:widthProps
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-red-800 hover:bg-red-700 text-white",
  secondary: "bg-[#1d1d1d] hover:bg-[#252525] text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-base",
  lg: "px-6 py-4 text-lg",
};

const widthClasses: Record<widthProps,string> = {
  sm:'w-[120px]',
  md:'w-[220px]',
  lg:'w-[330px]'
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  widthSize= "sm",
  className = "",
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`
        font-bahnschrift
        font-semibold
        uppercase
        transition
        duration-200
        w-full
        py-4
        ${widthClasses[widthSize]}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}