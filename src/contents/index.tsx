import { RemainderPanel } from "@/components/RemainderPanel";
import { SettingPanel } from "@/components/SettingPanel";
import type { ActionType } from "@/types/ActionType";
import type { EventType } from "@/types/EventType";
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
    const handleMessage = async (message: {
      action: ActionType;
      alarmName?: string;
    }) => {
      switch (message.action) {
        case "ALARM_FIRED":
          const event: EventType = await storage.get(message.alarmName);
          setEvent(event);

          break;
        case "EXTENSION_CLICKED":
          setIsPanelVisible(true);

          break;
      }
      return true;
    };
    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  useEffect(() => {
    if (event) {
      let timerId = setTimeout(() => {
        storage.remove(event.eventId);
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
