import React from "react";
import { useGET } from "../utils/api";
import TrackCard from "../widgets/CommonCard";
import Loader from "react-loader-spinner";
import { withRouter } from "react-router-dom";

function Category({ match, history }) {
  let { slug } = match.params;
  const [loading, data, error] = useGET(
    `https://api.spotify.com/v1/browse/categories/${slug}/playlists`
  );
  let List = null;
  if (data.playlists) {
    List = data.playlists.items.map((track, index) => {
      return (
        <div
          key={index}
          onClick={() => {
            history.push(`/playlist/${track.id}`);
          }}
        >
          <TrackCard
            isCategory={true}
            artist={""}
            track={track.name}
            imageDetails={track.images[0]}
          />
        </div>
      );
    });
  }
  return (
    <div>
      <h2 style={{ paddingLeft: 16, paddingTop: 16 }}>Playlists</h2>
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

export default withRouter(Category);
