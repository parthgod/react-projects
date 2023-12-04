import { useParams } from 'react-router-dom'
import { useGetSeriesDetailsQuery, useGetSeriesCastQuery, useGetSeasonsQuery, useGetEpisodesQuery } from '../redux/services/moviesApi'
import DetailsComponent from '../components/DetailsComponent';
import SeasonDetails from '../components/SeasonDetails';
import { useEffect, useState } from 'react';

const SeriesDetails = () => {

  const { id } = useParams()
  const [season, setSeason] = useState(1)

  const { data: seriesData } = useGetSeriesDetailsQuery(id)
  const { data: castData } = useGetSeriesCastQuery(id)
  const { data: seasons } = useGetSeasonsQuery(id)

  useEffect(()=>{window.scrollTo({ top: 0, behavior: 'smooth' })},[])

  return (
    <>
      <DetailsComponent data={seriesData} castData={castData} />
      <SeasonDetails seasons={seasons} id={id} season={season} setSeason={setSeason} />
    </>
  )
}

export default SeriesDetails