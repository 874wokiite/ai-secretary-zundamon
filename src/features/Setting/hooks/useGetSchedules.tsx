import { sendToBackground } from "@plasmohq/messaging";
import { useCallback } from "react";

import { useFetch } from "@/hooks/useFetch";
import type { Schedule } from "@/types/Schedule";

export const useGetSchedules = () => {
  const asyncFn = useCallback(
    async () =>
      await sendToBackground<void, Schedule[]>({
        name: "getSchedules",
      }),
    [],
  );

  return useFetch<Schedule[]>(asyncFn);
};
