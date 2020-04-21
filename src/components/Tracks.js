import React, { useContext } from "react";
import { TrackContext } from "./Sidebar";
import { useGET } from "../utils/api";
import TrackCard from "../widgets/CommonCard";
import Loader from "react-loader-spinner";

function Tracks({ match }) {
  const { setTrack } = useContext(TrackContext);
  let { slug } = match.params;
  const [loading, data, error] = useGET(
    `https://api.spotify.com/v1/artists/${slug}/top-tracks?country=IN`
  );
  let List = null;
  if (data.tracks) {
    List = data.tracks.map((track, index) => {
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
            imageDetails={track.album.images[1]}
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
      <h2 style={{ paddingLeft: 16, paddingTop: 16 }}>Top Picks from Artist</h2>
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

export default Tracks;
