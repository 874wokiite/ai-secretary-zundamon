import { Storage as ChromeStorage } from "@plasmohq/storage";
import { animated, useTransition } from "@react-spring/web";
import { useEffect, useState } from "react";

import { Message } from "@/components/Message";
import { ZundamonImage } from "@/components/ZundamonImage";
import { useZundamonSound } from "@/hooks/useZundamonSound";
import type { Schedule, ScheduleMap } from "@/types/Schedule";
import type { ZundamonMessage } from "@/types/ZundamonMessage";

export const Toast = () => {
  const [schedule, setSchedule] = useState<Schedule | undefined>(undefined);
  const [isAnimating, setIsAnimating] = useState(false);
  const { play: playNotify } = useZundamonSound("notify");

  // アニメーションの設定
  const transitions = useTransition(schedule, {
    from: { y: 400 },
    enter: { y: 0 },
    leave: { y: 400 },
    config: { duration: 1000 },
    onStart: () => setIsAnimating(true),
    onRest: () => {
      if (schedule) playNotify();
      setIsAnimating(false);
    },
  });

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
    //
    // FIXME: デバッグ用
    // setSchedule({
    //   id: "ほげ",
    //   name: "とすとす超会議",
    //   start: new Date(),
    //   end: new Date(),
    // });
  }, []);

  useEffect(() => {
    if (schedule) {
      // 通知されてから5秒後に消えるようにタイマーをセット
      let timerId = setTimeout(() => {
        setSchedule(undefined);
      }, 7500);

      return () => clearTimeout(timerId);
    }
  }, [schedule]);

  return transitions(
    (style, schedule) =>
      schedule && (
        <animated.div className="relative h-[600px] w-[340px]" style={style}>
          {!isAnimating && (
            <Message className="absolute -top-[32px] left-1/2 -translate-x-1/2">
              {`「${schedule.name}」がもうすぐ始まるのだ!!`}
            </Message>
          )}
          <ZundamonImage
            variant={isAnimating ? "default" : "greet"}
            className="w-[340px]"
          />
        </animated.div>
      ),
  );
};
