import { Button } from "@/components/Button";
import { ZundamonImage } from "@/components/ZundamonImage";
import type { ScreenProps } from "@/types/ScreenType";

export const TitleScreen = ({ setScreen }: ScreenProps) => {
  return (
    <div className="grid h-full w-full grid-cols-2">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-[32px]">AI Secretary Zundamon</h1>
          <Button onClick={() => setScreen("CHECK_EVENTS")}>
            業務を開始する!!
          </Button>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div className="absolute -bottom-[160px]">
          <ZundamonImage variant="greet" />
        </div>
      </div>
    </div>
  );
};
