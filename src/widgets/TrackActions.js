import React from "react";
import TrackDefault from "../images/defaultTrack.jpg";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Modal from "react-modal";
import { getItem, removeItems } from "../utils/cookie";
import config from "../config";
import { withRouter } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overlfow: "scroll",
    maxHeight: 600,
    padding: 10,
    width: "90%",
    maxWidth: 600
  },
  overlay: { backgroundColor: "currentColor" }
};

const PlaylistCard = ({ name, image }) => {
  return (
    <div
      style={{
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        padding: 10,
        display: "flex"
      }}
    >
      <img
        src={image}
        alt="img"
        style={{ height: 25, width: 25, borderRadius: 4, marginRight: 16 }}
      />
      <h3
        style={{
          margin: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}
      >
        {name}
      </h3>
    </div>
  );
};

const ActionList = ({ type, uri, position, playlistID, history }) => {
  let List = null;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [done, setDone] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = e => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const handleEvent = async e => {
    e.stopPropagation();
    handleClose(e);
    if (type === "Add to Playlist") {
      setShowModal(true);
      setLoading(true);
      fetch("https://api.spotify.com/v1/me/playlists?limit=50", {
        headers: {
          Authorization: `Bearer ${getItem("access_token")}`
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.hasOwnProperty("error")) {
            if (data.error.status === 401) {
              removeItems();
              window.location.href = config.base_url;
            } else {
              console.log("error", data);
              setLoading(false);
              setShowModal(false);
            }
          } else {
            setLoading(false);
            setData(data);
          }
        })
        .catch(error => {
          console.log("error", error);
          setLoading(false);
        });
    } else if (type === "Remove from Playlist") {
      setShowModal(true);
      setLoading(true);
      fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
        headers: {
          Authorization: `Bearer ${getItem("access_token")}`
        },
        method: "delete",
        body: JSON.stringify({
          tracks: [
            {
              uri: uri,
              positions: [position]
            }
          ]
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.hasOwnProperty("error")) {
            if (data.error.status === 401) {
              removeItems();
              window.location.href = config.base_url;
            } else {
              console.log("error", data);
              setLoading(false);
              setShowModal(false);
            }
          } else {
            window.location.reload();
          }
        })
        .catch(error => {
          console.log("error", error);
          setLoading(false);
          setShowModal(false);
        });
    }
  };

  const handlePlaylistClick = async id => {
    await fetch(
      `https://api.spotify.com/v1/playlists/${id}/tracks?uris=${uri}`,
      {
        method: "post",
        headers: {
          Authorization: `Bearer ${getItem("access_token")}`
        }
      }
    );
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setShowModal(false);
    }, 1000);
  };

  if (data) {
    if (data.items.length === 0) {
      List = (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h3 style={{ textAlign: "center", margin: 0 }}>
            No playlist available
          </h3>
          <div
            style={styles.ButtonContainer}
            onClick={e => {
              e.stopPropagation();
              history.push("/playlists");
            }}
          >
            <p style={styles.LoginLink}>Create</p>
          </div>
        </div>
      );
    } else {
      const userID = JSON.parse(getItem("user")).id;
      List = data.items.map(playlist => {
        if (userID === playlist.owner.id) {
          return (
            <div
              key={playlist.id}
              onClick={e => {
                e.stopPropagation();
                handlePlaylistClick(playlist.id);
              }}
            >
              <PlaylistCard
                name={playlist.name}
                image={
                  playlist.images.length > 0
                    ? playlist.images[0].url
                    : TrackDefault
                }
              />
            </div>
          );
        }
        return null;
      });
    }
  }

  return (
    <div style={{ float: "right" }}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ padding: 5 }}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "25ch"
          }
        }}
      >
        <MenuItem key={type} selected={type} onClick={handleEvent}>
          {type}
        </MenuItem>
      </Menu>
      <Modal
        isOpen={showModal}
        style={customStyles}
        shouldCloseOnOverlayClick={true}
        onRequestClose={e => {
          e.stopPropagation();
          setShowModal(false);
        }}
      >
        <div style={{ overflow: "scroll" }}>
          {loading && (
            <h3 style={{ margin: 0, textAlign: "center" }}>Loading...</h3>
          )}
          {!done && data && !!List && List}
          {done && (
            <h3 style={{ margin: 0, textAlign: "center", color: "#1DB954" }}>
              &#10003; Done
            </h3>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default withRouter(ActionList);

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
    marginLeft: 20,
    boxShadow: "1px 1px 6px grey"
  }
};
