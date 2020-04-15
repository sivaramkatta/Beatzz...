import React from "react";
import TrackDefault from "../images/defaultTrack.jpg";

const ArtistCard = ({ name, followers, imageDetails = {}, genres = [] }) => {
  return (
    <div
      style={{
        cursor: "pointer",
        backgroundColor: "white",
        height: 330,
        padding: 16,
        width: 230,
        margin: 12,
        borderRadius: 4,
        boxShadow: "1px 1px  10px #888888"
      }}
    >
      <img
        src={imageDetails.url ? imageDetails.url : TrackDefault}
        alt="img"
        style={{ height: 200, width: 200, borderRadius: 4 }}
      />
      <p
        style={{
          textAlign: "center",
          fontWeight: 600,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          margin: 0,
          marginTop: 8
        }}
      >
        {name}
      </p>
      {genres.length > 0 && (
        <p
          style={{
            color: "grey",
            textAlign: "center",
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "hidden",
            margin: 8
          }}
        >
          <i> {genres.join(", ")}</i>
        </p>
      )}
      <p
        style={{
          color: "#909090",
          textAlign: "center",
          fontWeight: 600,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          margin: 0
        }}
      >
        Followers: {followers}
      </p>
    </div>
  );
};

export default ArtistCard;
