import { Stack, Typography } from "@mui/material"
import { useGetActorDetailsQuery } from "../redux/services/moviesApi"
import { Link } from "react-router-dom"
import { useState } from "react"

const ActorCard = ({ item }) => {

    const { data } = useGetActorDetailsQuery(item?.actor?.imdb_id)
    const [imageError, setImageError] = useState(false);

    return (
        <Stack alignItems='center' width='10rem' flexWrap='wrap' mb={5}>
            <Link to={`/actor/${item?.actor?.imdb_id}`}><img src={imageError ? 'https://img.yts.mx/assets/images/actors/thumb/default_avatar.jpg' : data?.results?.image_url} style={{ width: '50px', height: '50px', borderRadius: '50%', marginBottom: '0.5rem' }} onError={() => setImageError(true)} /></Link>
            <Typography textAlign='center'>{item?.actor?.name} <br /> <span style={{ color: "#969696" }}>as {item?.role}</span></Typography>
        </Stack>
    )
}

export default ActorCard