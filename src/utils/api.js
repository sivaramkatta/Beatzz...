import { useState, useEffect } from "react";
import { getItem, removeItem } from "./cookie";

export function useGET(url, dependency = []) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [result, setData] = useState({});
  useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${getItem("access_token")}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.hasOwnProperty("error")) {
          if (data.error.status === 401) {
            removeItem("access_token");
            window.location.href = "http://localhost:3000/";
          } else {
            console.log("error", data);
            setLoading(false);
            setError(error);
          }
        } else {
          console.log("success", data);
          setLoading(false);
          setData(data);
        }
      })
      .catch(error => {
        console.log("error", error);
        setLoading(false);
        setError(error);
      });
  }, dependency);
  return [loading, result, error];
}
