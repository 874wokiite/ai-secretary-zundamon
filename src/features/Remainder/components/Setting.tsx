import { useEffect, useState } from "react";
import React from "react";

import { Step1 } from "@/features/Remainder/components/Step1";
import { Step2 } from "@/features/Remainder/components/Step2";
import type { Step } from "@/features/Remainder/types/Step";
import type { Schedule } from "@/types/Schedule";

type SettingProps = {
  setIsVisible: React.Dispatch<React.SetStateAction<Boolean>>;
};

export const Setting = ({ setIsVisible }: SettingProps) => {
  const [step, setStep] = useState<Step>(1);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    setStep(1);
  }, []);

  // 現在のステップに対応する画面を描画するための関数
  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return <Step1 setStep={setStep} setSchedules={setSchedules} />;
      case 2:
        return <Step2 schedules={schedules} setIsVisible={setIsVisible} />;
    }
  };

  return renderCurrentStep();
};
