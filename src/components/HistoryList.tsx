import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { formatDistanceToNow } from "date-fns";

interface HistoryItem {
  id: string;
  topic: string;
  question: string;
  opinion: string;
  timestamp: Date;
}

interface HistoryListProps {
  items: HistoryItem[];
  isOpinionSaved: (id: string) => boolean;
  saveOpinion: (opinion: HistoryItem) => void;
  removeSavedOpinion: (id: string) => void;
}

export const HistoryList = ({
  items,
  isOpinionSaved,
  saveOpinion,
  removeSavedOpinion,
}: HistoryListProps) => {
  const { toast } = useToast();

  const handleSaveOpinion = (item: HistoryItem) => {
    if (isOpinionSaved(item.id)) {
      removeSavedOpinion(item.id);
      toast({
        description: "Opinion removed from saved items",
      });
    } else {
      saveOpinion(item);
      toast({
        description: "Opinion saved successfully",
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No previous opinions found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold leading-none tracking-tight">
                  {item.question}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-brand-600">{item.topic}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${isOpinionSaved(item.id) ? "text-primary" : ""}`}
                    onClick={() => handleSaveOpinion(item)}
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{item.opinion}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};