import React from "react";
import logo from "../images/logo1.png";

const scopes = "user-read-private user-read-email";
const redirect_uri = "http://localhost:3000/dashboard/";
const my_client_id = "ce89838d1d684c2b99207918a9062d3a";

function Welcome() {
  const RedirectToLogin = () => {
    const loginURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${my_client_id}&redirect_uri=${encodeURIComponent(
      redirect_uri
    )}${scopes ? `&scope=${encodeURIComponent(scopes)}` : ""}`;
    window.location.href = loginURL;
  };
  return (
    <div style={styles.Container}>
      <header style={styles.AppHeader}>
        <img src={logo} style={styles.AppLogo} alt="logo" />
        <p style={styles.Name}>
          <b>Beatzz...</b>
        </p>
        <div style={styles.ButtonContainer} onClick={RedirectToLogin}>
          <p style={styles.LoginLink}>
            <b>Login</b>
          </p>
        </div>
      </header>
    </div>
  );
}

export default Welcome;

const styles = {
  Container: {
    textAlign: "center"
  },
  ButtonContainer: { backgroundColor: "#1DB954", borderRadius: 50 },
  AppLogo: {
    height: 150
  },
  AppHeader: {
    backgroundColor: "#000000",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  },
  Name: {
    fontSize: "40px"
  },
  LoginLink: {
    color: "#000000",
    fontSize: 15,
    padding: "2px 30px 2px 30px"
  }
};
