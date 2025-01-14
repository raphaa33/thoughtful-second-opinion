import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SavedOpinions = () => {
  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Saved Opinions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Coming soon! Access your saved opinions here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SavedOpinions;