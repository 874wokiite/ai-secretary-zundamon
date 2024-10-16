export const getOpenAIApiKey = () => {
  const apiKey = process.env.PLASMO_PUBLIC_OPENAI_API_KEY;

  return apiKey;
};
