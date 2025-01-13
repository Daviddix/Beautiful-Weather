import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import SearchResult from './Pages/SearchResult/SearchResult'

function App() {
  return (
    <Routes>
      <Route element={<Home />} path='/'/>
      <Route element={<SearchResult />} path='/search/:state'/>
    </Routes>
  )
}

export default App
