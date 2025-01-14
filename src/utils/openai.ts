const generateOpinion = async (
  question: string,
  tone: string,
  adviceStyle: string
) => {
  try {
    console.log("Generating opinion with:", { question, tone, adviceStyle });
    
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      throw new Error("OpenAI API key is not configured");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
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
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    console.log("OpenAI API Response Status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API Error:", errorData);
      throw new Error(errorData.error?.message || "Failed to generate opinion");
    }

    const data = await response.json();
    console.log("OpenAI API Response:", data);

    if (!data.choices?.[0]?.message?.content) {
      throw new Error("Invalid response format from OpenAI");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating opinion:", error);
    throw error;
  }
};

export { generateOpinion };