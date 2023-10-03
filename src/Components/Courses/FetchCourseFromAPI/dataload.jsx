import { useEffect, useState } from "react";
import config from "../../../config/apiConfig";

// data for home slider
const useData = () => {
  const [course, setcourse] = useState([]);
  useEffect(() => {
    fetch(`${config.apiUrl}/courses`)
      .then((res) => res.json())
      .then((data) => setcourse(data.data));
  }, []);
  return [course];
};
export default useData;
