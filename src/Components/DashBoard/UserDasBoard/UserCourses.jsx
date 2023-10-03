/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import config from "../../../config/apiConfig";
import PageTitle from "../../Common/PageTitle";
import { useUserByEmailQuery } from "../../redux/rtk/features/user/userApi";

function UserCourses() {
  const percentage = localStorage.getItem("percentage");

  const [progress, setProgress] = useState(percentage);
  const [showPercentage, setShowPercentage] = useState(false);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  const { user } = useSelector((state) => state.auth);

  const userId = user?._id;
  const { data } = useUserByEmailQuery(user?.email);

  const navigate = useNavigate();

  const enrollments = data?.data?.enrollments;

  console.log(enrollments);

  const courseDataString = localStorage.getItem("courseData");

  const courseData = courseDataString ? JSON.parse(courseDataString) : null;

  const { courseName: storedCourseName, percentage: storedPercentage } =
    courseData || {};

  useEffect(() => {
    if (storedCourseName && enrollments) {
      const isEnrolledInStoredCourse = enrollments.some(
        (enrollment) => enrollment.courseName === storedCourseName
      );
      setShowPercentage(isEnrolledInStoredCourse);
      setProgress(isEnrolledInStoredCourse ? storedPercentage : 0);
    }
  }, [storedCourseName, storedPercentage, enrollments]);

  useEffect(() => {
    fetchBookmarkedJobs();
  }, [userId]);

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

  const fetchBookmarkedJobs = () => {
    axios
      .get(`${config.apiUrl}/course-bookmarks/${userId}`)
      .then((response) => {
        setBookmarkedJobs(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching bookmarked jobs:", error);
      });
  };

  const handleCourseClick = (courseId) => {
    // ! Navigate to the course page for the selected course
    navigate(`/course-content/${courseId}`);
  };

  return (
    <div className="container-fluid px-0 DashRight">
      <PageTitle title="আমার কোর্সসমূহ" />
      <p className="DashProfileHead">আমার কোর্সসমূহ</p>
      <p className="profileSmallPara">কোর্সের অগ্রগতি</p>
      <div className="container-fluid py-2 mx-auto">
        {enrollments?.map((enrollment, index) => {
          return (
            <div
              className="row my-2 justify-content-around align-items-center"
              key={index}
            >
              <div className="col-12 col-md-4 mx-auto">
                <div className="d-flex align-items-center">
                  <img
                    src="https://assets-global.website-files.com/5f15530648874c5f977e91c2/637ef1f502c0f83324cbf1ad_ABM%20College%20Web%20developer%20main.jpg"
                    alt=""
                    className="courseImage"
                  />
                  <div className="ps-3">
                    <p className="DashcourseName">{enrollment?.courseName}</p>
                    <p className="DashcourseTime">{enrollment?.createdAt}</p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4 pt-4 pb-2">
                <div className="progress ">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${enrollment?.Percentage}%`,
                      background: "#1E3CBA",
                    }}
                  >
                    <div className="progress-value">
                      {enrollment.Percentage}%
                    </div>
                  </div>
                </div>

                <p className="DashcourseTime mt-1">কোর্সের অগ্রগতি</p>
              </div>

              <div className="col-12 col-md-2 mx-auto">
                <button
                  className="Dashcoursebtn"
                  onClick={() => handleCourseClick(enrollment?.courseId)}
                >
                  কোর্সে যান
                </button>
              </div>
            </div>
          );
        })}

        <hr className="hr my-4" />
      </div>

      <div className="container"></div>
      <p className="profileSmallPara mt-4">বুকমার্কড কোর্স</p>
      <div className="container pb-5">
        <div className="row gy-3">
          {bookmarkedJobs.map((c) => (
            <div className="col-12 col-md-4" key={c._id}>
              <div className="card" style={{ width: "18rem" }}>
                <img className="card-img-top" src={c.image} alt="" />
                <div className="card-body">
                  <h5 className="card-title">{c.name}</h5>
                  <p className="card-text">{c.description.slice(0, 100)}..</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      className="Dashcoursebtn"
                      onClick={() => navigate(`/learn/${c._id}`)}
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserCourses;
