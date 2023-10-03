import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { TagsInput } from "react-tag-input-component";
import { toast } from "react-toastify";
import { useEditInstructorMutation } from "../../redux/rtk/features/Instructor/instructorApi";
import "./InstructorProfileInfo.css";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSelector } from "react-redux";
import config from "../../../config/apiConfig";
import { useUserByEmailQuery } from "../../redux/rtk/features/user/userApi";
import { useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  // education: yup.string().required("এডুকেশন ইনপুট ফিল্ড দিতে হবে"),
});
function InstructorEducation({ role }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!role.includes(user?.role)) {
    navigate("/page-not-found");
  }

  const { data } = useUserByEmailQuery(user?.email);
  const userInfo = data?.data;
  const instructorId = data?.data?.Instructor._id;
  const [selectedImage, setSelectedImage] = useState(null);

  const [workExperienceFields, setWorkExperienceFields] = useState([{}]);

  console.log("data of user education", data);

  const [editInstructor, { isLoading, isError, isSuccess, error }] =
    useEditInstructorMutation();

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

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [workExperience, setWorkExperience] = useState([
    {
      institution: "",
      educationLevel: "",
      degree: "",
      group: "",
      location: "",
      result: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      canDelete: false,
      workNumber: 1,
    },
  ]);

  const addWorkExperience = () => {
    const newWorkExperience = {
      institution: "",
      educationLevel: "",
      degree: "",
      group: "",
      startDate: "",
      endDate: "",
      location: "",
      result: "",
      canDelete: true,
      workNumber: workExperience.length + 1,
    };

    setWorkExperience((prevWorkExperience) => [
      ...prevWorkExperience,
      newWorkExperience,
    ]);
  };

  useEffect(() => {
    reset({ ...getValues() });
  }, [workExperience.length, reset]);

  const deleteWorkExperience = (index) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience.splice(index, 1);
    setWorkExperience(newWorkExperience);
  };

  const onSubmit = async (data) => {
    const formData = {
      education: data.workExperience,
    };
    console.log("this education form data", formData);
    try {
      await editInstructor({ id: instructorId, data: formData });
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
          <h2 className="DashtextPara">একাডেমিক তথ্য</h2>
          <div className="">
            <form onSubmit={handleSubmit(onSubmit)}>
              {workExperience?.map((experience, index) => (
                <div key={index}>
                  <p className="dashParaSmalls">
                    শিক্ষা প্রতিষ্ঠান {experience.workNumber}
                  </p>
                  <div className="d-md-flex align-items-center justify-content-between">
                    <div className="DashProfileInput">
                      <label htmlFor="">শিক্ষা প্রতিষ্ঠানের নাম</label>
                      <input
                        type="text"
                        {...register(`workExperience.${index}.institution`)}
                        placeholder="আপনার শিক্ষা প্রতিষ্ঠানের নাম লিখুন"
                        defaultValue={
                          workExperienceFields?.[index]?.institution || ""
                        }
                      />
                    </div>
                    <div className="DashProfileInput">
                      <label htmlFor="">শিক্ষার লেভেল</label>
                      <input
                        type="text"
                        {...register(`workExperience.${index}.educationLevel`)}
                        placeholder="আপনার শিক্ষা প্রতিষ্ঠানের নাম লিখুন"
                        defaultValue={
                          workExperienceFields?.[index]?.educationLevel || ""
                        }
                      />
                    </div>
                  </div>

                  <div className="d-md-flex align-items-center justify-content-between">
                    <div className="DashProfileInput">
                      <label htmlFor="">ডিগ্রী</label>
                      <input
                        type="text"
                        {...register(`workExperience.${index}.degree`)}
                        placeholder="ডিগ্রীর নাম লিখুন"
                        defaultValue={experience?.degree}
                      />
                    </div>
                    <div className="DashProfileInput">
                      <label htmlFor="">গ্রুপ/মেজর</label>
                      <input
                        type="text"
                        {...register(`workExperience.${index}.group`)}
                        placeholder="শিক্ষার গ্রুপ লিখুন"
                        defaultValue={
                          workExperienceFields?.[index]?.group || ""
                        }
                      />
                    </div>
                  </div>

                  <div className="d-md-flex align-items-center justify-content-between">
                    <div className="DashProfileInput">
                      <label htmlFor="">শিক্ষা প্রতিষ্ঠানের অবস্থান</label>
                      <input
                        type="text"
                        {...register(`workExperience.${index}.location`)}
                        placeholder="শিক্ষা প্রতিষ্ঠানের অবস্থান লিখুন"
                        defaultValue={
                          workExperienceFields?.[index]?.location || ""
                        }
                      />
                    </div>
                    <div className="DashProfileInput">
                      <label htmlFor="">রেজাল্ট</label>
                      <input
                        type="text"
                        {...register(`workExperience.${index}.result`)}
                        placeholder="ফলাফল লিখুন"
                        defaultValue={
                          workExperienceFields?.[index]?.result || ""
                        }
                      />
                    </div>
                  </div>
                  <div className="d-md-flex align-items-center justify-content-around">
                    <div className="DashProfileInput">
                      <label htmlFor="">পড়াশুনা শুরুর বছর</label>
                      <input
                        type="date"
                        {...register(`workExperience.${index}.startDate`)}
                        placeholder="Start Date"
                        defaultValue={
                          workExperienceFields?.[index]?.startDate || ""
                        }
                      />
                    </div>
                    <div className="DashProfileInput">
                      <label htmlFor="">পড়াশুনা শেষের বছর</label>
                      <input
                        type="date"
                        {...register(`workExperience.${index}.endDate`)}
                        placeholder="endDate"
                        defaultValue={
                          workExperienceFields?.[index]?.endDate || ""
                        }
                        disabled={
                          watch(`workExperience.${index}.isCurrent`) || false
                        }
                      />
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="mt-4 me-2"
                    {...register(`workExperience.${index}.isCurrent`)}
                    checked={
                      watch(`workExperience.${index}.isCurrent`) || false
                    }
                    onChange={(e) => {
                      setValue(
                        `workExperience.${index}.isCurrent`,
                        e.target.checked
                      );
                    }}
                  />
                  <label>বর্তমানে কর্মরত আছি</label>

                  {experience.canDelete && (
                    <p
                      type="button"
                      onClick={() => deleteWorkExperience(index)}
                      className="dashParaSmallText"
                    >
                      Delete
                    </p>
                  )}
                </div>
              ))}

              <div>
                {errors.education && (
                  <p className="text-danger">{errors.education?.message}</p>
                )}
              </div>

              <p
                className="dashParaSmallText"
                type="button"
                onClick={addWorkExperience}
              >
                + আরো শিক্ষা প্রতিষ্ঠান যুক্ত করুন
              </p>

              <input type="submit" className="DashUserSave" value="সেভ করুন" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorEducation;
