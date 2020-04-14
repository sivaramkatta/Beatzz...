import React, { useState, useContext } from "react";
import Loader from "react-loader-spinner";
import { TrackContext } from "../components/Sidebar";
import { useGET } from "../utils/api";
import TrackCard from "../widgets/CommonCard";
import TopPicks from "../widgets/TopPicks";

function Search() {
  const [text, setText] = useState(" ");
  const { setTrack } = useContext(TrackContext);
  const [
    loading,
    data,
    error
  ] = useGET(
    `https://api.spotify.com/v1/search?q=${encodeURI(text)}&type=track`,
    [text]
  );
  let List = [];
  if (data.tracks) {
    List = data.tracks.items.map((track, index) => (
      <div
        key={index}
        onClick={() => {
          setTrack(`${track.type}/${track.id}`);
        }}
      >
        <TrackCard
          artist={track.artists[0].name}
          track={track.name}
          duration={track.duration_ms}
          imageDetails={track.album.images[1]}
        />
      </div>
    ));
  }
  return (
    <div>
      <input
        style={{
          outline: "#ffffff",
          width: "100",
          height: 35,
          borderColor: "black",
          borderRadius: 25,
          fontSize: 18,
          padding: 10,
          overlay: "none"
        }}
        value={text}
        onChange={e => {
          setText(e.target.value);
        }}
      />
      {List.length > 0 && text ? (
        <div style={{ display: "flex", flexWrap: "wrap" }}>{List}</div>
      ) : (
        <TopPicks />
      )}
    </div>
  );
}

export default Search;
