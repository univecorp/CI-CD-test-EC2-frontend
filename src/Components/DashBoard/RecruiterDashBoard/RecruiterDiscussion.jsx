import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function RecruiterDiscussion({ role }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!role.includes(user?.role)) {
    navigate("/page-not-found");
  }

  return (
    <div className="container">
      <h3 className="text-center mt-4 fw-semibold">
        আপনি কোনো জবস ডিসকাশনে যুক্ত হননি!
      </h3>
    </div>
  );
}

export default RecruiterDiscussion;
