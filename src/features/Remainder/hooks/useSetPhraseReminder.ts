import { sendToBackground } from "@plasmohq/messaging";
import { useEffect, useState } from "react";

import type { Phrase } from "@/types/Phrase";

type SetPhraseReminderState = {
  isLoading: boolean;
  error: any | undefined;
};

export const useSetPhraseReminder = (phrases: Phrase[] | undefined) => {
  const [state, setState] = useState<SetPhraseReminderState>({
    isLoading: true,
    error: undefined,
  });

  const fetch = async () => {
    try {
      if (phrases) {
        setState({
          isLoading: true,
          error: undefined,
        });

        await sendToBackground<Phrase[], void>({
          name: "setPhraseReminder",
          body: phrases,
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
  };

  useEffect(() => {
    fetch();
  }, [phrases]);

  return { ...state, refetch: fetch };
};
