import { sendToBackground } from "@plasmohq/messaging";
import { useCallback } from "react";

import { useFetch } from "@/hooks/useFetch";
import type { Schedule } from "@/types/Schedule";

export const useSetAlarms = (schedules: Schedule[]) => {
  const asyncFn = useCallback(
    async () =>
      await sendToBackground<Schedule[], void>({
        name: "setAlarms",
        body: schedules,
      }),
    [],
  );

  return useFetch<void>(asyncFn);
};
