import Link from "next/link";
import { ReactNode, ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
  disabled?: boolean;
  children: ReactNode;
}

const baseStyles =
  "flex items-center justify-center text-nowrap rounded w-fit transition-colors duration-700 shadow-md";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "text-white/70 hover:text-black border border-gray-500/30 hover:dark:border-white/20 dark:hover:text-white",
  secondary:
    "bg-black text-white hover:bg-black/80 border border-black dark:border-white/10",
  tertiary:
    "bg-gray-500/9 hover:bg-gray-500/20 border border-gray-500/9",
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: "text-[10px] py-1 px-2",
  sm: "text-[12px] py-2 px-4",
  md: "text-sm py-2 px-4",
  lg: "text-[14px] py-3 px-6",
  xl: "text-[14px] py-4 px-6",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  href,
  disabled = false,
  onClick,
  children,
  ...props
}: ButtonProps) {
  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
    disabled ? "opacity-25 cursor-not-allowed" : "cursor-pointer"
  } ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}