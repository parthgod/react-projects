import { Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useGetActorBioQuery, useGetActorDetailsQuery, useGetActorMoviesQuery, useGetActorSeriesQuery } from '../redux/services/moviesApi'
import Card from '../components/Card'
import { useGlobalContext } from '../context'
import { useEffect } from 'react'
import ActorOverView from '../components/ActorOverView'

const ActorDetails = () => {

    const { id } = useParams()
    const { data } = useGetActorDetailsQuery(id)
    const { data: bio } = useGetActorBioQuery(id)
    const { data: movies } = useGetActorMoviesQuery(id)
    const { data: series } = useGetActorSeriesQuery(id)
    const { setSelectedCategory } = useGlobalContext()

    useEffect(() => { setSelectedCategory('') }, [id])

    return (
        <Stack py={15}>
            <ActorOverView data={data} bio={bio}/>
            {movies?.results?.length ? <Stack py={3} px={8}>
                <Typography variant='h5' fontWeight='bold'>Popular Movies of {data?.results?.name}</Typography>
                <Stack direction='row' overflow='auto' gap={5}>
                    {movies?.results?.map((item, ind) => (
                        <Card tempData={item[0]} key={ind} />
                    ))}
                </Stack>
            </Stack> : ''}
            {series?.results?.length ? <Stack py={3} px={8}>
                <Typography variant='h5' fontWeight='bold'>Popular Series of {data?.results?.name}</Typography>
                <Stack direction='row' overflow='auto' gap={5}>
                    {series?.results?.map((item, ind) => (
                        <Card key={ind} tempData={item[0]} isSeries={true} />
                    ))}
                </Stack>
            </Stack> : ""}
        </Stack>
    )
}

export default ActorDetails