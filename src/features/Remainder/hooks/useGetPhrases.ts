import { sendToBackground } from "@plasmohq/messaging";
import { useEffect, useState } from "react";

import type { Phrase } from "@/types/Phrase";
import type { Schedule } from "@/types/Schedule";

type UpdateSchedulesState = {
  phrases: Phrase[] | undefined;
  isLoading: boolean;
  error: any | undefined;
};

export const useGetPhrases = (schedules: Schedule[]) => {
  const [state, setState] = useState<UpdateSchedulesState>({
    phrases: undefined,
    isLoading: true,
    error: undefined,
  });

  const fetch = async () => {
    try {
      setState({
        phrases: undefined,
        isLoading: true,
        error: undefined,
      });

      const phrases = await sendToBackground<Schedule[], Phrase[]>({
        name: "getPhrases",
        body: schedules,
      });

      setState({
        phrases: phrases,
        isLoading: false,
        error: undefined,
      });
    } catch (error: any) {
      setState({
        phrases: undefined,
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
