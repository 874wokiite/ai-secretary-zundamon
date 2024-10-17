import React from "react";

import { cn } from "@/utils/shadcn";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const IconButton = ({ className, ...props }: IconButtonProps) => {
  return (
    <button
      className={cn(
        "flex size-fit items-center justify-center rounded-[4px] border-[2px] border-zunda-black bg-zunda-primary p-[8px] text-zunda-black shadow-[0_2px_0_0_black] transition-all ease-in-out hover:translate-y-[2px] hover:shadow-none disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};
