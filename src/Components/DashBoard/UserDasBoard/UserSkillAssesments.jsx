import React from "react";
import "./UserSkill.css";
import PageTitle from "../../Common/PageTitle";
import "./UserCertificate.css";

import { useUserByEmailQuery } from "../../redux/rtk/features/user/userApi";
import { useSelector } from "react-redux";

export default function UserSkillAssesments() {
  const { user } = useSelector((state) => state.auth);
  const {
    data,

    error: err,
  } = useUserByEmailQuery(user?.email);

  return (
    <div className="container-fluid px-4">
      <PageTitle title="আমার স্কিল আসসেসমেন্ট" />
      <h1 className="skill-header-dash">
        আপনার স্কিল আসসেসমেন্ট নাম্বার দেখুন{" "}
      </h1>
      <div className="table-responsive">
        <table id="table" className="table table-striped mt-4 ">
          <thead>
            <tr>
              <th scope="col">মার্ক্স্ </th>
              <th scope="col">পার্সেন্টেজ </th>

              <th scope="col">টাইটেল </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="col">{data.data.SkillAssessment.score}</td>
              <td scope="col">{data.data.SkillAssessment.percentage}</td>
              <td scope="col">{data.data.SkillAssessment.title}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
