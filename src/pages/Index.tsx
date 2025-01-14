import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TopicSelect } from "@/components/TopicSelect"
import { QuestionInput } from "@/components/QuestionInput"
import { OpinionDisplay } from "@/components/OpinionDisplay"
import { HistoryList } from "@/components/HistoryList"
import { FileUpload } from "@/components/FileUpload"
import { useToast } from "@/components/ui/use-toast"

interface HistoryItem {
  id: string
  topic: string
  question: string
  opinion: string
  timestamp: Date
}

const Index = () => {
  const [topic, setTopic] = useState("")
  const [question, setQuestion] = useState("")
  const [opinion, setOpinion] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (!topic) {
      toast({
        title: "Please select a topic",
        variant: "destructive",
      })
      return
    }

    if (!question.trim()) {
      toast({
        title: "Please enter your question",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call - replace with actual API integration
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const newOpinion = `Here's a thoughtful second opinion about ${topic.toLowerCase()}: ${question}`
      
      setOpinion(newOpinion)
      setHistory((prev) => [
        {
          id: Date.now().toString(),
          topic,
          question,
          opinion: newOpinion,
          timestamp: new Date(),
        },
        ...prev,
      ])

      toast({
        title: "Opinion generated successfully",
      })
    } catch (error) {
      toast({
        title: "Failed to generate opinion",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    toast({
      title: "File uploaded successfully",
      description: `${file.name} has been attached to your question`,
    });
  };

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          You are one opinion away
        </h1>
        <p className="text-xl text-muted-foreground">
          Let us know what you want to get advice on
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[2fr,1fr] max-w-6xl mx-auto">
        <div className="space-y-6">
          <div className="bg-card/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-border/50">
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
                <label className="text-sm font-medium text-gray-700">Attach Files (Optional)</label>
                <FileUpload onFileSelect={handleFileSelect} />
              </div>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white"
              >
                Get Second Opinion
              </Button>
            </div>
          </div>
          <OpinionDisplay opinion={opinion} isLoading={isLoading} />
        </div>

        <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-border/50">
          <HistoryList items={history} />
        </div>
      </div>
    </div>
  )
}

export default Index