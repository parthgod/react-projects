import { useParams } from 'react-router-dom'
import { useGetMovieCastQuery, useGetMovieDetailsQuery } from '../redux/services/moviesApi'
import DetailsComponent from '../components/DetailsComponent';
import { useEffect } from 'react';

const MovieDetails = () => {

  const { id } = useParams()
  const { data: movieData } = useGetMovieDetailsQuery(id)
  const { data: castData } = useGetMovieCastQuery(id)

  useEffect(()=>{window.scrollTo({ top: 0, behavior: 'smooth' })},[])

  return (
    <DetailsComponent data={movieData} castData={castData} />
  )
}

export default MovieDetails