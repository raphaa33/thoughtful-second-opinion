import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const topics = [
  "Health & Medical",
  "Technology",
  "Finance",
  "Legal",
  "Career",
  "Education",
  "Relationships",
  "Home & Living",
];

interface TopicSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const TopicSelect = ({ value, onValueChange }: TopicSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full md:w-[280px]">
        <SelectValue placeholder="Select a topic" />
      </SelectTrigger>
      <SelectContent>
        {topics.map((topic) => (
          <SelectItem key={topic} value={topic}>
            {topic}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};