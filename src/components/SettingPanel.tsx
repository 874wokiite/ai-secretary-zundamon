import { Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react";

import { IconButton } from "@/components/IconButton";
import { CheckEventsScreen } from "@/components/SettingPanelScreens/CheckEventsScreen";
import { CompletionNoticeSrceen } from "@/components/SettingPanelScreens/CompletionNoticeScreen ";
import { TitleScreen } from "@/components/SettingPanelScreens/TitleScreen";
import type { ScreenType } from "@/types/ScreenType";

export const SettingPanel = ({ onClose }: { onClose: () => void }) => {
  const [screen, setScreen] = useState<ScreenType>("TITLE");

  const renderScreen = () => {
    switch (screen) {
      case "TITLE":
        return <TitleScreen screen={screen} setScreen={setScreen} />;
      case "CHECK_EVENTS":
        return <CheckEventsScreen screen={screen} setScreen={setScreen} />;
      case "COMPLETION_NOTICE":
        return <CompletionNoticeSrceen onClose={onClose} />;
    }
  };

  return (
    <div className="relative flex h-[540px] w-[960px] items-center justify-center rounded-xl bg-white p-8 shadow-xl">
      {renderScreen()}
      <div className="absolute right-4 top-4">
        <IconButton onClick={onClose}>
          <Cross1Icon className="h-6 w-6" />
        </IconButton>
      </div>
    </div>
  );
};
