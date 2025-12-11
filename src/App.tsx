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
    </>
  )
}

export default App
