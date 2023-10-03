import React, { useState } from "react";
import Footer from "../../Footer/Footer";

import "./EditForm.css";

import { toast } from "react-toastify";

import axios from "axios";
import config from "../../../config/apiConfig";

import { NavLink, useParams } from "react-router-dom";

export default function EditForm({ course }) {
  const { id } = useParams();
  const {
    name: initialname,

    description: initialdescription,
    courseSummary: initialcourseSummary,
    coursePremierTime: initialcoursePremierTime,
    learn: initiallearn,
    image: initialimage,
    courseIncludes: initialcourseIncludes,
    whatneed: initialwhatneed,
    coursetag: initialcoursetag,

    modules: initialmodules,
  } = course;

  const [name, setName] = useState(initialname);
  const [description, setDescription] = useState(initialdescription);
  const [image, setImage] = useState(initialimage);
  const [coursetag, setCourseTag] = useState(initialcoursetag);
  const [courseSummary, setCourseSummary] = useState(initialcourseSummary);
  const [coursePremierTime, setcoursePremierTime] = useState(
    initialcoursePremierTime
  );
  const [learn, setLearn] = useState([initiallearn]);
  const [courseIncludes, setCourseIncludes] = useState([initialcourseIncludes]);
  const [whatneed, setWhatNeed] = useState([initialwhatneed]);
  const [modules, setModules] = useState(initialmodules);
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

  const handleAddQuiz = () => {
    const newModules = JSON.parse(JSON.stringify(modules));

    const newQuiz = {
      question: "",
      options: [],
      answer: [],
    };

    // Add the new quiz to the quizzes array of each module
    newModules.forEach((module) => {
      module.subModules.forEach((subModule) => {
        subModule.quizzes.push(newQuiz);
      });
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
    const clonedModules = JSON.parse(JSON.stringify(modules));
    const newQuizzes = [
      ...clonedModules[moduleIndex].subModules[subModuleIndex].quizzes,
    ];
    newQuizzes.splice(quizIndex, 1);
    clonedModules[moduleIndex].subModules[subModuleIndex].quizzes = newQuizzes;
    setModules(clonedModules);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const token = localStorage.getItem("token");
  const tokenWithoutQuotes = token.replace(/^"(.*)"$/, "$1");

  console.log("tokenWithoutQuotes", tokenWithoutQuotes);
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
    formData.append("whatneed", whatneed);
    formData.append("courseIncludes", courseIncludes);
    formData.append("modules", modulesJson);
    try {
      const response = await axios.patch(
        `https://api.unive.com.bd/api/V1/courses/${id}`,
        formData,

        {
          headers: {
            authorization: `${tokenWithoutQuotes}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("কোর্স এডিট করা সম্পন্ন হয়েছে!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="main-cont-form-edit container-fluid">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <NavLink to="/" style={{ color: "blue" }}>
                Home
              </NavLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              <NavLink
                to="/Dashboard/instructordashboard"
                style={{ color: "green" }}
              >
                Course Page
              </NavLink>
            </li>
          </ol>
        </nav>

        {/* form input start here */}
        <form onSubmit={handleSubmit}>
          <div className="form-group col-lg-4 col-md-6 col-sm-12">
            <label className="lbl">Course Name:</label>
            <input
              type="text"
              className={`form-control main-input-section-name ${
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
              className={`form-control main-input-section-course-desc ${
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
          <div
            className="form-group col-lg-4 col-md-6 col-sm-12"
            style={{ width: "300%" }}
          >
            <label className="lbl-edit-image">Image:</label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ cursor: "pointer" }}
            />
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
              onChange={(e) => setCourseTag(e.target.value)}
              className="form-control custom-select"
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
          </div>
          <div className="form-group col-lg-4 col-md-6 col-sm-12">
            <label className="lbl">Course Summary:</label>
            <textarea
              type="text"
              className="form-control main-input-section-summary"
              value={courseSummary}
              placeholder="কোর্স এর সামারি লিখুন!"
              onChange={(event) => setCourseSummary(event.target.value)}
            />
          </div>

          <div className="form-group col-lg-4 col-md-6 col-sm-12">
            <label className="lbl">Course Premier Time:</label>
            <input
              type="text"
              className="form-control main-input-section-premier"
              value={coursePremierTime}
              placeholder="কোর্স প্রিমিয়ার টাইম লিখুন "
              onChange={(event) => setcoursePremierTime(event.target.value)}
            />
          </div>
          <div className="form-group col-lg-4 col-md-6 col-sm-12">
            <label className="lbl">What will you Learn:</label>
            <input
              type="text"
              className="form-control main-input-section-what"
              value={learn}
              placeholder="কোর্সটি থেকে কি শিখতে পারবেন"
              onChange={(event) => setLearn(event.target.value.split(","))}
            />
          </div>
          <div className="form-group col-lg-4 col-md-6 col-sm-12">
            <label className="lbl">What Includes in the course:</label>
            <input
              type="text"
              className="form-control main-input-section-includes"
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
              className="form-control main-input-section-need"
              value={whatneed}
              placeholder="কোর্স করতে যা লাগবে"
              onChange={(event) => setWhatNeed(event.target.value.split(","))}
            />
          </div>

          <div className="row">
            {modules.map((module, moduleIndex) => (
              <div key={moduleIndex}>
                <label className="lbl-mod-title">Module Title:</label>

                <input
                  type="text"
                  value={module.title}
                  className="form-control mod-title-edit"
                  placeholder="মডিউলের টাইটেল লিখুন!"
                  onChange={(event) => {
                    const newModules = [...modules];
                    newModules[moduleIndex].title = event.target.value;
                    setModules(newModules);
                  }}
                />

                <br />
                <label className="lbl">Module Description:</label>
                <input
                  type="text"
                  value={module.moduleSummary}
                  className="form-control mod-description-edit"
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
                        className="form-control sub-mod-title-edit"
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
                        className="form-control sub-mod-description-edit"
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
                            className="form-control vid-title-edit"
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
                            className="form-control vid-description-edit"
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
                            className="form-control vid-link-edit"
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
                          className="btn btn-outline-danger  delete-btn"
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
                      className="btn btn-outline-primary add-video-btn"
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
                            className="form-control quiz-question-edit"
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
                            className="form-control quiz-options-edit"
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
                            className="form-control quiz-answer-edit"
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
                          className="btn btn-outline-danger delete-quiz-btn"
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

                    <div className="d-flex">
                      <button
                        type="button"
                        className="btn btn-outline-primary add-quiz-btn"
                        onClick={() =>
                          handleAddQuiz(moduleIndex, subModuleIndex)
                        }
                      >
                        Add Quiz
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-danger delete-sub-mod-btn"
                        onClick={() =>
                          handleDeleteSubModule(moduleIndex, subModuleIndex)
                        }
                      >
                        Delete Sub-Module
                      </button>
                    </div>
                  </div>
                ))}

                <div className="d-flex">
                  <button
                    type="button"
                    className="btn btn-outline-primary add-sub-mod-btn"
                    onClick={() => handleAddSubModule(moduleIndex)}
                  >
                    Add Sub-Module
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-danger delete-mod-btn"
                    onClick={() => handleDeleteModule(moduleIndex)}
                  >
                    Delete Module
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex">
            <button
              type="button"
              className="btn btn-outline-primary add-mod-btn"
              onClick={handleAddModule}
            >
              Add Module
            </button>
            <button type="submit" className="btn btn-primary save-btn">
              সেভ করুন
            </button>
          </div>
        </form>
      </div>

      <Footer></Footer>
    </>
  );
}
