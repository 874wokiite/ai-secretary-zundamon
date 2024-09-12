import { cn } from "@/lib/utils";
import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={cn(
          "text-lg text-white rounded-lg py-2 px-4 bg-lime-500 hover:bg-lime-600",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
