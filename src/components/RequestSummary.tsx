import { Card, CardContent } from "@/components/ui/card";

interface RequestSummaryProps {
  question: string;
  tone: string;
  adviceStyle: string;
  selectedFile: File | null;
}

export const RequestSummary = ({
  question,
  tone,
  adviceStyle,
  selectedFile,
}: RequestSummaryProps) => {
  const getAdviceStyleLabel = (id: string) => {
    const styles: Record<string, string> = {
      mom: "Mom's Advice",
      family: "Family Advice",
      friend: "Friend's Advice",
      teacher: "Teacher's Advice",
      colleague: "Colleague's Advice",
      ai: "Objective AI Opinion",
    };
    return styles[id] || id;
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Your Question</h4>
          <p className="text-base">{question}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Response Tone</h4>
          <p className="text-base">{tone}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Advice Style</h4>
          <p className="text-base">{getAdviceStyleLabel(adviceStyle)}</p>
        </div>
        {selectedFile && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Attached File</h4>
            <p className="text-base">{selectedFile.name}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};