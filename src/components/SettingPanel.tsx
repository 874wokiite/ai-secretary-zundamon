import { Button } from "@/components/Button";
import { IconButton } from "@/components/IconButton";
import { ZundamonImage } from "@/components/ZundamonImage";
import { Cross1Icon } from "@radix-ui/react-icons";

export const SettingPanel = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="rounded-xl bg-white shadow-xl w-[960px] h-[540px] flex justify-center items-center p-10">
      <div className="relative w-full h-full grid grid-cols-2">
        <div className="flex justify-center items-center">
          <div className="flex items-center justify-center gap-6 flex-col">
            <h1 className="text-[32px]">AI Secretary Zundamon</h1>
            <Button onClick={() => console.log("押された!!")}>
              業務を開始する!!
            </Button>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div className="absolute -bottom-[160px]">
            <ZundamonImage variant="greet" />
          </div>
        </div>
        <div className="absolute top-0 right-0">
          <IconButton onClick={onClose}>
            <Cross1Icon className="h-6 w-6" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
