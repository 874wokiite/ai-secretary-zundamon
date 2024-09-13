import { useEffect, useState } from "react";

type FetchState<T> = {
  data: T | undefined;
  loading: boolean;
  error: any | undefined;
};

export const useFetch = <T,>(asyncFn: () => Promise<T>) => {
  const [state, setState] = useState<FetchState<T>>({
    data: undefined,
    loading: false,
    error: undefined,
  });

  useEffect(() => {
    void (async () => {
      setState({ data: undefined, loading: true, error: undefined });

      try {
        const result = await asyncFn();
        setState({ data: result, loading: false, error: undefined });
      } catch (error: any) {
        setState({ data: undefined, loading: false, error: error });
      }
    })();
  }, [asyncFn]);

  return state;
};
