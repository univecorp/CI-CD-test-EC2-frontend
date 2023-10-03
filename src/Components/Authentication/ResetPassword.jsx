/* eslint-disable react/no-unknown-property */
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import config from "../../config/apiConfig";
import "./ResetPassword.css";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.apiUrl}/reset`, {
        email,
      });
      setMessage(response.data.message);
      toast.success("আপনার ইমেইল চেক করুন পাসওয়ার্ড রিসেট এর জন্যে।");
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };
  return (
    <div className="main-reset-cont">
      <div>
        {/* <h4 className="text-center my-5"> আপনার ইমেইল এড্রেস দিন </h4> */}
        <form
          className="contact-form row loginStyle2"
          onSubmit={handleResetPassword}
        >
          <div className="form-field col-12">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-text js-input"
              required
            />
            <label className="label" for="email">
              আপনার ইমেইল <span className="text-danger">*</span>
            </label>
          </div>
          <div className="mb-5 col-lg-12">
            <div className="text-center">
              <input
                className="submit-btn text-center"
                type="submit"
                value="সাবমিট"
              />
            </div>
          </div>
        </form>
        {message && (
          <p className="text-danger fw-bolder text-center">{message}</p>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
