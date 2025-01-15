import { ScrollArea } from "@/components/ui/scroll-area";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect } from "react";

interface HistoryItem {
  id: string;
  topic: string;
  question: string;
  opinion: string;
  timestamp: Date;
}

interface HistoryListProps {
  items: HistoryItem[];
}

export const HistoryList = ({ items }: HistoryListProps) => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session?.user);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSave = async (item: HistoryItem) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save opinions",
        variant: "destructive",
      });
      return;
    }

    const { data: session } = await supabase.auth.getSession();
    
    if (!session?.session?.user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save opinions",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from('saved_opinions').insert({
      opinion_id: item.id,
      topic: item.topic,
      question: item.question,
      opinion: item.opinion,
      timestamp: item.timestamp.toISOString(),
      user_id: session.session.user.id
    });

    if (error) {
      console.error('Error saving opinion:', error);
      toast({
        title: "Error",
        description: "Failed to save the opinion. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Opinion saved successfully!",
    });
  };

  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="border-b pb-4 last:border-b-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-brand-600">{item.topic}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 ${!isAuthenticated ? 'opacity-50' : ''}`}
                        onClick={() => handleSave(item)}
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isAuthenticated 
                        ? "Save this opinion"
                        : "Sign in to save opinions"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(item.timestamp).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm font-medium mb-2">{item.question}</p>
            <p className="text-sm text-muted-foreground">{item.opinion}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};