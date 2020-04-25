import React, { useContext } from "react";
import { TrackContext } from "./Sidebar";
import { useGET } from "../utils/api";
import GenericCard from "../widgets/CommonCard";
import Loader from "react-loader-spinner";

function Tracks({ match }) {
  const { setTrack } = useContext(TrackContext);
  let { slug } = match.params;
  const [loading, data, error] = useGET(
    `https://api.spotify.com/v1/artists/${slug}/top-tracks?country=IN`
  );
  let List = null;
  if (data.tracks) {
    List = data.tracks.map((track, index) => {
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
            type="Add to Playlist"
            uri={track.uri}
            play_type={track.type}
          />
        </div>
      );
    });
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: 24
        }}
      >
        <h2 style={{ margin: 0, paddingRight: 50 }}>Top Picks from Artist</h2>
        <div
          style={styles.ButtonContainer}
          onClick={() => {
            setTrack(`artist/${slug}`);
          }}
        >
          <p style={styles.LoginLink}>{`Play All`}</p>
        </div>
      </div>
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

export default Tracks;

const styles = {
  LoginLink: {
    color: "#000000",
    fontSize: 15,
    textAlign: "center",
    paddingTop: 7,
    fontWeight: 600,
    margin: 0
  },
  ButtonContainer: {
    backgroundColor: "#1DB954",
    borderRadius: 50,
    height: 35,
    width: 100,
    boxShadow: "1px 1px 6px grey"
  }
};
