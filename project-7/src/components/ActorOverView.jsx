import { Stack, Typography } from "@mui/material"
import { useState } from "react";

const ActorOverView = ({ data, bio }) => {

    const [readMore, setReadMore] = useState(false)
    const [imageError, setImageError] = useState(false);

    return (
        <Stack direction='row' gap={5} px={10} justifyContent='center' alignItems='center'>
            <img src={imageError ? 'https://img.yts.mx/assets/images/actors/thumb/default_avatar.jpg' : data?.results?.image_url} alt='actor_img' style={{ borderRadius: '1rem' }} onError={() => setImageError(true)} />
            <Stack>
                <Typography variant='h4' mb={3}>{data?.results?.name}</Typography>
                {data?.results?.partial_bio ? readMore ? <Typography mb={3}>
                    {bio?.results?.biography?.bio}
                    <span onClick={() => setReadMore(false)} style={{ color: 'grey', cursor: 'pointer' }}> See less</span>
                </Typography> : <Typography mb={3}>
                    {data?.results?.partial_bio}
                    <span onClick={() => setReadMore(true)} style={{ color: 'grey', cursor: 'pointer' }}> See More</span>
                </Typography> : bio?.results?.biography?.bio ? <Typography mb={3}>{bio?.results?.biography?.bio}</Typography> : <Typography mb={3}>unknown</Typography>}
                <Typography mb={3}><span style={{ fontWeight: '800' }}>Born:</span> {data?.results?.birth_date || 'unknown'}, {data?.results?.birth_place || 'unknown'}</Typography>
                <Typography mb={3}><span style={{ fontWeight: '800' }}>Height:</span> {data?.results?.height?.match(/\(([^)]+)\)/)?.[1] || 'unknown'}</Typography>
            </Stack>
        </Stack>
    )
}

export default ActorOverView