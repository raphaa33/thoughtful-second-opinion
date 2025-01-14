import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ResponseCustomizationProps {
  tone: string;
  onToneChange: (value: string) => void;
  adviceStyle: string;
  onAdviceStyleChange: (value: string) => void;
}

export const ResponseCustomization = ({
  tone,
  onToneChange,
  adviceStyle,
  onAdviceStyleChange,
}: ResponseCustomizationProps) => {
  const tones = [
    "Formal",
    "Casual",
    "Funny",
    "Sincere",
    "Motivational",
    "Thought-provoking",
  ];

  const adviceStyles = [
    { id: "mom", label: "Mom's Advice", description: "Warm, nurturing, protective tone" },
    { id: "family", label: "Family Advice", description: "Honest, supportive, grounded tone" },
    { id: "friend", label: "Friend's Advice", description: "Casual, relatable, light-hearted tone" },
    { id: "teacher", label: "Teacher's Advice", description: "Structured, educational, and practical" },
    { id: "colleague", label: "Colleague's Advice", description: "Professional, logical, and neutral" },
    { id: "ai", label: "Objective AI Opinion", description: "Unbiased, data-driven, and analytical" },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Response Tone</h3>
        <RadioGroup
          value={tone}
          onValueChange={onToneChange}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {tones.map((t) => (
            <div key={t} className="flex items-center space-x-2">
              <RadioGroupItem value={t} id={`tone-${t}`} />
              <Label htmlFor={`tone-${t}`}>{t}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Advice Style</h3>
        <RadioGroup
          value={adviceStyle}
          onValueChange={onAdviceStyleChange}
          className="grid gap-4"
        >
          {adviceStyles.map((style) => (
            <div
              key={style.id}
              className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-accent"
            >
              <RadioGroupItem value={style.id} id={`style-${style.id}`} className="mt-1" />
              <div className="space-y-1">
                <Label htmlFor={`style-${style.id}`} className="text-base">
                  {style.label}
                </Label>
                <p className="text-sm text-muted-foreground">{style.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};