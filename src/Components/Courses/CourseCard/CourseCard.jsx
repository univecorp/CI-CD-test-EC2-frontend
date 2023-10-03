/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

import "../../Home/StaticCourses/Course.css";
import "./CourseCard.css";
import img2 from "./bookmark (1).png";
import img1 from "./bookmark.png";

import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import config from "../../../config/apiConfig";
export default function CourseCard({ course }) {
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;
  const [isBookmarked, setIsBookmarked] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsBookmarked(course?.bookmarked || false); // Update the bookmark status when job prop changes
  }, [course]);

  const handleBookmark = (id) => {
    axios
      .post(`${config.apiUrl}/course-bookmarks`, {
        courseId: id,
        userId,
      })
      .then((response) => {
        console.log("Bookmark added successfully");
        setIsBookmarked(true); // Update the bookmark status
      })
      .catch((error) => {
        console.error("Error adding bookmark:", error);
      });
  };

  const handleRemoveBookmark = (id) => {
    axios
      .delete(`${config.apiUrl}/course-bookmarks`, {
        data: { courseId: id, userId },
      })
      .then((response) => {
        console.log("Bookmark removed successfully");
        setIsBookmarked(false); // Update the bookmark status
      })
      .catch((error) => {
        console.error("Error removing bookmark:", error);
      });
  };

  return (
    <>
      <div className="course-card ms-4 mt-4">
        <img src={course.image} className="course-img img-fluid"></img>

        <div className="d-flex justify-content-between">
          <div>
            <div className="d-flex">
              {isBookmarked ? (
                <img
                  src={img2}
                  style={{ width: "25px", height: "25px" }}
                  className="courseBookmarks"
                  onClick={() => handleRemoveBookmark(course?._id)}
                />
              ) : (
                <img
                  src={img1}
                  style={{ width: "25px", height: "25px" }}
                  className="courseBookmarks"
                  onClick={() => handleBookmark(course?._id)}
                />
              )}
            </div>

            <h5 className="course-name">{course.name}</h5>
            <div className="course-star">
              {" "}
              <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar />{" "}
              <AiFillStar />{" "}
              <span className="rev-course">{course.coursetag} </span>{" "}
            </div>
            <p className="course-fee">টোটাল মডিউল :{course.modules.length}</p>
            <button
              className="ms-2 btn btn-primary"
              onClick={() => navigate(`/learn/${course._id}`)}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
