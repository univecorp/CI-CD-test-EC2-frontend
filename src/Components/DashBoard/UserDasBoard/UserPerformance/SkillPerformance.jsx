import React from "react";

import PageTitle from "../../../Common/PageTitle";
import "./userPerformanceskill.css";

import { useSelector } from "react-redux";
import { useUserByEmailQuery } from "../../../redux/rtk/features/user/userApi";

export default function SkillPerformance() {
  const { user } = useSelector((state) => state.auth);
  const {
    data,

    error: err,
  } = useUserByEmailQuery(user?.email);
  const SkillAsessment = data?.data?.SkillAssessment;
  const formattedDate = data?.data?.createdAt
    ? new Date(data?.data?.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  return (
    <div className="container-fluid py-2 mx-auto">
      {SkillAsessment?.map((m, index) => {
        return (
          <div
            className="row my-2 justify-content-around align-items-center"
            //   key={index}
          >
            <div className="col-12 col-md-4 mx-auto">
              <div className="d-flex align-items-center">
                <img src={m.image} alt="" className="courseImage" />
                <div className="ps-3">
                  <p className="DashcourseName"> {m.title}</p>
                  <p className="DashcourseTime">{formattedDate}</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4 pt-4 pb-2">
              <div className="progress ">
                <div
                  className="progress-bar"
                  style={{
                    width: `${m.percentage}%`,
                    background: "#1E3CBA",
                  }}
                >
                  <div className="progress-value">
                    {" "}
                    {m.percentage.toFixed(2)}%
                  </div>
                </div>
              </div>

              <p className="DashcourseTime mt-1">স্কিল মার্কস </p>
            </div>

            <div className="col-12 col-md-2 mx-auto"></div>
          </div>
        );
      })}

      <hr className="hr my-4" />
    </div>
  );
}
