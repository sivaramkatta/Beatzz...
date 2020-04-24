import React, { useState } from "react";
import { useGET } from "../utils/api";
import GenericCard from "../widgets/CommonCard";
import Loader from "react-loader-spinner";
import { withRouter } from "react-router-dom";
import Modal from "react-modal";
import { getItem } from "../utils/cookie";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderColor: "black",
    borderRadius: 5
  },
  overlay: { backgroundColor: "currentColor" }
};

function Playlists({ history }) {
  const [showModal, setShowModal] = useState(false);
  const [playlistName, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [loading, data, error] = useGET(
    "https://api.spotify.com/v1/me/playlists?limit=50"
  );
  let userID = null;
  let List = null;
  if (data.items) {
    const hrefArray = data.href.split("/");
    userID = hrefArray[5];
    List = data.items.map((playlist, index) => {
      return (
        <div
          key={index}
          onClick={() => {
            history.push(`/playlist/${playlist.id}`);
          }}
        >
          <GenericCard
            title={playlist.name}
            imageDetails={playlist.images[0]}
            mini={true}
          />
        </div>
      );
    });
  }

  const handleCreateClick = async () => {
    setLoading1(true);
    await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${getItem("access_token")}`
      },
      body: JSON.stringify({
        name: playlistName,
        description: description,
        public: false
      })
    });
    setLoading1(false);
    setShowModal(false);
    window.location.reload();
  };

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
        <div
          style={styles.ButtonContainer}
          onClick={() => {
            setShowModal(true);
          }}
        >
          <p style={styles.LoginLink}>Create</p>
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
      <Modal isOpen={showModal} style={customStyles}>
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              style={{
                margin: 24,
                height: 40,
                width: 250,
                outline: "none",
                fontSize: 16,
                borderColor: "black",
                borderRadius: 20,
                borderWidth: 2,
                padding: 5,
                textAlign: "center"
              }}
              placeholder="Playlist name"
              onChange={e => {
                setName(e.target.value);
              }}
            />
            <input
              style={{
                margin: 24,
                height: 40,
                width: 250,
                outline: "none",
                fontSize: 16,
                borderColor: "black",
                borderRadius: 20,
                borderWidth: 2,
                padding: 5,
                textAlign: "center"
              }}
              placeholder="Description"
              onChange={e => {
                setDescription(e.target.value);
              }}
            />
          </div>
          {!loading1 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around"
              }}
            >
              <div
                onClick={() => {
                  setShowModal(false);
                }}
              >
                <h3>Close</h3>
              </div>
              <div
                style={styles.ButtonContainer}
                onClick={() => {
                  if (playlistName) {
                    handleCreateClick();
                  }
                }}
              >
                <p style={styles.LoginLink}>Create</p>
              </div>
            </div>
          )}
          {loading1 && (
            <h3
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: 26,
                color: "#1DB954"
              }}
            >
              Loading...
            </h3>
          )}
        </div>
      </Modal>
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
    width: 100,
    boxShadow: "1px 1px 6px grey"
  }
};
