import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage as ChromeStorage } from "@plasmohq/storage";

import type { EventDictType } from "@/types/EventType";
import type { StatusType } from "@/types/StatusType";

const handler: PlasmoMessaging.MessageHandler = async (_, response) => {
  const storage = new ChromeStorage();

  const eventId = crypto.randomUUID() as string;
  const alarmName = eventId;

  const events: EventDictType = (await storage.get("events")) || {};
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

  response.send({
    status: "SUCCESS" as StatusType,
  });
};

export default handler;
