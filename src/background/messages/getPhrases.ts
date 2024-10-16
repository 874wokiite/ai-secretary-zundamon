import type { PlasmoMessaging } from "@plasmohq/messaging";
import { format, parseISO } from "date-fns";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

import type { Phrase } from "@/types/Phrase";
import type { Schedule } from "@/types/Schedule";
import { getOpenAIApiKey } from "@/utils/openai";

const responseScheme = z.object({
  phrases: z.array(
    z.object({
      comment: z.string(),
      time: z.string(),
    }),
  ),
});

// スケジュールを受け取って、AIによる一言を生成するためのハンドラ
const handler: PlasmoMessaging.MessageHandler<Schedule[], Phrase[]> = async (
  messageRequest,
  messageResponse,
) => {
  // リクエストからスケジュールを取り出す
  const schedules = messageRequest.body;

  // OpenAIのAPIキーを取得する
  const apiKey = await getOpenAIApiKey();

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
          - あなたは提供されたスケジュールを確認し、ユーザが休憩すべきタイミングに出力するコメントをフレーズとして提供してください。
          - フレーズはコメントの内容であるcommentと出力するタイミングであるtimeで構成されています。
          - スケジュールの合間に挟めるフレーズは最大5つまでです(無理に5つ生成する必要はありません、スケジュールが密集している場合は0個でも構いません)。
          - フレーズを挟むタイミングは、会議と次の会議の間のちょうど半分くらいが望ましいです(9:00 - 18:00に収まるようにしてください)。
          - フレーズのコメントは「ずんだもん」になりきって、明るくポジティブな内容を生成するように心がけてください。
          - 今日の日付を渡すので、それにちなんだ閑話休題などがコメントに入っているとなお良しです(必ずしも全てのフレーズに適応する必要はありません)。

          回答には返事などの余計な文字を含めず、フレーズの配列のみを記載してください。

          ## ずんだもんの口調の例
          ・〜なのだ!!
          ・〜のだ!!

          ## 生成するJSONの例
          "phrases": [
            {
              "comment": "そろそろ休憩するのだ!!最近寒くなってきたからお昼ごはんは温かいものでも食べるのだ!!",
              "time": "2024-10-09T11:00:00.000Z",
            },
            {
              "comment": "もうすぐおやつの時間なのだ!!次のMTGに備えてちょっとだけ休憩するのだ!!",
              "time": "2024-10-09T14:00:00.000Z",
            },
            {
              "comment": "もうすぐお仕事終わりの時間なのだ!!今日は早く業務を切り上げて美味しいものでも食べるのだ!!",
              "time": "2024-10-09T17:00:00.000Z",
            }
          ]

          ## 今日の日付
          ${format(new Date(), "yyyy-MM-dd")}

          それではJSON形式のスケジュールを以下に記載します。
        `,
      },
      {
        role: "user",
        content: JSON.stringify(schedules),
      },
    ],
    response_format: zodResponseFormat(responseScheme, "data"),
  });

  const response = completion.choices[0].message.parsed;

  // Structured Outputの生成に失敗した場合はエラーを返す
  if (!response) {
    throw new Error("Failed to generate Structured Output.");
  }

  // レスポンスからフレーズに変換
  const phrases: Phrase[] = response.phrases.map((phrase) => ({
    id: crypto.randomUUID(),
    comment: phrase.comment,
    time: parseISO(phrase.time),
  }));

  // FIXME: デバッグ用
  // const response: { phrases: Phrase[] } = {
  //   phrases: [
  //     {
  //       comment: "今日の予定はコレなのだ!!",
  //       time: new Date(),
  //     },
  //   ],
  // };

  // BSWから別の世界にレスポンスを返す
  messageResponse.send(phrases);
};

export default handler;
