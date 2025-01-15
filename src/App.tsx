import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import SearchResult from './Pages/SearchResult/SearchResult'
import { useLayoutEffect, useState } from 'react'

type AddedCountriesArray = string[]

function App() {
  const [allAddedCountries, setAllAddedCountries] = useState<AddedCountriesArray>([])
  const [isNight, setIsNight] = useState(false)

  function checkTime(){
    const dateObject = new Date
    const currentHours = dateObject.getHours()
    if (currentHours >= 19 || currentHours < 6) {
      setIsNight(true)
  } else {
    setIsNight(false)
  }
  }

  useLayoutEffect(()=>{
    checkTime()
  }, [])

  return (
    <Routes>
      <Route element={<Home 
      isNight={isNight}
      allAddedCountries={allAddedCountries} 
      setAllAddedCountries={setAllAddedCountries} 
      />} path='/'/>

      <Route element={<SearchResult 
      isNight={isNight}
      allAddedCountries={allAddedCountries} 
      setAllAddedCountries={setAllAddedCountries}
      />} path='/search/:state'/>
    </Routes>
  )
}

export default App
