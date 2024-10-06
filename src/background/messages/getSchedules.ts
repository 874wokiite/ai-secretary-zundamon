import type { PlasmoMessaging } from "@plasmohq/messaging";
import { endOfDay, parseISO, startOfDay } from "date-fns";

import type { Schedule } from "@/types/Schedule";

// Google Calenderのスケジュールを取得するハンドラ
const handler: PlasmoMessaging.MessageHandler<void, Schedule[]> = async (
  _,
  messageResponse,
) => {
  // Google APIにアクセスするためのトークンを取得する
  const token = await new Promise<string>((resolve) => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      resolve(token);
    });
  });

  const nowDate = new Date();
  const timeMin = startOfDay(nowDate).toISOString();
  const timeMax = endOfDay(nowDate).toISOString();

  const baseUrl =
    "https://www.googleapis.com/calendar/v3/calendars/primary/events";
  const params = new URLSearchParams({
    timeMin: timeMin,
    timeMax: timeMax,
    singleEvents: "true",
    orderBy: "startTime",
  });

  // Google Calenderから今日のスケジュールを取得
  const response = await fetch(`${baseUrl}?${params.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // FIXME: エラーが発生した時の対応を考える必要がある
  if (!response.ok) {
    throw new Error("Failed to fetch Google Calendar events");
  }

  const data = await response.json();
  const items: any[] = data.items;

  // AIずんだもんで使用するスケジュールの型に変換
  const events: Schedule[] = items.map((item) => ({
    id: item.id,
    name: item.summary,
    start: parseISO(item.start.dateTime),
    end: parseISO(item.end.dateTime),
  }));

  // BSWから別の世界にレスポンスを返す
  messageResponse.send(events);
};

export default handler;
