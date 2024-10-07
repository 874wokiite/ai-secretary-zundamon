import { Storage as ChromeStorage } from "@plasmohq/storage";
import { useEffect, useState } from "react";

import { Message } from "@/components/Message";
import { ZundamonImage } from "@/components/ZundamonImage";
import { useZundamonSound } from "@/hooks/useZundamonSound";
import type { Schedule, ScheduleMap } from "@/types/Schedule";
import type { ZundamonMessage } from "@/types/ZundamonMessage";

export const Toast = () => {
  const [schedule, setSchedule] = useState<Schedule | undefined>(undefined);
  const { play: playNotify } = useZundamonSound("notify");

  useEffect(() => {
    // BSWから"REMIND"アクションを受け取った時に、Chromeストレージからスケジュールを取得する
    chrome.runtime.onMessage.addListener(
      (message: ZundamonMessage, _, sendResponse) => {
        if (message.action === "REMIND") {
          const storage = new ChromeStorage();
          void storage.get<ScheduleMap>("scheduleMap").then((scheduleMap) => {
            if (scheduleMap && message.id) {
              setSchedule(scheduleMap[message.id]);
            }
          });
        }
        sendResponse();
      },
    );
  }, []);

  useEffect(() => {
    if (schedule) {
      // 通知が来たとき用のずんだもんの音声を再生する
      playNotify();

      // 通知されてから5秒後に消えるようにタイマーをセット
      let timerId = setTimeout(() => {
        setSchedule(undefined);
      }, 5000);

      return () => clearTimeout(timerId);
    }
  }, [schedule]);

  return (
    schedule && (
      <div className="flex h-[640px] w-[340px] flex-col">
        <Message>{`「${schedule.name}」がもうすぐ始まるのだ!!`}</Message>
        <ZundamonImage variant="greet" className="w-[340px]" />
      </div>
    )
  );
};
