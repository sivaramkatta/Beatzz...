import React from "react";
import logo from "../images/logo1.png";

function Welcome() {
  return (
    <div style={styles.Container}>
      <header style={styles.AppHeader}>
        <img src={logo} style={styles.AppLogo} alt="logo" />
        <p style={styles.Name}>
          <b>Beatzz...</b>
        </p>
        <div style={styles.ButtonContainer}>
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
