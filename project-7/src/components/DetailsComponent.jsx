import { CircularProgress, Stack, Typography, Button, Box, Grid } from "@mui/material"
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { useGlobalContext } from "../context";
import CastDisplay from "./CastDisplay";
import { useState } from "react";

const DetailsComponent = ({ data, castData }) => {

    const { favs, setFavs, isFav, setIsFav } = useGlobalContext()
    const [imageError, setImageError] = useState(false);

    const handleAddToFav = () => {
        setFavs((prev) => [...prev, data?.results])
        setIsFav((prev) => ({ ...prev, [data?.results?.imdb_id]: true }))
    }

    const handleRemoveFromFav = () => {
        console.log(favs);
        setFavs((prev) => prev.filter((item) => item !== data?.results))
        setIsFav((prev) => ({ ...prev, [data?.results?.imdb_id]: false }))
    }

    return (
        <Stack>
            <Stack direction='row' justifyContent='center' alignItems='center' py={10} gap={15} mt={5}>
                <Stack gap={3} alignItems='start'>
                    <img src={imageError ? 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg' : data?.results?.banner} style={{ width: '250px', height: '370px', border: '2px solid #FF5733' }} onError={() => setImageError(true)} />
                    {!isFav?.[data?.results?.imdb_id] ? <Button startIcon={<BookmarkAddIcon />} color='success' variant='contained' onClick={handleAddToFav} sx={{ width: '250px' }}>Add to favs</Button>
                        : <Button startIcon={<BookmarkRemoveIcon />} color='error' variant='contained' onClick={handleRemoveFromFav} sx={{ width: '250px' }}>Remove from favs</Button>}
                </Stack>
                <Stack alignItems='start'>
                    <Typography py={3} variant="h3">
                        {data?.results?.title}
                    </Typography>
                    <Typography py={2} variant="h5">
                        {data?.results?.type === 'movie' ? data?.results?.year : `${data?.results?.start_year} - ${data?.results?.end_year === 0 ? '' : data?.results?.end_year}`}
                    </Typography>
                    <Stack direction='row' flexWrap='wrap' gap={1.5}>
                        {data?.results?.gen?.map((item) => (
                            <Typography variant="h6" key={item?.id}>
                                {item?.genre}
                            </Typography>
                        ))}
                    </Stack>
                    <Stack direction='row' alignItems='center' gap={4} sx={{ transform: 'scale(1.5)' }} px={3.3} mt={4} mb={3}>
                        <img src='data:image/png;base64,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' style={{ borderRadius: '5px', width: '50px', height: '30px' }} />
                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                            <CircularProgress variant="determinate" value={data?.results?.rating * 10} sx={{ color: '#FF5733' }} />
                            <Box
                                sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column'
                                }}
                            >
                                <Typography variant="caption">
                                    {data?.results?.rating}
                                </Typography>
                            </Box>
                        </Box>
                    </Stack>
                    <Grid container spacing={{ xs: 2, md: 3 }} rowSpacing={3} columnSpacing={{ xs: 0, sm: 1, md: 1.5 }} py={3}>
                        {data?.results?.keywords?.map((item, index) => (
                            <Grid item xs={2} sm={4} md={4} key={index} textAlign='center'>
                                <Typography sx={{ border: '1px solid grey', py: '0.5rem' }} >{item.keyword}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </Stack>
            <Stack direction='row' px={5} gap={8}>
                <Stack width='50%'>
                    <Typography variant="h6">Plot Summary</Typography>
                    <Typography color='#969696' textAlign='justify'>{data?.results?.description}</Typography>
                </Stack>
                <Stack>
                    <Typography variant="h6">Trailer</Typography>
                    {data?.results?.trailer ? <iframe
                        title="trailer"
                        width="560"
                        height="315"
                        src={data?.results?.trailer}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe> : <Typography>Trailer not available</Typography>}
                </Stack>
            </Stack>
            <Stack p={5}>
                <CastDisplay title='Crew' data={castData?.results?.roles?.filter((item) => item?.role === 'Director' || item?.role === 'Writer')?.slice(0, 5)} />
                <CastDisplay title='Actors' data={castData?.results?.roles?.filter((item) => item?.role !== 'Director' && item?.role !== 'Writer')?.slice(0, 8)} />
            </Stack>
        </Stack >
    )
}

export default DetailsComponent