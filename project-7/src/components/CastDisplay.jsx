import { Stack, Typography } from "@mui/material"
import ActorCard from "./ActorCard"

const CastDisplay = ({ title, data }) => {
    return (
        <>
            <Typography variant="h6" mb={3}>{title}</Typography>
            <Stack direction='row' sx={{ overflowX: 'auto' }} gap={2} borderBottom='1px solid grey' mb={3}>
                {data?.map((item, ind) => (
                    <ActorCard item={item} key={ind}/>
                ))}
            </Stack>
        </>
    )
}

export default CastDisplay