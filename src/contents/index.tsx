import { SettingPanel } from "@/components/SettingPanel";
import type { ActionType } from "@/types/ActionType";
import cssText from "data-text:@/styles/global.css";
import { useEffect, useState } from "react";

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;

  return style;
};

const ContentScriptsUI = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMessage = (message: { action: ActionType }) => {
      if (message.action === "EXTENSION_CLICKED") {
        setIsVisible(true);
      }
      return true;
    };
    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div className="z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <SettingPanel onClose={() => setIsVisible(false)} />
        </div>
      )}
    </>
  );
};

export default ContentScriptsUI;
