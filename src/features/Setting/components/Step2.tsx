import { format } from "date-fns";
import React from "react";
import { MdAutorenew } from "react-icons/md";
import { MdWork } from "react-icons/md";
import { MdEditCalendar } from "react-icons/md";

import { Button } from "@/components/Button";
import { Message } from "@/components/Message";
import { ZundamonImage } from "@/components/ZundamonImage";
import { useGetSchedules } from "@/features/Setting/hooks/useGetSchedules";
import type { Step } from "@/features/Setting/types/Step";
import type { Schedule } from "@/types/Schedule";

const ScheduleRow = ({ schedule }: { schedule: Schedule }) => {
  return (
    <div className="flex w-[360px] flex-row items-center gap-[12px]">
      <div className="flex w-[80px] flex-row justify-end gap-[4px] text-zunda-caption text-zunda-gray">
        <p>{format(schedule.start, "H:mm")}</p>
        <p>-</p>
        <p>{format(schedule.end, "H:mm")}</p>
      </div>
      <div className="w-[full] text-zunda-body">{schedule.name}</div>
    </div>
  );
};

type Step2Props = {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  setSchedules: React.Dispatch<React.SetStateAction<Schedule[]>>;
};

export const Step2 = ({ setStep, setSchedules }: Step2Props) => {
  const { data: schedules, isLoading } = useGetSchedules();

  return (
    <div className="flex h-full w-full flex-row justify-between p-[24px]">
      <div className="flex flex-col items-center gap-[40px]">
        <div className="flex h-[360px] w-[392px] flex-col border border-zunda-black">
          <div className="bg-zunda-secondary-pale flex h-[48px] items-center justify-between border-b border-zunda-black pl-[16px]">
            <div className="flex flex-row items-center gap-[12px]">
              <h2 className="text-zunda-body font-bold">今日の予定</h2>
              <Button variant="secondary" size="small">
                <MdAutorenew className="size-[14px]" /> 再取得
              </Button>
            </div>
            <Button variant="text" size="small" asChild>
              <a href="https://calendar.google.com/calendar" target="_blank">
                カレンダー編集 <MdEditCalendar className="size-[14px]" />
              </a>
            </Button>
          </div>
          <div className="flex h-full w-full flex-col items-center gap-[24px] p-[16px]">
            {schedules &&
              schedules.map((schedule: Schedule) => (
                <ScheduleRow key={schedule.id} schedule={schedule} />
              ))}
          </div>
        </div>
        <Button
          onClick={() => {
            setSchedules(schedules);
            setStep(3);
          }}
        >
          <MdWork className="size-[18px]" /> 業務開始！
        </Button>
      </div>
      <div className="relative h-full w-[340px]">
        <div className="absolute -bottom-[184px]">
          <Message>
            {isLoading
              ? "今日の予定を取得してくるのだ..."
              : "今日の予定はコレなのだ!!"}
          </Message>
          <ZundamonImage
            variant={isLoading ? "think" : "order"}
            className="w-[340px]"
          />
        </div>
      </div>
    </div>
  );
};
