import { Storage as ChromeStorage } from "@plasmohq/storage";

import { Button } from "@/components/Button";
import { ZundamonImage } from "@/components/ZundamonImage";
import { useGetEvents } from "@/hooks/useGetEvents";
import type { ScreenProps } from "@/types/ScreenType";

export const CheckEventsScreen = ({ setScreen }: ScreenProps) => {
  const { data: events, isLoading } = useGetEvents();

  const onClick = () => {
    const storage = new ChromeStorage();
    storage.set("events", events);

    setScreen("COMPLETION_NOTICE");
  };

  // TODO: なんか見にくいコードになっているのでデザインガチった後に修正する
  return (
    <div className="grid h-full w-full grid-cols-2">
      <div className="flex items-center justify-center">
        {isLoading === undefined || isLoading ? (
          <p className="text-xl">Google Calenderのイベント取得中...</p>
        ) : (
          <>
            {events ? (
              <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-xl">
                  Google Calenderのイベントが取れたのだ!!
                </p>
                <div className="flex flex-col items-start justify-center gap-2">
                  {events.map((event) => (
                    <p className="text-base">・{event.name}</p>
                  ))}
                </div>
                <Button onClick={onClick}>予定を登録する!!</Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-xl">
                  Google Calenderのイベントが取れなかったのだ!!
                </p>
              </div>
            )}
          </>
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
