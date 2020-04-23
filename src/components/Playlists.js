import React from "react";
import { useGET } from "../utils/api";
import TrackCard from "../widgets/CommonCard";
import Loader from "react-loader-spinner";
import { withRouter } from "react-router-dom";

function Playlists({ history }) {
  const [loading, data, error] = useGET(
    "https://api.spotify.com/v1/me/playlists?limit=50"
  );
  let List = null;
  if (data.items) {
    List = data.items.map((playlist, index) => {
      return (
        <div
          key={index}
          onClick={() => {
            history.push(`/playlist/${playlist.id}`);
          }}
        >
          <TrackCard
            isCategory={true}
            artist=""
            track={playlist.name}
            imageDetails={playlist.images[0]}
          />
        </div>
      );
    });
  }

  if (error) {
    return null;
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
        <h2 style={{ margin: 0, paddingRight: 50 }}>Your Playlists</h2>
        <div style={styles.ButtonContainer} onClick={() => {}}>
          <p style={styles.LoginLink}>Create Playlist</p>
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

export default withRouter(Playlists);

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
    width: 170,
    boxShadow: "1px 1px 6px grey"
  }
};
