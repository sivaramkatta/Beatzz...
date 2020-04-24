import React, { useContext } from "react";
import { TrackContext } from "../components/Sidebar";
import RecentPlayed from "../widgets/RecentPlayed";
import TopPicks from "../widgets/TopPicks";
import NewReleased from "../widgets/NewReleases";
import { useGET } from "../utils/api";
import { setItem } from "../utils/cookie";

function Dashboard() {
  const [, data] = useGET("https://api.spotify.com/v1/me");
  if (data.id) {
    setItem("user", JSON.stringify(data));
  }
  const { setTrack } = useContext(TrackContext);
  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: -20
      }}
    >
      <RecentPlayed setTrack={setTrack} />
      <TopPicks setTrack={setTrack} />
      <NewReleased setTrack={setTrack} />
    </div>
  );
}

export default Dashboard;
