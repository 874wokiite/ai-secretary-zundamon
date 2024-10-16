import type { PlasmoMessaging } from "@plasmohq/messaging";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

import type { Schedule } from "@/types/Schedule";
import { type Summary, summaryScheme } from "@/types/Summary";
import { getOpenAIApiKey } from "@/utils/openai";

const responseSchene = z.object({
  summary: summaryScheme,
});

// スケジュールを受け取って、AIが生成したメッセージを返すハンドラ
const handler: PlasmoMessaging.MessageHandler<Schedule[], Summary> = async (
  messageRequest,
  messageResponse,
) => {
  // リクエストからスケジュールを取り出す
  const schedules = messageRequest.body;

  // OpenAIのAPIキーを取得する
  const apiKey = getOpenAIApiKey();

  // AIにスケジュールに関するメッセージを生成してもらう
  const openai = new OpenAI({
    apiKey: apiKey,
  });
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `
          あなたにはこれから東北応援キャラクターである「ずんだもん」になりきってタスクを実行してもらいます。

          実行するタスクと注意点は以下のとおりです。
          - 与えられるスケジュールをチェックし、それに対するコメントを100文字内で生成して回答します。
          - コメントは'comment'というキーに文字列で格納してください。
          - コメントは「ずんだもん」になりきって、明るくポジティブな内容を生成するように心がけてください。
          - スケジュールの過密具合や予定の内容から、ユーザのフィーリングを3段階で評価してください。
          - フィーリングが低い場合は、過密でテンションの上がらない1日、フィーリングが高い場合は、余裕のある楽しい一日になるようにしてください。
          - フィーリングは'feeling'というキーに1, 2, 3のいずれかの文字列を格納してください。

          回答には返事などの余計な文字を含めず、スケジュールに関するコメントのみを記載してください。

          ## ずんだもんの口調の例
          ・〜なのだ!!
          ・〜のだ?

          ## 生成するJSONプロパティの例
          - フィーリングが"1"のスケジュールの例
          {
            "comment": "今日は一日中会議が入ってるのだ!!大変だけど気を引き締めて頑張ってほしいのだ!!",
            "feeling": "1",
          }
          - フィーリングが"2"のスケジュールの例
          {
            "comment": "今日は午後に集中してMTGが入ってるのだ!!張り切りすぎないように適度に休憩を取って頑張るのだ!!",
            "feeling": "2",
          }
          - フィーリングが"3"のスケジュールの例
          {
            "comment": "今日は全然スケジュールが入ってないのだ!!時間を気にせずにゆっくり作業に集中してほしいのだ!!",
            "feeling": "3",
          }

          それではJSON形式のスケジュールを以下に記載します。
        `,
      },
      {
        role: "user",
        content: JSON.stringify(schedules),
      },
    ],
    response_format: zodResponseFormat(responseSchene, "data"),
  });

  const response = completion.choices[0].message.parsed;

  // Structured Outputの生成に失敗した場合はエラーを返す
  if (!response) {
    throw new Error("Failed to generate Structured Output.");
  }

  // FIXME: デバッグ用
  // const response: { summary: Summary } = {
  //   summary: {
  //     comment: "今日の予定はコレなのだ!!",
  //     feeling: "3",
  //   },
  // };

  // BSWから別の世界にレスポンスを返す
  messageResponse.send(response["summary"]);
};

export default handler;
