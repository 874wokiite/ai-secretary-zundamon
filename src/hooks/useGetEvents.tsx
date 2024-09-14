import { sendToBackground } from "@plasmohq/messaging";
import { useCallback } from "react";

import { useFetch } from "@/hooks/useFetch";
import type { EventType } from "@/types/EventType";

export const useGetEvents = () => {
  const asyncFn = useCallback(
    async () =>
      await sendToBackground<void, EventType[]>({
        name: "getEvents",
      }),
    [],
  );

  return useFetch<EventType[]>(asyncFn);
};
