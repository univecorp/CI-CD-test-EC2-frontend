import React, { useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import { AiFillVideoCamera } from "react-icons/ai";
import { MdOutlineQuiz } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import { useGetSingleCourseQuery } from "../../redux/rtk/features/Course/courseApi";
import "./courseOverview.css";

import axios from "axios";
import { useEffect } from "react";
import config from "../../../config/apiConfig";
import PageTitle from "../../Common/PageTitle";
import Loader from "../../Loader/Loader";

export default function Overview() {
  const { id } = useParams();

  const [buttonText, setButtonText] = useState("");

  const [enrollbuttontext, setEnrollButtonText] = useState("এনরোল করুন");

  const [showModal, setShowModal] = useState(false);
  const [selectedSubModule, setSelectedSubModule] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const [enrollbuttonstatus, setEnrollButtonStatus] = useState(false);
  const [enrolledStudentsCount, setEnrollmentStudentCount] = useState(0);
  const { data, isLoading, isError, error } = useGetSingleCourseQuery(id);

  const courseId = id;

  const courseName = data?.data?.name;

  const dataArray = data?.data?.courseIncludes[0]?.split(",");
  const dataArray1 = data?.data?.learn[0]?.split(",");
  const dataArray2 = data?.data?.whatneed[0]?.split(",");
  const renderListItems = (data) => (
    <ul className="course-list">
      {data.map((item, index) => (
        <li key={index}>{item.trim()}</li>
      ))}
    </ul>
  );

  const renderListItemsOne = (data) => (
    <ul className="req-ul">
      {data.map((item, index) => (
        <li key={index}>{item.trim()}</li>
      ))}
    </ul>
  );
  const renderListItemsTwo = (data) => (
    <ul className="req-ul">
      {data.map((item, index) => (
        <li key={index}>{item.trim()}</li>
      ))}
    </ul>
  );

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const userId = user?._id;
  const enrolled = true;

  const enrollCount = async () => {
    try {
      const response = await axios.post(
        `${config.apiUrl}/courses/enroll-count/${courseId}`,
        {
          courseId,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEnroll = async () => {
    // setEnrollmentStudentCount(enrolledStudentsCount + 1);
    if (isEnrolled) {
      // User is already enrolled, navigate to course content
      navigate(`/course-content/${courseId}`);
      return;
    }
    try {
      //! Send a POST request to the server to save the enrollment data

      await axios.post(`${config.apiUrl}/users/enrollments`, {
        courseId: id,
        userId,
        courseName,
        enrolled,
      });
      enrollCount();
      setButtonText("কোর্সে যান");
      setIsEnrolled(true);
      setEnrollButtonText("এনরোল করুন ");
    } catch (error) {
      console.log(error);
    }
  };

  const renderEnrollButton = () => {
    if (data?.data?.courseAction === "live") {
      return (
        <Button
          size="lg"
          className={`add-to-cart w-75`}
          onClick={
            isEnrolled
              ? () => navigate(`/course-content/${courseId}`)
              : handleEnroll
          }
          disabled={isLoading}
        >
          {isEnrolled ? buttonText : enrollbuttontext}
        </Button>
      );
    } else if (data?.data?.courseAction === "published") {
      return (
        <div>
          <p className="text-danger text-center ">কোর্সটি এখনো লাইভ হয়নি </p>
        </div>
      );
    } else if (data?.data?.courseAction === "draft") {
      navigate("/to-be-published");
    } else {
      return (
        <div>
          <h1>!!!</h1>
        </div>
      );
    }
  };

  useEffect(() => {
    setEnrollButtonStatus(true);

    //! Check if the user is already enrolled in the course
    const checkEnrollment = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/users/${userId}/enrollments`
        );
        const enrollments = response?.data?.data?.enrollments;

        console.log(enrollments);
        let isAlreadyEnrolled = false;

        for (const enrollment of enrollments) {
          if (String(enrollment?.courseId) === String(courseId)) {
            isAlreadyEnrolled = true;
            break;
          }
        }

        if (isAlreadyEnrolled) {
          setIsEnrolled(true);
          setButtonText("কোর্সে যান");
          setEnrollButtonText("এনরোল করুন");
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkEnrollment();
  }, [courseId, userId]);

  useEffect(() => {
    setEnrollButtonStatus(true);
  }, [isEnrolled]);

  const openModal = (subModule) => {
    setSelectedSubModule(subModule);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSubModule(null);
  };

  let content = null;

  if (isLoading) {
    content = (
      <div>
        <Loader />
      </div>
    );
  } else if (!isLoading && isError) {
    content = (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  } else if (!isLoading && !isError && data?.data?._id) {
    content = (
      <>
        <div className="container-fluid course-desc-section">
          <div className="content-course-desc">
            <h2 className="banner-course-desc">শিখুন: {data?.data?.name}</h2>
            <div className="course-desc-para">
              <p>{data?.data?.description}</p>
            </div>
          </div>
        </div>

        <Container className="main-cont-course-desc">
          <Row>
            <Col xs={12} md={8} className="order-sm-1">
              <div>
                <h3 className="description">কোর্স সম্পর্কে ধারণা:</h3>
                <p className="description-para">{data?.data?.description}</p>
              </div>

              <div className="accor-sec">
                <h4 className="course-cont-head">কোর্স এর বিষয়বস্তু:</h4>
                <div className="d-flex justify-content-between">
                  <p className="course-length-module">
                    {data?.data?.modules.length} modules •{" "}
                    {data?.data?.modules?.length} submodules
                  </p>
                </div>

                <Accordion defaultActiveKey="0">
                  {data?.data?.modules.map((module, index) => (
                    <Accordion.Item
                      key={module._id}
                      eventKey={index.toString()}
                    >
                      <Accordion.Header>
                        <div className="d-flex justify-content-around">
                          <h5 className="acc-mod-head-one">{module.title}</h5>
                        </div>
                      </Accordion.Header>

                      <Accordion.Body>
                        <div className="d-flex">
                          <div>
                            {module.subModules.map((subModule) => (
                              <div key={subModule._id}>
                                <h5 className="acc-sub-head-one mb-4">
                                  {subModule.title}
                                </h5>

                                {subModule.videos.map((video) => (
                                  <button
                                    key={video._id}
                                    onClick={() => openModal(subModule)}
                                    className="modal-btn"
                                  >
                                    <div className="d-flex mt-1 align-items-center p-2 vid-title-cont">
                                      <AiFillVideoCamera className="me-2 cam-icon" />
                                      {video.title}
                                    </div>
                                  </button>
                                ))}

                                {/* Render quizzes for subModule */}
                                {subModule?.quizzes.slice(0, 1).map((quiz) => (
                                  <div key={quiz._id}>
                                    {quiz.question && (
                                      <button className="btn btn-primary quiz-button mb-4">
                                        <div className="">
                                          <MdOutlineQuiz className="me-2 quiz-icon" />
                                          কুইজ
                                        </div>
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>

              {data?.data?.whatneed &&
                dataArray2 &&
                dataArray2.some((item) => item.trim() !== "") && (
                  <div className="req">
                    <h3>কোর্সটি শিখতে যা লাগবে:</h3>
                    {renderListItemsTwo(dataArray2)}
                  </div>
                )}

              {data?.data?.learn &&
                dataArray1 &&
                dataArray1.some((item) => item.trim() !== "") && (
                  <div className="what-see">
                    <h4 className="what-see-header">
                      কোর্স থেকে কি শিখতে পারবেন:
                    </h4>
                    {renderListItemsOne(dataArray1)}
                  </div>
                )}
            </Col>

            <Col xs={12} md={4} className="order-sm-2 ">
              <div className="left-course-section">
                <Image
                  className="course-img-section"
                  src={data?.data?.image}
                  fluid
                />
                <p className="price">কোর্সের নাম: {data?.data?.name}</p>

                <div className="enroll-btn"> {renderEnrollButton()}</div>

                {data?.data?.courseIncludes &&
                  dataArray &&
                  dataArray.some((item) => item.trim() !== "") && (
                    <div className="course-list">
                      <h4 className="course-list-title mt-4">
                        এই কোর্সে যা বিদ্যমান থাকবে:
                      </h4>
                      {renderListItems(dataArray)}
                    </div>
                  )}
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  return (
    <>
      <PageTitle title={data?.data?.name} />
      <Header />
      {content}
      <Footer />

      <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>ভিডিওটি দেখুন </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSubModule && <Video subModule={selectedSubModule} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
