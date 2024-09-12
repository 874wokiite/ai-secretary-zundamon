import type { ActionType } from "@/types/ActionType";

// NOTE: 拡張機能のボタンがクリックされた時の処理
chrome.action.onClicked.addListener((tab) => {
  const action: ActionType = "EXTENSION_CLICKED";

  if (tab.id) {
    void chrome.tabs.sendMessage(tab.id, { action: action }, () => {});
  }
});

// NOTE: イベントのアラームを受け取った時の処理
chrome.alarms.onAlarm.addListener((alarm) => {
  const action: ActionType = "ALARM_FIRED";

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    void chrome.tabs.sendMessage(
      tabs[0].id,
      {
        action: action,
        alarmName: alarm.name,
      },
      () => {},
    );
  });
});
