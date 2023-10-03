import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/apiConfig";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./UpdatePass.css";
const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const history = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setError("Passwords do not match");
      return;
    }
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${config.apiUrl}/reset/${token}`,

        {
          password,
          confirmpassword,
        }
      );
      console.log("res", response);
      setMessage(response.data.message);
      history.push("/login");
    } catch (error) {
      setError("password is not updating");
    }
  };

  return (
    <div>
      <Header></Header>
      <h2 className="update-pass-header">পাসওয়ার্ড আপডেট করুন</h2>
      {message && <p className="text-danger text-center fs-4">{message}</p>}
      <div className="container text-center">
        <form onSubmit={handleSubmit} className="contact-form row loginStyle">
          <div className="form-field col-12 mb-4">
            <input
              value={password}
              className="input-text js-input"
              type="password"
              required
              onChange={handlePasswordChange}
            />
            <label className="label" htmlFor="name">
              আপনার পাসওয়ার্ড দিন <span className="text-danger">*</span>
            </label>
          </div>

          <div className="form-field col-12">
            <input
              value={confirmpassword}
              className="input-text js-input"
              type="password"
              required
              onChange={handleConfirmPasswordChange}
            />
            <label className="label" htmlFor="name">
              আপনার পাসওয়ার্ড পুনরায় দিন <span className="text-danger">*</span>
            </label>
          </div>

          <input
            type="submit"
            className="submit-btn text-center mb-4 w-75 ms-4"
            value="পাসওয়ার্ড আপডেট করুন"
          />
        </form>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default UpdatePassword;
