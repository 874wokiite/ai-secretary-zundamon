import { RemainderPanel } from "@/components/RemainderPanel";
import { SettingPanel } from "@/components/SettingPanel";
import type { EventDictType, EventType } from "@/types/EventType";
import type { StatusType } from "@/types/StatusType";
import { Storage } from "@plasmohq/storage";
import cssText from "data-text:@/styles/global.css";
import { useEffect, useState } from "react";

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;

  return style;
};

const ContentScriptsUI = () => {
  const storage = new Storage();

  const [event, setEvent] = useState<EventType | undefined>(undefined);
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
      switch (message.action) {
        case "ALARM_FIRED":
          (storage.get("events") as Promise<EventDictType>).then((events) =>
            setEvent(events[message.alarmName]),
          );

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
        <div className="z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <SettingPanel onClose={() => setIsPanelVisible(false)} />
        </div>
      )}
      {event && (
        <div className="z-[60] fixed top-1/2 right-0">
          <RemainderPanel event={event} />
        </div>
      )}
    </>
  );
};

export default ContentScriptsUI;
