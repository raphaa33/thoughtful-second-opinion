import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Opinion } from "@/contexts/OpinionsContext";
import { useToast } from "@/hooks/use-toast";

interface HistoryListProps {
  items: Opinion[];
  isOpinionSaved: (id: string) => boolean;
  saveOpinion: (opinion: Opinion) => void;
  removeSavedOpinion: (id: string) => void;
}

export const HistoryList = ({ items, isOpinionSaved, saveOpinion, removeSavedOpinion }: HistoryListProps) => {
  const { toast } = useToast();

  const handleSaveToggle = (opinion: Opinion) => {
    if (isOpinionSaved(opinion.id)) {
      removeSavedOpinion(opinion.id);
      toast({
        description: "Opinion removed from saved list",
      });
    } else {
      saveOpinion(opinion);
      toast({
        description: "Opinion saved successfully",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Previous Opinions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-brand-600">{item.topic}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleSaveToggle(item)}
                    >
                      {isOpinionSaved(item.id) ? (
                        <BookmarkCheck className="h-4 w-4" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </Button>
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
      </CardContent>
    </Card>
  );
};