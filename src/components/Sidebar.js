import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { withRouter } from "react-router-dom";
import logo from "../images/logo1.png";
import SearchIcon from "@material-ui/icons/Search";
import CategoryIcon from "@material-ui/icons/Category";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";

const drawerWidth = 240;
export const TrackContext = React.createContext();

const Player = ({ left, track }) => (
  <div
    style={{
      position: "fixed",
      bottom: -10,
      zIndex: 1,
      display: "flex",
      flex: 1,
      opacity: 0.9,
      right: 0,
      left: left
    }}
  >
    <iframe
      title="song"
      src={`https://open.spotify.com/embed/${track}`}
      height="90"
      width="100%"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
    />
  </div>
);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const Tabs = [
  { title: "Home", component: <HomeIcon />, route: "/dashboard" },
  { title: "Search", component: <SearchIcon />, route: "/search" },
  { title: "Genre", component: <CategoryIcon />, route: "/categories" },
  { title: "Artists", component: <MusicNoteIcon />, route: "/artists" },
  { title: "Playlists", component: <PlaylistPlayIcon />, route: "/playlists" },
  { title: "Profile", component: <AccountBoxIcon />, route: "/profile" }
];

function ResponsiveDrawer(props) {
  const { container } = props;
  const [track, setTrack] = useState("");
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const DrawerContainer = ({ isMobile }) => (
    <div>
      <Hidden smDown>
        <div className={classes.toolbar} />
      </Hidden>
      <Divider />
      <List
        style={
          window.screen.width < 960 && window.screen.width > 600
            ? { marginTop: 65 }
            : {}
        }
      >
        {Tabs.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => {
              props.history.push(item.route);
              if (isMobile) setMobileOpen(false);
            }}
          >
            <ListItemIcon>{item.component}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        style={{ backgroundColor: "#000000" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "space-between"
            }}
          >
            <div
              style={styles.ImgLogoText}
              onClick={() => {
                props.history.push("/dashboard");
              }}
            >
              <div
                style={{
                  backgroundColor: "#E00000",
                  height: 25,
                  width: 25,
                  borderRadius: 13,
                  paddingRight: 5,
                  marginRight: 5
                }}
              >
                <p
                  style={{
                    fontSize: 18,
                    margin: 0,
                    textAlign: "center",
                    paddingLeft: 5
                  }}
                >
                  &#9835;
                </p>
              </div>
              <p style={{ padding: 0, margin: 4 }}>Beatzz...</p>
            </div>
            <Hidden xsDown implementation="css">
              <p
                style={{
                  float: "right",
                  padding: 0,
                  margin: 6,
                  fontFamily: "monospace",
                  fontSize: 17,
                  color: "grey"
                }}
              >
                music makes me high
              </p>
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            <DrawerContainer isMobile={true} />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            <DrawerContainer />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content} style={{ margin: 0, padding: 0 }}>
        <div className={classes.toolbar} />
        <div style={{ marginBottom: 16 }}>
          <TrackContext.Provider value={{ setTrack }}>
            {props.children}
          </TrackContext.Provider>
        </div>
        {track && (
          <div style={{ marginTop: 100 }}>
            <Hidden smUp implementation="css">
              <Player left={0} track={track} />
            </Hidden>
            <Hidden xsDown implementation="css">
              <Player left={240} track={track} />
            </Hidden>
          </div>
        )}
      </main>
    </div>
  );
}

export default withRouter(ResponsiveDrawer);

const styles = {
  ImgLogoText: {
    margin: 0,
    color: "#ffffff",
    fontSize: 20,
    fontWeight: 800,
    display: "flex",
    alignItems: "baseline"
  }
};
