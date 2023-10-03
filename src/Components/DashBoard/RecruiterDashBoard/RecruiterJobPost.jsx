import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import { toast } from "react-toastify";
import * as yup from "yup";
import config from "../../../config/apiConfig";
import { usePostJobMutation } from "../../redux/rtk/features/Jobs/jobApi";
import "./jobpost.css";

const jobSchema = yup.object({
  companyName: yup.string().required("কোম্পনীর নাম লিখুন "),
  companyDescription: yup.string(),
  jobTitle: yup.string().required("জবের নাম লিখুন "),
  jobVacancy: yup.string().required("Vacancy is required"),
  jobExperience: yup.string().required("Job Experience is required"),
  jobDescription: yup.string().trim(),
  location: yup.string().required("location is required"),
  salaryRange: yup.string().required("Salary Range is required"),
  jobType: yup
    .string()
    .oneOf(
      ["Full-time", "Part-time", "Internship", "Contractual"],
      "জবের ধরণ নির্বাচন করুন "
    )
    .required("জবের ধরণ নির্বাচন করুন "),
  gender: yup
    .string()
    .oneOf(["Male", "Female", "Both", "Not Specific"], " লিঙ্গ নির্বাচন করুন")
    .required("লিঙ্গ নির্বাচন করুন"),
  jobCategory: yup
    .string()
    .oneOf(
      [
        "Electrical engineering",
        "IT",
        "Mechanical engineering",
        "Others",
        "Textile engineering",
        "Civil engineering",
      ],
      "কাজের বিভাগ নির্বাচন করুন"
    )
    .required("কাজের বিভাগ নির্বাচন করুন"),
  education: yup.string().required("Education Requirements is required").trim(),
  jobDeadline: yup
    .date()
    .typeError("Please enter a date")
    .required("Please Enter the deadline"),
  companyLogo: yup
    .mixed()
    .test(
      "fileType",
      "Invalid file type. Only image files are allowed.",
      (value) => {
        if (value) {
          return value.type.startsWith("image/");
        }
        return true;
      }
    )
    .test("fileSize", "Image size cannot exceed 1MB", (value) => {
      if (value) {
        return value.size <= 1024 * 1024;
      }
      return true;
    }),
});

