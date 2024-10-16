export type ZundamonMessage = {
  action: "SCHEDULE_REMIND" | "PHRASE_REMIND" | "OPEN";
  id?: string;
};
