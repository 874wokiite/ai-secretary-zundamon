import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { MdArrowUpward, MdOutlineWavingHand } from "react-icons/md";

import { Button } from "@/components/Button";
import { IconButton } from "@/components/IconButton";
import { ZundamonImage } from "@/components/ZundamonImage";
import { useGetMessage } from "@/features/Chat/hooks/useGetMessage";
import type { Message } from "@/features/Chat/types/Message";
import { useZundamonSound } from "@/hooks/useZundamonSound";

type ChatProps = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Chat = ({ setIsVisible }: ChatProps) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { message, isLoading } = useGetMessage(messages);
  const { play: playCheck } = useZundamonSound("talk");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim()) {
      setInput("");
      setMessages((messages) => [
        ...messages,
        { role: "user", content: input.trim() },
      ]);
    }
  };

  useEffect(() => {
    playCheck();
  }, []);

  useEffect(() => {
    if (message) {
      setMessages((messages) => [...messages, message]);
    }
  }, [message]);

  return (
    <div className="flex h-full w-full flex-row justify-between p-[24px]">
      <div className="flex flex-col items-center gap-[40px]">
        <div className="flex h-full w-[392px] flex-col border border-zunda-black">
          <div className="flex h-[48px] items-center border-b border-zunda-black bg-zunda-secondary-pale pl-[16px]">
            <h2 className="text-zunda-body font-bold">
              ずんだもんとお話しよう
            </h2>
          </div>
          <div className="flex h-full w-full flex-col items-center justify-between gap-[8px] p-[16px]">
            <div className="flex h-[304px] max-h-[304px] w-full flex-col gap-[24px] overflow-x-hidden overflow-y-scroll">
              {messages.length !== 0 ? (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "h-fit w-full whitespace-pre-wrap text-wrap p-[10px] text-zunda-body text-zunda-black",
                      message.role === "user"
                        ? "bg-zunda-primary-pale text-zunda-black"
                        : "bg-zunda-secondary text-zunda-white",
                    )}
                  >
                    {message.content}
                  </div>
                ))
              ) : (
                <div className="flex h-full w-full flex-col gap-[24px]">
                  <p className="text-zunda-body text-zunda-gray">できること</p>
                  <p className="text-zunda-body text-zunda-gray">
                    ・ずんだもんと雑談 <br />
                    楽しくお話しよう！
                  </p>
                  <p className="whitespace-pre-wrap text-zunda-body text-zunda-gray">
                    ・今開いてるページを要約 <br />
                    「このページ翻訳して」「このページ要約して」っていうとずんだもんが頑張ってくれるよ！
                  </p>
                </div>
              )}
            </div>
            <form
              className="flex h-[96px] w-full flex-row items-end gap-[10px] border border-zunda-gray bg-zunda-white p-[10px]"
              onSubmit={handleSubmit}
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ずんだもんに話しかけてみよう!"
                className="h-full w-full resize-none bg-zunda-white text-zunda-body text-zunda-black placeholder:text-zunda-gray focus:outline-none"
              />
              <IconButton type="submit">
                <MdArrowUpward className="size-[18px]" />
              </IconButton>
            </form>
          </div>
        </div>
      </div>
      <div className="relative flex h-full w-[340px] flex-col items-center">
        <Button
          className="mt-[80px]"
          variant="secondary"
          onClick={() => setIsVisible(false)}
        >
          <MdOutlineWavingHand className="size-[18px]" />
          ずんだもんとのお話をやめる!!
        </Button>
        <div className="absolute -bottom-[184px]">
          <ZundamonImage
            variant={isLoading ? "think" : "order"}
            className="w-[340px]"
          />
        </div>
      </div>
    </div>
  );
};
