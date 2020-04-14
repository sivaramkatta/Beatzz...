import React from "react";

function Search() {
  return (
    <div>
      <input
        style={{
          width: "100",
          height: 35,
          borderColor: "black",
          borderRadius: 25,
          fontSize: 18,
          padding: 10,
          overlay: "none"
        }}
      />
      <p>Search</p>
    </div>
  );
}

export default Search;
