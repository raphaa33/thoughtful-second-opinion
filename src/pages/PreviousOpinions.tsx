import { Button } from "@/components/ui/button";
import { useOpinions } from "@/contexts/OpinionsContext";
import { HistoryList } from "@/components/HistoryList";
import { useNavigate } from "react-router-dom";
import { PlusCircle, ArrowLeft } from "lucide-react";

const PreviousOpinions = () => {
  const { opinions } = useOpinions();
  const navigate = useNavigate();

  if (opinions.length === 0) {
    return (
      <div className="container mx-auto p-8">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800">No Opinions Yet</h1>
          <p className="text-xl text-muted-foreground max-w-md">
            You haven't created any second opinions yet. Start by creating your first one!
          </p>
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="gap-2"
          >
            <PlusCircle className="h-5 w-5" />
            Make Your First Second Opinion
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="flex items-center gap-4">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-4xl font-bold text-gray-800">Previous Opinions</h1>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          New Opinion
        </Button>
      </div>
      <HistoryList items={opinions} />
    </div>
  );
};

export default PreviousOpinions;