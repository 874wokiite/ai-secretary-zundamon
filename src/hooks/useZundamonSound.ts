import { useCallback, useEffect, useRef } from "react";

type ZundamonSoundVariant =
  | "check"
  | "cheer"
  | "greet"
  | "notify"
  | "otukare"
  | "talk";

const soundMap: Record<ZundamonSoundVariant, string> = {
  check: "assets/sounds/zundamon/check.wav",
  cheer: "assets/sounds/zundamon/cheer.wav",
  greet: "assets/sounds/zundamon/greet.wav",
  notify: "assets/sounds/zundamon/notify.wav",
  otukare: "assets/sounds/zundamon/otukare.wav",
  talk: "assets/sounds/zundamon/talk.wav",
};

export const useZundamonSound = (variant: ZundamonSoundVariant) => {
  const soundRef = useRef<HTMLAudioElement | undefined>(undefined);

  useEffect(() => {
    soundRef.current = new Audio(chrome.runtime.getURL(soundMap[variant]));
  }, [variant]);

  const play = useCallback(() => {
    if (soundRef.current) {
      void soundRef.current.play();
    }
  }, [variant]);

  return { play };
};
