import React, { useState } from "react";
import TrackDefault from "../images/defaultTrack.jpg";
import { getItem } from "../utils/cookie";

const ArtistCard = ({
  id,
  name,
  followers,
  imageDetails = {},
  genres = []
}) => {
  const [loading, setLoading] = useState(false);
  const [result, setData] = useState(false);
  const handleOnClick = async () => {
    setLoading(true);
    await fetch(
      `https://api.spotify.com/v1/me/following?type=artist&ids=${id}`,
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${getItem("access_token")}`
        }
      }
    );
    setLoading(false);
    setData(true);
  };
  return (
    <div
      style={{
        cursor: "pointer",
        backgroundColor: "white",
        height: 350,
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
      <div
        style={{ cursor: "pointer" }}
        onClick={e => {
          e.stopPropagation();
          handleOnClick();
        }}
      >
        {!result && !loading && (
          <p
            className="link"
            style={{ textAlign: "end", color: "black", opacity: 0.9 }}
          >
            <b> Unfollow</b>
          </p>
        )}
      </div>
      {loading && (
        <p style={{ textAlign: "end", color: "#00CC00" }}>
          <b>Loading</b>
        </p>
      )}
      {result && (
        <p style={{ textAlign: "end", color: "#00CC00" }}>
          &#10003; <b>Unfollowed</b>
        </p>
      )}
    </div>
  );
};

export default ArtistCard;
