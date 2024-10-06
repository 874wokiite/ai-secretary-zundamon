export type Schedule = {
  id: string;
  name: string;
  start: Date;
  end: Date;
};

export type ScheduleMap = {
  [id: string]: Schedule;
};
