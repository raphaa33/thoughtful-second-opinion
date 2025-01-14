import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TopicSelect } from "@/components/TopicSelect"
import { QuestionInput } from "@/components/QuestionInput"
import { OpinionDisplay } from "@/components/OpinionDisplay"
import { HistoryList } from "@/components/HistoryList"
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

  return (
    <div className="p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-brand-900">Second Opinion</h1>
        <p className="text-xl text-muted-foreground">
          Get expert insights on any topic
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <div className="space-y-4 bg-white p-6 rounded-xl shadow-sm">
            <TopicSelect value={topic} onValueChange={setTopic} />
            <QuestionInput value={question} onChange={setQuestion} />
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full md:w-auto"
            >
              Get Second Opinion
            </Button>
          </div>
          <OpinionDisplay opinion={opinion} isLoading={isLoading} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <HistoryList items={history} />
        </div>
      </div>
    </div>
  )
}

export default Index