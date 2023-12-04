import GenreSelect from "../components/GenreSelect";
import { Box, Stack } from "@mui/material";
import FetchData from "../components/FetchData";
import { useGlobalContext } from "../context";
import { useEffect } from "react";

const MoviePage = () => {

    const { genreDataAPI, genres, setGenres, year, setYear, yearData } = useGlobalContext()

    useEffect(()=>{window.scrollTo({ top: 0, behavior: 'smooth' })},[])    

    if (genreDataAPI && yearData) {

        return (
            <Stack>
                <Box p={5} mt={10}>
                    <Stack direction='row' justifyContent='center' gap={10} alignItems='center' mb={5} zIndex='1'>
                        <GenreSelect item={genres} setItem={setGenres} data={genreDataAPI?.results} />
                        <GenreSelect item={year} setItem={setYear} data={yearData} />
                    </Stack>
                    <FetchData genre={genres} year={year} />
                </Box>
            </Stack>
        )
    }
}

export default MoviePage