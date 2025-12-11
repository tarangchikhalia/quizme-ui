import { QuestionCard } from './QuestionCard'
import { ScoreCard } from './ScoreCard'
import { Progress } from './ui/progress'
import { Button } from './ui/button'
import questionsData from '../questions.json'
import { useState } from 'react'

interface Question {
  question: string
  options: string[]
  correct: number
}

export function Questions() {
  const questions: Question[] = questionsData
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  )
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const passingScore = 8

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[questionIndex] = optionIndex
    setSelectedAnswers(newAnswers)
  }

  const handleSubmitAll = () => {
    if (!submitted) {
      setSubmitted(true)
      let correctCount = 0
      selectedAnswers.forEach((answer, index) => {
        if (answer === questions[index].correct) {
          correctCount++
        }
      })
      setScore(correctCount)
    }
  }

  const answeredCount = selectedAnswers.filter(answer => answer !== null).length
  const progressPercentage = (answeredCount / questions.length) * 100

  return (
    <>
      <ScoreCard score={score} totalQuestions={questions.length} passingScore={passingScore} />
      
      <div className="container mx-auto px-4 py-8 pb-24">
        <div className="max-w-3xl mx-auto space-y-6">
          {questions.map((q, index) => (
            <QuestionCard
              key={index}
              question={q.question}
              options={q.options}
              correctAnswer={q.correct}
              selectedOption={selectedAnswers[index]}
              onSelectOption={(optionIndex) => handleSelectOption(index, optionIndex)}
              submitted={submitted}
            />
          ))}
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-secondary-background border-t-4 border-border p-4 shadow-shadow">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="font-heading text-sm whitespace-nowrap">
              {answeredCount} / {questions.length}
            </span>
            <Progress value={progressPercentage} className="flex-1" />
            <Button 
              onClick={handleSubmitAll}
              disabled={answeredCount === 0 || submitted}
              className="min-w-32"
            >
              Submit All
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
