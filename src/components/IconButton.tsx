import React from "react";

import { cn } from "@/lib/utils";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={cn("rounded-lg bg-none p-2 hover:bg-slate-100", className)}
        ref={ref}
        {...props}
      />
    );
  },
);
