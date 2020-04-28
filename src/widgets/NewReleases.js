import React from "react";
import { useGET } from "../utils/api";
import GenericCard from "./CommonCard";
import Loader from "react-loader-spinner";

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
          <GenericCard
            title={track.name}
            subtitle={track.artists[0].name}
            imageDetails={track.images[1]}
          />
        </div>
      );
    });
  }
  if (error) {
    return null;
  } else if (albums && albums.items && albums.items.length === 0) {
    return null;
  }
  return (
    <div>
      <h2 style={{ paddingLeft: 16, paddingTop: 24 }}>New Releases</h2>
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

export default NewReleasesWidget;
