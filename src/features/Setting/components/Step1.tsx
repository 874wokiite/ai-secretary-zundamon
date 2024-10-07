import LogoImage from "data-base64:@/assets/images/logo.png";
import React, { useEffect } from "react";
import { MdLightMode } from "react-icons/md";

import { Button } from "@/components/Button";
import { Message } from "@/components/Message";
import { ZundamonImage } from "@/components/ZundamonImage";
import type { Step } from "@/features/Setting/types/Step";
import { useZundamonSound } from "@/hooks/useZundamonSound";

type Step1Props = {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
};

export const Step1 = ({ setStep }: Step1Props) => {
  const { play: playGreet } = useZundamonSound("greet");

  useEffect(() => {
    playGreet();
  }, []);

  return (
    <div className="flex h-full w-full flex-row justify-between p-[24px]">
      <div className="flex h-full w-[392px] flex-col items-center justify-center gap-[40px]">
        <img
          className="pointer-events-none w-[320px] select-none object-cover"
          src={LogoImage}
          alt="ロゴ画像"
        />
        <Button onClick={() => setStep(2)}>
          <MdLightMode className="size-[18px]" /> おはよう！
        </Button>
      </div>
      <div className="relative h-full w-[340px]">
        <div className="absolute -bottom-[184px]">
          <Message>おっはよ〜んなのだ！！！</Message>
          <ZundamonImage variant="greet" className="w-[340px]" />
        </div>
      </div>
    </div>
  );
};
