import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

import { Step1 } from "@/features/Setting/components/Step1";
import { Step2 } from "@/features/Setting/components/Step2";
import { Step3 } from "@/features/Setting/components/Step3";
import type { Step } from "@/features/Setting/types/Step";
import type { Schedule } from "@/types/Schedule";
import type { ZundaMessage } from "@/types/ZundaMessage";

const CloseButton = ({ onClick }: { onClick: () => void }) => {
  // NOTE: アイコンの見た目の差から、FigmaとはPaddingとアイコンのサイズが異なっている
  return (
    <div
      className="cursor-pointer rounded-[4px] bg-zunda-white p-[4px]"
      onClick={onClick}
    >
      <MdClose className="size-[22px]" />
    </div>
  );
};

export const Popup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  // 現在のステップに対応する画面を描画するための関数
  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return <Step1 setStep={setStep} />;
      case 2:
        return <Step2 setStep={setStep} setSchedules={setSchedules} />;
      case 3:
        return <Step3 schedules={schedules} setIsVisible={setIsVisible} />;
    }
  };

  useEffect(() => {
    // BSWから"OPEN"アクションを受け取った時に、最初のステップに戻した状態でポップアップを表示する
    chrome.runtime.onMessage.addListener(
      (message: ZundaMessage, _, sendResponse) => {
        if (message.action === "OPEN") {
          setStep(1);
          setIsVisible(true);
        }
        sendResponse();
      },
    );
  }, []);

  return (
    isVisible && (
      <div className="flex h-[600px] w-[800px] flex-col overflow-hidden rounded-[8px] border-[2px] border-zunda-black bg-zunda-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <div className="bg-zunda-secondary flex w-full flex-row items-center justify-end border-b-[2px] border-b-zunda-black p-[8px]">
          <CloseButton onClick={() => setIsVisible(false)} />
        </div>
        <div className="h-full w-full">{renderCurrentStep()}</div>
      </div>
    )
  );
};
