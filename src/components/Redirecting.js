import React, { useEffect } from "react";
import { setItem } from "../utils/cookie";
import { withRouter } from "react-router-dom";
import Loader from "react-loader-spinner";

function Dashboard({ history }) {
  useEffect(() => {
    const tokenDetails = window.location.href.split("#access_token=")[1];
    setItem("access_token", tokenDetails);
    history.push("/dashboard");
  }, []);
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
}

export default withRouter(Dashboard);
