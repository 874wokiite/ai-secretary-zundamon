import { sendToBackground } from "@plasmohq/messaging";
import { useEffect, useState } from "react";

import type { Message } from "@/features/Chat/types/Message";

type GetMessageState = {
  message: Message | undefined;
  isLoading: boolean;
  error: any | undefined;
};

export const useGetMessage = (messages: Message[]) => {
  const [state, setState] = useState<GetMessageState>({
    message: undefined,
    isLoading: false,
    error: undefined,
  });

  const fetch = async () => {
    try {
      if (
        messages.length !== 0 &&
        messages[messages.length - 1].role === "user"
      ) {
        setState({
          message: undefined,
          isLoading: true,
          error: undefined,
        });

        const message = await sendToBackground<Message[], Message>({
          name: "getMessage",
          body: messages,
        });

        setState({
          message: message,
          isLoading: false,
          error: undefined,
        });
      }
    } catch (error: any) {
      setState({
        message: undefined,
        isLoading: false,
        error: error,
      });
    }
  };

  // メッセージ配列の最後の要素がユーザのメッセージである場合のみ、再度fetchする
  useEffect(() => {
    fetch();
  }, [messages]);

  return { ...state, refetch: fetch };
};
