import { useCallback, useEffect, useRef } from "react";

type ZundamonSoundVariant = "greet";

const soundMap: Record<ZundamonSoundVariant, string> = {
  greet: "assets/sounds/zundamon/greet.wav",
};

export const useZundamonSound = (variant: ZundamonSoundVariant) => {
  const soundRef = useRef<HTMLAudioElement | undefined>(undefined);

  useEffect(() => {
    soundRef.current = new Audio(chrome.runtime.getURL(soundMap[variant]));
  }, [variant]);

  const play = useCallback(() => {
    void soundRef.current.play();
  }, [variant]);

  return { play };
};
