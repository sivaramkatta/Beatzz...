import React, { useContext, useState } from "react";
import { useGET } from "../utils/api";
import GenericCard from "../widgets/CommonCard";
import { TrackContext } from "../components/Sidebar";
import Loader from "react-loader-spinner";
import { withRouter } from "react-router-dom";
import { getItem } from "../utils/cookie";

function Playlist({ match, history }) {
  let List = null;
  let PlayButton = null;
  let { slug } = match.params;
  const { setTrack } = useContext(TrackContext);
  const [following, setFollowing] = useState(false);
  const [checkedFollowing, setCheckedFollowing] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [data2, setData2] = useState(false);
  const [loading, data, error] = useGET(
    `https://api.spotify.com/v1/playlists/${slug}/tracks?limit=50`
  );
  const userID = JSON.parse(getItem("user")).id;
  const [, data1] = useGET(
    `https://api.spotify.com/v1/playlists/${slug}/followers/contains?ids=${userID}`
  );

  if (data1.length > 0 && !checkedFollowing) {
    setFollowing(data1[0]);
    setCheckedFollowing(true);
  }

  const handleClick = async () => {
    setLoading2(true);
    if (following) {
      await fetch(`https://api.spotify.com/v1/playlists/${slug}/followers`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${getItem("access_token")}`
        }
      });
    } else {
      await fetch(`https://api.spotify.com/v1/playlists/${slug}/followers`, {
        method: "put",
        headers: {
          Authorization: `Bearer ${getItem("access_token")}`
        },
        body: { public: true }
      });
    }
    setLoading2(false);
    setData2(true);
  };

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
      PlayButton = (
        <div
          style={styles.ButtonContainer}
          onClick={() => {
            setTrack(`playlist/${slug}`);
          }}
        >
          <p style={styles.LoginLink}>Play All</p>
        </div>
      );
      List = data.items.map(({ track }, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              setTrack(`${track.type}/${track.id}`);
            }}
          >
            {track && (
              <GenericCard
                title={track.name}
                subtitle={track.artists[0].name}
                imageDetails={track.album.images[0]}
              />
            )}
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
          flexDirection: "row",
          flexWrap: "wrap",
          margin: 24
        }}
      >
        <h2 style={{ margin: 0, paddingRight: 50, marginBottom: 24 }}>
          Playlists Tracks
        </h2>
        <div style={{ display: "flex" }}>
          {PlayButton}
          {checkedFollowing && (
            <div
              style={{
                ...styles.ButtonContainer2,
                ...{ backgroundColor: following ? "#D00000" : "#1DB954" }
              }}
              onClick={() => {
                handleClick();
              }}
            >
              {!loading2 && !data2 && (
                <p
                  style={{
                    ...styles.LoginLink,
                    ...{ color: following ? "#ffffff" : "#000000" }
                  }}
                >
                  {following ? "Unfollow Playlist" : "Follow Playlist"}
                </p>
              )}
              {loading2 && (
                <p
                  style={{
                    ...styles.LoginLink,
                    ...{ color: following ? "#ffffff" : "#000000" }
                  }}
                >
                  Loading...
                </p>
              )}
              {data2 && (
                <p
                  style={{
                    ...styles.LoginLink,
                    ...{ color: following ? "#ffffff" : "#000000" }
                  }}
                >
                  &#10003; <b>{following ? "Removed" : "Following"}</b>
                </p>
              )}
            </div>
          )}
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
  },
  ButtonContainer2: {
    backgroundColor: "#1DB954",
    borderRadius: 50,
    width: 150,
    height: 35,
    marginLeft: 24,
    boxShadow: "1px 1px 6px grey"
  }
};
