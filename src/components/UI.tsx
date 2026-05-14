import React, { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "../lib/utils";

export const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <label className={cn("block text-sm font-medium text-brand-brown mb-2", className)}>
    {children}
  </label>
);

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full h-[56px] px-5 rounded-input border border-brand-border bg-white text-brand-brown placeholder:text-brand-gray/50 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all",
        className
      )}
      {...props}
    />
  )
);

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "w-full h-[56px] px-5 rounded-input border border-brand-border bg-white text-brand-brown appearance-none focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full min-h-[120px] p-5 rounded-input border border-brand-border bg-white text-brand-brown placeholder:text-brand-gray/50 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all resize-none",
        className
      )}
      {...props}
    />
  )
);

export const Button = ({
  className,
  variant = "primary",
  children,
  ...props
}: {
  variant?: "primary" | "secondary" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const variants = {
    primary: "bg-brand-orange text-white hover:bg-brand-orange-mid shadow-md shadow-brand-orange/20",
    secondary: "bg-brand-brown text-white hover:bg-black shadow-md shadow-brand-brown/10",
    outline: "bg-transparent border-2 border-brand-orange text-brand-orange hover:bg-brand-orange/5",
  };

  return (
    <button
      className={cn(
        "h-[56px] px-8 rounded-button font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
