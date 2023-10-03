import React, { useEffect, useState } from "react";
import "./Loader.css";
import load from "./univeLogo.png";
export default function Loader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 60000);
  }, []);
  return (
    <div className="preloader-container">
      {loading && (
        <div className="preloader">
          <img src={load} alt="Loading..." />
        </div>
      )}
    </div>
  );
}
