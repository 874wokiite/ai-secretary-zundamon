import { cn } from "@/lib/utils";
import React from "react";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={cn("bg-none p-2 rounded-lg hover:bg-slate-100", className)}
        ref={ref}
        {...props}
      />
    );
  },
);
