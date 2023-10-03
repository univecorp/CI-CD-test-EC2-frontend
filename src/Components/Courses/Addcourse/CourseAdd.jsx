import React, { useState } from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import "./addcourse.css";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import axios from "axios";
import config from "../../../config/apiConfig";

import { useNavigate } from "react-router-dom";

export default function CourseAdd({ role }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!role.includes(user?.role)) {
    navigate("/page-not-found");
  }

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [coursetag, setCourseTag] = useState("");
  const [courseSummary, setCourseSummary] = useState("");
  const [coursePremierTime, setcoursePremierTime] = useState("");
  const [learn, setLearn] = useState("");
  const [courseIncludes, setCourseIncludes] = useState("");
  const [whatneed, setWhatNeed] = useState("");
  const [modules, setModules] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const handleAddModule = () => {
    setModules([...modules, { title: "", subModules: [] }]);
  };
  const handleAddSubModule = (moduleIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].subModules.push({
      title: "",
      videos: [],
      quizzes: [],
    });
    setModules(newModules);
  };

  const handleAddVideo = (moduleIndex, subModuleIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].subModules[subModuleIndex].videos.push({
      title: "",
      url: "",
    });
    setModules(newModules);
  };

  const handleAddQuiz = (moduleIndex, subModuleIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].subModules[subModuleIndex].quizzes.push({
      question: "",
      options: [],
      answer: "",
    });
    setModules(newModules);
  };

  const handleDeleteModule = (moduleIndex) => {
    const newModules = [...modules];
    newModules.splice(moduleIndex, 1);
    setModules(newModules);
  };

  const handleDeleteSubModule = (moduleIndex, subModuleIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].subModules.splice(subModuleIndex, 1);
    setModules(newModules);
  };

  const handleDeleteVideo = (moduleIndex, subModuleIndex, videoIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].subModules[subModuleIndex].videos.splice(
      videoIndex,
      1
    );
    setModules(newModules);
  };

  const handleDeleteQuiz = (moduleIndex, subModuleIndex, quizIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].subModules[subModuleIndex].quizzes.splice(
      quizIndex,
      1
    );
    setModules(newModules);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const token = localStorage.getItem("token");
  const tokenWithoutQuotes = token.replace(/^"(.*)"$/, "$1");
  const resetForm = () => {
    setName("");
    setDescription("");
    setImage(null);

    setCourseTag("");
    setCourseSummary("");
    setcoursePremierTime("");
    setLearn(""), setCourseIncludes([]), setWhatNeed([]), setModules([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const modulesJson = JSON.stringify(modules);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("coursetag", coursetag);
    formData.append("image", image);
    formData.append("courseSummary", courseSummary);
    formData.append("coursePremierTime", coursePremierTime);
    formData.append("learn", learn);
    formData.append("courseIncludes", courseIncludes);
    formData.append("modules", modulesJson);
    try {
      const response = await axios.post(
        `https://api.unive.com.bd/api/V1/courses`,
        formData,
        {
          headers: {
            authorization: `${tokenWithoutQuotes}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("কোর্স অ্যাড করা সম্পন্ন হয়েছে!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        resetForm();
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Header></Header>
      <h2 className="add-course-header">কোর্স অ্যাড করুন!</h2>
      <div className="main-cont-form container-fluid">
        <form onSubmit={handleSubmit}>
          <div className="form-group col-lg-4 col-md-6 col-sm-12">
            <label className="lbl">Course Name:</label>
            <input
              type="text"
              className={`main-input-section ${
                name === "" ? "invalid-input" : ""
              }`}
              value={name}
              placeholder="কোর্স এর নাম লিখুন!"
              required
              onChange={(event) => setName(event.target.value)}
            />
            {name === "" && (
              <div className="error-message text-danger">
                এই ফিল্ডটি পূরণ করা প্রয়োজন
              </div>
            )}
          </div>
          <div className="form-group col-lg-4 col-md-6 col-sm-12">
            <label className="lbl">Course Description:</label>
            <textarea
              type="text"
              className={`main-input-section ${
                description === "" ? "invalid-input" : ""
              }`}
              value={description}
              placeholder="কোর্স সম্পর্কে লিখুন!"
              required
              onChange={(event) => setDescription(event.target.value)}
            />
            {description === "" && (
              <div className="error-message text-danger">
                এই ফিল্ডটি পূরণ করা প্রয়োজন
              </div>
            )}
          </div>
          <div className="form-group col-lg-4 col-md-6 col-sm-12">
            <label className="lbl">Image:</label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
            />
            {image === "" && (
              <div className="error-message text-danger">
                এই ফিল্ডটি পূরণ করা প্রয়োজন
              </div>
            )}
          </div>
          <div>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image Preview"
                style={{ width: "100px", height: "100px", marginTop: "10px" }}
              />
            )}
          </div>

          <br></br>
          <br></br>
          <div>
            <label htmlFor="coursetag">Course Tag: </label>
            <select
              id="coursetag"
              value={coursetag}
              required
              onChange={(e) => setCourseTag(e.target.value)}
            >
              <option value=""> যেকোনো একটি অপশন সিলেক্ট করুন!</option>
              <option value="Engineering">Engineering</option>
              <option value="SystemAdmin">SystemAdmin</option>
              <option value="Driving">Driving</option>
              <option value="Repairing">Repairing</option>
              <option value="Carpentry">Carpentry</option>
              <option value="Welding">Welding</option>
              <option value="Medical">Medical</option>
              <option value="HotelManagement">HotelManagement</option>
              <option value="HospitalManagement">HospitalManagement</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Callcenter">Callcenter</option>
            </select>
            {coursetag === "" && (
              <div className="error-message text-danger">
                এই ফিল্ডটি পূরণ করা প্রয়োজন
              </div>
            )}
          </div>

          <div className="form-group col-lg-4 col-md-6 col-sm-12">
            <label className="lbl">Course Summary:</label>
            <textarea
              type="text"
              className={`main-input-section ${
                courseSummary === "" ? "invalid-input" : ""
              }`}
              value={courseSummary}
              placeholder="কোর্স এর সামারি লিখুন!"
              required
              onChange={(event) => setCourseSummary(event.target.value)}
            />

            {courseSummary === "" && (
              <div className="error-message text-danger">
                এই ফিল্ডটি পূরণ করা প্রয়োজন
              </div>
            )}
          </div>

          <div className="form-group col-lg-4 col-md-6 col-sm-12">
            <label className="lbl">Course Premier Time:</label>
            <input
              type="text"
              className="main-input-section"
              value={coursePremierTime}
              placeholder="কোর্স প্রিমিয়ার টাইম লিখুন "
              onChange={(event) => setcoursePremierTime(event.target.value)}
            />
          </div>
          <div className="form-group col-lg-4 col-md-6 col-sm-12">
            <label className="lbl">What will you Learn:</label>
            <input
              type="text"
              className="main-input-section"
              value={learn}
              placeholder="কোর্সটি থেকে কি শিখতে পারবেন"
              onChange={(event) => setLearn(event.target.value.split(","))}
            />
          </div>
          <div className="form-group col-lg-4 col-md-6 col-sm-12">
            <label className="lbl">What Includes in the course:</label>
            <input
              type="text"
              className="main-input-section"
              value={courseIncludes}
              placeholder="কোর্সে যা থাকবে "
              onChange={(event) =>
                setCourseIncludes(event.target.value.split(","))
              }
            />
          </div>
          <div className="form-group col-lg-4 col-md-6 col-sm-12">
            <label className="lbl">What will Need for the course:</label>
            <input
              type="text"
              className="main-input-section"
              value={whatneed}
              placeholder="কোর্স করতে যা লাগবে"
              onChange={(event) => setWhatNeed(event.target.value.split(","))}
            />
          </div>

          <div className="row">
            {modules.map((module, moduleIndex) => (
              <div key={moduleIndex}>
                <label className="lbl">Module Title:</label>

                <input
                  type="text"
                  value={module.title}
                  className="form-control w-25"
                  placeholder="মডিউলের টাইটেল লিখুন!"
                  onChange={(event) => {
                    const newModules = [...modules];
                    newModules[moduleIndex].title = event.target.value;
                    setModules(newModules);
                  }}
                />

                <br />
                <input
                  type="text"
                  value={module.moduleSummary}
                  className="form-control w-25"
                  placeholder="মডিউলের বিস্তারিত  লিখুন!"
                  onChange={(event) => {
                    const newModules = [...modules];
                    newModules[moduleIndex].moduleSummary = event.target.value;
                    setModules(newModules);
                  }}
                />

                {module.subModules.map((subModule, subModuleIndex) => (
                  <div
                    key={`${moduleIndex}-${subModuleIndex}`}
                    className="sub-module"
                  >
                    <div className="form-group">
                      <label className="lbl">Sub-Module Title:</label>

                      <input
                        type="text"
                        className="form-control w-25"
                        placeholder="সাবমডিউল এর টাইটেল লিখুন!"
                        value={subModule.title}
                        onChange={(event) => {
                          const newModules = [...modules];
                          newModules[moduleIndex].subModules[
                            subModuleIndex
                          ].title = event.target.value;
                          setModules(newModules);
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="lbl">Sub-Module Description:</label>

                      <input
                        type="text"
                        className="form-control w-25"
                        placeholder="সাবমডিউল এর বিস্তারিত লিখুন!"
                        value={subModule.subModuleSummary}
                        onChange={(event) => {
                          const newModules = [...modules];
                          newModules[moduleIndex].subModules[
                            subModuleIndex
                          ].subModuleSummary = event.target.value;
                          setModules(newModules);
                        }}
                      />
                    </div>

                    {subModule.videos.map((video, videoIndex) => (
                      <div
                        key={`${moduleIndex}-${subModuleIndex}-${videoIndex}`}
                        className="video"
                      >
                        <div className="form-group">
                          <label className="lbl">Video Title:</label>
                          <input
                            type="text"
                            placeholder="ভিডিওর টাইটেল লিখুন!"
                            className="form-control w-25"
                            value={video.title}
                            onChange={(event) => {
                              const newModules = [...modules];
                              newModules[moduleIndex].subModules[
                                subModuleIndex
                              ].videos[videoIndex].title = event.target.value;
                              setModules(newModules);
                            }}
                          />
                        </div>

                        <div className="form-group">
                          <label className="lbl">video Description:</label>
                          <input
                            type="text"
                            placeholder="ভিডিও ডেসক্রিপশন লিখুন!"
                            className="form-control w-25"
                            value={video.videoDescription}
                            onChange={(event) => {
                              const newModules = [...modules];
                              newModules[moduleIndex].subModules[
                                subModuleIndex
                              ].videos[videoIndex].videoDescription =
                                event.target.value;
                              setModules(newModules);
                            }}
                          />
                        </div>

                        <div className="form-group">
                          <label className="lbl">Video URL:</label>

                          <input
                            type="text"
                            className="form-control w-25"
                            value={video.url}
                            placeholder="ভিডিওর লিংক দিন!"
                            onChange={(event) => {
                              const newModules = [...modules];
                              newModules[moduleIndex].subModules[
                                subModuleIndex
                              ].videos[videoIndex].url = event.target.value;
                              setModules(newModules);
                            }}
                          />
                        </div>

                        <button
                          type="button"
                          className="btn btn-outline-danger mt-4 ms-4"
                          onClick={() =>
                            handleDeleteVideo(
                              moduleIndex,
                              subModuleIndex,
                              videoIndex
                            )
                          }
                        >
                          Delete Video
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="btn btn-outline-primary mt-4 me-4"
                      onClick={() =>
                        handleAddVideo(moduleIndex, subModuleIndex)
                      }
                    >
                      Add Video
                    </button>

                    {/* quiz */}
                    {subModule.quizzes.map((quiz, quizIndex) => (
                      <div
                        key={`${moduleIndex}-${subModuleIndex}-${quizIndex}`}
                        className="quiz"
                      >
                        <div className="form-group">
                          <label className="lbl">Quiz Question:</label>
                          <input
                            type="text"
                            placeholder="কুইজের প্রশ্ন লিখুন!"
                            className="form-control w-25"
                            value={quiz.question}
                            onChange={(event) => {
                              const newModules = [...modules];
                              newModules[moduleIndex].subModules[
                                subModuleIndex
                              ].quizzes[quizIndex].question =
                                event.target.value;
                              setModules(newModules);
                            }}
                          />
                        </div>

                        <div className="form-group">
                          <label className="lbl">Quiz Options:</label>

                          <input
                            type="text"
                            placeholder="কুইজ এর অপসন কমা দিয়ে লিখুন!"
                            className="form-control w-25"
                            value={quiz.options}
                            onChange={(event) => {
                              const newModules = [...modules];
                              newModules[moduleIndex].subModules[
                                subModuleIndex
                              ].quizzes[quizIndex].options =
                                event.target.value.split(",");
                              setModules(newModules);
                            }}
                          />
                        </div>

                        <div className="form-group">
                          <label className="lbl">Quiz Answer:</label>

                          <input
                            type="text"
                            placeholder="কুইজের উত্তর কমা দিয়ে লিখুন!"
                            className="form-control w-25"
                            value={quiz.answer}
                            onChange={(event) => {
                              const newModules = [...modules];
                              newModules[moduleIndex].subModules[
                                subModuleIndex
                              ].quizzes[quizIndex].answer =
                                event.target.value.split(",");
                              setModules(newModules);
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          className="btn btn-outline-danger mt-4 ms-4"
                          onClick={() =>
                            handleDeleteQuiz(
                              moduleIndex,
                              subModuleIndex,
                              quizIndex
                            )
                          }
                        >
                          Delete Quiz
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="btn btn-outline-primary mt-4"
                      onClick={() => handleAddQuiz(moduleIndex, subModuleIndex)}
                    >
                      Add Quiz
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-danger mt-4 ms-4"
                      onClick={() =>
                        handleDeleteSubModule(moduleIndex, subModuleIndex)
                      }
                    >
                      Delete Sub-Module
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-outline-primary mt-4"
                  onClick={() => handleAddSubModule(moduleIndex)}
                >
                  Add Sub-Module
                </button>

                <button
                  type="button"
                  className="btn btn-outline-danger mt-4 ms-4"
                  onClick={() => handleDeleteModule(moduleIndex)}
                >
                  Delete Module
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-outline-primary mt-4"
            onClick={handleAddModule}
          >
            Add Module
          </button>
          <button type="submit" className="btn btn-primary mt-4 ms-4">
            সেভ করুন
          </button>
        </form>
      </div>

      <Footer></Footer>
    </>
  );
}
