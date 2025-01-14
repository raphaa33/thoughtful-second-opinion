import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AskFriend = () => {
  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Ask a Friend</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Coming soon! Share your questions with friends and get their opinions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AskFriend;