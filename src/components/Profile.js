import React from "react";
import Loader from "react-loader";
import { useGET } from "../utils/api";
import profileDefault from "../images/profileDefault.png";
import { getCountryName } from "../utils/countryName";

const Header = () => (
  <div style={styles.HeaderContainer}>
    <div style={styles.ImgLogoText}>
      <p style={{ padding: 0, margin: 4 }}>Profile</p>
    </div>
  </div>
);

function Profile() {
  const [loading, data, error] = useGET("https://api.spotify.com/v1/me");
  if (loading) {
    return (
      <div>
        <Header />
        <Loader />
      </div>
    );
  } else if (error) {
    return (
      <div>
        <Header />
        <p style={{ textAlign: "center" }}>something went wrong</p>
      </div>
    );
  } else {
    const {
      images = [],
      display_name,
      email,
      product,
      country,
      followers = {}
    } = data;
    return (
      <div>
        <Header />
        <div style={{ margin: 16, marginTop: 42 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 43
            }}
          >
            <img
              src={images.length > 0 ? images[0].url : profileDefault}
              alt="img"
              style={{
                height: 120,
                width: 120,
                borderRadius: 60,
                alignSelf: "center"
              }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <p>
              <b>Name: {display_name}</b>
            </p>
            <p>
              <b>Email: {email}</b>
            </p>
            <p>
              <b>Subscription: {product === "open" ? "Free" : "Premium"}</b>
            </p>
            <p>
              <b>Country: {getCountryName(country)}</b>
            </p>
            <p style={{ marginBottom: 40 }}>
              <b>Followers: {followers.total}</b>
            </p>
            <div
              style={styles.ButtonContainer}
              onClick={() => {
                window.location.href = "https://www.spotify.com/";
              }}
            >
              <p style={styles.LoginLink}>Edit</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

const styles = {
  HeaderContainer: {
    backgroundColor: "#000000",
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: "center",
    display: "flex",
    justifyContent: "space-between"
  },
  LoginLink: {
    color: "#000000",
    fontSize: 15,
    textAlign: "center",
    paddingTop: 5,
    fontWeight: 600,
    margin: 0
  },
  ButtonContainer: {
    backgroundColor: "#1DB954",
    borderRadius: 50,
    height: 30,
    width: 100
  },
  ImgLogoText: {
    paddingLeft: 12,
    margin: 0,
    color: "#ffffff",
    fontSize: 20,
    fontWeight: 800,
    display: "flex"
  }
};
