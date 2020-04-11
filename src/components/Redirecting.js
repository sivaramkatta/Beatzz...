import React, { useEffect } from "react";
import { setItem } from "../utils/cookie";
import { withRouter } from "react-router-dom";
import Loader from "react-loader";

function Dashboard({ history }) {
  useEffect(() => {
    const tokenDetails = window.location.href.split("#access_token=")[1];
    setItem("access_token", tokenDetails);
    history.push("/dashboard");
  }, []);
  return <Loader />;
}

export default withRouter(Dashboard);
