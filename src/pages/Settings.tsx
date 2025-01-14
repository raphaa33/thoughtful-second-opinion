import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Coming soon! Customize your experience here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;