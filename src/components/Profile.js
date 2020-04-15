import React from "react";
import Loader from "react-loader-spinner";
import { useGET } from "../utils/api";
import profileDefault from "../images/profileDefault.png";
import Email from "../images/email.png";
import Subscription from "../images/subscription.svg";
import { getCountryName } from "../utils/countryName";
import Country from "../images/country.png";
import { removeItem } from "../utils/cookie";

function Profile() {
  const [loading, data, error] = useGET("https://api.spotify.com/v1/me");
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20%"
        }}
      >
        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
      </div>
    );
  } else if (error) {
    return (
      <div>
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
      <div style={{ height: "90vh" }}>
        <div style={styles.Container}>
          <div style={styles.dpContainer}>
            <img
              src={images.length > 0 ? images[0].url : profileDefault}
              alt="img"
              style={styles.dp}
            />
          </div>
          <div style={styles.subContainer}>
            <p style={styles.name}>
              <b>{display_name}</b>
            </p>
            <p style={styles.followers}>
              <b>Followers: {followers.total}</b>
            </p>
            <div style={styles.EmailContainer}>
              <img src={Email} alt="img" style={styles.EmailIcon} />
              <p style={styles.TextDetail}>
                <b> {email}</b>
              </p>
            </div>
            <div style={{ ...styles.EmailContainer, marginTop: 24 }}>
              <img
                src={Subscription}
                alt="img"
                style={styles.subscriptionIcon}
              />
              <p style={styles.subsText}>
                <b>
                  Subscription : {product === "open" ? " Free" : " Premium"}
                </b>
              </p>
            </div>
            <div
              style={{
                ...styles.EmailContainer,
                marginTop: 24
              }}
            >
              <img src={Country} alt="img" style={styles.countryImg} />
              <p style={styles.countryText}>
                <b>Country: {getCountryName(country)}</b>
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 30
              }}
            >
              <div
                style={styles.ButtonContainer}
                onClick={() => {
                  window.location.href = "https://www.spotify.com/";
                }}
              >
                <p style={styles.LoginLink}>{`Edit  `}</p>
              </div>
              <div
                style={{
                  ...styles.ButtonContainer,
                  backgroundColor: "#D00000",
                  marginLeft: 30
                }}
                onClick={() => {
                  removeItem("access_token");
                  window.location.href = "http://localhost:3000/";
                }}
              >
                <p style={{ ...styles.LoginLink, color: "white" }}>Logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

const styles = {
  Container: {
    marginTop: 42
  },
  dpContainer: {
    display: "flex",
    justifyContent: "center"
  },
  dp: {
    height: 150,
    width: 150,
    borderRadius: 75,
    alignSelf: "center",
    boxShadow: "5px 5px 10px grey"
  },
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
    paddingTop: 7,
    fontWeight: 600,
    margin: 0
  },
  ButtonContainer: {
    backgroundColor: "#1DB954",
    borderRadius: 50,
    height: 35,
    width: 100,
    marginTop: 50,
    boxShadow: "1px 1px 6px grey"
  },
  ImgLogoText: {
    paddingLeft: 12,
    margin: 0,
    color: "#ffffff",
    fontSize: 20,
    fontWeight: 800,
    display: "flex"
  },
  EmailContainer: {
    boxShadow: "0px 0px 10px  #909090",
    marginTop: 50,
    borderRadius: 10,
    borderColor: "#909090",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  EmailIcon: {
    height: 45,
    width: 45,
    padding: 10
  },
  subscriptionIcon: {
    height: 45,
    width: 45,
    padding: 10
  },
  TextDetail: {
    padding: "12px 60px 12px 15px",
    margin: 0
  },
  subContainer: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  name: {
    fontSize: 20,
    marginBottom: 10
  },
  followers: {
    margin: 0,
    fontSize: 14,
    color: "#686868"
  },
  subsText: {
    margin: 0,
    padding: "10px 120px 10px 15px"
  },
  countryImg: {
    height: 45,
    width: 45,
    padding: 10
  },
  countryText: {
    margin: 0,
    padding: "10px 152px 10px 15px"
  }
};
