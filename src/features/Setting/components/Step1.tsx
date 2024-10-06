import React from "react";

import { Button } from "@/components/Button";
import type { Step } from "@/features/Setting/types/Step";

type Step1Props = {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
};

export const Step1 = ({ setStep }: Step1Props) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-zunda-t1">AI Securetary Zundamon</h1>
        <Button onClick={() => setStep(2)}>今日のお仕事を始める!!</Button>
      </div>
    </div>
  );
};
