import React, { useState, useContext } from "react";
import { TrackContext } from "../components/Sidebar";
import { useGET } from "../utils/api";
import GenericCard from "../widgets/CommonCard";
import TopPicks from "../widgets/TopPicks";

function Search() {
  const [text, setText] = useState("");
  const [showText, setShowText] = useState(false);
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
        <GenericCard
          title={track.name}
          subtitle={track.artists[0].name}
          imageDetails={track.album.images[1]}
          type="Add to Playlist"
          uri={track.uri}
          play_type={track.type}
        />
      </div>
    ));
  }

  if (error) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 25 }}>
        <h2>something went wrong</h2>
      </div>
    );
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          placeholder="Search tracks or albums"
          style={{
            backgroundColor: "#fafafa",
            outline: "#ffffff",
            marginTop: 25,
            textAlign: "center",
            height: 45,
            borderColor: "black",
            borderRadius: 25,
            fontSize: 16,
            padding: 16,
            width: 300,
            overlay: "none",
            boxShadow: "1px 1px  10px #888888"
          }}
          value={text}
          onChange={e => {
            setText(e.target.value);
            if (e.target.value) {
              setShowText(true);
            } else {
              setShowText(false);
            }
          }}
        />
      </div>
      {data.tracks && data.tracks.items.length === 0 && showText ? (
        <h3
          style={{
            textAlign: "center",
            color: "grey",
            padding: 20,
            paddingTop: 50
          }}
        >
          0 search results
        </h3>
      ) : null}
      {List.length > 0 && text ? (
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: 50 }}>
          {List}
        </div>
      ) : (
        <TopPicks setTrack={setTrack} />
      )}
    </div>
  );
}

export default Search;
