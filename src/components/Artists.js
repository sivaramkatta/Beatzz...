import React from "react";
import { useGET } from "../utils/api";
import ArtistCard from "../widgets/ArtistCard";
import Loader from "react-loader-spinner";
import { withRouter } from "react-router-dom";

function Artists({ history }) {
  const [loading, data, error] = useGET(
    "https://api.spotify.com/v1/me/following?type=artist&limit=50"
  );
  let List = null;
  if (data.artists) {
    if (data.artists.items.length === 0) {
      List = (
        <h3
          style={{
            textAlign: "center",
            color: "grey",
            flex: 1
          }}
        >
          You dont follow any Artist
        </h3>
      );
    } else {
      List = data.artists.items.map((artist, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              history.push(`/artist/${artist.id}/top-tracks`);
            }}
          >
            <ArtistCard
              id={artist.id}
              name={artist.name}
              followers={artist.followers.total}
              imageDetails={artist.images[0]}
              genres={artist.genres}
            />
          </div>
        );
      });
    }
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
      <h2 style={{ paddingLeft: 16, paddingTop: 16 }}>Artists You Follow</h2>
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

export default withRouter(Artists);
