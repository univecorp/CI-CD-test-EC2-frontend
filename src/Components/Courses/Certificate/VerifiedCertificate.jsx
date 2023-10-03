import React, { useEffect, useRef, useState } from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import "./VerifiedCertificate.css";
import img1 from "./Blue Modern Certificate of Completion (1).png";
import { exportComponentAsPNG } from "react-component-export-image";

import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../../config/apiConfig";

export default function VerifiedCertificate() {
  const { certificateId } = useParams();
  let user;

  const [certificateResult, setCertificateResult] = useState(null);
  console.log(user);
  useEffect(() => {
    axios
      .get(`${config.apiUrl}/certificate/${certificateId}`)
      .then((response) => {
        setCertificateResult(response?.data);
        console.log("response data", response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const certificateWrapper = useRef();

  const formattedDate = certificateResult?.data?.createdAt
    ? new Date(certificateResult?.data?.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  // const handleDownloadClick = async (e) => {
  //   e.preventDefault();

  //   exportComponentAsPNG(certificateWrapper, {
  //     html2CanvasOptions: { backgroundColor: null },
  //   });
  // };
  // const token = localStorage.getItem("token");

  return (
    <>
      {/* {token && <Header></Header>} */}

      <div className="Meta">
        <h1 className="header">Verified Certificate</h1>
      </div>

      <div className="App">
        <div id="downloadWrapper" ref={certificateWrapper}>
          <div id="certificateWrapper">
            <p>
              {certificateResult?.data?.firstName}
              {certificateResult?.data?.lastName}
            </p>

            <p className="certificate-new-course">
              {certificateResult?.data?.courseName}
            </p>

            <p className="certificate-new-course-id">
              {certificateResult?.data?.certificateId}
            </p>

            <p className="certificate-new-course-date">{formattedDate}</p>
            <img src={img1}></img>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}
