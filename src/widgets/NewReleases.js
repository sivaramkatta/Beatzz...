import React from "react";
import { useGET } from "../utils/api";
import TrackCard from "./CommonCard";

function NewReleasesWidget({ setTrack }) {
  const [loading, { albums }, error] = useGET(
    "https://api.spotify.com/v1/browse/new-releases?limit=8"
  );
  let List = null;
  if (albums) {
    List = albums.items.map((track, index) => {
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
            imageDetails={track.images[1]}
          />
        </div>
      );
    });
  }
  return (
    <div>
      <h2 style={{ paddingLeft: 16, paddingTop: 16 }}>Recently played</h2>
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

export default NewReleasesWidget;
