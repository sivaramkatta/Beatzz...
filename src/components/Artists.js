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
    List = data.artists.items.map((artist, index) => {
      console.log(artist);
      return (
        <div
          key={index}
          onClick={() => {
            history.push(`/artist/${artist.id}/top-tracks`);
          }}
        >
          <ArtistCard
            name={artist.name}
            followers={artist.followers.total}
            imageDetails={artist.images[0]}
            genres={artist.genres}
          />
        </div>
      );
    });
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
