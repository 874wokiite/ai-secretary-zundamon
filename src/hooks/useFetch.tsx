import { useEffect, useState } from "react";

type FetchState<T> = {
  data: T | undefined;
  isLoading: boolean;
  error: any | undefined;
};

export const useFetch = <T,>(asyncFn: () => Promise<T>) => {
  const [state, setState] = useState<FetchState<T>>({
    data: undefined,
    isLoading: undefined,
    error: undefined,
  });

  useEffect(() => {
    (async () => {
      setState({ data: undefined, isLoading: true, error: undefined });

      try {
        const result = await asyncFn();
        setState({ data: result, isLoading: false, error: undefined });
      } catch (error: any) {
        setState({ data: undefined, isLoading: false, error: error });
      }
    })();
  }, [asyncFn]);

  return state;
};
