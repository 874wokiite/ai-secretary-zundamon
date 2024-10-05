import type { ActionType } from "@/types/ActionType";
import type { ZundaMessage } from "@/types/ZundaMessage";

// Chrome拡張機能のボタンがクリックされた時の処理
chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    const message: ZundaMessage = {
      action: "OPEN",
    };

    // アクティブなタブにメッセージを送信する
    chrome.tabs.sendMessage(tab.id, message);
  }
});

// Chromeのアラームが発火した時の処理
chrome.alarms.onAlarm.addListener((alarm) => {
  const action: ActionType = "ALARM_FIRED";

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: action,
      alarmName: alarm.name,
    });
  });
});
