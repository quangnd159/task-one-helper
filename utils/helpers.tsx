type OpenAIResponse = {
  choices?: Array<{ message: { content: string } }>;
};

export async function getOpenAIResponse(request: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "system", "content": "You are a professional writer who writes about charts, graphs, process diagrams and maps." },
        { "role": "user", "content": `Use your IELTS Writing Task 1 knowledge to write three variations of sentence: ${request}. Wrap each sentence in <li></li>. Highlight idiomatic phrases by wrapping them with <em></em>. Do not include phrases like "according to the survey data" or "as revealed by the survey findings"` }
      ],
      temperature: 0.5,
      // max_tokens: 200,
      // top_p: 1,
      // frequency_penalty: 0,
      // presence_penalty: 0,
    }),
  });

  const data: OpenAIResponse = await response.json();
  const choices = data?.choices || [];
  const content = choices.length > 0 ? choices[0].message.content : "";

  return content;
}
