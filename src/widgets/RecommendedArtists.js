import React from "react";
import { useGET } from "../utils/api";
import Loader from "react-loader-spinner";
import ArtistCard from "./ArtistCard";
import { withRouter } from "react-router-dom";

function ArtistList({ history }) {
  const [loading, data, error] = useGET(
    "https://api.spotify.com/v1/artists?ids=04gDigrS5kc9YWfZHwBETP%2C06HL4z0CvFAxyc27GXpf02%2C0C8ZW7ezQVs4URX5aX7Kqx%2C0X2BH1fck6amBIoJhDVmmJ%2C0du5cEVh5yTK9QJze8zA0C%2C1HY2Jd0NmPuamShAr6KMms%2C1dfeR4HaWDbWqFHLkxsg1d%2C1l8Fu6IkuTP0U5QetQJ5Xt%2C1mYsTxnqsietFxj1OgoGbG%2C1uNFoZAHBGtllmzznpCI3s%2C1zNqDE7qDGCsyzJwohVaoX%2C246dkjvS1zLTtiykXe5h60%2C26VFTg2z8YR0cCuwLzESi2%2C26dSoYclwsYLMAKD3tpOr4%2C2DlGxzQSjYe5N6G9nkYghR%2C3Nrfpe0tUJi4K4DXYWgMUX%2C3TVXtAsR1Inumwj472S9r4%2C3WrFJ7ztbogyGnTHbHJFl2%2C3fMbdgg4jU18AjLCKBhRSm%2C4YRxDV8wJFPHPTeXepOstw%2C4dpARuHxo51G3z768sgnrY%2C4nDoRrQiYLoBzwC5BhVJzF%2C5JZ7CnR6gTvEMKX4g70Amv%2C5YGY8feqx7naU7z4HrwZM6%2C5ZsFI1h6hIdQRw2ti0hz81%2C5cj0lLjcoR7YOSnhnX0Po5%2C5f4QpKfy7ptCHwTqspnSJI%2C5pKCCKE2ajJHZ9KAiaK11H%2C66CXWjxzNUsdJxJ2JdwvnR%2C6M2wZ9GZgrQXHCFfjv46we%2C6S2OmqARrzebs0tKUEyXyp%2C6VuMaDnrHyPL1p4EHjYLi7%2C6dJeKm76NjfXBNTpHmOhfO%2C6eUKZXaKkcviH0Ku9w2n3V%2C6jJ0s89eD6GaHleKKya26X%2C6qqNVTkY8uBg9cP3Jd7DAH%2C6tbjWDEIzxoDsBA1FuhfPW%2C6vWDO969PvNqNYHIOW5v0m%2C74ASZWbe4lXaubB36ztrGX%2C7H55rcKCfwqkyDFH9wpKM6%2C7bXgB6jMjp9ATFy66eO08Z%2C7dGJo4pcD2V6oG8kP0tJRR%2C7n2wHs1TKAczGzO7Dd2rGr%2C7uIbLdzzSEqnX0Pkrb56cR"
  );
  let List = null;
  if (data.artists) {
    List = data.artists.map((artist, index) => {
      return (
        <div
          key={index}
          onClick={() => {
            history.push(`/artist/${artist.id}`);
          }}
        >
          <ArtistCard
            id={artist.id}
            name={artist.name}
            followers={artist.followers.total}
            imageDetails={artist.images[0]}
            genres={artist.genres}
            type="follow"
          />
        </div>
      );
    });
  }
  if (error) {
    return null;
  }
  return (
    <div>
      <h2 style={{ paddingLeft: 16, paddingTop: 16 }}>Recommended Artists</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: loading ? "center" : ""
        }}
      >
        {loading ? (
          <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
        ) : (
          !!List && List
        )}
      </div>
    </div>
  );
}

export default withRouter(ArtistList);
