import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage as ChromeStorage } from "@plasmohq/storage";
import { differenceInMinutes } from "date-fns";

import type { EventDictType, EventType } from "@/types/Schedule";

const handler: PlasmoMessaging.MessageHandler<void, void> = async (
  _,
  messageResponse,
) => {
  const storage = new ChromeStorage();
  const events = await storage.get<EventType[]>("events");

  events.forEach((event) => {
    const alarmName = event.id;
    const timeDifference = differenceInMinutes(event.start, new Date());

    if (timeDifference > 0) {
      chrome.alarms.create(alarmName, {
        delayInMinutes: timeDifference,
      });
    }
  });

  const eventDict: EventDictType = events.reduce((acc, event) => {
    acc[event.id] = event;
    return acc;
  }, {});
  storage.set("events", eventDict);

  messageResponse.send();
};

export default handler;
