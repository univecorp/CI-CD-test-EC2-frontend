import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./AdminDashboard.css";

import { useSelector } from "react-redux";
import config from "../../../config/apiConfig";

export default function ShowSkillAssessmentData({ role }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [result, setResult] = useState([]);
  if (role !== user?.role) {
    navigate("/page-not-found");
  }

  const handleAdd = () => {
    navigate("/skill-assessment-form");
  };

  useEffect(() => {
    fetch(`${config.apiUrl}/skill-assessment`)
      .then((response) => response.json())
      .then((data) => setResult(data))
      .catch((error) => console.error("Error fetching quizzes:", error));
  }, []);

  return (
    <div className="container-fluid px-4">
      <Button
        variant="primary"
        className="me-2 e-button mt-4"
        onClick={handleAdd}
        id="add-btn"
      >
        Add Skill
      </Button>
      <div className="table-responsive">
        <table
          id="table"
          className="table table-striped mt-4 mb-4"
          style={{
            borderCollapse: "separate",
            borderSpacing: "0 20px",
          }}
        >
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Label</th>
              <th scope="col">Image</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {result?.data?.map((result) => (
              <tr
                key={result._id}
                style={{
                  boxShadow: "10px 8px 11px -6px rgba(0, 0, 0, 0.41)",
                  WebkitBoxShadow: "10px 8px 11px -6px rgba(0, 0, 0, 0.41)",
                  MozBoxShadow: "10px 8px 11px -6px rgba(0, 0, 0, 0.41)",
                }}
              >
                <td>{result.title}</td>
                <td>{result.category}</td>
                <td>{result.label}</td>
                <td>
                  {result.image && (
                    <img
                      src={result.image}
                      alt={`Image for ${result.title}`}
                      style={{ width: "50px" }}
                    />
                  )}
                </td>
                <td>
                  <div className="d-flex">
                    <Button
                      variant="success"
                      onClick={() =>
                        navigate(`/edit-skill-assessment-form/${result._id}`)
                      }
                      className="e-button"
                      id="edit-btn"
                    >
                      Edit Skill
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
