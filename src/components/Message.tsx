import React from "react";

import { cn } from "@/lib/utils";

export interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Message = ({ className, children, ...props }: MessageProps) => {
  return (
    <div
      className={cn(
        "relative w-[340px] text-wrap bg-zunda-primary-dark p-[10px] text-zunda-body text-zunda-white",
        className,
      )}
      {...props}
    >
      <div className="absolute -bottom-[8px] left-1/2 z-20 size-[16px] -translate-x-1/2 rotate-45 bg-zunda-primary-dark" />
      {children}
    </div>
  );
};
