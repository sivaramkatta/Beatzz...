import React from "react";
import { useGET } from "../utils/api";
import TrackCard from "./CommonCard";

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
          <TrackCard
            artist={track.artists[0].name}
            track={track.name}
            duration={track.duration_ms}
            imageDetails={track.album.images[1]}
          />
        </div>
      );
    });
  }
  return (
    <div>
      <h2 style={{ paddingLeft: 16, paddingTop: 16 }}>Top Picks For You</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        {!!List && List}
      </div>
    </div>
  );
}

export default TopPicksWidget;
