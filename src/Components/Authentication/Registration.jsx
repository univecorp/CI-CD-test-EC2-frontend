import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import axios from "axios";
import "react-phone-input-2/lib/style.css";
import { registers } from "../redux/rtk/features/auth/authSlice";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import gogo from "../images/logos/icons8-google.svg";
import vdo2 from "./69837-grmmarly-animation-1.mp4";
import config from "../../config/apiConfig";
import "./Registration.css";

const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState("");
  const [smsButtonClicked, setSmsButtonClicked] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showInputEmail, setShowInputEmail] = useState(false);
  const [emailButtonClicked, setEmailButtonClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    user: userEmail,
    isLoading,
    isError,
    error,
  } = useSelector((state) => state.auth);

  const Useremail = userEmail;

  const phoneNumber = userEmail?.phone;

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const reg_user = {
      firstName,
      lastName,
      email,
      phone,
      password,
    };

    dispatch(registers(reg_user));
  };

  useEffect(() => {
    if (!isLoading && userEmail) {
      toast.success("রেজিস্টার সম্পন্ন হয়েছে!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPassword("");

      setTimeout(() => {
        setShowModal(true);
      }, 4000);
    }
  }, [userEmail, isLoading, location]);

  useEffect(() => {
    if (isError) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setErrorMessage(error);
    }
  }, [isError, error]);

  const sendSms = async () => {
    try {
      const response = await axios.post(
        `${config.apiUrl}/send-verification-otp-phone/${phoneNumber}`
      );
      console.log("sms sent successfully:", response.data);
      setOtpSent(true);
    } catch (error) {
      console.error("Error sending Email:", error);
    }
  };

  const sendEmail = async () => {
    try {
      const response = await axios.post(
        `${config.apiUrl}/send-verification-otp-email/${Useremail?.email}`
      );
      console.log("Email Link sent successfully:", response.data);
      setOtpSent(true);
    } catch (error) {
      console.error("Error sending Email:", error);
    }
  };

  const sendVerificationOtp = async (otpValue) => {
    try {
      let isVerificationSuccessful = false;
      const response = await axios.post(
        `${config.apiUrl}/otp-submit/${phoneNumber}/${otpValue}`
      );

      if (response?.data?.status === true) {
        toast.success("অভিনন্দন! আপনার ভেরিফিকেশন সম্পন্ন হয়েছে", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setShowModal(false);
        navigate(location?.state?.from || "/");
        isVerificationSuccessful = true;

        // if (isVerificationSuccessful) {
        //   localStorage.setItem("verificationStatus", "verified");
        // } else {
        //   localStorage.setItem("verificationStatus", "unverified");
        // }
      }
    } catch (error) {
      if (error) {
        toast.error("ভুল ওটিপি, আবার চেষ্টা করুন");
      }
    }
  };

  const sendVerificationEmailOtp = async (otpValue) => {
    try {
      let isVerificationSuccessful = false;
      const response = await axios.post(
        `${config.apiUrl}/otp-email-submit/${Useremail?.email}/${otpValue}`
      );
      console.log("response", response);
      if (response?.data?.status === true) {
        toast.success("অভিনন্দন! আপনার ভেরিফিকেশন সম্পন্ন হয়েছে", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setShowModal(false);
        navigate(location?.state?.from || "/");
        isVerificationSuccessful = true;

        // if (isVerificationSuccessful) {
        //   localStorage.setItem("verificationStatus", "verified");
        // } else {
        //   localStorage.setItem("verificationStatus", "unverified");
        // }
      }
    } catch (error) {
      console.error("Error sending otp:", error);

      if (error) {
        toast.error("ভুল ওটিপি, আবার চেষ্টা করুন");
      }
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();

    if (verificationMethod === "phone") {
      await sendVerificationOtp(otp);
    } else if (verificationMethod === "email") {
      await sendVerificationEmailOtp(otp);
    }
  };

  const handleSkipVerification = () => {
    setShowModal(false);
    // localStorage.setItem("verificationStatus", "unverified");

    navigate(location?.state?.from || "/");
  };

  return (
    <>
      <Header />
      <div>
        <h2 className="text-center my-5 loginpara">
          রেজিস্ট্রেশন করে জয়েন করুন ইউনিভ প্ল্যাটফর্মে!
        </h2>
        <div className="container">
          <div className="row g-4 justify-content-around align-items-center">
            <div className="col-12 col-md-6">
              <form className="contact-form row loginStyle" onSubmit={onSubmit}>
                <div className="form-field col-12">
                  <input
                    className="input-text js-input"
                    type="text"
                    required={true}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label className="label" htmlFor="name">
                    আপনার ফার্স্ট নাম<span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-field col-12">
                  <input
                    className="input-text js-input"
                    type="text"
                    required={true}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <label className="label" htmlFor="name">
                    আপনার লাস্ট নাম<span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-field col-12">
                  <input
                    className="input-text js-input"
                    type="text"
                    required={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="label" htmlFor="email">
                    আপনার ইমেইল <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-field col-12">
                  <input
                    required={true}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-text js-input"
                    type="text"
                  />

                  <label className="label" htmlFor="email">
                    আপনার মোবাইল নাম্বার <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-field col-12">
                  <input
                    className="input-text js-input"
                    type="password"
                    required={true}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="label" htmlFor="password">
                    পাসওয়ার্ড লিখুন <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="mb-5 col-lg-12">
                  <div className="text-center">
                    <p className="loginpara">
                      ইউনিভে পূর্বে রেজিস্টার করে থাকলে{" "}
                      <Link
                        to={"/login"}
                        className={"text-decoration-underline text-primary"}
                      >
                        লগইন
                      </Link>{" "}
                      করুন
                    </p>

                    <input
                      className="submit-btn text-center"
                      type="submit"
                      value="রেজিস্ট্রেশন করুন"
                    />
                  </div>
                  <p className="hrline my-4">OR</p>
                  <button className="btn  border border-1 d-block mb-5 mx-auto text-dark">
                    {" "}
                    <img src={gogo} alt="" height="30" width="30" /> Google Sign
                    In
                  </button>
                </div>
              </form>
            </div>
            <div className="col-12 col-md-6">
              <div>
                <video
                  loop={true}
                  autoPlay="autoplay"
                  muted
                  className="lotti-why w-75"
                >
                  <source src={vdo2} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title-reg">
            কি দিয়ে ভেরিফাই করতে চান ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleVerificationSubmit}>
            <div>
              {!showInputEmail && (
                <label className="mobile-radio-text">
                  <input
                    type="radio"
                    value="mobile"
                    className="radio-input"
                    checked={verificationMethod === "phone"}
                    onChange={() => setVerificationMethod("phone")}
                  />
                  মোবাইল দিয়ে ভেরিফাই করুন
                </label>
              )}
            </div>
            <div>
              {!showInput && (
                <label className="email-radio-text">
                  <input
                    type="radio"
                    value="email"
                    className="radio-input"
                    checked={verificationMethod === "email"}
                    onChange={() => setVerificationMethod("email")}
                  />
                  ইমেইল দিয়ে ভেরিফাই করুন
                </label>
              )}
            </div>

            {verificationMethod === "phone" && !smsButtonClicked && (
              <div>
                <button
                  className="sms-send-button"
                  type="button"
                  onClick={() => {
                    sendSms();
                    setSmsButtonClicked(true);
                    setShowInput(true);
                  }}
                >
                  এসএমএস পাঠান
                </button>
              </div>
            )}

            {verificationMethod === "phone" && smsButtonClicked && (
              <p className="success-msg">এসএমএস পাঠানো হয়েছে</p>
            )}

            {verificationMethod === "phone" && (
              <div>
                <input
                  className="otp-submit-input"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="ওটিপি দিন "
                />
                <button type="submit" className="button-otp-sms">
                  ওটিপি সাবমিট করুন{" "}
                </button>
              </div>
            )}

            {verificationMethod === "email" && !emailButtonClicked && (
              <div>
                <button
                  className="email-send-button"
                  onClick={() => {
                    sendEmail();
                    setEmailButtonClicked(true);
                    setShowInputEmail(true);
                  }}
                  type="button"
                >
                  ইমেইল পাঠান
                </button>
              </div>
            )}

            {verificationMethod === "email" && emailButtonClicked && (
              <p className="success-msg">ইমেইল পাঠানো হয়েছে</p>
            )}

            {verificationMethod === "email" && (
              <div>
                <input
                  className="otp-submit-input"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />
                <button type="submit" className="button-otp-sms">
                  ওটিপি সাবমিট করুন{" "}
                </button>
              </div>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleSkipVerification} className="btn btn-info">
            স্কিপ করুন
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Registration;
