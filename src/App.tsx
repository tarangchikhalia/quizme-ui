import './App.css'
import { NavBar } from './components/NavBar'
import { SearchBox } from './components/SearchBox'
import { Selector } from './components/Selector'
import { Questions } from './components/Questions'
import { useState } from 'react'
import { getQuestions } from './core/questions'
import type { Question } from './types/Questions'

function App() {
  const [searchText, setSearchText] = useState('')
  const [difficulty, setDifficulty] = useState('Beginner')
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (text: string) => {
    if (!text.trim()) {
      setError('Please enter a topic')
      return
    }

    setSearchText(text)
    setIsLoading(true)
    setError(null)
    setQuestions([])

    try {
      const fetchedQuestions = await getQuestions(text, difficulty)
      setQuestions(fetchedQuestions)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate questions'
      setError(errorMessage)
      console.error('Error fetching questions:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDifficultySelect = (selectedDifficulty: string) => {
    setDifficulty(selectedDifficulty)
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8 space-y-6">
        <SearchBox onSearch={handleSearch} />
        <Selector onSelect={handleDifficultySelect} selectedDifficulty={difficulty} />
      </div>
      
      {isLoading && (
        <div className='text-center text-2xl mb-6'>
          <span>Getting 10 questions on {searchText} with difficulty {difficulty}...</span>
        </div>
      )}
      
      {error && (
        <div className='text-center text-xl mb-6 text-red-500'>
          <span>Error: {error}</span>
        </div>
      )}
      
      {questions.length > 0 && <Questions questions={questions} />}
    </>
  )
}

export default App
