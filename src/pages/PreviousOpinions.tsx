import { HistoryList } from "@/components/HistoryList";
import { useOpinions } from "@/contexts/OpinionsContext";

const PreviousOpinions = () => {
  const { opinions } = useOpinions();

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">Previous Opinions</h1>
          <p className="text-xl text-muted-foreground">
            Review all your past second opinions
          </p>
        </div>
        <div className="bg-card/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-border/50">
          <HistoryList items={opinions} />
        </div>
      </div>
    </div>
  );
};

export default PreviousOpinions;