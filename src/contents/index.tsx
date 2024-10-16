import cssText from "data-text:@/styles/global.css";
import React, { useEffect, useState } from "react";

import { Popup } from "@/components/Popup";
import { Chat } from "@/features/Chat/components/Chat";
import { Setting } from "@/features/Remainder/components/Setting";
import { Toast } from "@/features/Remainder/components/Toast";
import { Title } from "@/features/Title/components/Title";
import type { Feature } from "@/types/Feature";
import type { ZundamonMessage } from "@/types/ZundamonMessage";

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;

  return style;
};

const ContentScriptsUI = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [feature, setFeature] = useState<Feature>("TITLE");

  useEffect(() => {
    // BSWから"OPEN"アクションを受け取った時に、タイトル画面に戻した状態でポップアップを表示する
    chrome.runtime.onMessage.addListener(
      (message: ZundamonMessage, _, sendResponse) => {
        if (message.action === "OPEN") {
          setIsVisible(true);
          setFeature("TITLE");
        }
        sendResponse();
      },
    );
  }, []);

  // 機能に対応した画面をレンダリングするための関数
  const renderFeature = () => {
    switch (feature) {
      case "TITLE":
        return <Title setFeature={setFeature} />;
      case "SETTING":
        return <Setting setIsVisible={setIsVisible} />;
      case "CHAT":
        return <Chat setIsVisible={setIsVisible} />;
    }
  };

  return (
    <>
      <div className="fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        {isVisible && (
          <Popup onClose={() => setIsVisible(false)}>{renderFeature()}</Popup>
        )}
      </div>
      <div className="fixed -bottom-[240px] right-[40px] z-10">
        <Toast />
      </div>
    </>
  );
};

export default ContentScriptsUI;
