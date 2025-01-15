import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, tone, adviceStyle } = await req.json();
    console.log('Generating opinion for:', { question, tone, adviceStyle });

    const systemPrompt = `You are an AI giving advice in a ${tone} tone, speaking as if you were providing ${adviceStyle} advice. 
    Be helpful, concise, and maintain the appropriate tone throughout your response.`;

    console.log('Using system prompt:', systemPrompt);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log('OpenAI API response status:', response.status);
    
    if (!response.ok) {
      console.error('OpenAI API error:', data);
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
      ? 'OpenAI service quota exceeded. Please try again later.'
      : error.message?.includes('API')
      ? 'OpenAI service is temporarily unavailable. Please try again later.'
      : error.message || 'An unexpected error occurred';

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});