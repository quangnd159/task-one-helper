type OpenAIResponse = {
  choices?: Array<{ text: string }>;
};

export async function getOpenAIResponse(
  request: string
): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `Use the chart/graph language typically found in The Economist reports to write three variations of sentence to ${request}. Wrap the whole thing in <ol></ol> and wrap each sentence in <li></li>.`,
      temperature: 0.6,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }),
  });

  const data: OpenAIResponse = await response.json();
  const choices = data?.choices || [];
  const text = choices
    .map((choice) => choice.text)
    .filter(Boolean)
    .join("");

  return text;
}
