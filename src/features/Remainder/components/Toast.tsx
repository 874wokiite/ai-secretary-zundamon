import { Storage as ChromeStorage } from "@plasmohq/storage";
import { useEffect, useState } from "react";

import { Message } from "@/components/Message";
import { ZundamonImage } from "@/components/ZundamonImage";
import type { Schedule, ScheduleMap } from "@/types/Schedule";
import type { ZundaMessage } from "@/types/ZundaMessage";

export const Toast = () => {
  const [schedule, setSchedule] = useState<Schedule | Schedule>(undefined);

  useEffect(() => {
    // BSWから"REMIND"アクションを受け取った時に、Chromeストレージからスケジュールを取得する
    chrome.runtime.onMessage.addListener(
      (message: ZundaMessage, _, sendResponse) => {
        if (message.action === "REMIND" && message.id) {
          const storage = new ChromeStorage();
          void storage
            .get<ScheduleMap>("scheduleMap")
            .then((scheduleMap) => setSchedule(scheduleMap[message.id]));
        }
        sendResponse();
      },
    );
  }, []);

  useEffect(() => {
    if (schedule) {
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
