import React, { useContext } from "react";
import { useGET } from "../utils/api";
import TrackCard from "../widgets/CommonCard";
import { TrackContext } from "../components/Sidebar";
import Loader from "react-loader-spinner";
import { withRouter } from "react-router-dom";

function Playlist({ match, history }) {
  const { setTrack } = useContext(TrackContext);
  let { slug } = match.params;
  const [loading, data, error] = useGET(
    `https://api.spotify.com/v1/playlists/${slug}/tracks?limit=50`
  );
  let List = null;
  if (data.items) {
    if (data.items.length === 0) {
      List = (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <h3
            style={{
              textAlign: "center",
              color: "grey"
            }}
          >
            No tracks in Playlist
          </h3>
          <div
            style={{
              ...styles.ButtonContainer,
              margin: 7,
              marginLeft: 24
            }}
            onClick={() => {
              history.push("/search");
            }}
          >
            <p style={styles.LoginLink}>Search</p>
          </div>
        </div>
      );
    } else {
      List = data.items.map(({ track }, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              setTrack(`${track.type}/${track.id}`);
            }}
          >
            <TrackCard
              artist={track.artists[0].name}
              track={track.name}
              imageDetails={track.album.images[0]}
            />
          </div>
        );
      });
    }
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
        <h2 style={{ margin: 0, paddingRight: 50 }}>Playlists Tracks</h2>
        {data.items && data.items.length > 0 && (
          <div
            style={styles.ButtonContainer}
            onClick={() => {
              setTrack(`playlist/${slug}`);
            }}
          >
            <p style={styles.LoginLink}>{`Play All`}</p>
          </div>
        )}
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

export default withRouter(Playlist);

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
