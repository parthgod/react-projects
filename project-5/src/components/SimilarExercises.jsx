import { Box, Stack, Typography } from "@mui/material"
import HorizontalScrollBar from "./HorizontalScrollBar"
import Loader from "./Loader"

const SimilarExercises = ({ targetMucleExercises, equipmentExercises }) => {
    
    return (
        <Box sx={{ mt: { lg: '100px', xs: '0' } }}>
            <Typography variant="h3" mb={5}>
                Exercises that target the same muscle group
            </Typography>
            <Stack direction='row' p='2' position='relative'>
                {targetMucleExercises.length ? <HorizontalScrollBar data={targetMucleExercises}/>:<Loader/>}
            </Stack>
            <Typography variant="h3" mb={5}>
                Exercises that use the same equipment group
            </Typography>
            <Stack direction='row' p='2' position='relative'>
                {equipmentExercises.length ? <HorizontalScrollBar data={equipmentExercises}/>:<Loader/>}
            </Stack>
        </Box>
    )
}

export default SimilarExercises