import { useState } from "react";

import { toast } from "react-toastify";

import "./AdminProfileInfo.css";

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import config from "../../../config/apiConfig";
import {
  useUpdateUserInfoMutation,
  useUserByEmailQuery,
} from "../../redux/rtk/features/user/userApi";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  phone: yup
    .string()

    .length(11, "কন্টাক্ট নাম্বারটি অবশ্যই ১১ ডিজিট এর হতে হবে "),
});

function AdminProfileInfo({ role }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  if (role !== user?.role) {
    navigate("/page-not-found");
  }

  const { data } = useUserByEmailQuery(user?.email);
  const userInfo = data?.data;

  const [updateUserInfo, { isLoading, isError, isSuccess, error }] =
    useUpdateUserInfoMutation();
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
      .patch(
        `${config.apiUrl}/upload-image/${user?.email}`,

        formData
      )
      .then((response) => {
        console.log("success", response);
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
      admin: data,
    };
    console.log(formData);
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
    reset();
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
          <h2 className="DashtextPara">আপনার প্রোফাইল তৈরী করুন</h2>

          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="DashProfileInput">
                <label htmlFor="">ফার্স্ট নেম</label>
                <input
                  type="text"
                  defaultValue={userInfo?.admin[0]?.firstName}
                  {...register("firstName")}
                  placeholder="আপনার ফার্স্ট নেম লিখুন "
                />
              </div>

              <div className="DashProfileInput">
                <label htmlFor="">লাস্ট নেম</label>
                <input
                  type="text"
                  defaultValue={userInfo?.admin[0]?.lastName}
                  {...register("lastName")}
                  placeholder="আপনার লাস্ট নেম লিখুন "
                />
              </div>

              {/* <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            
            /> */}

              <div className="DashProfileInput">
                <label htmlFor="">ইমেইল</label>
                <input
                  type="text"
                  defaultValue={userInfo?.email}
                  {...register("email")}
                  placeholder="আপনার ইমেইল  লিখুন "
                  readOnly
                />
              </div>

              <div className="DashProfileInput">
                <label htmlFor="">কন্টাক্ট নাম্বার </label>
                <input
                  type="text"
                  style={{ width: "95%" }}
                  defaultValue={userInfo?.phone}
                  {...register("phone")}
                  placeholder="আপনার কন্টাক্ট নাম্বার লিখুন"
                />

                <div>
                  {errors.phone && (
                    <p className="text-danger">{errors.phone?.message}</p>
                  )}
                </div>
              </div>
              <input
                type="submit"
                className="DashUserSave"
                value="সেভ করুন"
                disabled={isLoading}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfileInfo;
