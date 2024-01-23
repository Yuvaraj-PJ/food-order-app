import { useCallback, useState } from "react";

const useHttp = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method || "GET",
        headers: requestConfig.headers || { 'Access-Control-Allow-Origin': '*'},
        body: requestConfig.body || null,
      });
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
      setIsLoading(false);
      applyData(data);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Something went wrong");
    }
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;