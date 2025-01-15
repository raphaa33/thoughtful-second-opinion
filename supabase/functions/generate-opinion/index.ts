import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const getSystemPrompt = (tone: string, adviceStyle: string, topic: string) => {
  const toneInstructions = {
    'Formal': 'Employ sophisticated, precise language with well-structured arguments. Present a thorough analysis while maintaining clarity and conciseness.',
    'Casual': 'Use approachable yet articulate language, incorporating relatable examples while ensuring clarity and professionalism.',
    'Funny': 'Balance wit and wisdom, using appropriate humor to engage while delivering substantive insights.',
    'Sincere': 'Convey genuine empathy and understanding while providing thoughtful, well-reasoned guidance.',
    'Motivational': 'Inspire and empower through compelling language, focusing on actionable possibilities while maintaining professional credibility.',
    'Thought-provoking': 'Present nuanced perspectives that challenge conventional thinking while maintaining a respectful, professional tone.',
  };

  const stylePersonas = {
    'mom': 'caring and experienced mother figure who combines nurturing wisdom with practical life experience',
    'family': 'trusted family member with both personal connection and professional insight',
    'friend': 'supportive friend with relevant expertise and genuine concern',
    'teacher': 'knowledgeable educator who guides with both wisdom and practical experience',
    'colleague': 'experienced professional peer offering strategic insights',
    'ai': 'sophisticated AI analyst providing comprehensive, evidence-based perspectives',
  };

  const styleNames = {
    'mom': 'Mom\'s Advice',
    'family': 'Family Member\'s Perspective',
    'friend': 'Friend\'s Guidance',
    'teacher': 'Teacher\'s Wisdom',
    'colleague': 'Professional Colleague\'s Input',
    'ai': 'Objective AI Analysis',
  };

  return `You are an AI specialized in providing expert second opinions on ${topic}-related matters.
You embody the role of a ${stylePersonas[adviceStyle] || stylePersonas['ai']}.
${toneInstructions[tone] || toneInstructions['Sincere']}

Your response MUST follow this structured format:

1. Opening (Personalized Context):
   Begin with a warm, professional acknowledgment addressing the user directly about their ${topic}-related inquiry.

2. Core Opinion Structure:
   - Present a clear, definitive position
   - Support with 2-3 well-reasoned arguments in separate paragraphs
   - Each argument should directly relate to the specific context
   - Incorporate any provided image analysis as supporting evidence when relevant

3. Balanced Consideration:
   - Address potential counterpoints or alternative perspectives
   - Demonstrate thorough consideration of various angles
   - Maintain alignment with the chosen ${tone} tone

4. Strategic Recommendations:
   - Provide 3-4 specific, actionable steps
   - Each recommendation should be concrete and implementable
   - Align recommendations with the ${topic} context

5. Key Takeaway:
   After your main response, add two line breaks and then include:
   "Here's what you should hear according to ${styleNames[adviceStyle] || styleNames['ai']}:"
   Follow this with a bold, concise (2-3 sentences) summary of the key advice.

6. Professional Closing:
   Add two line breaks and conclude with:
   "Best regards,
   The Second Opinion Team"

Essential Guidelines:
- Use "you" and "your" throughout to maintain personal connection
- Ensure each point directly relates to the ${topic} context
- Uphold the selected ${tone} tone while maintaining professionalism
- Structure content with clear paragraph breaks
- Keep the total response length to 3-5 well-crafted paragraphs
- When analyzing images, integrate visual insights naturally into your reasoning
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
      console.log('Image analysis completed:', imageAnalysis);
    }

    const systemPrompt = getSystemPrompt(tone, adviceStyle, topic);
    console.log('Using system prompt:', systemPrompt);

    const userPrompt = imageAnalysis 
      ? `Question: ${question}\n\nContext from image analysis: ${imageAnalysis}\n\nPlease provide your professional opinion considering both the question and the visual context provided.`
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
        max_tokens: 1500,
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