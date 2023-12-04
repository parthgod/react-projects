import { useGetMoviesQuery, useGetSeriesQuery } from '../redux/services/moviesApi';
import ShowMovies from './ShowMovies'

const FetchData = ({ genre, year, isSeries }) => {

    let data = [];    

    if (isSeries) {
        const { data: temp } = useGetSeriesQuery({ year, genre });
        data = temp;
    }
    else {
        const { data: temp } = useGetMoviesQuery({ year, genre });
        data = temp;
    }

    return (
        <ShowMovies data={data?.results} isSeries={isSeries} />
    )
};

export default FetchData;