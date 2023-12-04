import { Error, Loader, ArtistCard } from "../components";
import { genres } from '../assets/constants'
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopArtists = () => {

    const { data, isFetching, error } = useGetTopChartsQuery()

    if (isFetching) return <Loader title='Loading songs...' />

    if (error) return <Error />

    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left">Top Artists</h2>
            </div>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.tracks?.map((track, i) => (
                    <ArtistCard key={track.key} track={track} />
                ))}
            </div>
        </div>
    )
}

export default TopArtists;