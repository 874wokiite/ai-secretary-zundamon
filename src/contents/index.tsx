import { Storage as ChromeStorage } from "@plasmohq/storage";
import cssText from "data-text:@/styles/global.css";
import { useEffect, useState } from "react";

import { RemainderPanel } from "@/components/RemainderPanel";
import { SettingPanel } from "@/components/SettingPanel";
import type { EventDictType, EventType } from "@/types/EventType";
import type { StatusType } from "@/types/StatusType";

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;

  return style;
};

const ContentScriptsUI = () => {
  const storage = new ChromeStorage();

  const [event, setEvent] = useState<EventType | undefined>(undefined);
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
      switch (message.action) {
        case "ALARM_FIRED":
          void storage
            .get<EventDictType>("events")
            .then((events) => setEvent(events[message.alarmName]));

          break;
        case "EXTENSION_CLICKED":
          setIsPanelVisible(true);

          break;
      }
      sendResponse({ status: "SUCCESS" as StatusType });

      return true;
    });
  }, []);

  useEffect(() => {
    if (event) {
      let timerId = setTimeout(async () => {
        const events: EventDictType = await storage.get("events");

        delete events[event.eventId];
        await storage.set("events", events);

        setEvent(undefined);
      }, 5000);

      return () => clearTimeout(timerId);
    }
  }, [event]);

  return (
    <>
      {isPanelVisible && (
        <div className="fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <SettingPanel onClose={() => setIsPanelVisible(false)} />
        </div>
      )}
      {event && (
        <div className="fixed right-0 top-1/2 z-20">
          <RemainderPanel event={event} />
        </div>
      )}
    </>
  );
};

export default ContentScriptsUI;
