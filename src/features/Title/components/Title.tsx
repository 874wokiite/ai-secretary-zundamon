import LogoImage from "data-base64:@/assets/images/logo.png";
import React, { useEffect } from "react";
import { MdCalendarToday, MdChat } from "react-icons/md";

import { Message } from "@/components/Message";
import { ZundamonImage } from "@/components/ZundamonImage";
import { EntranceButton } from "@/features/Title/components/EntranceButton";
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
      <div className="flex h-full w-[390px] flex-col items-center justify-center gap-[40px]">
        <img
          className="pointer-events-none w-[320px] select-none object-cover"
          src={LogoImage}
          alt="ロゴ画像"
        />
        <div className="flex w-full flex-row justify-center gap-[12px]">
          <EntranceButton onClick={() => setFeature("SETTING")}>
            <MdCalendarToday className="size-[44px]" />
            リマインドして！
          </EntranceButton>
          <EntranceButton onClick={() => setFeature("CHAT")}>
            <MdChat className="size-[44px]" />
            お話しよう！
          </EntranceButton>
        </div>
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
