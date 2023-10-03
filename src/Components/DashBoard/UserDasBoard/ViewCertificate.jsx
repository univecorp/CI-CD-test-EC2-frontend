import React, { useRef } from "react";
import "./ViewCertificate.css";
import img1 from "./Blue Modern Certificate of Completion (1).png";
import { exportComponentAsPNG } from "react-component-export-image";
import { useSelector } from "react-redux";
import { useUserByEmailQuery } from "../../redux/rtk/features/user/userApi";
import { useLocation } from "react-router-dom";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
export default function ViewCertificate() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const {
    data,

    error: err,
  } = useUserByEmailQuery(user?.email);

  const certificateWrapper = useRef();

  const formattedDate = data?.data?.createdAt
    ? new Date(data?.data?.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const handleDownloadClick = async (e) => {
    e.preventDefault();

    exportComponentAsPNG(certificateWrapper, {
      html2CanvasOptions: { backgroundColor: null },
      fileName: "Unive Certificate.png", // Change the file name to something else
    });
  };

  return (
    <>
      <div className="Meta">
        <h1 className="header">Unive Certificates</h1>

        <button onClick={handleDownloadClick} className="p-2">
          Download the certificate
        </button>
      </div>

      <div className="sharebox-certificate">
        <div className="mx-auto ShareCertificate">
          <label className="share-text">Share this in social Media</label>
          <EmailShareButton
            url={`https://unive.site/verified-certificate/${data?.data?.Certificate?.certificateId}`}
            subject="share this unive certificate"
          >
            <EmailIcon size={32} round />
          </EmailShareButton>

          <LinkedinShareButton
            url={`https://unive.site/verified-certificate/${data?.data?.Certificate?.certificateId}`}
            title="share this unive certificate "
          >
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <FacebookShareButton
            url={`https://unive.site/verified-certificate/${data?.data?.Certificate?.certificateId}`}
            quote="share this unive certificate"
            hashtag="#Unive"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <WhatsappShareButton
            url={`https://unive.site/verified-certificate/${data?.data?.Certificate?.certificateId}`}
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </div>

      <div className="App">
        <div id="downloadWrapper" ref={certificateWrapper}>
          <div id="certificateWrapper">
            <p>
              {data?.data?.Certificate?.firstName}{" "}
              {data?.data?.Certificate?.lastName}
            </p>

            <p className="certificate-new-course">
              {data?.data?.Certificate?.courseName}
            </p>

            <p className="certificate-new-course-id">
              {data?.data?.Certificate?.certificateId}
            </p>

            <p className="certificate-new-course-date">{formattedDate}</p>
            <img src={img1}></img>
          </div>
        </div>
      </div>
    </>
  );
}
