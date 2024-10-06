import { Storage as ChromeStorage } from "@plasmohq/storage";

export const getOpenAIApiKey = async () => {
  const storage = new ChromeStorage();
  const apiKey = await storage.get<string>("apiKey");

  return apiKey;
};
