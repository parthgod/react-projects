import './App.css'
import { Routes, Route } from 'react-router-dom'
import MoviePage from './pages/MoviePage'
import MovieDetails from './pages/MovieDetails'
import SeriesDetails from './pages/SeriesDetails'
import NavBar from './components/NavBar'
import Library from './pages/Library'
import Search from './pages/Search'
import SeriesPage from './pages/SeriesPage'
import ActorDetails from './pages/ActorDetails'

function App() {

  return (
    <>
    <NavBar />
      <Routes>
        <Route path='/' element={<MoviePage />} />
        <Route path='/series' element={<SeriesPage />} />
        <Route path='/favs' element={<Library />} />
        <Route path='/search/:searchterm' element={<Search />} />
        <Route path='/moviedetail/:id' element={<MovieDetails />} />
        <Route path='/seriesdetail/:id' element={<SeriesDetails />} />
        <Route path='/actor/:id' element={<ActorDetails />} />
      </Routes>
    </>
  )
}

export default App
