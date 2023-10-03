import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import config from "../../../config/apiConfig";
import PageTitle from "../../Common/PageTitle";

import {
  useUpdateUserInfoMutation,
  useUserByEmailQuery,
} from "../../redux/rtk/features/user/userApi";
import "./../Profile.css";
import "./userProfile.css";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

function UserProfile() {
  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [verificationMethod, setVerificationMethod] = useState("");
  const [smsButtonClicked, setSmsButtonClicked] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showInputEmail, setShowInputEmail] = useState(false);
  const [emailButtonClicked, setEmailButtonClicked] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { data } = useUserByEmailQuery(user?.email);
  const userInfo = data?.data;

  const phoneNumber = userInfo?.phone;

  const userId = userInfo?._id;

  const navigate = useNavigate();

  const [updateUserInfo, { isLoading, isSuccess, isError, error }] =
    useUpdateUserInfoMutation();

  const [selectedImage, setSelectedImage] = useState(null);
  const verifiedItem = data?.data?.verifiedStatus;
  console.log(verifiedItem);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        setSelectedImage(imageData);
        uploadImageToServer(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToServer = (file) => {
    const formData = new FormData();
    formData.append("image", file);

    axios
      .patch(`${config.apiUrl}/upload-image/${user?.email}`, formData)
      .then((response) => {
        console.log("success", response); // Image updated successfully
      })
      .catch((error) => {
        console.error("Error updating image:", error);
      });
  };

  const handleVerifyButtonClick = () => {
    setShowModal(true);
  };

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
        `${config.apiUrl}/send-verification-otp-email/${userInfo?.email}`
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
        navigate(location?.state?.from || "/Dashboard/userprofile/");
        isVerificationSuccessful = true;
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
        `${config.apiUrl}/otp-email-submit/${userInfo?.email}/${otpValue}`
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
        navigate(location?.state?.from || "/Dashboard/userprofile/");
        isVerificationSuccessful = true;
      }
    } catch (error) {
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

    navigate(location?.state?.from || "/Dashboard/userprofile/");
  };

  const handleButtonClick = () => {
    document.getElementById("file-input").click();
  };

  const imageSource =
    selectedImage && selectedImage.length > 0
      ? selectedImage
      : userInfo?.image == null
      ? "https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/UniveHome+Testimonials/userimage.jpg"
      : userInfo?.image;

  return (
    <div className="container-fluid px-0 DashRight">
      <PageTitle title="আমার প্রোফাইল" />
      <p className="DashProfileHead">আমার প্রোফাইল</p>
      <div className="d-flex DashSubProfile">
        <NavLink to="/Dashboard/userprofile/">
          {({ isActive }) => (
            <div
              className={
                isActive ? "activeProfile dashProfileText" : "dashProfileText"
              }
            >
              <p className="link_text">ব্যক্তিগত প্রোফাইল</p>
            </div>
          )}
        </NavLink>
        <NavLink to="/Dashboard/userprofile/usereducation/">
          {({ isActive }) => (
            <div
              className={
                isActive ? "activeProfile dashProfileText" : "dashProfileText"
              }
            >
              <p className="link_text">একাডেমিক প্রোফাইল</p>
            </div>
          )}
        </NavLink>
        <NavLink to="/Dashboard/userprofile/userexperience/">
          {({ isActive }) => (
            <div
              className={
                isActive ? "activeProfile dashProfileText" : "dashProfileText"
              }
            >
              <p className="link_text">জব প্রোফাইল (সিভি)</p>
            </div>
          )}
        </NavLink>
      </div>
      <div className="d-md-flex align-items-start justify-content-around">
        <div className="text-center">
          <img src={imageSource} alt="" className="DashUserImage" />
          <div>
            <label htmlFor="file-input">
              <button
                className="jobsPostSubmit mt-2"
                type="button"
                onClick={handleButtonClick}
              >
                ইমেজ সিলেক্ট করুন
              </button>
            </label>

            <label>
              <button
                className={`statusButton mt-2 ${
                  verifiedItem === "verified" ? "greenButton" : ""
                }`}
                type="button"
                onClick={handleVerifyButtonClick}
              >
                {" "}
                {verifiedItem === "verified" ? "ভেরিফাইড " : "ভেরিফাই করুন"}
              </button>
            </label>

            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <Outlet></Outlet>
      </div>

      {verifiedItem === "unverified" && (
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
      )}
    </div>
  );
}
export default UserProfile;
