import type { ZundamonMessage } from "@/types/ZundamonMessage";

// Chrome拡張機能のボタンがクリックされた時の処理
chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    const message: ZundamonMessage = {
      action: "OPEN",
    };

    // アクティブなタブにメッセージを送信する
    chrome.tabs.sendMessage(tab.id, message);
  }
});

// Chromeのアラームが発火した時の処理
chrome.alarms.onAlarm.addListener((alarm) => {
  const getMessage = (alarmName: string): ZundamonMessage => {
    const prefix = alarmName.split("-")[0];

    switch (prefix) {
      case "PHRASE":
        return {
          action: "PHRASE_REMIND",
          id: alarm.name,
        };
      case "SCHEDULE":
        return {
          action: "SCHEDULE_REMIND",
          id: alarm.name,
        };
      default:
        throw new Error("An unsupported prefix was entered.");
    }
  };

  // アクティブなタブを検索して、メッセージを送信する
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, getMessage(alarm.name));
    }
  });
});