function RecruiterJobPost({ role }) {
  const { user } = useSelector((state) => state?.auth);
  const navigate = useNavigate();

  if (!role.includes(user?.role)) {
    navigate("/page-not-found");
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(jobSchema),
  });

  const jobCreator = user?.email;
  const [postJob, { isLoading, isError, error }] = usePostJobMutation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [err, setErr] = useState("");

  const [fields, setFields] = useState({
    requirements: [""],
    compensation: [""],
  });

  const [selected, setSelected] = useState([]);

  const addField = (type) => {
    setFields((prevFields) => ({
      ...prevFields,
      [type]: [...prevFields[type], ""],
    }));
  };

  const handleFieldChange = (type, index, value) => {
    setFields((prevFields) => {
      const newFields = [...prevFields[type]];
      newFields[index] = value;
      return {
        ...prevFields,
        [type]: newFields,
      };
    });
  };

  const handleDeleteField = (type, index) => {
    if (fields[type].length === 1) {
      return;
    }
    setFields((prevFields) => {
      const newFields = [...prevFields[type]];
      newFields.splice(index, 1);
      return {
        ...prevFields,
        [type]: newFields,
      };
    });
  };

  const clearFields = () => {
    setFields({
      requirements: [""],
      compensation: [""],
    });
    setSelected([]);
    setSelectedImage(null);
  };
  const token = localStorage.getItem("token");
  const tokenWithoutQuotes = token.replace(/^"(.*)"$/, "$1");

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("companyLogo", selectedImage);
    formData.append("companyName", data.companyName);
    formData.append("companyDescription", data.companyDescription);
    formData.append("jobTitle", data.jobTitle);
    formData.append("jobVacancy", data.jobVacancy);
    formData.append("jobExperience", data.jobExperience);
    formData.append("jobDescription", data.jobDescription);
    formData.append("location", data.location);
    formData.append("salaryRange", data.salaryRange);
    formData.append("jobType", data.jobType);
    formData.append("gender", data.gender);
    formData.append("jobCategory", data.jobCategory);
    formData.append("education", data.education);
    formData.append("jobDeadline", data.jobDeadline);
    formData.append("jobRequirements", fields.requirements);
    formData.append("compensation", fields.compensation);
    formData.append("skills", selected);
    formData.append("jobCreator", jobCreator);

    for (let entry of formData.entries()) {
      console.log(entry[0] + ": " + entry[1]);
    }
    try {
      const response = await axios.post(`${config.apiUrl}/jobs`, formData);

      if (response.data.success) {
        toast.success("New Job Posted Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        reset();
        clearFields();
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Job Posting failed!", {
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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 1024 * 1024) {
      setSelectedImage(file);
      setValue("companyLogo", file);
      setErr("Image size cannot exceed 1MB");
    } else {
      setSelectedImage(file);
      setValue("companyLogo", file);
      setErr("");
    }
  };
  return (
    <div className="container-fluid ps-5 pb-3">
      <h2 className="DashtextPara">ইউনিভে জব পোস্ট করুন</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-sm-0 g-4 justify-content-center">
          <div className="d-md-flex align-items-center justify-content-between">
            <div className="DashProfileInput">
              <label htmlFor="companyName">
                কোম্পানির নাম <span className="ps-1 text-danger">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                style={{ width: "95%" }}
                placeholder="আপনার কোম্পানির নাম লিখুন"
                {...register("companyName")}
              />
              {errors.companyName && (
                <p className="error">{errors.companyName.message}</p>
              )}
            </div>
            <div className="DashProfileInput">
              <label htmlFor="companyLogo">কোম্পানীর লোগো</label>
              <input
                type="file"
                id="companyLogo"
                accept="image/*"
                onChange={handleImageChange}
                className="p-1"
              />
              {errors.companyLogo ? (
                <p className="error">{errors.companyLogo.message}</p>
              ) : err == "Image size cannot exceed 1MB" ? (
                <p className="error">{err}</p>
              ) : null}
              {selectedImage && (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  className="image-preview"
                />
              )}
            </div>
          </div>
          <div className="d-md-flex align-items-center justify-content-between">
            <div className="DashProfileInput">
              <label htmlFor="companyDescription">কোম্পানির বিস্তারিত</label>
              <textarea
                id="companyDescription"
                className="textareaSize"
                placeholder="কোম্পানির বিবরণ সম্পর্কে লিখুন"
                {...register("companyDescription")}
              ></textarea>
              {errors.companyDescription && (
                <p className="error">{errors.companyDescription.message}</p>
              )}
            </div>
            <div className="DashProfileInput">
              <label htmlFor="companyDescription">কাজের বিবরণী</label>
              <textarea
                className="textareaSize"
                placeholder="কাজের বিবরণ সম্পর্কে লিখুন"
                id="jobDescription"
                {...register("jobDescription")}
              ></textarea>
              {errors.companyDescription && (
                <p className="error">{errors.companyDescription.message}</p>
              )}
            </div>
          </div>
          <div className="d-md-flex align-items-center justify-content-between">
            <div className="DashProfileInput">
              <label htmlFor="jobTitle">
                জবের নাম<span className="ps-1 text-danger">*</span>
              </label>
              <input
                type="text"
                id="jobTitle"
                {...register("jobTitle")}
                placeholder="জবের নাম লিখুন"
              />
              {errors.jobTitle && (
                <p className="error">{errors.jobTitle.message}</p>
              )}
            </div>
            <div className="DashProfileInput">
              <label htmlFor="location">
                জবের ঠিকানা <span className="ps-1 text-danger">*</span>
              </label>
              <input
                type="text"
                id="location"
                {...register("location")}
                placeholder="আপনার জবের ঠিকানা লিখুন ex.(Dhaka, anywhere)"
              />
              {errors.location && (
                <p className="error">{errors.location.message}</p>
              )}
            </div>
          </div>
          <div className="d-md-flex  justify-content-between">
            <div className="DashProfileInput">
              <label htmlFor="jobVacancy">
                ভ্যাকেন্সি <span className="ps-1 text-danger">*</span>
              </label>
              <input
                type="text"
                id="jobVacancy"
                {...register("jobVacancy")}
                placeholder="জব ভ্যাকেন্সি নাম্বার লিখুন "
              />
              {errors.jobVacancy && (
                <p className="error">{errors.jobVacancy.message}</p>
              )}
            </div>
            <div className="DashProfileInput">
              <label htmlFor="jobRequirements">জব রিকোয়ারমেন্টস</label>
              {fields.requirements.map((requirement, index) => (
                <div key={index} className="dynamic-field mb-3">
                  <input
                    type="text"
                    value={requirement}
                    onChange={(e) =>
                      handleFieldChange("requirements", index, e.target.value)
                    }
                    placeholder="জব রিকোয়ারমেন্টস লিখুন"
                  />
                  {index !== 0 && (
                    <MdDeleteForever
                      className="delete-icon"
                      onClick={() => handleDeleteField("requirements", index)}
                    />
                  )}
                </div>
              ))}
              <button
                className="addJob"
                type="button"
                onClick={() => addField("requirements")}
              >
                + রিকোয়ারমেন্টস
              </button>
              {errors.jobRequirements && (
                <p className="error">{errors.jobRequirements.message}</p>
              )}
            </div>
          </div>
          <div className="d-md-flex align-items-center justify-content-between">
            <div className="DashProfileInput">
              <label htmlFor="jobExperience">
                জব এক্সপেরিয়েন্স <span className="ps-1 text-danger">*</span>
              </label>
              <input
                type="text"
                id="jobExperience"
                {...register("jobExperience")}
                placeholder="জব এক্সপেরিয়েন্স লিখুন ex.(Fresher, 0, 2-4)"
              />
              {errors.jobExperience && (
                <p className="error">{errors.jobExperience.message}</p>
              )}
            </div>

            <div className="input-wrapper w-100">
              <label htmlFor="jobDescription">দক্ষতা</label>
              <TagsInput
                error={errors.skills}
                {...register("skills", {
                  required: "Skills is required",
                  validate: {
                    maxLength: (maxLength) =>
                      maxLength <= 5 || "You can select up to 5 Skills",
                  },
                })}
                value={selected}
                onChange={setSelected}
                name="skills"
                max="5"
                placeHolder="সর্বোচ্চ ৫ দক্ষতা লিখুন"
              />
              {errors.skills && <p className="error">{errors.skills}</p>}
            </div>
          </div>
          <div className="d-md-flex align-items-center justify-content-between">
            <div className="DashProfileInput">
              <label htmlFor="jobCategory">
                কাজের শ্রেণী <span className="ps-1 text-danger">*</span>
              </label>
              <select
                id="jobCategory"
                required={false}
                {...register("jobCategory")}
              >
                <option style={{ color: "#1e3cba" }} value="" disabled selected>
                  কাজের বিভাগ নির্বাচন করুন
                </option>
                <option value="Electrical engineering">
                  ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং (Electrical Engineering)
                </option>
                <option value="IT">
                  আইটি / কম্পিউটার সাইন্স (IT / Computer Science)
                </option>
                <option value="Mechanical engineering">
                  মেকানিক্যাল ইঞ্জিনিয়ারিং (Mechanical Engineering)
                </option>
                <option value="Civil engineering">
                  সিভিল ইঞ্জিনিয়ারিং (Civil Engineering)
                </option>
                <option value="Textile engineering">
                  টেক্সটাইল ইঞ্জিনিয়ারিং (Textile Engineering)
                </option>
                <option value="Others">অন্যান্য (Others)</option>
              </select>
              {errors.jobCategory && (
                <p className="error">{errors.jobCategory.message}</p>
              )}
            </div>
            <div className="DashProfileInput">
              <label htmlFor="jobType">
                কাজের ধরন <span className="ps-1 text-danger">*</span>
              </label>
              <select id="jobType" {...register("jobType")}>
                <option value="" disabled selected>
                  কাজের ধরন নির্বাচন করুন
                </option>
                <option value="Full-time">ফুলটাইম (Full-time)</option>
                <option value="Part-time">খন্ডকালীন (Part-time)</option>
                <option value="Contractual">চুক্তিভিত্তিক (Contractual)</option>
                <option value="Internship">ইন্টার্নশীপ (Internship)</option>
              </select>
              {errors.jobType && (
                <p className="error">{errors.jobType.message}</p>
              )}
            </div>
          </div>

          <div className="d-md-flex align-items-center justify-content-between">
            <div className="DashProfileInput">
              <label htmlFor="salaryRange">
                স্যালারি রেঞ্জ<span className="ps-1 text-danger">*</span>
              </label>
              <input
                type="text"
                id="salaryRange"
                placeholder="স্যালারি রেঞ্জ লিখুন ex.(Negotiable,10000-40000)"
                {...register("salaryRange")}
              />
              {errors.salaryRange && (
                <p className="error">{errors.salaryRange.message}</p>
              )}
            </div>
            <div className="DashProfileInput">
              <label htmlFor="age">বয়স</label>
              <input
                type="text"
                id="age"
                {...register("age")}
                placeholder="আপনার কাজের বয়সের পরিসীমা লিখুন ex.(18-25, none)"
              />
              {errors.age && <p className="error">{errors.age.message}</p>}
            </div>
          </div>
          <div className="d-md-flex  justify-content-between">
            <div className="DashProfileInput">
              <label htmlFor="education">
                শিক্ষাগত প্রয়োজনীয়তা{" "}
                <span className="ps-1 text-danger">*</span>
              </label>
              <input
                type="text"
                id="education"
                {...register("education")}
                placeholder="জবের শিক্ষাগত প্রয়োজনীয়তা লিখুন"
              />
              {errors.education && (
                <p className="error">{errors.education.message}</p>
              )}
            </div>
            <div className="DashProfileInput">
              <label htmlFor="compensation">বেনিফিটস এন্ড ফ্যাসিলিটিজ </label>
              {fields.compensation.map((compensation, index) => (
                <div key={index} className="dynamic-field mb-3">
                  <input
                    type="text"
                    value={compensation}
                    placeholder="বেনিফিটস এন্ড ফ্যাসিলিটিজ লিখুন "
                    onChange={(e) =>
                      handleFieldChange("compensation", index, e.target.value)
                    }
                  />
                  {index !== 0 && (
                    <MdDeleteForever
                      className="delete-icon"
                      onClick={() => handleDeleteField("compensation", index)}
                    />
                  )}
                </div>
              ))}
              <button
                className="addJob"
                type="button"
                onClick={() => addField("compensation")}
              >
                + বেনিফিটস
              </button>
            </div>
          </div>
          <div className="d-md-flex align-items-center justify-content-between">
            <div className="DashProfileInput">
              <label htmlFor="gender">
                লিঙ্গ <span className="ps-1 text-danger">*</span>
              </label>
              <select id="gender" required={false} {...register("gender")}>
                <option value="" disabled selected>
                  লিঙ্গ নির্বাচন করুন
                </option>
                <option value="Male">পুরুষ (Male)</option>
                <option value="Female">মহিলা (Female)</option>
                <option value="Both">উভয় (Both)</option>
                <option value="Not Specific">
                  নির্দিষ্ট না (Not Specific)
                </option>
              </select>
              {errors.gender && (
                <p className="error">{errors.gender.message}</p>
              )}
            </div>
            <div className="DashProfileInput">
              <label htmlFor="jobDeadline">
                শেষ তারিখ<span className="ps-1 text-danger">*</span>
              </label>
              <input
                type="date"
                id="jobDeadline"
                {...register("jobDeadline")}
              />
              {errors.jobDeadline && (
                <p className="error">{errors.jobDeadline.message}</p>
              )}
            </div>
          </div>
          <div className="text-center">
            <input
              className="jobsPostSubmit my-4"
              type="submit"
              value="সাবমিট"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default RecruiterJobPost;
