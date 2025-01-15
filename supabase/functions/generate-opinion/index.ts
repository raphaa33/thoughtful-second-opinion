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
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        max_tokens: 300, // Limit response length to reduce costs
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log('OpenAI API response status:', response.status);
    
    if (!response.ok) {
      console.error('OpenAI API error:', data.error);
      let errorMessage = 'Failed to generate opinion';
      
      // Handle specific OpenAI errors
      if (data.error?.message?.includes('quota')) {
        errorMessage = 'Service is temporarily unavailable. Please try again later.';
      }
      
      throw new Error(errorMessage);
    }

    const generatedText = data.choices[0].message.content;
    console.log('Successfully generated opinion');

    return new Response(JSON.stringify({ opinion: generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-opinion function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An unexpected error occurred'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});