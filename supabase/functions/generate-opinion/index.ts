import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const getSystemPrompt = (tone: string, adviceStyle: string) => {
  const toneInstructions = {
    'Formal': 'Use professional language and maintain a serious, respectful tone.',
    'Casual': 'Be friendly and conversational, using everyday language.',
    'Funny': 'Include appropriate humor and light-hearted remarks while giving advice.',
    'Sincere': 'Be honest, empathetic, and genuinely caring in your response.',
    'Motivational': 'Be encouraging and inspiring, focusing on positive outcomes.',
    'Thought-provoking': 'Ask reflective questions and encourage deeper thinking.',
  };

  const styleInstructions = {
    'mom': 'Respond like a caring, protective mother who wants the best for their child. Use nurturing language and show concern for safety and well-being.',
    'family': 'Give advice like a close family member who knows the person well and has their best interests at heart.',
    'friend': 'Be like a supportive friend who keeps it real while being encouraging and understanding.',
    'teacher': 'Provide structured, educational advice with clear explanations and practical examples.',
    'colleague': 'Maintain professional objectivity while offering practical, work-appropriate advice.',
    'ai': 'Provide balanced, data-driven analysis while maintaining emotional intelligence.',
  };

  return `You are an AI giving second opinions and advice. ${toneInstructions[tone] || toneInstructions['Sincere']} 
  ${styleInstructions[adviceStyle] || styleInstructions['ai']}
  
  Guidelines for your responses:
  1. Keep responses concise but thorough (2-3 paragraphs maximum)
  2. Start with acknowledgment of the question
  3. Provide clear, actionable advice
  4. End with a brief encouraging statement
  5. Maintain consistency in tone and style throughout
  6. Avoid being judgmental or overly critical
  7. Focus on constructive, practical solutions
  
  Remember to stay in character and maintain the specified tone and style throughout your entire response.`;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, tone, adviceStyle } = await req.json();
    console.log('Received request:', { question, tone, adviceStyle });

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('OpenAI API key is not configured');
      throw new Error('OpenAI API key is not configured');
    }

    const systemPrompt = getSystemPrompt(tone, adviceStyle);
    console.log('Using system prompt:', systemPrompt);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    console.log('OpenAI API response status:', response.status);
    
    if (!response.ok) {
      console.error('OpenAI API error:', data);
      if (data.error?.type === 'insufficient_quota') {
        throw new Error('OpenAI API quota exceeded');
      }
      throw new Error(data.error?.message || 'Failed to generate opinion');
    }

    if (!data.choices?.[0]?.message?.content) {
      console.error('Unexpected OpenAI API response format:', data);
      throw new Error('Invalid response format from OpenAI');
    }

    const generatedText = data.choices[0].message.content;
    console.log('Successfully generated opinion');

    return new Response(JSON.stringify({ opinion: generatedText }), {
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