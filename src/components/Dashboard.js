import React from "react";
import Loader from "react-loader";
import { withRouter } from "react-router-dom";
import { useGET } from "../utils/api";
import logo from "../images/logo1.png";
import profileDefault from "../images/profileDefault.png";

const Header = ({ image, history }) => (
  <div style={styles.HeaderContainer}>
    <div style={styles.ImgLogoText}>
      <img src={logo} style={styles.imgStyle} alt="logo" />
      <p style={{ padding: 0, margin: 4 }}>Beatzz...</p>
    </div>
    <img
      src={image.url ? image.url : profileDefault}
      onClick={() => {
        history.push("/profile");
      }}
      style={{
        height: 30,
        width: 30,
        borderRadius: 15,
        marginRight: 12
      }}
      alt="img"
    />
  </div>
);

function Dashboard({ history }) {
  const [loading, data, error] = useGET("https://api.spotify.com/v1/me");
  if (loading) {
    return <Loader />;
  } else if (error) {
    return <p style={{ textAlign: "center" }}>something went wrong</p>;
  } else {
    const { images = [] } = data;
    return (
      <Header image={images.length > 0 ? images[0] : {}} history={history} />
    );
  }
}

export default withRouter(Dashboard);

const styles = {
  HeaderContainer: {
    backgroundColor: "#000000",
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: "center",
    display: "flex",
    justifyContent: "space-between"
  },
  ImgLogoText: {
    paddingLeft: 12,
    margin: 0,
    color: "#ffffff",
    fontSize: 20,
    fontWeight: 800,
    display: "flex"
  },
  imgStyle: {
    height: 30,
    width: 30,
    paddingRight: 5
  }
};
