import { sendToBackground } from "@plasmohq/messaging";
import { useEffect, useState } from "react";

import type { Schedule } from "@/types/Schedule";
import type { Summary } from "@/types/Summary";

type GetSummaryState = {
  summary: Summary | undefined;
  isLoading: boolean;
  error: any | undefined;
};

export const useGetSummary = (schedules: Schedule[] | undefined) => {
  const [state, setState] = useState<GetSummaryState>({
    summary: undefined,
    isLoading: true,
    error: undefined,
  });

  const fetch = async () => {
    try {
      setState({
        summary: undefined,
        isLoading: true,
        error: undefined,
      });

      if (schedules) {
        const summary = await sendToBackground<Schedule[], Summary>({
          name: "getSummary",
          body: schedules,
        });

        setState({
          summary: summary,
          isLoading: false,
          error: undefined,
        });
      }
    } catch (error: any) {
      setState({
        summary: undefined,
        isLoading: false,
        error: error,
      });
    }
  };

  useEffect(() => {
    fetch();
  }, [schedules]);

  return { ...state, refetch: fetch };
};
