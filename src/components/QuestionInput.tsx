import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface QuestionInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export const QuestionInput = ({ value, onChange, maxLength = 500 }: QuestionInputProps) => {
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length <= maxLength) {
      onChange(newValue);
      setCharCount(newValue.length);
    }
  };

  return (
    <div className="space-y-2">
      <Textarea
        placeholder="Type your question here..."
        value={value}
        onChange={handleChange}
        className="min-h-[120px] resize-none"
      />
      <div className="text-sm text-muted-foreground text-right">
        {charCount}/{maxLength} characters
      </div>
    </div>
  );
};