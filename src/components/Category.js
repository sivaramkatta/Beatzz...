import React from "react";
import { useGET } from "../utils/api";
import GenericCard from "../widgets/CommonCard";
import Loader from "react-loader-spinner";
import { withRouter } from "react-router-dom";

function Category({ match, history }) {
  let { slug } = match.params;
  const [loading, data, error] = useGET(
    `https://api.spotify.com/v1/browse/categories/${slug}/playlists`
  );
  let List = null;
  if (data.playlists) {
    List = data.playlists.items.map((playlist, index) => {
      return (
        <div
          key={index}
          onClick={() => {
            history.push(`/playlist/${playlist.id}?ref=category`);
          }}
        >
          <GenericCard
            title={playlist.name}
            imageDetails={playlist.images[0]}
            mini={true}
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
