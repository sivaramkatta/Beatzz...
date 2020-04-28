import React from "react";
import { useGET } from "../utils/api";
import GenericCard from "./CommonCard";
import Loader from "react-loader-spinner";

function TopPicksWidget({ setTrack }) {
  const [loading, data, error] = useGET(
    "https://api.spotify.com/v1/me/top/tracks?limit=8"
  );
  let List = null;
  if (data.items) {
    List = data.items.map((track, index) => {
      return (
        <div
          key={index}
          onClick={() => {
            setTrack(`${track.type}/${track.id}`);
          }}
        >
          <GenericCard
            title={track.name}
            subtitle={track.artists[0].name}
            imageDetails={track.album.images[1]}
            type="Add to Playlist"
            uri={track.uri}
            play_type={track.type}
          />
        </div>
      );
    });
  }
  if (error) {
    return null;
  } else if (data && data.items && data.items.length === 0) {
    return null;
  }
  return (
    <div>
      <h2 style={{ paddingLeft: 16, paddingTop: 24 }}>Top Picks For You</h2>
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

export default TopPicksWidget;
