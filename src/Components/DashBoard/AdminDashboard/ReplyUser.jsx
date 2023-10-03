import React, { useState } from "react";
import { toast } from "react-toastify";
import config from "../../../config/apiConfig";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ReplyUser({ role }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (role !== user?.role) {
    navigate("/page-not-found");
  }
  const [name, setName] = useState("");

  const [answer, setAnswer] = useState("");

  const resetForm = () => {
    setName("");

    setAnswer("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      name,

      answer,
    };

    try {
      const response = await fetch(`${config.apiUrl}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Submitted the reply", { autoClose: 2000 });
        resetForm();
      } else {
        toast.error("Error occurred", { autoClose: 2000 });
      }
    } catch (error) {
      toast.error("Error occurred", { autoClose: 2000 });
      console.error("Error:", error);
    }
  };
  return (
    <div className="container mt-4">
      <h2>Reply to the User</h2>
      <form className="form-hr" onSubmit={handleSubmit}>
        <input
          className="input-modal-hr"
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>

        <textarea
          className="input-modal-hr"
          type="text"
          placeholder="Enter your Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></textarea>

        <input className="submit-input-tag" type="submit"></input>
      </form>
    </div>
  );
}
