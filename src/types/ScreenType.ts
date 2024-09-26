import React from "react";

export type ScreenType = "TITLE" | "CHECK_EVENTS" | "COMPLETION_NOTICE";

export type ScreenProps = {
  screen: ScreenType;
  setScreen: React.Dispatch<React.SetStateAction<ScreenType>>;
};
