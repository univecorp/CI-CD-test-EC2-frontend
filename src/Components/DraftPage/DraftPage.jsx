import React from "react";

import Header from "../Header/Header";
import "./DraftPage.css";
import { useNavigate } from "react-router-dom";
const DraftPage = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/learn");
  }, [4000]);
  return (
    <>
      <Header></Header>
      <p className="text-center header-text-draft">
        কোর্সটি এখনো পাবলিশ হয়নি। কোর্সটি পাবলিশ হলে কোর্স পেইজটি অ্যাক্সেস করতে
        পারবেন।
      </p>
    </>
  );
};

export default DraftPage;
