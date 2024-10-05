import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

import { Step1 } from "@/features/Setting/components/Step1";
import type { Step } from "@/features/Setting/types/StepProps";
import type { ZundaMessage } from "@/types/ZundaMessage";

const CloseButton = ({ onClick }: { onClick: () => void }) => {
  // NOTE: アイコンの見た目の差から、FigmaとはPaddingとアイコンのサイズが異なっている
  return (
    <div
      className="cursor-pointer rounded-[4px] bg-zunda-white p-[4px] hover:bg-zunda-white/90"
      onClick={onClick}
    >
      <MdClose className="size-[22px]" />
    </div>
  );
};

export const Popup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState<Step>(1);

  // 現在のステップに対応する画面を描画するための関数
  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return <Step1 setStep={setStep} />;
    }
  };

  useEffect(() => {
    // BSWから"OPEN"アクションを受け取った時にポップアップを表示する
    chrome.runtime.onMessage.addListener(
      (message: ZundaMessage, _, sendResponse) => {
        if (message.action === "OPEN") {
          setIsVisible(true);
        }
        sendResponse();
      },
    );
  }, []);

  return (
    isVisible && (
      <div className="flex h-[600px] w-[800px] flex-col overflow-hidden rounded-[8px] bg-zunda-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <div className="flex w-full flex-row items-center justify-end bg-zunda-black p-[8px]">
          <CloseButton onClick={() => setIsVisible(false)} />
        </div>
        <div className="h-full w-full">{renderCurrentStep()}</div>
      </div>
    )
  );
};
