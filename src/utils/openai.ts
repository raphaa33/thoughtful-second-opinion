import { supabase } from "@/integrations/supabase/client";

export const generateOpinion = async (
  question: string,
  tone: string,
  adviceStyle: string,
  topic: string,
  imageData: string | null = null
) => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-opinion', {
      body: { question, tone, adviceStyle, topic, imageData }
    });

    if (error) {
      console.error('Error calling generate-opinion function:', error);
      const errorBody = error.message && error.message.includes('{') 
        ? JSON.parse(error.message)
        : null;
      throw new Error(errorBody?.error || 'Failed to generate opinion');
    }

    if (data.error) {
      console.error('Error from generate-opinion function:', data.error);
      throw new Error(data.error);
    }

    return data.opinion;
  } catch (error) {
    console.error('Error generating opinion:', error);
    throw error;
  }
};