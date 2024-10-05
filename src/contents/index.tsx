import cssText from "data-text:@/styles/global.css";

import { Popup } from "@/features/Setting/components/Popup";

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;

  return style;
};

const ContentScriptsUI = () => {
  return (
    <div className="fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
      <Popup />
    </div>
  );
};

export default ContentScriptsUI;
