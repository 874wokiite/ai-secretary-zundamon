import React from "react";

import { cn } from "@/utils/shadcn";

export interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Message = ({ className, children, ...props }: MessageProps) => {
  return (
    <div
      className={cn(
        "bg-zunda-secondary relative w-[340px] text-wrap p-[10px] text-zunda-body text-zunda-white",
        className,
      )}
      {...props}
    >
      <div className="bg-zunda-secondary absolute -bottom-[8px] left-1/2 z-20 size-[16px] -translate-x-1/2 rotate-45" />
      {children}
    </div>
  );
};
