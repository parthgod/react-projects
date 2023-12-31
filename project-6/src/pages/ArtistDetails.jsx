import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {

  const { id: artistId } = useParams()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery({ artistId })
  // console.log(Object.values(artistData?.resources?.songs));

  if (isFetchingArtistDetails) return <Loader title='Loading artist details...' />

  if (error) return <Error />

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData?.resources} />
      <RelatedSongs data={Object.values(artistData?.resources?.songs)} isPlaying={isPlaying} activeSong={activeSong} artistId={artistId} />
    </div>
  )

}

export default ArtistDetails;