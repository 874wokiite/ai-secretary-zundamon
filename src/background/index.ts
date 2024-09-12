import type { ActionType } from "@/types/ActionType";

chrome.action.onClicked.addListener((tab) => {
  const action: ActionType = "EXTENSION_CLICKED";

  if (tab.id) {
    void chrome.tabs.sendMessage(tab.id, { action: action }, (response) => {
      console.log(response);
    });
  }
});
