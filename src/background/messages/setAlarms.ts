import type { EventDictType, EventType } from "@/types/EventType";
import type { StatusType } from "@/types/StatusType";
import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";

const handler: PlasmoMessaging.MessageHandler = async (_, response) => {
  const storage = new Storage();

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
