import React from "react";

const TrackCard = ({ artist, track, imageDetails }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        height: 300,
        padding: 16,
        width: 230,
        margin: 12,
        borderRadius: 4,
        boxShadow: "1px 1px  10px #888888"
      }}
    >
      <img
        src={imageDetails.url}
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
    </div>
  );
};

export default TrackCard;
