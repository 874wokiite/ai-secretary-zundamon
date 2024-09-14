import { ZundamonImage } from "@/components/ZundamonImage";
import { useGetEvents } from "@/hooks/useGetEvents";
import type { ScreenProps } from "@/types/ScreenType";

import { Button } from "../Button";

export const CheckEventsScreen = ({ setScreen }: ScreenProps) => {
  const { data: events, isLoading } = useGetEvents();

  return (
    <div className="grid h-full w-full grid-cols-2">
      <div className="flex items-center justify-center">
        {isLoading === undefined || isLoading ? (
          <p className="text-xl">Google Calenderのイベント取得中...</p>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-xl">Google Calenderのイベントが取れたのだ!!</p>
            <div className="flex flex-col gap-2">
              {events.map((event) => (
                <p className="text-base">・{event.name}</p>
              ))}
            </div>
            <Button onClick={() => setScreen("TITLE")}>仮置き(一旦戻る)</Button>
          </div>
        )}
      </div>
      <div className="relative overflow-hidden">
        <div className="absolute -bottom-[160px]">
          <ZundamonImage variant={isLoading ? "think" : "order"} />
        </div>
      </div>
    </div>
  );
};
