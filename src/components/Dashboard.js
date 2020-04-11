import React from "react";
import Loader from "react-loader";
import { withRouter } from "react-router-dom";
import { useGET } from "../utils/api";
import logo from "../images/logo1.png";

const Header = () => (
  <div style={styles.HeaderContainer}>
    <p style={styles.ImgLogoText}>
      <img src={logo} style={styles.imgStyle} alt="logo" />
      Beatzz...
    </p>
  </div>
);

function Dashboard({ history }) {
  const [loading, data, error] = useGET("https://api.spotify.com/v1/me");
  if (loading) {
    return <Loader />;
  } else if (error) {
    return <p style={{ textAlign: "center" }}>something went wrong</p>;
  } else {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default withRouter(Dashboard);

const styles = {
  HeaderContainer: {
    backgroundColor: "#000000",
    paddingTop: 15,
    paddingBottom: 15
  },
  ImgLogoText: {
    margin: 0,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: 800
  },
  imgStyle: {
    height: 20,
    width: 20,
    paddingRight: 12
  }
};
