import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface QuestionCardProps {
  question: string
  options: string[]
  correctAnswer: number
  selectedOption: number | null
  onSelectOption: (index: number) => void
  submitted: boolean
}

export function QuestionCard({ 
  question, 
  options, 
  correctAnswer, 
  selectedOption, 
  onSelectOption, 
  submitted 
}: QuestionCardProps) {
  const getCardColor = () => {
    if (!submitted) return 'bg-secondary-background'
    return selectedOption === correctAnswer ? 'bg-green-400' : 'bg-red-400'
  }

  return (
    <Card className={`${getCardColor()} transition-colors border-4`}>
      <CardHeader>
        <CardTitle className="text-xl">{question}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col gap-3">
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => !submitted && onSelectOption(index)}
              disabled={submitted}
              className={`flex items-center gap-3 cursor-pointer p-3 rounded-base border-2 border-border hover:translate-x-1 hover:translate-y-1 transition-transform ${
                selectedOption === index ? 'bg-main text-main-foreground' : 'bg-secondary-background'
              }`}
            >
              <span className="text-base font-base">{option}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
