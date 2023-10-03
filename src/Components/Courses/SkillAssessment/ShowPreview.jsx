import { NavLink, useParams } from "react-router-dom";
import config from "../../../config/apiConfig";
import { useEffect } from "react";
import { useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import "./ShowPreview.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { BsCheck2Circle } from "react-icons/bs";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ShowPreview() {
  const { user } = useSelector((state) => state.auth);

  const userId = user._id;

  const { id } = useParams();
  const [quizzes, setQuizzes] = useState([]);

  const SkillAssessmentId = quizzes?.data?._id;

  const sendData = () => {
    axios
      .post(`${config.apiUrl}/skill-assessment/save/${userId}`, {
        SkillAssessmentId,
      })
      .then((response) => {
        console.log("Data sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  useEffect(() => {
    fetch(`${config.apiUrl}/skill-assessment/${id}`)
      .then((response) => response.json())
      .then((data) => setQuizzes(data))
      .catch((error) => console.error("Error fetching quizzes:", error));
  }, [id]);

  return (
    <>
      <Header></Header>

      <Container fluid data-aos="fade-up" className="text-center py-5 middle">
        <h1 className="smallText-indi">{quizzes?.data?.title}</h1>
        <section className="container mt-5">
          <Row className="my-5">
            <Col xs={12} md={4} className="mt-5 mb-4">
              <Card className="text-center pt-5 carding-main">
                <Card.Title className="title-plan-skill">
                  স্কিল অ্যাসেসমেন্ট এর টপিকস
                </Card.Title>

                <Card.Body className="text-start mx-auto my-3">
                  {quizzes?.data?.SkillAssessmentTopic?.map((topic, index) => (
                    <p className=" pricing-text" key={index}>
                      <BsCheck2Circle className="icon  me-4" />
                      {topic}
                    </p>
                  ))}
                </Card.Body>
              </Card>
            </Col>

            {/* 2nd plan */}
            <Col xs={12} md={4}>
              <Card className="text-center pt-5 carding-main" id="special-card">
                {/* <Card.Title className="title-plan">
                  অ্যানুয়াল প্ল্যান
                </Card.Title> */}

                <Card.Body className="text-start mx-auto my-3">
                  <p className="skill-text">Label: {quizzes?.data?.label}</p>
                  <img
                    src={quizzes?.data?.image}
                    alt=""
                    style={{ width: "300px" }}
                  />

                  <p className="skill-text">
                    Category: {quizzes?.data?.category}
                  </p>
                </Card.Body>
              </Card>
            </Col>
            {/* 3rd plan */}
            <Col xs={12} md={4} className="mt-5">
              <Card className="text-center pt-5 carding-main">
                <Card.Title className="title-plan-skill">
                  স্কিল অ্যাসেসমেন্ট টি যাদের জন্য{" "}
                </Card.Title>

                <Card.Body className="text-start mx-auto my-3">
                  {quizzes?.data?.SkillAssessmentForWhichOne?.map(
                    (topic, index) => (
                      <p className=" pricing-text" key={index}>
                        <BsCheck2Circle className="icon  me-4" />
                        {topic}
                      </p>
                    )
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <NavLink to={`/skill-assessment/${quizzes?.data?._id}`}>
            <p className="start-btn-skills" onClick={sendData}>
              Start Skill Assessment
            </p>
          </NavLink>
        </section>
      </Container>

      <Footer />
    </>
  );
}
