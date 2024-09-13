import { sendToBackground } from "@plasmohq/messaging";
import { Cross1Icon } from "@radix-ui/react-icons";

import { Button } from "@/components/Button";
import { IconButton } from "@/components/IconButton";
import { ZundamonImage } from "@/components/ZundamonImage";

export const SettingPanel = ({ onClose }: { onClose: () => void }) => {
  const handleSetAlarms = () => {
    void sendToBackground({
      name: "setAlarms",
    });
  };

  return (
    <div className="flex h-[540px] w-[960px] items-center justify-center rounded-xl bg-white p-8 shadow-xl">
      <div className="relative grid h-full w-full grid-cols-2">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-[32px]">AI Secretary Zundamon</h1>
            <Button onClick={handleSetAlarms}>業務を開始する!!</Button>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div className="absolute -bottom-[160px]">
            <ZundamonImage variant="greet" />
          </div>
        </div>
        <div className="absolute right-0 top-0">
          <IconButton onClick={onClose}>
            <Cross1Icon className="h-6 w-6" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
