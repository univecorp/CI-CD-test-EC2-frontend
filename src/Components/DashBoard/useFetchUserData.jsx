import { useEffect, useState } from "react";

const useFetchUserData = (userId) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://13.232.49.214:5000/api/v1/users/email/${userId}`
        );
        const data = await response.json();
        setUserData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return { userData, isLoading, error };
};

export default useFetchUserData;
