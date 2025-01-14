import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import SearchResult from './Pages/SearchResult/SearchResult'
import { useState } from 'react'

type AddedCountriesArray = string[]

function App() {
  const [allAddedCountries, setAllAddedCountries] = useState<AddedCountriesArray>([])

  return (
    <Routes>
      <Route element={<Home 
      allAddedCountries={allAddedCountries} 
      setAllAddedCountries={setAllAddedCountries} 
      />} path='/'/>

      <Route element={<SearchResult 
      allAddedCountries={allAddedCountries} 
      setAllAddedCountries={setAllAddedCountries}
      />} path='/search/:state'/>
    </Routes>
  )
}

export default App
