import React from "react";

import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={cn(
          "rounded-lg bg-lime-500 px-4 py-2 text-lg text-white hover:bg-lime-600",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
