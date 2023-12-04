import { Box, Stack, Typography } from '@mui/material'
import { useGlobalContext } from '../context'
import ShowMovies from '../components/ShowMovies'
import { useEffect } from 'react'

const Library = () => {

  const { favs } = useGlobalContext()
  const movieFavs = favs?.filter((item) => item.type==='movie')
  const seriesFavs = favs?.filter((item) => item.type==='series')

  useEffect(()=>{window.scrollTo({ top: 0, behavior: 'smooth' })},[])

  return (
    <>
      {favs.length ? <Box py={15} px={5}>
        {movieFavs.length ? <Stack mb={5}>
          <Typography variant='h4'>Movies</Typography>
          <ShowMovies data={movieFavs} />
        </Stack>:''}
        {seriesFavs.length ? <Stack>
          <Typography variant='h4'>Series</Typography>
          <ShowMovies data={seriesFavs} isSeries={true} />
        </Stack>:''}
      </Box> : <Typography py={15} px={5} variant='h3'>Nothing to show</Typography>}
    </>
  )
}

export default Library