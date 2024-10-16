import React from "react";

interface EntranceButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const EntranceButton = ({ ...props }: EntranceButtonProps) => {
  return (
    <button
      className="flex w-full flex-col items-center justify-center gap-[16px] rounded-[4px] border-[2px] border-zunda-black bg-zunda-primary px-[8px] py-[24px] text-zunda-body font-bold"
      {...props}
    />
  );
};
