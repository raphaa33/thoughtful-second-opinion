import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const getSystemPrompt = (tone: string, adviceStyle: string, topic: string) => {
  const toneInstructions = {
    'Formal': 'Use professional and academic language. Be thorough in your analysis.',
    'Casual': 'Use conversational language and relatable examples.',
    'Funny': 'Include appropriate humor and witty remarks while maintaining helpfulness.',
    'Sincere': 'Be empathetic and genuine in your response.',
    'Motivational': 'Be inspiring and encouraging, focusing on positive outcomes.',
    'Thought-provoking': 'Challenge assumptions and encourage deeper reflection.',
  };

  const stylePersonas = {
    'mom': 'You are a caring, protective mother figure who always has their child\'s best interests at heart.',
    'family': 'You are a close family member who knows the person well and can provide honest, loving advice.',
    'friend': 'You are a trusted friend who keeps it real while being supportive.',
    'teacher': 'You are an experienced educator who explains things clearly and provides practical guidance.',
    'colleague': 'You are a professional peer who maintains objectivity while offering workplace-appropriate advice.',
    'ai': 'You are an AI assistant focused on providing data-driven, unbiased analysis.',
  };

  return `You are an AI specialized in providing second opinions on ${topic}-related matters.
${stylePersonas[adviceStyle] || stylePersonas['ai']}
${toneInstructions[tone] || toneInstructions['Sincere']}

Your response MUST:
1. Start with a clear statement addressing the user directly using "you" (e.g., "Based on what you've shared...")
2. Provide 2-3 specific reasons supporting your opinion
3. Address potential counterarguments or alternatives
4. End with actionable next steps or recommendations for the user
5. Always conclude with a signature: "Best regards,\nThe Second Opinion Team"

Guidelines:
- Be direct and clear about your opinion - don't just rephrase the question
- Consider the context and implications specific to ${topic}
- Maintain the selected ${tone} tone throughout
- Keep responses concise but thorough (2-3 paragraphs)
- Format the response for easy reading with clear paragraphs
- Always address the user directly using "you" and "your"
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