import React from "react";
import Hidden from "@material-ui/core/Hidden";
import PageNotFound from "../images/pageNotFound.png";

export default function NoMatch() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "10%",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      {/* <Hidden smDown>
        <img
          src={PageNotFound}
          alt="img"
          style={{ height: 300, width: 500, borderRadius: 4 }}
        />
      </Hidden>
      <Hidden smUp>
        <img
          src={PageNotFound}
          alt="img"
          style={{ height: 150, width: 250, borderRadius: 4, marginTop: "20%" }}
        />
      </Hidden> */}
      <h1>404 Page not found </h1>
    </div>
  );
}
