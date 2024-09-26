import { sendToBackground } from "@plasmohq/messaging";
import { useCallback } from "react";

import { useFetch } from "@/hooks/useFetch";

export const useSetAlarms = () => {
  const asyncFn = useCallback(
    async () =>
      await sendToBackground<void, void>({
        name: "setAlarms",
      }),
    [],
  );

  return useFetch<void>(asyncFn);
};
