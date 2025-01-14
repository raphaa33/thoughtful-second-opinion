import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PopularQuestions = () => {
  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Popular Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Coming soon! Browse and learn from popular questions asked by others.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PopularQuestions;