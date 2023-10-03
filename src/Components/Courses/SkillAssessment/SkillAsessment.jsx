import React, { useState, useEffect } from "react";
import config from "../../../config/apiConfig";
import "./SkillAssessment.css";
import { Container } from "react-bootstrap";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import axios from "axios";
import { toast } from "react-toastify";
import skill from "./animation_lm8xut8g (1).mp4";
import { useParams } from "react-router-dom";

function SkillAsessment() {
  const { id } = useParams();

  const [quizzes, setQuizzes] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  let timer;

  const quizzesDataArray = [quizzes?.data];
  useEffect(() => {
    setTimeLeft(20);
    clearInterval(timer);
    timer = startTimer();

    return () => clearInterval(timer);
  }, [currentQuestionIndex, currentQuizIndex]);

  useEffect(() => {
    fetch(`${config.apiUrl}/skill-assessment/${id}`)
      .then((response) => response.json())
      .then((data) => setQuizzes(data))
      .catch((error) => console.error("Error fetching quizzes:", error));
  }, []);

  const handleOptionSelect = (questionIndex, optionIndex) => {
    if (timeLeft === 0) {
      return;
    }
    const updatedSelectedOptions = [...selectedOptions];
    const currentSelection = updatedSelectedOptions[questionIndex] || [];

    // Toggle the selection
    if (currentSelection.includes(optionIndex)) {
      updatedSelectedOptions[questionIndex] = currentSelection.filter(
        (index) => index !== optionIndex
      );
    } else {
      updatedSelectedOptions[questionIndex] = [
        ...currentSelection,
        optionIndex,
      ];
    }

    setSelectedOptions(updatedSelectedOptions);
  };

  const nextQuestion = () => {
    if (
      currentQuizIndex < quizzesDataArray?.length - 1 &&
      currentQuestionIndex ===
        quizzesDataArray[currentQuizIndex]?.questions.length - 1
    ) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setCurrentQuestionIndex(0);
    } else if (
      currentQuizIndex < quizzesDataArray?.length &&
      currentQuestionIndex <
        quizzesDataArray[currentQuizIndex]?.questions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const startTimer = () => {
    return setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          nextQuestion();
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      nextQuestion();
    }
  }, [timeLeft]);

  const isLastQuestion =
    currentQuizIndex === quizzesDataArray?.length - 1 &&
    currentQuestionIndex ===
      quizzesDataArray[currentQuizIndex]?.questions.length - 1;

  const submitAnswers = () => {
    const answers = [];
    quizzesDataArray?.forEach((quiz) => {
      quiz.questions.forEach((question, questionIndex) => {
        const selected = selectedOptions[questionIndex] || [];
        const selectedValues = selected.map((index) => question.options[index]);
        answers.push(selectedValues);
      });
    });
    setQuizSubmitted(true);
    submitAnswersToBackend(answers);
  };

  const submitAnswersToBackend = async (answers) => {
    try {
      const response = await axios.post(
        `${config.apiUrl}/skill-assessment/submit-answer/${id}`,
        answers
      );

      console.log(response, "আপনার এনসার ঠিক মতো সাবমিট হয়েছে");
      if (response) {
        const userScore = response.data.score;

        setScore(userScore);

        localStorage.setItem("skillPercentage", response.data.percentage);
        toast.success("আপনার এনসার ঠিক মতো সাবমিট হয়েছে");
        setIsButtonEnabled(true);
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div className="main-header-div">
          <div>
            <h3 className="skill-header">{quizzesDataArray[0]?.title}</h3>
          </div>

          {!quizSubmitted && (
            <div>
              <p className="timer"> {timeLeft} সেকেন্ড সময় বাকি আছে</p>
            </div>
          )}
        </div>

        {!isButtonEnabled ? (
          <>
            {quizzesDataArray?.map((quiz, index) => (
              <div key={index}>
                {quiz?.questions?.map((question, questionIndex) => (
                  <div key={question.id}>
                    {currentQuizIndex === index &&
                      currentQuestionIndex === questionIndex && (
                        <div className="question-div">
                          <p className="quiz-question">{question.question}</p>

                          <div>
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={option}
                                className={`option-div ${
                                  timeLeft === 0 &&
                                  !selectedOptions[questionIndex]?.includes(
                                    optionIndex
                                  )
                                    ? "option-disabled"
                                    : ""
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  value={optionIndex}
                                  checked={
                                    selectedOptions[questionIndex]?.includes(
                                      optionIndex
                                    ) || false
                                  }
                                  onChange={() =>
                                    handleOptionSelect(
                                      questionIndex,
                                      optionIndex
                                    )
                                  }
                                />
                                <label className="option"> {option}</label>
                              </div>
                            ))}
                          </div>
                          {isLastQuestion ? (
                            <button
                              className="submit-btn"
                              onClick={submitAnswers}
                              disabled={isButtonEnabled}
                            >
                              সাবমিট করুন
                            </button>
                          ) : (
                            <button
                              onClick={nextQuestion}
                              className="next-btn-skill"
                            >
                              পরের প্রশ্নে যান
                            </button>
                          )}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            ))}
          </>
        ) : (
          <div className="success-div">
            <video
              loop={true}
              autoPlay="autoplay"
              muted
              className="lotti-why-skill "
            >
              <source src={skill} type="video/mp4" />
            </video>
            <p className="score-value">আপনার প্রাপ্ত নাম্বার {score} </p>
          </div>
        )}
      </Container>

      <Footer />
    </>
  );
}
export default SkillAsessment;
