import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface SearchBoxProps {
  onSearch: (searchText: string) => void
}

export function SearchBox({ onSearch }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState('')

  const handleSearch = () => {
    onSearch(inputValue)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="flex gap-4 max-w-3xl mx-auto">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter your search..."
        className="flex-1 h-14 px-4 text-lg rounded-base border-4 border-border shadow-shadow focus:outline-none focus:translate-x-boxShadowX focus:translate-y-boxShadowY focus:shadow-none transition-all bg-secondary-background"
      />
      <Button 
        onClick={handleSearch}
        size="lg"
        className="h-14 px-8 text-lg"
      >
        Search
      </Button>
    </div>
  )
}
