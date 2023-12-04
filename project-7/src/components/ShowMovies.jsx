import { Stack } from '@mui/material';
import Card from './Card';
import { useGlobalContext } from '../context';

const ShowMovies = ({ data, isSeries }) => {

    const { selectedCategory } = useGlobalContext()

    return (
        <Stack direction='row' sx={selectedCategory ? { flexWrap: 'wrap', justifyContent: selectedCategory === 'Favs' ? 'flex-start' : 'center' } : { overflow: 'auto' }} gap={3}>
            {data?.map((movieData, ind) => (
                <Card key={ind} tempData={movieData} isSeries={isSeries} />
            ))}
        </Stack>
    );
};

export default ShowMovies;