import React, { useEffect } from "react";
import { MdOutlineWavingHand } from "react-icons/md";

import { Button } from "@/components/Button";
import { Message } from "@/components/Message";
import { ZundamonImage } from "@/components/ZundamonImage";
import { useGetPhrases } from "@/features/Setting/hooks/useGetPhrases";
import { useSetScheduleReminder } from "@/features/Setting/hooks/useSetScheduleReminder";
import { useZundamonSound } from "@/hooks/useZundamonSound";
import type { Schedule } from "@/types/Schedule";

import { useSetPhraseReminder } from "../hooks/useSetPhraseReminder";

type Step3Props = {
  schedules: Schedule[];
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Step3 = ({ schedules, setIsVisible }: Step3Props) => {
  // FIXME: フレーズ関連の処理の方がはるかに時間がかかるため、isLoadingの名前被りを避けれるようにこのような書き方をしている
  useSetScheduleReminder(schedules);

  const { phrases } = useGetPhrases(schedules);
  const { isLoading } = useSetPhraseReminder(phrases);
  const { play: playCheer } = useZundamonSound("cheer");

  useEffect(() => {
    if (!isLoading) {
      playCheer();
    }
  }, [isLoading]);

  return (
    <div className="flex h-full w-full flex-row justify-between p-[24px]">
      <div className="flex w-[392px] flex-col items-center justify-center gap-[40px]">
        <Button
          onClick={() => {
            if (!isLoading) {
              setIsVisible(false);
            }
          }}
        >
          <MdOutlineWavingHand className="size-[18px]" />
          今日もよろしくね！ずんだもん！
        </Button>
      </div>
      <div className="relative h-full w-[340px]">
        <div className="absolute -bottom-[184px]">
          <Message>
            {isLoading
              ? "リマインダーをセットするのだ..."
              : "リマインダーのセットが完了したのだ!!"}
          </Message>
          <ZundamonImage
            variant={isLoading ? "think" : "greet"}
            className="w-[340px]"
          />
        </div>
      </div>
    </div>
  );
};
