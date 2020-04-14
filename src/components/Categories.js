import React from "react";
import { useGET } from "../utils/api";
import TrackCard from "../widgets/CommonCard";
import Loader from "react-loader-spinner";
import { withRouter } from "react-router-dom";

function Categories({ history }) {
  const [loading, data, error] = useGET(
    "https://api.spotify.com/v1/browse/categories?limit=10&country=IN"
  );
  let List = null;
  if (data.categories) {
    List = data.categories.items.map((track, index) => {
      return (
        <div
          key={index}
          onClick={() => {
            history.push(`/category/${track.id}`);
          }}
        >
          <TrackCard
            isCategory={true}
            artist={""}
            track={track.name}
            imageDetails={track.icons[0]}
          />
        </div>
      );
    });
  }
  return (
    <div>
      <h2 style={{ paddingLeft: 16, paddingTop: 16 }}>Genre</h2>
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

export default withRouter(Categories);
