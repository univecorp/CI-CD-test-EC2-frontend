import React, { useState } from "react";
import axios from "axios";
import "./SkillForm.css";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import config from "../../../config/apiConfig";
import { MdRemoveCircle } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
function SkillAssessmentForm({ role }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!role.includes(user?.role)) {
    navigate("/page-not-found");
  }
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    label: "",

    questions: [
      {
        question: "",
        options: [],
        correctAnswer: [],
      },
    ],

    SkillAssessmentTopic: [],
    SkillAssessmentForWhichOne: [],
  });

  const handleInputChange = (event, index, subfield) => {
    const updatedQuestions = [...formData.questions];

    if (subfield === "correctAnswer") {
      updatedQuestions[index][subfield] = event.target.value
        .split(",")
        .map((item) => item.trim());
    } else {
      updatedQuestions[index][subfield] = event.target.value;
    }

    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  };

  const handleTopicInputChange = (event, topicIndex) => {
    const updatedTopics = [...formData.SkillAssessmentTopic];
    updatedTopics[topicIndex] = event.target.value;

    setFormData({
      ...formData,
      SkillAssessmentTopic: updatedTopics,
    });
  };

  const handleTopicWhichOneInputChange = (event, topicIndex) => {
    const updatedTopics = [...formData.SkillAssessmentForWhichOne];
    updatedTopics[topicIndex] = event.target.value;

    setFormData({
      ...formData,
      SkillAssessmentForWhichOne: updatedTopics,
    });
  };

  const addOption = (index) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index].options.push("");
    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  };

  const removeOption = (index, optionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index].options.splice(optionIndex, 1);
    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          question: "",
          options: [],
          correctAnswer: [],
        },
      ],
    });
  };
  const removeQuestion = (index) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions.splice(index, 1);
    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  };

  const handleOptionInputChange = (event, questionIndex, optionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = event.target.value;

    setFormData({
      ...formData,
      questions: updatedQuestions,
    });
  };

  const handleImageChange = (event) => {
    // Update the imageFile state with the selected file
    const file = event.target.files[0];
    setImageFile(file);
  };

  const addTopic = () => {
    setFormData({
      ...formData,
      SkillAssessmentTopic: [...formData.SkillAssessmentTopic, ""],
    });
  };

  const removeTopic = (topicIndex) => {
    const updatedTopics = [...formData.SkillAssessmentTopic];
    updatedTopics.splice(topicIndex, 1);
    setFormData({
      ...formData,
      SkillAssessmentTopic: updatedTopics,
    });
  };

  const addTopicWhichOne = () => {
    setFormData({
      ...formData,
      SkillAssessmentForWhichOne: [...formData.SkillAssessmentForWhichOne, ""],
    });
  };

  const removeTopicWhichOne = (topicIndex) => {
    const updatedTopics = [...formData.SkillAssessmentForWhichOne];
    updatedTopics.splice(topicIndex, 1);
    setFormData({
      ...formData,
      SkillAssessmentForWhichOne: updatedTopics,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestData = {
      title: formData.title,
      category: formData.category,
      label: formData.label,
      questions: formData.questions,
      SkillAssessmentTopic: formData.SkillAssessmentTopic,
      SkillAssessmentForWhichOne: formData.SkillAssessmentForWhichOne,
    };

    const formDataToSend = new FormData();
    formDataToSend.append("image", imageFile);
    formDataToSend.append("data", JSON.stringify(requestData));

    // Send a POST request to your server
    axios
      .post(`${config.apiUrl}/skill-assessment/create-question`, formDataToSend)
      .then((response) => {
        // Handle the response from the server if needed
        console.log("Data sent successfully:", response.data);

        toast.success("Data is submitted successfully");
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error sending data:", error);
      });
  };

  return (
    <>
      <Header />
      <h2 className="header-skill">Skill Assessment Form</h2>
      <div className="main-div-skill container">
        <form onSubmit={handleSubmit}>
          <label className="label-skill">Title:</label>
          <input
            className="text-input-skill"
            type="text"
            placeholder="write the Question title here"
            value={formData.title}
            required
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <label className="label-skill">Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          <label className="label-skill">Category:</label>

          <select
            id="category"
            value={formData.category}
            required
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
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
          <label className="label-skill">Skill Assessment Topic:</label>
          {formData.SkillAssessmentTopic.map((topic, topicIndex) => (
            <div key={topicIndex}>
              <input
                className="text-input-skill"
                type="text"
                required
                placeholder="Enter skill assessment topic"
                value={topic}
                onChange={(e) => handleTopicInputChange(e, topicIndex)}
              />

              {/* <button
                type="button"
                className="  remove-topic-btn-skill"
                onClick={() => removeTopic(topicIndex)}
              >
                Remove Topic
              </button> */}

              <MdRemoveCircle
                className="remove-topic-btn-skill"
                onClick={() => removeTopic(topicIndex)}
              ></MdRemoveCircle>

              <AiFillPlusCircle
                className="add-topic-which-btn-skill-icon"
                onClick={addTopic}
              ></AiFillPlusCircle>
            </div>
          ))}
          <button
            type="button"
            onClick={addTopic}
            className="add-topic-btn-skill"
          >
            স্কিল অ্যাসেসমেন্ট এর টপিকস
          </button>

          <label className="label-skill">
            Skill Assessment For Which Ones:
          </label>
          {formData.SkillAssessmentForWhichOne.map((topic, topicIndex) => (
            <div key={topicIndex}>
              <input
                className="text-input-skill"
                type="text"
                required
                placeholder="Enter skill assessment topic for which one"
                value={topic}
                onChange={(e) => handleTopicWhichOneInputChange(e, topicIndex)}
              />

              {/* <button
                type="button"
                className="  remove-topic-which-btn-skill"
                onClick={() => removeTopicWhichOne(topicIndex)}
              >
                Remove
              </button> */}

              <MdRemoveCircle
                className=" remove-topic-which-btn-skill"
                onClick={() => removeTopicWhichOne(topicIndex)}
              ></MdRemoveCircle>

              <AiFillPlusCircle
                className="add-topic-which-btn-skill-icon"
                onClick={addTopicWhichOne}
              ></AiFillPlusCircle>
            </div>
          ))}

          <button
            type="button"
            onClick={addTopicWhichOne}
            className="add-topic-which-btn-skill"
          >
            স্কিল অ্যাসেসমেন্ট টি যাদের জন্য
          </button>

          <label className="label-skill">Select Label:</label>

          <select
            id="label"
            value={formData.label}
            required
            onChange={(e) =>
              setFormData({ ...formData, label: e.target.value })
            }
          >
            <option value=""> যেকোনো একটি অপশন সিলেক্ট করুন!</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advance">Advance</option>
          </select>

          {formData.questions.map((question, index) => (
            <div key={index}>
              <label className="label-skill">Question :</label>

              <input
                className="text-input-skill"
                type="text"
                required
                placeholder="write the question here"
                value={question.question}
                onChange={(e) => handleInputChange(e, index, "question")}
              />

              <div>
                <label className="label-skill">Options :</label>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <input
                      className="text-input-skill"
                      type="text"
                      placeholder="write the option of the question here"
                      value={option}
                      required
                      onChange={(e) =>
                        handleOptionInputChange(e, index, optionIndex)
                      }
                    />
                    {/* <button
                      type="button"
                      className="remove-option-btn-skill"
                      onClick={() => removeOption(index, optionIndex)}
                    >
                      Remove Option
                    </button> */}

                    <MdRemoveCircle
                      className="remove-btn-skill-icon"
                      onClick={() => removeOption(index, optionIndex)}
                    ></MdRemoveCircle>

                    <AiFillPlusCircle
                      className="add-skill-icon"
                      onClick={() => addOption(index)}
                    ></AiFillPlusCircle>
                  </div>
                ))}
                <button
                  type="button"
                  className=" add-option-btn-skill"
                  onClick={() => addOption(index)}
                >
                  Add Option
                </button>
              </div>

              <label className="label-skill">
                Correct Answer (comma-separated):
                <input
                  className="text-input-skill"
                  type="text"
                  required
                  placeholder="write the correct answer here"
                  value={question.correctAnswer.join(",")}
                  onChange={(e) => handleInputChange(e, index, "correctAnswer")}
                />
              </label>

              {/* <button
                type="button"
                className="remove-question-btn-skill"
                onClick={() => removeQuestion(index)}
              >
                Remove Question
              </button> */}

              <MdRemoveCircle
                className="remove-btn-skill-icon"
                onClick={() => removeQuestion(index)}
              ></MdRemoveCircle>

              <AiFillPlusCircle
                className="add-skill-icon"
                onClick={addQuestion}
              ></AiFillPlusCircle>
            </div>
          ))}

          <button
            type="button"
            onClick={addQuestion}
            className="add-question-btn-skill ms-2"
          >
            Add Question
          </button>

          <button className="btn btn-success skill-submit" type="submit">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default SkillAssessmentForm;
