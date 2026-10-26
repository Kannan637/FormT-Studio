"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { StaggeredRollingText } from "@/components/ui/animated-text";

interface ButtonRollingTextProps {
  children: ReactNode;
  /** Optional custom hover text. If provided, rolls into this text. */
  hoverText?: string;
  variant?: "default" | "outline" | "ghost" | "dark";
  size?: "default" | "sm" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
  stagger?: number;
}

const variantStyles = {
  default:
    "bg-white text-zinc-900 hover:bg-white/95 border border-transparent shadow-sm",
  outline:
    "bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/5",
  ghost:
    "bg-transparent text-white border border-transparent hover:bg-white/10",
  dark:
    "bg-zinc-900 text-white hover:bg-black border border-transparent",
};

const sizeStyles = {
  default: "h-10 px-6 text-[12.5px]",
  sm: "h-8 px-4 text-xs",
  lg: "h-12 px-8 text-[14px]",
};

export function ButtonRollingText({
  children,
  hoverText,
  variant = "default",
  size = "default",
  className,
  onClick,
  disabled,
  type = "button",
  "aria-label": ariaLabel,
  stagger = 0.02,
}: ButtonRollingTextProps) {
  const isStringContent = typeof children === "string";
  const displayText = isStringContent ? children : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:pointer-events-none disabled:opacity-50 select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {isStringContent ? (
        <StaggeredRollingText text={displayText} stagger={stagger} />
      ) : (
        <span className="relative block overflow-hidden">
          <span className="inline-block transition-transform duration-350 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:-translate-y-full will-change-transform">
            {children}
          </span>
          <span
            className="absolute inset-0 inline-block translate-y-full transition-transform duration-350 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-y-0 will-change-transform pointer-events-none"
            aria-hidden="true"
          >
            {hoverText ? hoverText : children}
          </span>
        </span>
      )}
    </button>
  );
}
