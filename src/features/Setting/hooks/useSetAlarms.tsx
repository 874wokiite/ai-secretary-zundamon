import { sendToBackground } from "@plasmohq/messaging";
import { useEffect, useState } from "react";

import type { Schedule } from "@/types/Schedule";

type SetAlarmsState = {
  isLoading: boolean;
  error: any | undefined;
};

export const useSetAlarms = (schedules: Schedule[]) => {
  const [state, setState] = useState<SetAlarmsState>({
    isLoading: true,
    error: undefined,
  });

  useEffect(() => {
    (async () => {
      try {
        if (schedules) {
          await sendToBackground<Schedule[], void>({
            name: "setAlarms",
            body: schedules,
          });

          setState({
            isLoading: false,
            error: undefined,
          });
        }
      } catch (error: any) {
        setState({
          isLoading: false,
          error: error,
        });
      }
    })();
  }, [schedules]);

  return state;
};
