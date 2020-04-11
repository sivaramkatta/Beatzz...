import { useState, useEffect } from "react";
import { getItem } from "./cookie";

export function useGET(url) {
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
        console.log("success", data);
        setLoading(false);
        setData(data);
      })
      .catch(error => {
        console.log("error", error);
        setLoading(false);
        setError(error);
      });
  }, [url]);
  return [loading, result, error];
}
