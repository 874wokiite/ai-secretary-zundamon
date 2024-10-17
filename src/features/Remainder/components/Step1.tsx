import { format } from "date-fns";
import React, { useEffect } from "react";
import { MdAutorenew, MdEditCalendar, MdWork } from "react-icons/md";

import { Button } from "@/components/Button";
import { Message } from "@/components/Message";
import {
  ZundamonImage,
  type ZundamonImageVariant,
} from "@/components/ZundamonImage";
import { useGetSchedules } from "@/features/Remainder/hooks/useGetSchedules";
import { useGetSummary } from "@/features/Remainder/hooks/useGetSummary";
import type { Step } from "@/features/Remainder/types/Step";
import { useZundamonSound } from "@/hooks/useZundamonSound";
import type { Schedule } from "@/types/Schedule";

const feelingMap: Record<"1" | "2" | "3", ZundamonImageVariant> = {
  "1": "komari",
  "2": "order",
  "3": "yatta",
};

const ScheduleRow = ({ schedule }: { schedule: Schedule }) => {
  return (
    <div className="flex w-[360px] flex-row items-center gap-[12px]">
      <div className="flex w-[80px] flex-row justify-end gap-[4px] text-zunda-caption text-zunda-gray">
        <p>{format(schedule.start, "H:mm")}</p>
        <p>-</p>
        <p>{format(schedule.end, "H:mm")}</p>
      </div>
      <div className="w-[280px] text-wrap text-zunda-body text-zunda-black">
        {schedule.name}
      </div>
    </div>
  );
};

type Step1Props = {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  setSchedules: React.Dispatch<React.SetStateAction<Schedule[]>>;
};

export const Step1 = ({ setStep, setSchedules }: Step1Props) => {
  const { schedules, refetch } = useGetSchedules();
  const { summary, isLoading } = useGetSummary(schedules);
  const { play: playCheck } = useZundamonSound("check");

  useEffect(() => {
    if (!isLoading) {
      playCheck();
    }
  }, [isLoading]);

  return (
    <div className="flex h-full w-full flex-row justify-between p-[24px]">
      <div className="flex flex-col items-center gap-[40px]">
        <div className="flex h-[360px] w-[392px] flex-col border border-zunda-black">
          <div className="flex h-[48px] items-center justify-between border-b border-zunda-black bg-zunda-secondary-pale pl-[16px]">
            <div className="flex flex-row items-center gap-[12px]">
              <h2 className="text-zunda-body font-bold">今日の予定</h2>
              <Button variant="secondary" size="small" onClick={refetch}>
                <MdAutorenew className="size-[14px]" />
                再取得
              </Button>
            </div>
            <Button variant="text" size="small" asChild>
              <a href="https://calendar.google.com/calendar" target="_blank">
                カレンダー編集 <MdEditCalendar className="size-[14px]" />
              </a>
            </Button>
          </div>
          <div className="flex h-full w-full flex-col items-center gap-[24px] overflow-x-hidden overflow-y-scroll p-[16px]">
            {schedules &&
              schedules.map((schedule: Schedule) => (
                <ScheduleRow key={schedule.id} schedule={schedule} />
              ))}
          </div>
        </div>
        <Button
          onClick={() => {
            if (schedules && !isLoading) {
              setSchedules(schedules);
              setStep(2);
            }
          }}
        >
          <MdWork className="size-[18px]" /> 業務開始！
        </Button>
      </div>
      <div className="relative h-full w-[340px]">
        <div className="absolute -bottom-[184px]">
          <Message>
            {summary ? summary.comment : "今日の予定を取得してくるのだ..."}
          </Message>
          <ZundamonImage
            variant={summary ? feelingMap[summary.feeling] : "think"}
            className="w-[340px]"
          />
        </div>
      </div>
    </div>
  );
};
