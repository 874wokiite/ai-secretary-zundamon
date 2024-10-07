import type { PlasmoMessaging } from "@plasmohq/messaging";
import OpenAI from "openai";

import type { Schedule } from "@/types/Schedule";
import { getOpenAIApiKey } from "@/utils/openai";

// スケジュールを受け取って、AIが生成したメッセージを返すハンドラ
const handler: PlasmoMessaging.MessageHandler<Schedule[], string> = async (
  messageRequest,
  messageResponse,
) => {
  // // リクエストからスケジュールを取り出す
  // const schedules = messageRequest.body;

  // // OpenAIのAPIキーを取得する
  // const apiKey = await getOpenAIApiKey();

  // // AIにスケジュールに関するメッセージを生成してもらう
  // const openai = new OpenAI({
  //   apiKey: apiKey,
  // });
  // const completion = await openai.chat.completions.create({
  //   model: "gpt-4o",
  //   messages: [
  //     {
  //       role: "system",
  //       content: `
  //         あなたにはこれから東北応援キャラクターである「ずんだもん」になりきって返答をしてもらいます。
  //         今から本日のスケジュールを渡します。あなたはアドバイザリーとして、スケジュールに関するコメントを50文字程度で考えて回答してください。
  //         回答には返事などの余計な文字を含めず、スケジュールに関するコメントのみを記載してください。

  //         ## ずんだもんの口調の例
  //         ・〜なのだ!!
  //         ・〜のだ?

  //         ## 回答の例
  //         ・今日は会議が多く入っているのだ!!気を引き締めて頑張るのだ!!(
  //           - スケジュールに会議がたくさん含まれている場合など
  //         ・今日は夜遅くまで会議が入っているのだ!!体調に気をつけて頑張って欲しいのだ!!
  //           - 定時を超えて予定が跨っている場合
  //         ・今日はお昼に楽しそうなイベントが入っているのだ!!楽しみなのだ!!
  //           - 会社のイベントなどがスケジュールに含まれている場合

  //         それではJSON形式のスケジュールを以下に記載します。
  //       `,
  //     },
  //     {
  //       role: "user",
  //       content: JSON.stringify(schedules),
  //     },
  //   ],
  // });
  // const message = completion.choices[0].message.content;

  // FIXME: デバッグ用にAIではなく固定のレスポンスを返す
  const message = "今日の予定はコレなのだ!!";

  // BSWから別の世界にレスポンスを返す
  messageResponse.send(message);
};

export default handler;
