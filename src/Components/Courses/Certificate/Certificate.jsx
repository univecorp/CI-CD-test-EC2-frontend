import React, { useRef, useState } from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import "./Certificate.css";
import img1 from "./Blue Modern Certificate of Completion (1).png";
import { exportComponentAsPNG } from "react-component-export-image";
import { useSelector } from "react-redux";

export default function Certificate() {
  const { certificateResult: user, setCertificateResult } = useState(null);
  useEffect(() => {
    axios
      .get(`${config.apiUrl}/certificate/${certificateId}`)
      .then((response) => {
        setCertificateResult(response?.data);
        console.log("response data", response?.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const certificateWrapper = useRef();
  const [name, setName] = useState(user?.firstName);
  const [secondname, setSecondName] = useState(user?.lastName);
  a;
  const [course, setCourse] = useState(user?.certificate[0]?.courseName);
  const formattedDate = user?.certificate[0]?.certificateIssuedDate
    ? new Date(user?.certificate[0]?.certificateIssuedDate).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      )
    : "";
  const handleDownloadClick = async (e) => {
    e.preventDefault();

    exportComponentAsPNG(certificateWrapper, {
      html2CanvasOptions: { backgroundColor: null },
      fileName: "Unive Certificate.png",
    });
  };
  const token = localStorage.getItem("token");

  return (
    <>
      {token && <Header></Header>}

      <div className="Meta">
        <h1 className="header">Unive Certificates</h1>

        {token && (
          <button onClick={handleDownloadClick}>
            Download the certificate
          </button>
        )}
      </div>

      <div className="App">
        <div id="downloadWrapper" ref={certificateWrapper}>
          <div id="certificateWrapper">
            <p>
              {name} {secondname}
            </p>

            <p className="certificate-new-course">
              {user?.certificate[0]?.courseName}
            </p>

            <p className="certificate-new-course-id">
              {user?.certificate[0]?.certificateId}
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
