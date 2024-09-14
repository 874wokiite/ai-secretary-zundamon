import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage as ChromeStorage } from "@plasmohq/storage";

import type { EventDictType } from "@/types/EventType";

const handler: PlasmoMessaging.MessageHandler<void, void> = async (
  _,
  messageResponse,
) => {
  const storage = new ChromeStorage();

  const eventId = crypto.randomUUID() as string;
  const alarmName = eventId;

  const events = (await storage.get<EventDictType>("events")) || {};
  await storage.set("events", {
    ...events,
    [eventId]: {
      eventId: eventId,
      eventName: "とすとす超会議",
    },
  });

  chrome.alarms.create(alarmName, {
    delayInMinutes: 1,
  });

  messageResponse.send();
};

export default handler;
