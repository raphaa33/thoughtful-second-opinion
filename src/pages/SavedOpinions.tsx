import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { HistoryList } from "@/components/HistoryList";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SavedOpinion {
  id: string;
  topic: string;
  question: string;
  opinion: string;
  timestamp: Date;
}

const SavedOpinions = () => {
  const [savedOpinions, setSavedOpinions] = useState<SavedOpinion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedOpinions = async () => {
      try {
        const { data, error } = await supabase
          .from('saved_opinions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          const formattedOpinions = data.map(opinion => ({
            id: opinion.id,
            topic: opinion.topic,
            question: opinion.question,
            opinion: opinion.opinion,
            timestamp: new Date(opinion.timestamp)
          }));
          setSavedOpinions(formattedOpinions);
        }
      } catch (error) {
        console.error('Error fetching saved opinions:', error);
        toast({
          title: "Error",
          description: "Failed to load saved opinions. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedOpinions();
  }, [toast]);

  if (savedOpinions.length === 0 && !isLoading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800">No Saved Opinions</h1>
          <p className="text-xl text-muted-foreground max-w-md">
            You haven't saved any opinions yet. Create a new opinion and save it to see it here!
          </p>
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="gap-2"
          >
            <PlusCircle className="h-5 w-5" />
            Get a New Opinion
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-800">Saved Opinions</h1>
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          New Opinion
        </Button>
      </div>
      <Card className="p-6">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : (
          <HistoryList items={savedOpinions} />
        )}
      </Card>
    </div>
  );
};

export default SavedOpinions;