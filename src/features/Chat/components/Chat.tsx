import React, { useEffect } from "react";
import { MdOutlineWavingHand } from "react-icons/md";

import { Button } from "@/components/Button";
import { ZundamonImage } from "@/components/ZundamonImage";
import { useZundamonSound } from "@/hooks/useZundamonSound";

type ChatProps = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Chat = ({ setIsVisible }: ChatProps) => {
  // FIXME: 「ずんだもんとお喋りするのだ!!」みたいな音声に後で変えておく
  const { play: playCheck } = useZundamonSound("check");

  useEffect(() => {
    playCheck();
  }, []);

  return (
    <div className="flex h-full w-full flex-row justify-between p-[24px]">
      <div className="flex flex-col items-center gap-[40px]">
        <div className="flex h-[360px] w-[392px] flex-col border border-zunda-black">
          <div className="flex h-[48px] items-center justify-between border-b border-zunda-black bg-zunda-secondary-pale pl-[16px]">
            <h2 className="text-zunda-body font-bold">
              ずんだもんとお話しよう
            </h2>
          </div>
          <div className="flex h-full w-full flex-col items-center gap-[24px] overflow-x-hidden overflow-y-scroll p-[16px]">
            Chat建設予定地
          </div>
        </div>
      </div>
      <div className="relative h-full w-[340px]">
        <Button variant="secondary" onClick={() => setIsVisible(false)}>
          <MdOutlineWavingHand className="size-[18px]" />
          ずんだもんとのお話をやめる!!
        </Button>
        <div className="absolute -bottom-[184px]">
          <ZundamonImage variant="default" className="w-[340px]" />
        </div>
      </div>
    </div>
  );
};
