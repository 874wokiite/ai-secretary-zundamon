import { sendToBackground } from "@plasmohq/messaging";
import { useEffect, useState } from "react";

import type { Schedule } from "@/types/Schedule";

type GetSchedulesState = {
  schedules: Schedule[] | undefined;
  isLoading: boolean;
  error: any | undefined;
};

export const useGetSchedules = () => {
  const [state, setState] = useState<GetSchedulesState>({
    schedules: undefined,
    isLoading: true,
    error: undefined,
  });

  const fetch = async () => {
    try {
      setState({
        schedules: undefined,
        isLoading: true,
        error: undefined,
      });

      const schedules = await sendToBackground<void, Schedule[]>({
        name: "getSchedules",
      });

      setState({
        schedules: schedules,
        isLoading: false,
        error: undefined,
      });
    } catch (error: any) {
      setState({
        schedules: undefined,
        isLoading: false,
        error: error,
      });
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { ...state, refetch: fetch };
};
