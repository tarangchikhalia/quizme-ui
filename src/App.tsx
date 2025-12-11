import './App.css'
import { NavBar } from './components/NavBar'
import { SearchBox } from './components/SearchBox'
import { useState } from 'react'

function App() {
  const [searchText, setSearchText] = useState('')

  const handleSearch = (text: string) => {
    setSearchText(text)
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <SearchBox onSearch={handleSearch} />
      </div>
      <p>{ searchText }</p>
    </>
  )
}

export default App
