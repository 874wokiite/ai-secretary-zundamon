import { Storage as ChromeStorage } from "@plasmohq/storage";
import { animated, useTransition } from "@react-spring/web";
import { easings } from "@react-spring/web";
import { useEffect, useState } from "react";

import { Message } from "@/components/Message";
import { ZundamonImage } from "@/components/ZundamonImage";
import { useZundamonSound } from "@/hooks/useZundamonSound";
import type { PhraseMap } from "@/types/Phrase";
import type { ScheduleMap } from "@/types/Schedule";
import type { ZundamonMessage } from "@/types/ZundamonMessage";

export const Toast = () => {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [playSound, setPlaySound] = useState<(() => void) | undefined>(
    undefined,
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const { play: playNotify } = useZundamonSound("notify");
  const { play: playOtukare } = useZundamonSound("otukare");

  // アニメーションの設定
  const transitions = useTransition(message, {
    from: { y: 400 },
    enter: { y: 0 },
    leave: { y: 400 },
    config: {
      duration: 1200,
      easing: easings.easeInOutCubic,
    },
    onStart: () => setIsAnimating(true),
    onRest: () => {
      if (message && playSound) {
        playSound();
      }
      setIsAnimating(false);
    },
  });

  useEffect(() => {
    // BSWからREMIND系アクションを受け取った時に、Chromeストレージからメッセージを取得する
    chrome.runtime.onMessage.addListener(
      (message: ZundamonMessage, _, sendResponse) => {
        if (message.action === "SCHEDULE_REMIND") {
          const storage = new ChromeStorage();
          void storage.get<ScheduleMap>("scheduleMap").then((scheduleMap) => {
            if (scheduleMap && message.id) {
              const schedule = scheduleMap[message.id];
              setMessage(`「${schedule.name}」がもうすぐ始まるのだ!!`);
              setPlaySound(playNotify);
            }
          });
        }
        if (message.action === "PHRASE_REMIND") {
          const storage = new ChromeStorage();
          void storage.get<PhraseMap>("phraseMap").then((phraseMap) => {
            if (phraseMap && message.id) {
              const phrase = phraseMap[message.id];
              setMessage(phrase.comment);
              setPlaySound(playOtukare);
            }
          });
        }
        sendResponse();
      },
    );
  }, []);

  useEffect(() => {
    if (message) {
      // 通知されてから10秒後に消えるようにタイマーをセット
      let timerId = setTimeout(() => {
        setMessage(undefined);
      }, 10000);

      return () => clearTimeout(timerId);
    }
  }, [message]);

  return transitions(
    (style, message) =>
      message && (
        <animated.div className="relative h-[600px] w-[340px]" style={style}>
          {!isAnimating && (
            <Message className="absolute -top-[32px] left-1/2 -translate-x-1/2 -translate-y-1/2">
              {message}
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
