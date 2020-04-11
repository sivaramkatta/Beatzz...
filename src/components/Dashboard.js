import React from "react";
import Loader from "react-loader";
import { withRouter } from "react-router-dom";
import { useGET } from "../utils/api";
import { removeAllItems } from "../utils/cookie";

function Dashboard({ history }) {
  const handleLogout = () => {
    console.log("logging out");
    removeAllItems("access_token");
    history.push("/");
  };
  const [loading, data, error] = useGET("https://api.spotify.com/v1/me");
  if (loading) {
    return <Loader />;
  } else if (error) {
    return <p style={{ textAlign: "center" }}>something went wrong</p>;
  } else {
    return (
      <div>
        <p>Dashboard</p>
        <div style={styles.ButtonContainer} onClick={handleLogout}>
          <p style={styles.LoginLink}>
            <b>Login</b>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);

const styles = {
  ButtonContainer: { backgroundColor: "#1DB954", borderRadius: 50 },
  AppLogo: {
    height: 150
  },
  LoginLink: {
    color: "#000000",
    fontSize: 15,
    padding: "2px 30px 2px 30px"
  }
};
