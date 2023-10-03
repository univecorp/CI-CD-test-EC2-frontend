import React from "react";
import "./SkillCard.css";
import { useNavigate } from "react-router-dom";
import { Col, Image } from "react-bootstrap";

export default function SkillCard({ result }) {
  const navigate = useNavigate();
  return (
    <div className="skill-card ms-4 mt-4 ">
      <Image src={result.image} className="skill-img" fluid rounded></Image>

      <div className="d-flex justify-content-between">
        <div>
          <h5 className="skill-title">{result.title}</h5>
          <div className="cat-skill-div">
            <span className="cat-skill-span">{result.category} </span>{" "}
          </div>
          <p className="skills-para">স্কিল লেবেল :{result.label}</p>
          <p className="skills-para">
            {" "}
            টোটাল প্রশ্ন আছে :{result.questions.length}টি
          </p>
          <button
            className="ms-2 btn btn-primary"
            onClick={() =>
              navigate(`/show-skill-assessment-preview/${result?._id}`)
            }
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
