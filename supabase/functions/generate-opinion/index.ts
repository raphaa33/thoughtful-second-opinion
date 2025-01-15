import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, tone, adviceStyle } = await req.json();
    console.log('Generating opinion for:', { question, tone, adviceStyle });

    const systemPrompt = `You are an AI giving advice in a ${tone} tone, speaking as if you were providing ${adviceStyle} advice. 
    Be helpful, concise, and maintain the appropriate tone throughout your response.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Using a more stable model
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        max_tokens: 250, // Reduced token limit for cost efficiency
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log('OpenAI API response status:', response.status);
    
    if (!response.ok) {
      console.error('OpenAI API error:', data.error);
      throw new Error(data.error?.message || 'Failed to generate opinion');
    }

    if (!data.choices?.[0]?.message?.content) {
      console.error('Unexpected OpenAI API response format:', data);
      throw new Error('Invalid response from OpenAI');
    }

    const generatedText = data.choices[0].message.content;
    console.log('Successfully generated opinion');

    return new Response(JSON.stringify({ opinion: generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-opinion function:', error);
    
    // Determine if it's an OpenAI API error
    const errorMessage = error.message?.includes('API') 
      ? 'OpenAI service is temporarily unavailable. Please try again later.'
      : error.message || 'An unexpected error occurred';

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});