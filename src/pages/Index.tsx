import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TopicSelect } from "@/components/TopicSelect";
import { QuestionInput } from "@/components/QuestionInput";
import { OpinionDisplay } from "@/components/OpinionDisplay";
import { FileUpload } from "@/components/FileUpload";
import { useToast } from "@/components/ui/use-toast";
import { StepIndicator } from "@/components/StepIndicator";
import { ResponseCustomization } from "@/components/ResponseCustomization";
import { RequestSummary } from "@/components/RequestSummary";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useOpinions } from "@/contexts/OpinionsContext";
import { generateOpinion } from "@/utils/openai";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [opinion, setOpinion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tone, setTone] = useState("Sincere");
  const [adviceStyle, setAdviceStyle] = useState("ai");
  const { toast } = useToast();
  const { addOpinion } = useOpinions();

  const handleNext = () => {
    if (currentStep === 1 && !question.trim()) {
      toast({
        title: "Please enter your question",
        variant: "destructive",
      });
      return;
    }
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!topic) {
      toast({
        title: "Please select a topic",
        variant: "destructive",
      });
      return;
    }

    if (!question.trim()) {
      toast({
        title: "Please enter your question",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const generatedOpinion = await generateOpinion(question, tone, adviceStyle);
      setOpinion(generatedOpinion);
      addOpinion({
        topic,
        question,
        opinion: generatedOpinion,
      });
      setCurrentStep(4);

      toast({
        title: "Opinion generated successfully",
      });
    } catch (error) {
      toast({
        title: "Failed to generate opinion",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    toast({
      title: "File uploaded successfully",
      description: `${file.name} has been attached to your question`,
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Topic</label>
              <TopicSelect value={topic} onValueChange={setTopic} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Your Question</label>
              <QuestionInput value={question} onChange={setQuestion} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Attach Files (Optional)
              </label>
              <FileUpload onFileSelect={handleFileSelect} />
            </div>
          </div>
        );
      case 2:
        return (
          <ResponseCustomization
            tone={tone}
            onToneChange={setTone}
            adviceStyle={adviceStyle}
            onAdviceStyleChange={setAdviceStyle}
          />
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Review and Confirm!</h2>
            <RequestSummary
              question={question}
              tone={tone}
              adviceStyle={adviceStyle}
              selectedFile={selectedFile}
            />
          </div>
        );
      case 4:
        return <OpinionDisplay opinion={opinion} isLoading={isLoading} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          {currentStep === 1
            ? "Your trusted second opinion starts here!"
            : currentStep === 4
            ? "Here's What You Needed to Hear!"
            : "Customize Your Second Opinion"}
        </h1>
        <p className="text-xl text-muted-foreground">
          {currentStep === 1
            ? "Let us know what you want to get advice on"
            : currentStep === 4
            ? "We hope this helps with your decision"
            : "Tell us how you'd like to receive your advice"}
        </p>
      </div>

      <StepIndicator currentStep={currentStep} totalSteps={4} />

      <div className="max-w-3xl mx-auto">
        <div className="bg-card/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-border/50">
          {renderStepContent()}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            )}
            {currentStep < 4 && (
              <Button
                onClick={currentStep === 3 ? handleSubmit : handleNext}
                className="flex items-center gap-2 ml-auto"
              >
                {currentStep === 3 ? "Get Opinion" : "Next"}{" "}
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;