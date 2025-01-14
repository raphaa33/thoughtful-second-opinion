import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
                  <span className="text-sm font-medium text-brand-600">{item.topic}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.timestamp.toLocaleDateString()}
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