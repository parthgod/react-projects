import { Box, Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { useGetMovieDetailsQuery, useGetSeriesDetailsQuery } from "../redux/services/moviesApi"
import { useState } from "react"

const Card = ({ tempData, isSeries }) => {

    const [imageError, setImageError] = useState(false);
    let data = [];

    if (isSeries) {
        const { data: showData } = useGetSeriesDetailsQuery(tempData?.imdb_id)
        data = showData?.results
    }
    else {
        const { data: showData } = useGetMovieDetailsQuery(tempData?.imdb_id)
        data = showData?.results
    }

    return (
        <Box sx={{ cursor: 'pointer' }} p={2} width='180px' className='card-hover'>
            <Link to={data?.type === 'series' ? `/seriesdetail/${data?.imdb_id}` : `/moviedetail/${data?.imdb_id}`} style={{ textDecoration: 'none', justifyContent: 'center', alignItems: 'center' }}>
                <Stack justifyContent='center' alignItems='center' color='white'>
                    <img src={imageError ? 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg' : data?.banner} alt="img" style={{ width: '150px', height: '222px' }} onError={() => setImageError(true)} />
                    <Typography mt={1} fontSize={17}>
                        {data?.title}
                    </Typography>
                </Stack>
            </Link>
        </Box>
    )
}

export default Card