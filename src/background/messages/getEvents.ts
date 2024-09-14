import type { PlasmoMessaging } from "@plasmohq/messaging";
import { endOfDay, parseISO, startOfDay } from "date-fns";

import type { EventType } from "@/types/EventType";

const handler: PlasmoMessaging.MessageHandler<void, EventType[]> = async (
  _,
  messageResponse,
) => {
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

  const response = await fetch(`${baseUrl}?${params.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Google Calendar events");
  }

  const data = await response.json();
  const items: any[] = data.items;

  const events: EventType[] = items.map((item) => ({
    id: item.id,
    name: item.summary,
    start: parseISO(item.start.dateTime),
    end: parseISO(item.end.dateTime),
  }));

  messageResponse.send(events);
};

export default handler;
