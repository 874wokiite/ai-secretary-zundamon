import React from "react";

interface EntranceButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const EntranceButton = ({ ...props }: EntranceButtonProps) => {
  return (
    <button
      className="flex w-[172px] flex-col items-center justify-center gap-[16px] rounded-[6px] border-[2px] border-zunda-black bg-zunda-primary px-[8px] py-[24px] text-zunda-body font-bold text-zunda-black shadow-[0_4px_0_0_black] transition-all ease-in-out hover:translate-y-[3px] hover:shadow-[0_1px_0_0_black]"
      {...props}
    />
  );
};
