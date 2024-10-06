import React from "react";
import { MdOutlineWavingHand } from "react-icons/md";

import { Button } from "@/components/Button";
import { Message } from "@/components/Message";
import { ZundamonImage } from "@/components/ZundamonImage";
import { useSetAlarms } from "@/features/Setting/hooks/useSetAlarms";
import type { Schedule } from "@/types/Schedule";

type Step3Props = {
  schedules: Schedule[];
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Step3 = ({ schedules, setIsVisible }: Step3Props) => {
  const { isLoading } = useSetAlarms(schedules);

  return (
    <div className="flex h-full w-full flex-row justify-between p-[24px]">
      <div className="flex w-[392px] flex-col items-center justify-center gap-[40px]">
        <Button onClick={() => setIsVisible(false)}>
          <MdOutlineWavingHand className="size-[18px]" />{" "}
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
          <ZundamonImage variant="greet" className="w-[340px]" />
        </div>
      </div>
    </div>
  );
};
