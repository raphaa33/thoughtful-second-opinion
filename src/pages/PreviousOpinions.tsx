import { HistoryList } from "@/components/HistoryList";

const PreviousOpinions = () => {
  // This is where we'll fetch the history items from an API or local storage
  const historyItems = [
    {
      id: "1",
      topic: "Career",
      question: "Should I accept the job offer?",
      opinion: "Based on the information provided, this opportunity aligns well with your career goals...",
      timestamp: new Date(2024, 2, 15),
    },
    {
      id: "2",
      topic: "Relationships",
      question: "How do I improve communication with my partner?",
      opinion: "Open and honest communication is key to any healthy relationship...",
      timestamp: new Date(2024, 2, 14),
    },
  ];

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
          <HistoryList items={historyItems} />
        </div>
      </div>
    </div>
  );
};

export default PreviousOpinions;