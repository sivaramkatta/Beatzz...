import React, { useContext } from "react";
import { TrackContext } from "../components/Sidebar";
import RecentPlayed from "../widgets/RecentPlayed";
import TopPicks from "../widgets/TopPicks";
import NewReleased from "../widgets/NewReleases";

function Dashboard() {
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
