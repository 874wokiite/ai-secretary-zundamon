import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage as ChromeStorage } from "@plasmohq/storage";
import { differenceInMinutes } from "date-fns";

import type { Phrase, PhraseMap } from "@/types/Phrase";

// フレーズを受け取って、Chromeのアラームを設定するハンドラ
const handler: PlasmoMessaging.MessageHandler<Phrase[], void> = async (
  messageRequest,
  messageResponse,
) => {
  // リクエストからフレーズを取り出す
  const phrases = messageRequest.body ?? [];

  phrases.forEach((phrase) => {
    // PrefixとIDの組み合わせをアラームの名前として扱う(アラーム名から対象のスケジュールを逆引きするときに使用する)
    const alarmName = "PHRASE" + "-" + phrase.id;

    // 現在時刻との差分を算出する
    const timeDifference = differenceInMinutes(phrase.time, new Date());

    // 通知対象となるフレーズに対して、Chromeのアラームを設定する
    if (timeDifference > 0) {
      chrome.alarms.create(alarmName, {
        delayInMinutes: timeDifference,
      });
    }
  });

  // アラーム名からスケジュールを逆引きするためのMapを作成する
  const phraseMap: PhraseMap = phrases.reduce((map, phrase) => {
    const alarmName = "PHRASE" + "-" + phrase.id;
    map[alarmName] = phrase;

    return map;
  }, {});

  //作成したMapをChromeのストレージに格納する
  const storage = new ChromeStorage();
  storage.set("phraseMap", phraseMap);

  // BSWから別の世界にレスポンスを返す
  messageResponse.send();
};

export default handler;
