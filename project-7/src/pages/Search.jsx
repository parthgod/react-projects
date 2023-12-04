import { useParams } from 'react-router-dom'
import { useGetMoviesBySearchQuery, useGetSeriesBySearchQuery } from '../redux/services/moviesApi'
import ShowMovies from '../components/ShowMovies'
import { Box, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useGlobalContext } from '../context'

const Search = () => {

  const { searchterm } = useParams()
  const { setSelectedCategory } = useGlobalContext()
  const { data: movieData } = useGetMoviesBySearchQuery(searchterm)
  const { data: seriesData } = useGetSeriesBySearchQuery(searchterm)

  useEffect(() => {
    setSelectedCategory('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <Box py={15} px={10}>
      <Stack mb={5}>
        <Typography variant='h4'>Movies</Typography>
        <ShowMovies data={movieData?.results} />
      </Stack>
      <Stack>
        <Typography variant='h4'>Series</Typography>
        <ShowMovies data={seriesData?.results} isSeries={true} />
      </Stack>
    </Box>
  )
}

export default Search