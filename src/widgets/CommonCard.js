import React from "react";
import TrackDefault from "../images/defaultTrack.jpg";
import ActionList from "./TrackActions";

const GenericCard = ({
  title = "",
  subtitle = "",
  imageDetails = {},
  mini = false,
  type = null,
  uri = null,
  play_type = null,
  position = null,
  playlistID = null
}) => {
  return (
    <div
      style={{
        cursor: "pointer",
        backgroundColor: "white",
        height: mini ? 270 : type ? 320 : 300,
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
        {title}
      </p>
      {!mini && (
        <p
          style={{
            color: "grey",
            textAlign: "center",
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: 0
          }}
        >
          {subtitle}
        </p>
      )}
      {type && play_type === "track" && (
        <ActionList
          type={type}
          uri={uri}
          position={position}
          playlistID={playlistID}
        />
      )}
    </div>
  );
};

export default GenericCard;
