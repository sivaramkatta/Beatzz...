import React from "react";
import TrackDefault from "../images/defaultTrack.jpg";

const TrackCard = ({
  artist,
  track,
  imageDetails = {},
  isCategory = false
}) => {
  return (
    <div
      style={{
        cursor: "pointer",
        backgroundColor: "white",
        height: isCategory ? 280 : 300,
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
        {track}
      </p>
      {!isCategory && (
        <p
          style={{
            color: "grey",
            textAlign: "center",
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {artist}
        </p>
      )}
    </div>
  );
};

export default TrackCard;
