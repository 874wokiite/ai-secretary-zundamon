import type { ReactNode } from "react";
import { MdClose } from "react-icons/md";

type PopupProps = {
  children: ReactNode;
  onClose: () => void;
};

export const Popup = ({ children, onClose }: PopupProps) => {
  return (
    <div className="flex h-[600px] w-[800px] flex-col overflow-hidden rounded-[8px] border-[2px] border-zunda-black bg-zunda-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <div className="flex w-full flex-row items-center justify-end border-b-[2px] border-b-zunda-black bg-zunda-secondary p-[8px] text-zunda-black">
        <div
          className="cursor-pointer rounded-[4px] border-[2px] border-zunda-black bg-zunda-white p-[4px]"
          onClick={onClose}
        >
          <MdClose className="size-[22px]" />
        </div>
      </div>
      <div className="h-full w-full">{children}</div>
    </div>
  );
};
