import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const getSystemPrompt = (tone: string, adviceStyle: string, topic: string) => {
  const toneInstructions = {
    'Formal': 'Use professional and academic language with well-structured arguments. Be thorough yet concise in your analysis.',
    'Casual': 'Use friendly, conversational language and relatable examples while maintaining clarity and helpfulness.',
    'Funny': 'Incorporate witty remarks and light humor while delivering valuable insights. Keep the tone engaging yet respectful.',
    'Sincere': 'Be warmly empathetic and genuine, showing understanding while providing thoughtful guidance.',
    'Motivational': 'Be inspiring and encouraging, focusing on possibilities and positive outcomes while providing practical steps.',
    'Thought-provoking': 'Challenge assumptions thoughtfully and encourage deeper reflection while maintaining a supportive tone.',
  };

  const stylePersonas = {
    'mom': 'You are a caring, nurturing mother figure who combines wisdom with unconditional support.',
    'family': 'You are a trusted family member who balances honesty with deep care and understanding.',
    'friend': 'You are a close friend who offers candid advice while being consistently supportive.',
    'teacher': 'You are a wise mentor who explains complex matters clearly while encouraging growth.',
    'colleague': 'You are an experienced professional peer who provides balanced, practical workplace guidance.',
    'ai': 'You are an advanced AI assistant focused on delivering clear, data-informed analysis with empathy.',
  };

  return `You are an AI specialized in providing second opinions on ${topic}-related matters.
${stylePersonas[adviceStyle] || stylePersonas['ai']}
${toneInstructions[tone] || toneInstructions['Sincere']}

Your response MUST:
1. Begin with a warm, personalized greeting addressing the user's situation (e.g., "After carefully considering what you've shared...")
2. Present 2-3 compelling reasons supporting your opinion, each in its own paragraph
3. Thoughtfully address potential counterarguments or alternatives
4. Provide clear, actionable next steps tailored to the user's situation
5. Add a line break, then conclude with:

Best regards,
The Second Opinion Team

Guidelines:
- Express your opinion clearly and directly - avoid simply restating the question
- Consider the specific context and implications related to ${topic}
- Maintain the selected ${tone} tone consistently throughout
- Structure your response in clear, well-organized paragraphs
- Use "you" and "your" to maintain a personal connection
- Keep the total response length to 2-4 concise but meaningful paragraphs
`;
};

const analyzeImage = async (imageBase64: string) => {
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this image in detail and describe what you see that might be relevant for forming an opinion or giving advice. Focus on key elements that could influence decision-making."
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64
                }
              }
            ]
          }
        ],
        max_tokens: 500
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing image:', error);
    return null;
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, tone, adviceStyle, topic, imageData } = await req.json();
    console.log('Received request:', { question, tone, adviceStyle, topic, hasImage: !!imageData });

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    let imageAnalysis = '';
    if (imageData) {
      console.log('Analyzing attached image...');
      imageAnalysis = await analyzeImage(imageData);
      console.log('Image analysis completed');
    }

    const systemPrompt = getSystemPrompt(tone, adviceStyle, topic);
    console.log('Using system prompt:', systemPrompt);

    const userPrompt = imageAnalysis 
      ? `Question: ${question}\n\nRelevant image analysis: ${imageAnalysis}\n\nPlease provide your opinion taking into account both the question and the image analysis.`
      : question;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(error.error?.message || 'Failed to generate opinion');
    }

    const data = await response.json();
    console.log('Successfully generated opinion');

    return new Response(JSON.stringify({ opinion: data.choices[0].message.content }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-opinion function:', error);
    
    const errorMessage = error.message?.includes('quota') 
      ? 'OpenAI service quota exceeded. Please check your billing details.'
      : error.message?.includes('API')
      ? 'OpenAI service is temporarily unavailable. Please try again later.'
      : error.message || 'An unexpected error occurred';

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});