import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HistoryList } from "@/components/HistoryList";
import { useSavedOpinions } from "@/contexts/SavedOpinionsContext";

const SavedOpinions = () => {
  const { savedOpinions, isOpinionSaved, saveOpinion, removeSavedOpinion } = useSavedOpinions();

  if (savedOpinions.length === 0) {
    return (
      <div className="container mx-auto p-8">
        <Card>
          <CardHeader>
            <CardTitle>Saved Opinions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You haven't saved any opinions yet. Click the bookmark icon on any opinion to save it here.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <HistoryList 
        items={savedOpinions}
        isOpinionSaved={isOpinionSaved}
        saveOpinion={saveOpinion}
        removeSavedOpinion={removeSavedOpinion}
      />
    </div>
  );
};

export default SavedOpinions;