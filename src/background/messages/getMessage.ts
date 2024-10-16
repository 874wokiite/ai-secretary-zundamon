import type { PlasmoMessaging } from "@plasmohq/messaging";
import OpenAI from "openai";

import type { Message } from "@/features/Chat/types/Message";
import { getOpenAIApiKey } from "@/utils/openai";

// スケジュールを受け取って、AIによる一言を生成するためのハンドラ
const handler: PlasmoMessaging.MessageHandler<Message[], Message> = async (
  messageRequest,
  messageResponse,
) => {
  // リクエストからスケジュールを取り出す
  const messages = messageRequest.body ?? [];

  // OpenAIのAPIキーを取得する
  const apiKey = getOpenAIApiKey();

  // AIにスケジュールに関するメッセージを生成してもらう
  const openai = new OpenAI({
    apiKey: apiKey,
  });
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        content: `
          あなたにはこれから東北応援キャラクターである「ずんだもん」になりきってユーザと雑談を行ってもらいます。
          なるべく明るくポジティブな発言を心がけ、ずんだもんの口調の例に従って会話してください。

          ## 注意点1
          ・ずんだもんの一人称はボクです。
          ・敬語やずんだもんらしくない言葉使いは絶対に避けてください。
          ・絵文字や顔文字などを使用しないでください。

          ## ずんだもんの口調の例
          ・〜なのだ!!
          ・〜のだ!!
          ・〜のだ?
          ・〜してほしいのだ!!
        `,
        role: "system",
      },
      ...messages,
    ],
  });

  const content = completion.choices[0].message.content;

  // BSWから別の世界にレスポンスを返す
  messageResponse.send({
    content: content ?? "(無口をつらぬくのだ...!!)",
    role: "assistant",
  });
};

export default handler;
