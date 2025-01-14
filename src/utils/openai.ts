const generateOpinion = async (
  question: string,
  tone: string,
  adviceStyle: string
) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are giving advice in a ${tone} tone, speaking as ${adviceStyle}. Be concise but helpful.`,
          },
          {
            role: "user",
            content: question,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating opinion:", error);
    throw new Error("Failed to generate opinion. Please try again later.");
  }
};

export { generateOpinion };