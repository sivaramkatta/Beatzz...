import React from "react";
import { useGET } from "../utils/api";
import GenericCard from "./CommonCard";
import Loader from "react-loader-spinner";

function uniq(list) {
  let filteredList = [];
  let idList = [];
  list.forEach(item => {
    if (!idList.includes(item.track.id)) {
      idList.push(item.track.id);
      filteredList.push(item);
    }
  });
  return filteredList.slice(0, 8);
}

function RecentPlayedWidget({ setTrack }) {
  const [loading, data, error] = useGET(
    "https://api.spotify.com/v1/me/player/recently-played?limit=25"
  );
  let List = null;
  if (data.items) {
    const FilteredList = uniq(data.items);
    List = FilteredList.map(({ track }, index) => {
      return (
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
          />
        </div>
      );
    });
  }
  if (error) {
    return null;
  } else if (data && data.items && data.items.length === 0) {
    return null;
  }
  return (
    <div>
      <h2 style={{ paddingLeft: 16, paddingTop: 25 }}>Recently played</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: loading ? "center" : ""
        }}
      >
        {loading ? (
          <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
        ) : (
          !!List && List
        )}
      </div>
    </div>
  );
}

export default RecentPlayedWidget;
