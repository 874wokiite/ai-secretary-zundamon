import React from "react";

import { Button } from "@/components/Button";
import { useSetAlarms } from "@/features/Setting/hooks/useSetAlarms";
import type { Schedule } from "@/types/Schedule";

type Step3Props = {
  schedules: Schedule[];
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Step3 = ({ schedules, setIsVisible }: Step3Props) => {
  const { isLoading } = useSetAlarms(schedules);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-zunda-t2">
          {isLoading
            ? "リマインダーをセットしています..."
            : "リマインダーのセットが完了しました!!"}
        </h1>
        <Button onClick={() => setIsVisible(false)}>閉じる</Button>
      </div>
    </div>
  );
};
