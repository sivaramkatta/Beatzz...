import React, { useContext } from "react";
import { useGET } from "../utils/api";
import TrackCard from "../widgets/CommonCard";
import { TrackContext } from "../components/Sidebar";
import Loader from "react-loader-spinner";

function Playlist({ match }) {
  const { setTrack } = useContext(TrackContext);
  let { slug } = match.params;
  const [loading, data, error] = useGET(
    `https://api.spotify.com/v1/playlists/${slug}/tracks?limit=10`
  );
  let List = null;
  if (data.items) {
    List = data.items.map(({ track }, index) => {
      return (
        <div
          key={index}
          onClick={() => {
            setTrack(`${track.type}/${track.id}`);
          }}
        >
          <TrackCard
            artist={track.artists[0].name}
            track={track.name}
            imageDetails={track.album.images[0]}
          />
        </div>
      );
    });
  }

  if (error) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 25 }}>
        <h2>something went wrong</h2>
      </div>
    );
  }
  return (
    <div>
      <h2 style={{ paddingLeft: 16, paddingTop: 16 }}>Playlists Tracks</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: loading ? "center" : ""
        }}
      >
        {loading ? (
          <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
        ) : (
          !!List && List
        )}
      </div>
    </div>
  );
}

export default Playlist;
