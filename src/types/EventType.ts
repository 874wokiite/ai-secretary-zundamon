export type EventType = {
  id: string;
  name: string;
  start: Date;
  end: Date;
};

export type EventDictType = {
  [eventId: string]: EventType;
};
