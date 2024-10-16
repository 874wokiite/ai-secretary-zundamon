import LogoImage from "data-base64:@/assets/images/logo.png";
import React, { useEffect } from "react";
import { MdLightMode } from "react-icons/md";

import { Button } from "@/components/Button";
import { Message } from "@/components/Message";
import { ZundamonImage } from "@/components/ZundamonImage";
import { useZundamonSound } from "@/hooks/useZundamonSound";
import type { Feature } from "@/types/Feature";

type TitleProps = {
  setFeature: React.Dispatch<React.SetStateAction<Feature>>;
};

export const Title = ({ setFeature }: TitleProps) => {
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
        <Button onClick={() => setFeature("SETTING")}>
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
