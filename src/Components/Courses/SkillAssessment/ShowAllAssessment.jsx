import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import "./showSkill.css";
import Footer from "../../Footer/Footer";
import { Container } from "react-bootstrap";

import SkillCard from "./SkillCard";
import config from "../../../config/apiConfig";
export default function ShowAllAssessment() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch(`${config.apiUrl}/skill-assessment`)
      .then((response) => response.json())
      .then((data) => setResult(data))
      .catch((error) => console.error("Error fetching quizzes:", error));
  }, []);

  return (
    <>
      <Header />

      <div className="container-fluid main-head">
        <div className="content-course">
          <h2 className="banner-indis-course">ইউনিভ স্কিল আসসেসমেন্ট </h2>
        </div>
      </div>

      <Container>
        <h2 className="our-courses">আমাদের স্কিল আসসেসমেন্ট</h2>

        <div className="main-skills-conts">
          {result?.data?.map((result, index) => (
            <SkillCard result={result} />
          ))}
        </div>
      </Container>

      <Footer />
    </>
  );
}
