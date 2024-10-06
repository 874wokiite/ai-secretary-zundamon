import cssText from "data-text:@/styles/global.css";

import { Toast } from "@/features/Remainder/components/Toast";
import { Popup } from "@/features/Setting/components/Popup";

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;

  return style;
};

const ContentScriptsUI = () => {
  return (
    <>
      <div className="fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <Popup />
      </div>
      <div className="fixed -bottom-[240px] right-[40px] z-10">
        <Toast />
      </div>
    </>
  );
};

export default ContentScriptsUI;
