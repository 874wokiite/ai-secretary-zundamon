import { Button } from "@/components/Button";
import type { StepProps } from "@/features/Setting/types/StepProps";

export const Step1 = ({ setStep }: StepProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-zunda-t1">AI Securetary Zundamon</h1>
        <Button onClick={() => setStep(2)}>今日のお仕事を始める!!</Button>
      </div>
    </div>
  );
};
