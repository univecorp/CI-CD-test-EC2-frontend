import React from "react";

import PageTitle from "../../Common/PageTitle";
import "./UserCertificate.css";
import { useNavigate } from "react-router-dom";
import { useUserByEmailQuery } from "../../redux/rtk/features/user/userApi";
import { useSelector } from "react-redux";

export default function UserCertificate() {
  const { user } = useSelector((state) => state.auth);
  const {
    data,

    error: err,
  } = useUserByEmailQuery(user?.email);

  const formattedDate = data?.data?.Certificate?.createdAt
    ? new Date(data?.data?.Certificate?.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const navigate = useNavigate();
  return (
    <div className="container-fluid px-4">
      <PageTitle title="আমার সার্টিফিকেট" />
      <h1 className="certificate-header">আপনার সার্টিফিকেটটি দেখুন </h1>
      <div className="table-responsive">
        {data?.data?.Certificate ? (
          <table id="table" className="table table-striped mt-4 mb-4 ">
            <thead>
              <tr>
                <th scope="col">কোর্সের নাম </th>
                <th scope="col">ইস্যুর তারিখ </th>

                <th scope="col">প্রিভিউ </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="col">{data?.data?.Certificate?.courseName} </td>
                <td scope="col">{formattedDate}</td>
                <td scope="col">
                  <button
                    type="button"
                    className="ct-btn"
                    onClick={() => navigate("/Dashboard/viewcertificate")}
                  >
                    সার্টিফিকেট
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div>
            <p className="fs-4  text-center mt-2">
              বর্তমানে ইউনিভ থেকে আপনার কোনো সার্টিফিকেট নেই
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
