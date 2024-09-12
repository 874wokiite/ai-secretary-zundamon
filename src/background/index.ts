import type { ActionType } from "@/types/ActionType";

// NOTE: 拡張機能のボタンがクリックされた時の処理
chrome.action.onClicked.addListener((tab) => {
  const action: ActionType = "EXTENSION_CLICKED";

  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { action: action });
  }
});

// NOTE: イベントのアラームを受け取った時の処理
chrome.alarms.onAlarm.addListener((alarm) => {
  const action: ActionType = "ALARM_FIRED";

  // TODO: ユーザがChromeを開いてない状態でイベントが発火した時の処理も必要??
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: action,
      alarmName: alarm.name,
    });
  });
});
