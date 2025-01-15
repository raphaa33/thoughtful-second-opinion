import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface OpinionDisplayProps {
  opinion: string | null;
  isLoading: boolean;
}

export const OpinionDisplay = ({ opinion, isLoading }: OpinionDisplayProps) => {
  const renderOpinionText = (text: string) => {
    // First split the text into sections by double line breaks
    const sections = text.split('\n\n').map((section, sectionIndex) => {
      // For each section, handle bold text
      const processedSection = section.split(/(\*\*.*?\*\*)/).map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <span key={`bold-${index}`} className="font-bold">
              {part.slice(2, -2)}
            </span>
          );
        }
        return <span key={`text-${index}`}>{part}</span>;
      });

      // Return each section with appropriate spacing
      return (
        <div 
          key={`section-${sectionIndex}`} 
          className={`${sectionIndex > 0 ? 'mt-6' : ''}`}
        >
          {processedSection}
        </div>
      );
    });

    return sections;
  };

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
          <div className="text-lg leading-relaxed space-y-4">
            {renderOpinionText(opinion)}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            Your second opinion will appear here
          </p>
        )}
      </CardContent>
    </Card>
  );
};