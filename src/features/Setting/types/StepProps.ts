import React from "react";

export type Step = 1 | 2 | 3;

export type StepProps = {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
};
