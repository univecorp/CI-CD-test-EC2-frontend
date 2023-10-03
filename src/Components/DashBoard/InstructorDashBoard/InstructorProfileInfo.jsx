import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useEditInstructorMutation } from "../../redux/rtk/features/Instructor/instructorApi";
import "./InstructorProfileInfo.css";

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import config from "../../../config/apiConfig";
import { useUserByEmailQuery } from "../../redux/rtk/features/user/userApi";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  instructorBio: yup.string().required("আপনার বায়ো দিতে হবে  "),

  instructorExperience: yup.string().required("এক্সপেরিয়েন্স দিতে হবে "),

  instructorAddress: yup
    .string()

    .required("আপনার ঠিকানা  দিতে হবে"),

  instructorContact: yup
    .string()
    .required("আপনার কন্টাক্ট নাম্বার দিতে হবে ")
    .length(11, "কন্টাক্ট নাম্বারটি অবশ্যই ১১ ডিজিট এর হতে হবে "),
  gender: yup.string().required("আপনার জেন্ডার দিতে হবে"),
});

function InstructorProfileInfo({ role }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!role.includes(user?.role)) {
    navigate("/page-not-found");
  }
  const { data } = useUserByEmailQuery(user?.email);
  const userInfo = data?.data;
  const instructorId = data?.data?.Instructor._id;

  const [editInstructor, { isLoading, isError, isSuccess, error }] =
    useEditInstructorMutation();
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

  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    if (userInfo) {
      setInputs(userInfo?.social || []);
    }
  }, [userInfo]);

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };

  const addInput = () => {
    const newInputs = [...inputs, ""];
    setInputs(newInputs);
  };

  const deleteInput = (index) => {
    if (index >= 1) {
      const newInputs = [...inputs];
      newInputs.splice(index, 1);
      setInputs(newInputs);
    }
  };

  const onSubmit = async (data) => {
    const formData = {};
    if (data.firstName) {
      formData.firstName = data.firstName;
    }
    if (data.lastName) {
      formData.lastName = data.lastName;
    }
    if (data.instructorBio) {
      formData.instructorBio = data.instructorBio;
    }
    if (data.instructorExperience) {
      formData.instructorExperience = data.instructorExperience;
    }
    if (data.instructorAddress) {
      formData.instructorAddress = data.instructorAddress;
    }
    if (data.instructorContact) {
      formData.instructorContact = data.instructorContact;
    }
    if (data.gender) {
      formData.gender = data.gender;
    }

    if (data.facebook) {
      formData.facebook = data.facebook;
    }
    if (data.linkedin) {
      formData.linkedin = data.linkedin;
    }
    if (data.workExperience) {
      formData.education = data.workExperience;
    }

    formData.social = inputs;

    try {
      const response = await editInstructor({
        id: instructorId,
        data: formData,
      });

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
      console.error(error);
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
                  defaultValue={userInfo?.firstName}
                  {...register("firstName")}
                  placeholder="আপনার ফার্স্ট নেম লিখুন "
                />
              </div>

              <div className="DashProfileInput">
                <label htmlFor="">লাস্ট নেম</label>
                <input
                  type="text"
                  defaultValue={userInfo?.lastName}
                  {...register("lastName")}
                  placeholder="আপনার লাস্ট নেম লিখুন "
                />
              </div>

              <div className="d-md-flex align-items-center justify-content-between">
                <div className="DashProfileInput">
                  <label htmlFor="">আপনার বায়ো লিখুন</label>
                  <textarea
                    type="text"
                    defaultValue={userInfo?.Instructor?.instructorBio}
                    {...register("instructorBio")}
                    placeholder="আপনার বায়ো লিখুন"
                  />
                </div>
              </div>

              <div>
                {errors.instructorBio && (
                  <p className="text-danger">{errors.instructorBio?.message}</p>
                )}
              </div>

              <div className="DashProfileInput">
                <label htmlFor="">এক্সপেরিয়েন্স</label>
                <input
                  type="text"
                  style={{ width: "95%" }}
                  defaultValue={userInfo?.Instructor?.instructorExperience}
                  {...register("instructorExperience")}
                  placeholder="আপনার  এক্সপেরিয়েন্স  লিখুন"
                />

                <div>
                  {errors.instructorExperience && (
                    <p className="text-danger">
                      {errors.instructorExperience?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="DashProfileInput">
                <label htmlFor="">ঠিকানা</label>
                <input
                  type="text"
                  style={{ width: "95%" }}
                  defaultValue={userInfo?.Instructor?.instructorAddress}
                  {...register("instructorAddress")}
                  placeholder="আপনার ঠিকানা লিখুন"
                />

                <div>
                  {errors.instructorAddress && (
                    <p className="text-danger">
                      {errors.instructorAddress?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="DashProfileInput">
                <label htmlFor="">কন্টাক্ট নাম্বার </label>
                <input
                  type="text"
                  style={{ width: "95%" }}
                  defaultValue={userInfo?.Instructor?.instructorContact}
                  {...register("instructorContact")}
                  placeholder="আপনার কন্টাক্ট নাম্বার লিখুন"
                />

                <div>
                  {errors.instructorContact && (
                    <p className="text-danger">
                      {errors.instructorContact?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="d-md-flex align-items-center justify-content-around">
                <div className="DashProfileInput">
                  <label htmlFor="gender">লিঙ্গ</label>
                  <select
                    id="gender"
                    {...register("gender")}
                    defaultValue={userInfo?.Instructor?.gender}
                  >
                    <option value="পুরুষ">পুরুষ</option>
                    <option value="মহিলা">মহিলা</option>
                    <option value="অন্যান্য">অন্যান্য</option>
                  </select>

                  <div>
                    {errors.gender && (
                      <p className="text-danger">{errors.gender?.message}</p>
                    )}
                  </div>
                </div>

                <div className="DashProfileInput">
                  <label htmlFor="">জন্ম তারিখ</label>
                  <input
                    type="date"
                    {...register("birth")}
                    defaultValue={userInfo?.Instructor?.birth}
                  />
                </div>
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
                    placeholder="আপনার ফেইসবুক লিংক দিন"
                    // value={facebook}
                    // onChange={(event) => setFacebook(event.target.value)}
                    defaultValue={userInfo?.Instructor?.facebook}
                    {...register("facebook")}
                    style={{ width: "95%" }}
                  />

                  <div>
                    {errors.facebook && (
                      <p className="text-danger">{errors.facebook?.message}</p>
                    )}
                  </div>
                </div>

                <div className="input-container">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/018/930/587/original/linkedin-logo-linkedin-icon-transparent-free-png.png"
                    alt=""
                  />
                  <input
                    type="text"
                    placeholder="আপনার লিংকডইন লিংক দিন"
                    style={{ width: "95%" }}
                    defaultValue={userInfo?.Instructor?.linkedin}
                    {...register("linkedin")}
                  />

                  <div>
                    {errors.linkedin && (
                      <p className="text-danger">{errors.linkedin?.message}</p>
                    )}
                  </div>
                </div>
              </div>
              {inputs.map((input, index) => (
                <div key={index}>
                  <div className="DashProfileInput">
                    <div className="input-container">
                      <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/003/731/316/small/web-icon-line-on-white-background-image-for-web-presentation-logo-icon-symbol-free-vector.jpg"
                        alt=""
                      />
                      <input
                        type="text"
                        placeholder="আরো সোশ্যাল লিংক যুক্ত করুন "
                        {...register(`input-${index}`)}
                        value={input}
                        // defaultValue={userInfo?.Instructor?.social}
                        onChange={(event) => handleInputChange(index, event)}
                        style={{ width: "95%" }}
                      />
                    </div>
                  </div>
                  {index >= 1 && (
                    <p
                      type="button"
                      className="dashParaSmallText"
                      onClick={() => deleteInput(index)}
                    >
                      Delete
                    </p>
                  )}
                </div>
              ))}
              <p type="button" onClick={addInput} className="dashParaSmallText">
                + আরো প্রোফাইল যুক্ত করুন
              </p>
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

export default InstructorProfileInfo;
