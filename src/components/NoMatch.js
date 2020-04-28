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
      <h1>404 Page not found </h1>
    </div>
  );
}
