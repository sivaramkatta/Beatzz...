import React, { useContext } from "react";
import { useGET } from "../utils/api";
import { TrackContext } from "../components/Sidebar";

const RecentPlayed = ({ artist, track, duration, imageDetails }) => {
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

function RecentPlayedWidget({ setTrack }) {
  const [loading, data, error] = useGET(
    "https://api.spotify.com/v1/me/player/recently-played?limit=10"
  );
  let List = null;
  if (data.items) {
    List = data.items.map(({ track }) => {
      return (
        <div
          onClick={() => {
            console.log(track);
            setTrack(track.id);
          }}
        >
          <RecentPlayed
            artist={track.artists[0].name}
            track={track.name}
            duration={track.duration_ms}
            imageDetails={track.album.images[1]}
          />
        </div>
      );
    });
  }
  return (
    <div>
      <h2 style={{ paddingLeft: 16, paddingTop: 16 }}>Recently played</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        {!!List && List}
      </div>
    </div>
  );
}

function TopPicksWidget() {
  const [loading, data, error] = useGET(
    "https://api.spotify.com/v1/me/top/tracks?limit=10"
  );
  return <p>Top picks</p>;
}

function NewReleasesWidget() {
  const [loading, data, error] = useGET(
    "https://api.spotify.com/v1/browse/new-releases?limit=10"
  );
  return <p>Recent releases</p>;
}

function Dashboard() {
  const { track, setTrack } = useContext(TrackContext);
  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: -20
      }}
    >
      <RecentPlayedWidget setTrack={setTrack} />
    </div>
  );
}

export default Dashboard;
