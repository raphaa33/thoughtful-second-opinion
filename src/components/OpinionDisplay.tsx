import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface OpinionDisplayProps {
  opinion: string | null;
  isLoading: boolean;
}

export const OpinionDisplay = ({ opinion, isLoading }: OpinionDisplayProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Second Opinion</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
          </div>
        ) : opinion ? (
          <p className="text-lg leading-relaxed">{opinion}</p>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            Your second opinion will appear here
          </p>
        )}
      </CardContent>
    </Card>
  );
};