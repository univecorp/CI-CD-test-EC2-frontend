import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  AiFillPlusCircle,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { FcEditImage } from "react-icons/fc";
import { MdSlowMotionVideo } from "react-icons/md";
import ReactPlayer from "react-player";
import { NavLink, useParams } from "react-router-dom";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import { useGetSingleCourseQuery } from "../../redux/rtk/features/Course/courseApi";
import "./CourseContent.css";
import img1 from "./video-thumbnail.png";

import axios from "axios";
import { useSelector } from "react-redux";
import config from "../../../config/apiConfig";

export default function CourseContent() {
  const { id } = useParams();

  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;
  const { data } = useGetSingleCourseQuery(id);

  const courseId = id;

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeSubmoduleIndex, setActiveSubmoduleIndex] = useState(0);

  const [activeVideoUrl, setActiveVideoUrl] = useState("");
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [activeVideoTitleIndex, setActiveVideoTitleIndex] = useState(null);
  const [showQuiz, setShowQuiz] = useState(true);
  const [currentQuizId, setCurrentQuizId] = useState(null);

  const [totalNewPoints, setTotalNewPoints] = useState(1);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [overallTotalPoints, setOverallTotalPoints] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isAnswerIncorrect, setIsAnswerIncorrect] = useState("");
  const [showRetryButton, setShowRetryButton] = useState(false);
  const [prevTotalNewPoints, setPrevTotalNewPoints] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isPreviousClicked, setIsPreviousClicked] = useState(false);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [disabledOptions, setDisabledOptions] = useState([]);
  const [newPercentage, setNewPercentage] = useState(0);
  const [error, setError] = useState([]);
  const [userResult, setUserResult] = useState([]);

  const [quizResponse, setQuizResponse] = useState();

  const [correctlyAnsweredQuizIds, setCorrectlyAnsweredQuizIds] = useState([]);

  const handleModuleAccordionClick = (moduleIndex) => {
    setActiveModuleIndex((prevIndex) =>
      prevIndex === moduleIndex ? -1 : moduleIndex
    );
    setIsAnswerChecked(true);
    setIsAnswerIncorrect("");
    setIsAnswerCorrect(false);
  };

  const handleQuizButtonClick = (event, questions) => {
    event.stopPropagation();
    setQuizQuestions(questions);
    setShowQuiz(!showQuiz);
    setQuizQuestions(questions);
    setIsAnswerChecked(true);
  };

  const handleSubmoduleAccordionClick = (
    moduleIndex,
    submoduleIndex,
    event
  ) => {
    event.stopPropagation();
    setActiveModuleIndex(moduleIndex);
    setActiveSubmoduleIndex((prevIndex) =>
      prevIndex === submoduleIndex ? -1 : submoduleIndex
    );
    setIsAnswerChecked(false);
    setIsAnswerCorrect(false);
    setIsAnswerIncorrect("");
  };

  const handlePreviousVideo = () => {
    setIsPreviousClicked(true);
    if (
      activeVideoIndex > 0 &&
      data?.data?.modules[activeModuleIndex]?.subModules[activeSubmoduleIndex]
        ?.videos
    ) {
      const currentSubmodule =
        data.data.modules[activeModuleIndex].subModules[activeSubmoduleIndex];
      const previousVideoIndex = activeVideoIndex - 1;
      const previousVideo = currentSubmodule.videos[previousVideoIndex];
      setActiveVideoUrl(previousVideo.url);
      setActiveVideoIndex(previousVideoIndex);
      setActiveVideoTitleIndex(previousVideoIndex);
    } else if (
      activeVideoIndex === 0 &&
      activeSubmoduleIndex > 0 &&
      data?.data?.modules[activeModuleIndex]?.subModules
    ) {
      const previousSubmoduleIndex = activeSubmoduleIndex - 1;
      const previousSubmodule =
        data.data.modules[activeModuleIndex].subModules[previousSubmoduleIndex];
      const previousVideoIndex = previousSubmodule.videos.length - 1;
      const previousVideo = previousSubmodule.videos[previousVideoIndex];
      setActiveSubmoduleIndex(previousSubmoduleIndex);
      setActiveVideoUrl(previousVideo.url);
      setActiveVideoIndex(previousVideoIndex);
      setActiveVideoTitleIndex(previousVideoIndex);
    } else if (
      activeVideoIndex === 0 &&
      activeSubmoduleIndex === 0 &&
      activeModuleIndex > 0 &&
      data?.data?.modules
    ) {
      const previousModuleIndex = activeModuleIndex - 1;
      const previousModule = data.data.modules[previousModuleIndex];
      const previousSubmoduleIndex = previousModule.subModules.length - 1;
      const previousSubmodule =
        previousModule.subModules[previousSubmoduleIndex];
      const previousVideoIndex = previousSubmodule.videos.length - 1;
      const previousVideo = previousSubmodule.videos[previousVideoIndex];
      setActiveModuleIndex(previousModuleIndex);
      setActiveSubmoduleIndex(previousSubmoduleIndex);
      setActiveVideoUrl(previousVideo.url);
      setActiveVideoIndex(previousVideoIndex);
      setActiveVideoTitleIndex(previousVideoIndex);
    }

    setIsAnswerChecked(false);
    setShowRetryButton(false);
    setIsAnswerIncorrect("");
  };

  const handleNextVideo = () => {
    const modules = data?.data?.modules || [];
    const submodules = modules[activeModuleIndex]?.subModules || [];
    const videos = submodules[activeSubmoduleIndex]?.videos || [];

    if (activeVideoIndex < videos.length - 1) {
      const nextVideoIndex = activeVideoIndex + 1;
      const nextVideo = videos[nextVideoIndex];
      setActiveVideoUrl(nextVideo.url);
      setActiveVideoIndex(nextVideoIndex);
    } else if (activeSubmoduleIndex < submodules.length - 1) {
      const nextSubmoduleIndex = activeSubmoduleIndex + 1;
      const nextSubmodule = submodules[nextSubmoduleIndex];
      setActiveSubmoduleIndex(nextSubmoduleIndex);
      setActiveVideoIndex(0);
      setActiveVideoUrl(nextSubmodule.videos[0]?.url || "");
    } else if (activeModuleIndex < modules.length - 1) {
      const nextModuleIndex = activeModuleIndex + 1;
      const nextModule = modules[nextModuleIndex];
      setActiveModuleIndex(nextModuleIndex);
      setActiveSubmoduleIndex(0);
      setActiveVideoIndex(0);
      const nextSubmodule = nextModule?.subModules[0];
      setActiveVideoUrl(nextSubmodule?.videos[0]?.url || "");
    }

    setIsAnswerChecked(false);
    setIsAnswerCorrect(false);
    setShowRetryButton(false);
    setIsAnswerIncorrect("");

    setIsPreviousClicked(false);
  };

  const handleVideoClick = (videoUrl, videoIndex) => {
    setActiveVideoUrl(videoUrl);
    setActiveVideoIndex(videoIndex);
    setActiveVideoTitleIndex(videoIndex);
  };

  const checkAnswer = async () => {
    const currentModule = data?.data?.modules[activeModuleIndex];
    const currentSubmodule = currentModule?.subModules[activeSubmoduleIndex];
    const quizzes = currentSubmodule?.quizzes || [];

    setIsCheckingAnswer(true);

    const nonEmptyQuizzes = quizzes.filter(
      (quiz) => quiz.answer && quiz.answer.length > 0
    );

    let totalCorrectAnswers = 0;
    let totalQuestions = 0;

    data?.data?.modules.forEach((module) => {
      module.subModules.forEach((submodule) => {
        const nonEmptyQuizzes = submodule?.quizzes?.filter(
          (quiz) =>
            quiz.question &&
            quiz.question.length > 0 &&
            quiz.answer &&
            quiz.answer.length > 0
        );

        totalQuestions += nonEmptyQuizzes.length;
      });
    });

    const selectedOptionsForAllQuizzes = nonEmptyQuizzes.map((currentQuiz) =>
      selectedOptions.filter(
        (selectedOption) =>
          selectedOption.quizId === currentQuiz._id &&
          selectedOption.option !== null
      )
    );

    let isAnswerCorrect = false;
    let areAllOptionsSelected = true;
    const updatedCorrectlyAnsweredQuizIds = [];
    for (let i = 0; i < nonEmptyQuizzes.length; i++) {
      const currentQuiz = nonEmptyQuizzes[i];
      const selectedOptionsForQuiz = selectedOptionsForAllQuizzes[i];
      const correctOptions = currentQuiz.answer || [];

      if (
        selectedOptionsForQuiz.length === correctOptions.length &&
        selectedOptionsForQuiz.every((selectedOption) =>
          correctOptions.includes(selectedOption.option)
        )
      ) {
        totalCorrectAnswers += 1;
        updatedCorrectlyAnsweredQuizIds.push(currentQuiz._id);
        isAnswerCorrect = true;
      } else {
        isAnswerCorrect = false;
        setIsAnswerIncorrect("আপনার উত্তরটি সঠিক নয় ");
        setShowRetryButton(true);
      }
      if (isAnswerCorrect) {
        setTotalNewPoints(
          (prevTotalNewPoints) => prevTotalNewPoints + totalCorrectAnswers
        );
        setPrevTotalNewPoints(
          (prevTotalNewPoints) => prevTotalNewPoints + totalCorrectAnswers
        );
      }

      if (isAnswerCorrect) {
        setDisabledOptions((prevDisabledOptions) => [
          ...prevDisabledOptions,
          ...correctOptions,
        ]);
        setCorrectlyAnsweredQuizIds((prevIds) => [
          ...prevIds,
          ...updatedCorrectlyAnsweredQuizIds,
        ]);

        sessionStorage.setItem(
          "correctlyAnsweredQuizIds",
          JSON.stringify([
            ...correctlyAnsweredQuizIds,
            ...updatedCorrectlyAnsweredQuizIds,
          ])
        );
      } else {
        areAllOptionsSelected = false;
        setDisabledOptions((prevDisabledOptions) =>
          prevDisabledOptions.filter(
            (option) =>
              correctOptions.includes(option) &&
              selectedOptionsForQuiz.some(
                (selectedOption) =>
                  selectedOption.option === option &&
                  selectedOption.quizId === currentQuiz?._id
              )
          )
        );
      }
    }

    const totalNewPoints = totalCorrectAnswers;

    setTotalNewPoints(
      (prevTotalNewPoints) => prevTotalNewPoints + totalNewPoints
    );
    setPrevTotalNewPoints(
      (prevTotalNewPoints) => prevTotalNewPoints + totalNewPoints
    );

    const newOverallTotalPoints = overallTotalPoints + totalNewPoints;

    sessionStorage.setItem("overallTotalPoints", newOverallTotalPoints);

    setOverallTotalPoints(newOverallTotalPoints);

    const percentage = Math.floor(
      (newOverallTotalPoints / totalQuestions) * 100
    );
    const clampedPercentage = percentage > 100 ? 100 : percentage;
    setNewPercentage(clampedPercentage);
    sessionStorage.setItem("percentage", percentage);

    setPrevPercentage(clampedPercentage);
    setIsCheckingAnswer(false);
    setIsAnswerChecked(true);

    setCompletedQuizzes((prevCompletedQuizzes) => {
      if (!prevCompletedQuizzes.includes(currentSubmodule._id)) {
        return [...prevCompletedQuizzes, currentSubmodule._id];
      }
      return prevCompletedQuizzes;
    });
    setIsButtonEnabled(!areAllOptionsSelected);

    // Call handleUpdatedData with the necessary data
    await handleUpdatedData({
      userId: userId,
      courseId: courseId,
      Percentage: percentage,
      disabledOptions,
      Points: newOverallTotalPoints,
      isAnswerCorrect: isAnswerCorrect,
      selectedOptions: selectedOptions,
      isButtonEnabled: isButtonEnabled,
      quizId: quizzes[0]?._id,
      correctlyAnsweredQuizIds: correctlyAnsweredQuizIds,
    });
  };

  const handleUpdatedData = async (data) => {
    try {
      // Update the data to the API endpoint
      await axios.patch(
        `${config.apiUrl}/users/${userId}/enrollments`,

        data
      );
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    // Check if the newOverallTotalPoints is saved in sessionStorage
    const storedOverallTotalPoints =
      sessionStorage.getItem("overallTotalPoints");

    // If it exists in sessionStorage, use that value; otherwise, use the default value of 1
    const initialOverallTotalPoints = storedOverallTotalPoints
      ? parseInt(storedOverallTotalPoints)
      : 0;

    // Set the initial value for newOverallTotalPoints
    setOverallTotalPoints(initialOverallTotalPoints);

    // ... your other useEffect code ...
  }, []);

  const handleCheckboxChange = (event, quizId, option) => {
    const trimmedOption = option.trim();
    //If the checkbox is checked (event.target.checked is true), the function updates the selectedOptions state
    if (event.target.checked) {
      setSelectedOptions((prevOptions) => [
        ...prevOptions,
        { quizId, option: trimmedOption },
      ]);
    } else {
      setSelectedOptions((prevOptions) =>
        //It filters the prevOptions to remove the object that matches the current quizId and trimmedOption
        prevOptions.filter(
          (prevOption) =>
            !(
              prevOption.option === trimmedOption &&
              prevOption.quizId === quizId
            )
        )
      );
    }

    // Check if all correct options are selected
    const currentModule = data?.data?.modules[activeModuleIndex];
    const currentSubmodule = currentModule?.subModules[activeSubmoduleIndex];
    const currentQuiz = currentSubmodule?.quizzes.find(
      (quiz) => quiz._id === quizId
    );

    //It gets the correctOptions for the current quiz, or an empty array if not available
    const correctOptions = currentQuiz?.answer || [];
    // It checks if all correct options are selected by using the every method on the correctOptions array.
    //For each correctOption, it checks if there is at least one corresponding object in the selectedOptions array that matches both the option and quizId.

    const isAllCorrectOptionsSelected = correctOptions.every((correctOption) =>
      selectedOptions.some(
        (selectedOption) =>
          selectedOption.option === correctOption &&
          selectedOption.quizId === quizId
      )
    );
    // If all correct options are selected, it adds the correct options to the prevDisabledOptions state
    if (isAllCorrectOptionsSelected) {
      setDisabledOptions((prevDisabledOptions) => [
        ...prevDisabledOptions,
        ...correctOptions,
      ]);
    } else {
      setDisabledOptions((prevDisabledOptions) =>
        prevDisabledOptions.filter(
          (option) =>
            correctOptions.includes(option) &&
            selectedOptions.some(
              (selectedOption) =>
                selectedOption.option === option &&
                selectedOption.quizId === quizId
            )
        )
      );
    }
  };

  const handleQuizRetry = () => {
    setIsCheckingAnswer(false);
    setIsAnswerChecked(false);
    setIsAnswerIncorrect("");
    setShowRetryButton(false);
    setSelectedOptions([]);

    setCompletedQuizzes((prevCompletedQuizzes) => {
      const updatedCompletedQuizzes = prevCompletedQuizzes.filter(
        (quizId) =>
          quizId !==
          data?.data?.modules[activeModuleIndex]?.subModules[
            activeSubmoduleIndex
          ]._id
      );
      return updatedCompletedQuizzes;
    });

    setIsAnswerCorrect(false);

    // Enable correct answer checkboxes
    const currentModule = data?.data?.modules[activeModuleIndex];
    const currentSubmodule = currentModule?.subModules[activeSubmoduleIndex];
    const quizzes = currentSubmodule?.quizzes || [];

    const correctOptions = quizzes.flatMap((quiz) => quiz.answer);
    setDisabledOptions((prevDisabledOptions) =>
      prevDisabledOptions.filter((option) => !correctOptions.includes(option))
    );
  };

  // get the data from mongodb

  useEffect(() => {
    if (userId && courseId) {
      axios
        .get(`${config.apiUrl}/users/${userId}/${courseId}/enrollments`)
        .then((response) => {
          setUserResult(response.data);

          setQuizResponse(
            response.data?.data?.enrollments[0]?.selectedOptions[0]?.quizId
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userId, courseId]);

  // for the progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress === 100) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (newPercentage === 100) {
      setShowModal(true);

      // Perform the POST request to issue the certificate
      const issueCertificate = async () => {
        const randomSixDigitNumber = Math.floor(
          100000 + Math.random() * 900000
        );
        const certificateId = user._id + randomSixDigitNumber;
        try {
          const response = await axios.post(`${config.apiUrl}/certificate`, {
            userId: userId,
            courseId: courseId,
            firstName: user.firstName,
            lastName: user.lastName,
            certificateId: certificateId,
            courseName: data?.data?.name,
          });
          console.log("response", response);
        } catch (error) {
          console.error("Error issuing certificate:", error);
        }
      };

      issueCertificate();
    }
  }, [newPercentage, userId, courseId]);

  useEffect(() => {
    const storedCorrectlyAnsweredQuizIds = sessionStorage.getItem(
      "correctlyAnsweredQuizIds"
    );

    if (storedCorrectlyAnsweredQuizIds) {
      setCorrectlyAnsweredQuizIds(JSON.parse(storedCorrectlyAnsweredQuizIds));
    }
  }, []);

  return (
    <>
      <Header />

      {data && (
        <>
          <h2 className="main-head-course mb-4">{data?.data?.name}</h2>

          <div className="progress progress-content-course">
            <div
              className="progress-bar progress-bar-content-course"
              role="progressbar"
              style={{
                width: `${sessionStorage.getItem("percentage")}%`,
                background: "#1E3CBA",
              }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div className="progress-value">
                <span className="course-progress-text">কোর্স প্রোগ্রেস :</span>
                {sessionStorage.getItem("percentage")}%
              </div>
            </div>
          </div>

          <div className="container main-sec-course">
            <div className="VideoSection">
              {/* Video component */}
              <div className="video-wrapper">
                {activeVideoUrl ? (
                  <ReactPlayer
                    url={activeVideoUrl}
                    width="100%"
                    height="300px"
                    controls
                  />
                ) : (
                  <div>
                    <img src={img1} alt="thumbnail-image" />
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-between prev-next-btn">
                <p className="course-content-tag">
                  <span className="mod-name-span"> মডিউল:</span>{" "}
                  {data?.data?.modules[activeModuleIndex]?.title}
                </p>
                <div>
                  <button
                    className="btn btn-outline-secondary me-2 prev-btn-course"
                    onClick={handlePreviousVideo}
                  >
                    Previous
                  </button>
                  <button
                    className="btn btn-primary me-2 next-btn-course"
                    onClick={handleNextVideo}
                  >
                    Next
                  </button>
                </div>
              </div>

              {showQuiz && (
                <div className="quiz-section-main-div">
                  {data?.data?.modules[activeModuleIndex]?.subModules[
                    activeSubmoduleIndex
                  ]?.quizzes?.length > 0 ? (
                    <div className="quiz-section mb-4">
                      {data?.data?.modules[activeModuleIndex]?.subModules[
                        activeSubmoduleIndex
                      ]?.quizzes?.map((quiz, index) => (
                        <div key={index} className="mb-4 mt-4">
                          {quiz?.question !== "" && (
                            <>
                              <h5 className="quiz-question-title">
                                {quiz?.question}
                              </h5>

                              {quiz?.options?.length > 0 && (
                                <div className="options-div">
                                  {quiz?.options?.map((option, optionIndex) => (
                                    <div
                                      key={optionIndex}
                                      className="ms-2 mt-4"
                                    >
                                      {option !== "" && (
                                        <>
                                          <input
                                            type="checkbox"
                                            className="me-2"
                                            id={`quiz-${index}-option-${optionIndex}`}
                                            name={`quiz-${index}`}
                                            value={option}
                                            checked={selectedOptions.some(
                                              (selectedOption) =>
                                                selectedOption.option ===
                                                  option &&
                                                selectedOption.quizId ===
                                                  quiz._id
                                            )}
                                            onChange={(event) =>
                                              handleCheckboxChange(
                                                event,
                                                quiz._id,
                                                option
                                              )
                                            }
                                            disabled={disabledOptions.includes(
                                              option
                                            )}
                                          />

                                          <label
                                            className="quiz-option-label"
                                            htmlFor={`quiz-${index}-option-${optionIndex}`}
                                          >
                                            {option}
                                          </label>
                                        </>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ))}

                      {data?.data?.modules[activeModuleIndex]?.subModules[
                        activeSubmoduleIndex
                      ]?.quizzes?.some((quiz) => quiz.question !== "") ? (
                        <>
                          {isAnswerIncorrect && !isAnswerCorrect && (
                            <p className="Quiz-section-display-answer">
                              {isAnswerIncorrect}
                            </p>
                          )}
                          {isAnswerCorrect && (
                            <p className="Quiz-section-display-answer-correct">
                              আপনার উত্তরটি সঠিক
                            </p>
                          )}
                          <p className="Quiz-section-total">
                            আপনার টোটাল পয়েন্ট{" "}
                            {sessionStorage.getItem("overallTotalPoints")}
                          </p>

                          {!correctlyAnsweredQuizIds.includes(
                            data?.data?.modules[activeModuleIndex]?.subModules[
                              activeSubmoduleIndex
                            ]?.quizzes[0]?._id
                          ) && (
                            <button
                              className="btn btn-primary"
                              onClick={checkAnswer}
                              disabled={
                                isCheckingAnswer ||
                                isAnswerChecked ||
                                isPreviousClicked ||
                                isAnswerCorrect ||
                                completedQuizzes.includes(
                                  data?.data?.modules[activeModuleIndex]
                                    ?.subModules[activeSubmoduleIndex]._id
                                ) ||
                                selectedOptions.length === 0
                              }
                            >
                              আপনার উত্তরটি চেক করুন
                            </button>
                          )}

                          {showRetryButton && (
                            <button
                              className="btn btn-primary ms-2"
                              onClick={handleQuizRetry}
                            >
                              আবার চেষ্টা করুন
                            </button>
                          )}
                        </>
                      ) : (
                        <div>
                          <p className="ques-sub-para mt-2">
                            এই সাবমডিউলে কোনো কুইজ প্রশ্ন নেই
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="ques-sub-para mt-2">
                        এই সাবমডিউলে কোনো কুইজ প্রশ্ন নেই
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* <Quiz /> */}

              <div className="video-description">
                <h6 className="vid-discription">ভিডিও ডেসক্রিপশন :</h6>
                <p className="vid-para">
                  {
                    data?.data?.modules[activeModuleIndex]?.subModules[
                      activeSubmoduleIndex
                    ]?.videos[activeVideoIndex]?.videoDescription
                  }
                </p>
              </div>

              <NavLink to="/ask-the-instructor">
                <p className="c-disc">ইন্সট্রাক্টরকে জিজ্ঞেস করুন</p>
              </NavLink>
            </div>

            <div className="AccordionSection">
              <input
                type="search"
                id="search-bar"
                placeholder="লেসন সার্চ করুন "
              />

              <div className="AccordionContent">
                {data?.data?.modules.map((module, moduleIndex) => (
                  <div
                    className={`Accordion ${
                      activeModuleIndex === moduleIndex ? "active" : ""
                    }`}
                    key={moduleIndex}
                    onClick={() => handleModuleAccordionClick(moduleIndex)}
                  >
                    <div className="module-section">
                      <h6 className="mod-title">
                        মডিউল {moduleIndex + 1}: {module.title}
                      </h6>

                      {activeModuleIndex === moduleIndex ? (
                        <AiOutlineMinusCircle className="mod-icon-minus" />
                      ) : (
                        <AiOutlinePlusCircle className="mod-icon-plus" />
                      )}
                    </div>
                    <hr className="acc-hr" />

                    {activeModuleIndex === moduleIndex && (
                      <div className="Submodules">
                        {module.subModules.map((subModule, submoduleIndex) => (
                          <div
                            key={submoduleIndex}
                            className={`SubmoduleAccordion ${
                              activeSubmoduleIndex === submoduleIndex
                                ? "active"
                                : ""
                            }`}
                            onClick={(event) =>
                              handleSubmoduleAccordionClick(
                                moduleIndex,
                                submoduleIndex,
                                event
                              )
                            }
                          >
                            <div className="submodule-gap"></div>
                            <div className="submodule-section">
                              <div className="submodule-title d-flex justify-content-between mb-4">
                                <h6 className="sub-mod-title">
                                  <span className="text-success">
                                    সাবমডিউল {submoduleIndex + 1}:
                                  </span>{" "}
                                  {subModule.title}
                                </h6>
                                <div className="submodule-icon">
                                  <AiFillPlusCircle
                                    onClick={() =>
                                      handleVideoClick(
                                        subModule?.videos?.url,
                                        0
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              {activeSubmoduleIndex === submoduleIndex && (
                                <div className="submodule-videos">
                                  {subModule?.videos.map(
                                    (video, videoIndex) => (
                                      <div
                                        className={`video-title d-flex ${
                                          activeVideoTitleIndex === videoIndex
                                            ? "active"
                                            : ""
                                        }`}
                                        key={videoIndex}
                                        onClick={() =>
                                          handleVideoClick(
                                            video.url,
                                            videoIndex
                                          )
                                        }
                                      >
                                        <MdSlowMotionVideo className="vid-icon rotate" />
                                        <p className="vid-title">
                                          {video.title}
                                        </p>
                                      </div>
                                    )
                                  )}

                                  {subModule?.quizzes?.length > 0 &&
                                    subModule?.quizzes?.some(
                                      (quiz) => quiz.question !== ""
                                    ) && (
                                      <button
                                        className="btn quiz-btn"
                                        onClick={(e) =>
                                          handleQuizButtonClick(
                                            e,
                                            subModule?.quizzes
                                          )
                                        }
                                      >
                                        <FcEditImage className="quiz-icon" />{" "}
                                        Quiz
                                      </button>
                                    )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title-course">
            {data?.data?.name} কোর্সটি কমপ্লিট হয়েছে!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="congrats-msg">Congratulations!!!</p>

          <NavLink to="/Dashboard/usercertificate">
            {" "}
            <p className="navlink-modal">
              আপনি এইখান থেকে আপনার সার্টিফিকেটটি দেখতে পারবেন{" "}
            </p>
          </NavLink>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setShowModal(false)} className="btn btn-info">
            বন্ধ করুন
          </button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
}
