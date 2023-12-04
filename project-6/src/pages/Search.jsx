import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { genres } from '../assets/constants'
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";
import { useParams } from "react-router-dom";

const Search = () => {

  const { searchTerm } = useParams()
  const { data, isFetching, error } = useGetSongsBySearchQuery({ searchTerm })
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  console.log(data);
  const songs = data?.tracks?.hits?.map((song) => song.track)

  if (isFetching) return <Loader title='Loading songs...' />

  if (error) return <Error />

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">showing results for <span className="font-black">{searchTerm}</span></h2>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((song, i) => (
          <SongCard key={song.key} song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} data={data} />
        ))}
      </div>
    </div>
  )
}

export default Search;