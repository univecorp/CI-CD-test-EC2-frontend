import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import config from "../../../config/apiConfig";
import {
  useUpdateUserInfoMutation,
  useUserByEmailQuery,
} from "../../redux/rtk/features/user/userApi";
import { useNavigate } from "react-router-dom";

function RecruiterProfile({ role }) {
  console.log(role);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!role.includes(user?.role)) {
    navigate("/page-not-found");
  }

  const { data } = useUserByEmailQuery(user?.email);
  const userInfo = data?.data;
  const [updateUserInfo, { isLoading, isSuccess, isError, error }] =
    useUpdateUserInfoMutation();
  const { register, setValue, handleSubmit } = useForm();

  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        setSelectedImage(imageData); // Store the selected image in state
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

  const handleButtonClick = () => {
    document.getElementById("file-input").click();
  };

  const onSubmit = async (data) => {
    const formData = {
      recruiter: data,
    };

    try {
      await updateUserInfo({ email: user?.email, data: formData });
      toast.success("সফলভাবে তথ্য সংগ্রহ হয়েছে!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error(error.response.data);
      // Handle error
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  return (
    <div className="container-fluid px-0 DashRight">
      <div className="d-md-flex align-items-start justify-content-between">
        <div className="text-center">
          <img
            src={
              selectedImage ||
              (userInfo && userInfo.image) ||
              "https://example.com/default-image.jpg"
            }
            alt=""
            className="DashUserImage"
          />

          <div>
            <label htmlFor="file-input">
              <button
                className="jobsPostSubmit mt-2"
                type="button"
                onClick={handleButtonClick}
              >
                Select Image
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

        <div className="container-fluid">
          <h2 className="DashtextPara">কোম্পানি তথ্য</h2>
          <div className="">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="d-md-flex align-items-center justify-content-between">
                <div className="DashProfileInput">
                  <label htmlFor="">কোম্পানি নাম</label>
                  <input
                    type="text"
                    defaultValue={userInfo?.recruiter[0]?.CompanyName}
                    {...register("CompanyName")}
                    placeholder="আপনার কোম্পানির নাম লিখুন"
                  />
                </div>
                <div className="DashProfileInput">
                  <label htmlFor="">কোম্পানি রিপ্রেজেন্টেটিভের নাম</label>
                  <input
                    type="text"
                    defaultValue={userInfo?.recruiter[0]?.RicruiterName}
                    {...register("RicruiterName")}
                    placeholder="আপনার কোম্পানি রিপ্রেজেন্টেটিভের নাম লিখুন"
                  />
                </div>
              </div>
              <div className="d-md-flex align-items-center justify-content-between">
                <div className="DashProfileInput">
                  <label htmlFor="">কোম্পানির ইমেইল</label>
                  <input
                    type="email"
                    defaultValue={userInfo?.recruiter[0]?.CompanyEmail}
                    {...register("CompanyEmail")}
                    placeholder="আপনার কোম্পানির ইমেইল এড্রেস লিখুন "
                  />
                </div>
                <div className="DashProfileInput">
                  <label htmlFor="">কোম্পানি রিপ্রেজেন্টেটিভের ইমেইল</label>
                  <input
                    type="email"
                    defaultValue={userInfo?.recruiter[0]?.RicruiterEmail}
                    {...register("RicruiterEmail")}
                    placeholder="আপনার কোম্পানি রিপ্রেজেন্টেটিভের ইমেইল এড্রেস লিখুন "
                  />
                </div>
              </div>
              <div className="d-md-flex align-items-center justify-content-around">
                <div className="DashProfileInput">
                  <label htmlFor="">কোম্পানির ফোন নাম্বার</label>
                  <input
                    type="phone"
                    {...register("CompanyPhone")}
                    defaultValue={userInfo?.recruiter[0]?.CompanyPhone}
                    placeholder="আপনার কোম্পানির ফোন নম্বর লিখুন "
                  />
                </div>
                <div className="DashProfileInput">
                  <label htmlFor="">
                    কোম্পানি রিপ্রেজেন্টেটিভের ফোন নাম্বার
                  </label>
                  <input
                    type="phone"
                    {...register("RicruiterPhone")}
                    defaultValue={userInfo?.recruiter[0]?.RicruiterPhone}
                    placeholder="আপনার কোম্পানি রিপ্রেজেন্টেটিভের ফোন নম্বর লিখুন "
                  />
                </div>
              </div>
              <div className="d-md-flex align-items-center justify-content-between">
                <div className="DashProfileInput">
                  <label htmlFor="">কোম্পানির ধরণ </label>
                  <input
                    type="text"
                    defaultValue={userInfo?.recruiter[0]?.CompanyType}
                    {...register("CompanyType")}
                    placeholder="আপনার কোম্পানির ধরণ  লিখুন "
                  />
                </div>
                <div className="DashProfileInput">
                  <label htmlFor="">ঠিকানা</label>
                  <input
                    type="text"
                    defaultValue={userInfo?.recruiter[0]?.CompanyAddress}
                    {...register("CompanyAddress")}
                    placeholder="আপনার কোম্পানির ঠিকানা লিখুন"
                  />
                </div>
              </div>

              <div className="d-md-flex align-items-center justify-content-around">
                <div className="DashProfileInput">
                  <label htmlFor="">শহর/প্রদেশ</label>
                  <input
                    type="text"
                    defaultValue={userInfo?.recruiter[0]?.CompanyCity}
                    {...register("CompanyCity")}
                    placeholder="কোন শহরে অবস্থিত"
                  />
                </div>
                <div className="DashProfileInput">
                  <label htmlFor="">দেশ</label>
                  <input
                    type="text"
                    defaultValue={userInfo?.recruiter[0]?.CompanyCountry}
                    {...register("CompanyCountry")}
                    placeholder="দেশের নাম লিখুন"
                  />
                </div>
              </div>
              <div className="DashProfileInput">
                <label htmlFor="">কোম্পানির সম্পর্কে</label>
                <textarea
                  placeholder="কোম্পানির সম্পর্কে বিস্তারিত লিখুন"
                  defaultValue={userInfo?.recruiter[0]?.CompanyBio}
                  {...register("CompanyBio")}
                ></textarea>
              </div>
              <div className="DashProfileInput">
                <label htmlFor="">সোশাল প্রোফাইল</label>
                <div className="input-container">
                  <img
                    src="https://img.freepik.com/premium-vector/blue-social-media-logo_197792-1759.jpg"
                    alt=""
                  />
                  <input
                    type="text"
                    placeholder="আপনার কোম্পনির ফেইসবুক লিংক দিন"
                    defaultValue={userInfo?.recruiter[0]?.CompnayFacebook}
                    {...register("CompnayFacebook")}
                    style={{ width: "95%" }}
                  />
                </div>
                <div className="input-container">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/018/930/587/original/linkedin-logo-linkedin-icon-transparent-free-png.png"
                    alt=""
                  />
                  <input
                    type="text"
                    placeholder="আপনার কোম্পনির লিংকডইন লিংক দিন"
                    style={{ width: "95%" }}
                    defaultValue={userInfo?.recruiter[0]?.CompanyLinkedin}
                    {...register("CompanyLinkedin")}
                  />
                </div>
                <div className="input-container">
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/003/731/316/small/web-icon-line-on-white-background-image-for-web-presentation-logo-icon-symbol-free-vector.jpg"
                    alt=""
                  />
                  <input
                    type="text"
                    placeholder="আপনার কোম্পনির ওয়েবসাইট লিংক দিন"
                    style={{ width: "95%" }}
                    defaultValue={userInfo?.recruiter[0]?.CompnayWebsite}
                    {...register("CompnayWebsite")}
                  />
                </div>
              </div>
              <input type="submit" className="DashUserSave" value="সেভ করুন" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterProfile;
