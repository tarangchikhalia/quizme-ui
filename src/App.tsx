import './App.css'
import { NavBar } from './components/NavBar'
import { SearchBox } from './components/SearchBox'
import { Selector } from './components/Selector'
import { useState } from 'react'

function App() {
  const [searchText, setSearchText] = useState('')
  const [difficulty, setDifficulty] = useState('Easy')

  const handleSearch = (text: string) => {
    setSearchText(text)
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
      {searchText && difficulty && (
        <div className='text-center text-2xl'>
          <span>Getting 10 questions on {searchText} with difficulty {difficulty}</span>
        </div>
      )}
    </>
  )
}

export default App
