type OpenAIResponse = {
  content: string;
};

export async function getOpenAIResponse(request: string): Promise<string> {
  const response = await fetch("/api/openai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ request }),
  });

  const data: OpenAIResponse = await response.json();

  return data.content;
}