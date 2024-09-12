export type EventType = {
  eventId: string;
  eventName: string;
};

export type EventDictType = {
  [eventId: string]: EventType;
};
