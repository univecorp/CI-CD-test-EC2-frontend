import axios from "axios";
import { setHours, setMinutes } from "date-fns";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../config/apiConfig";
import { useJobByIdQuery } from "../../redux/rtk/features/Jobs/jobApi";
import "./Recruiter.css";
import { useSelector } from "react-redux";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const RecruiterJobCard = ({ role }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!role.includes(user?.role)) {
    navigate("/page-not-found");
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isTestModalOpen, setTestModalOpen] = useState(false);
  const [isInterviewModalOpen, setInterviewModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [filteredApplicants, setFilteredApplicants] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [applied, setApplied] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );
  const { id } = useParams();
  const { data, isLoading, refetch } = useJobByIdQuery(id);
  const applicantList = data?.data?.jobApply;
  console.log(applicantList);
  const filteredList = applicantList?.filter((obj) => obj.steps == 1);
  const filteredWrittenList = applicantList?.filter((obj) => obj.steps == 2);
  const filteredInterviewList = applicantList?.filter((obj) => obj.steps == 3);
  const filteredSelectList = applicantList?.filter((obj) => obj.steps == 4);

  console.log("filter short", filteredList);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);

  useEffect(() => {
    if (applicantList) {
      filterApplicants(applicantList, activeFilter);
    }
  }, [applicantList, activeFilter]);

  const filterApplicants = (applicants, filter) => {
    if (filter === null) {
      setFilteredApplicants(applicants);
    } else {
      const filteredList = applicants.filter((obj) => obj.steps === filter);
      setFilteredApplicants(filteredList);
    }
  };

  const openModal = (applicant) => {
    setModalIsOpen(true);
    setSelectedApplicant(applicant);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openTestModal = (applicant) => {
    setTestModalOpen(true);
    setSelectedApplicant(applicant);
  };

  const closeTestModal = () => {
    setTestModalOpen(false);
  };

  const openInterviewModal = (applicant) => {
    setInterviewModalOpen(true);
    setSelectedApplicant(applicant);
  };

  const closeInterviewModal = () => {
    setInterviewModalOpen(false);
  };

  const handleFilter = (filterCondition) => {
    const filteredList = applicantList?.filter(filterCondition);
    setFilteredApplicants(filteredList);
    refetch();
  };

  const handleTestSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    data.steps = 2; // update the steps field to 2
    try {
      const response = await fetch(
        `${config.apiUrl}/jobsapply/update/${selectedApplicant._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      refetch();
      closeTestModal();
      toast.success("Applicant status updated successfully!");
      console.log("lol", responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInterviewSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const interviewData = {
      interviewLink: data.interviewLink,
      interviewTime: data.interviewTime,
      message: data.message,
    };
    const datas = {
      steps: 3, // add the steps field to the datas object
      interviewData,
    };
    console.log(interviewData);

    try {
      const response = await fetch(
        `${config.apiUrl}/jobsapply/update/${selectedApplicant._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datas),
        }
      );
      const responseData = await response.json();
      console.log("lol", responseData);
      closeInterviewModal();
      refetch();
      toast.success("Applicant status updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleApplicantSteps = async (applicantId, steps) => {
    try {
      const response = await axios.patch(
        `${config.apiUrl}/jobsapply/update/${applicantId}`,
        { steps }
      );
      refetch();
      console.log(response.data);
      toast.success("Applicant status updated successfully!"); // Display success toast message
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the applicant status."); // Display error toast message
    }
  };
  return (
    <div className="container-fluid ps-5 pb-3">
      <h2 className="DashtextPara">জব প্রত্যাশীদের তালিকা </h2>
      <div className="container">
        <div>
          <button
            type="button"
            onClick={() => {
              setFilteredApplicants(applicantList);
              setApplied(true);
              setActiveFilter(null);
            }}
            className={`btn btn-primary position-relative mx-2 inactiveButton ${
              activeFilter === null ? "active" : ""
            }`}
          >
            এপ্লিকেন্টস
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
              {applicantList?.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              setApplied(false);
              handleFilter((obj) => obj.steps === 1);
              setActiveFilter(1);
            }}
            className={`btn btn-primary position-relative mx-2 inactiveButton ${
              activeFilter === 1 ? "active" : ""
            }`}
          >
            শর্টলিস্টেড এপ্লিকেন্টস
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
              {filteredList?.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              setApplied(false);
              handleFilter((obj) => obj.steps === 2);
              setActiveFilter(2);
            }}
            className={`btn btn-primary position-relative mx-2 inactiveButton ${
              activeFilter === 2 ? "active" : ""
            }`}
          >
            রিটেন এপ্লিকেন্টস
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
              {filteredWrittenList?.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              setApplied(false);
              handleFilter((obj) => obj.steps === 3);
              setActiveFilter(3);
            }}
            className={`btn btn-primary position-relative mx-2 inactiveButton ${
              activeFilter === 3 ? "active" : ""
            }`}
          >
            ইন্টারভিউ এপ্লিকেন্টস
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
              {filteredInterviewList?.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setApplied(false);
              handleFilter((obj) => obj.steps === 4);
              setActiveFilter(4);
            }}
            className={`btn btn-primary position-relative mx-2 inactiveButton ${
              activeFilter === 4 ? "active" : ""
            }`}
          >
            সিলেক্টেড এপ্লিকেন্টস
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
              {filteredSelectList?.length}
            </span>
          </button>
        </div>
        {!isLoading &&
          (filteredApplicants || applicantList).map((applicant) => (
            <div className="card shadow-lg my-4 p-2" key={applicant._id}>
              <div className="card-body">
                {applicant.steps === 1 && (
                  <span className="badge custom-badge">shortlisted</span>
                )}
                {applicant.steps === 2 && (
                  <span className="badge custom-badge2">
                    selected for written
                  </span>
                )}
                {applicant.steps === 3 && (
                  <span className="badge custom-badge3">
                    selected for interview
                  </span>
                )}
                {applicant.steps === 4 && (
                  <span className="badge custom-badge4">Finally Selected</span>
                )}
                {applicant.steps === 5 && (
                  <span className="badge custom-badge5">Rejected</span>
                )}

                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div>
                      <img
                        src={applicant.images}
                        alt=""
                        style={{
                          width: "80px",
                          height: "80px",
                          margin: "10px",
                        }}
                        className="courseImage"
                      />
                    </div>
                    <div>
                      <p className="jobdatas">
                        Name: <span className="jobspan">{applicant.name}</span>
                      </p>
                      <p className="jobdatas">
                        Email:
                        <span className="jobspan">
                          <a
                            className="jobspan"
                            href={`mailto:${applicant.emails}`}
                          >
                            {applicant.emails}
                          </a>
                        </span>
                      </p>
                      <p className="jobdatas">
                        Phone:
                        <span className="jobspan">
                          <a
                            className="jobspan"
                            href={`tel:${applicant.phone}`}
                          >
                            {applicant.phone}
                          </a>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="jobdatas">
                      Education:
                      <span className="jobspan">{applicant.education}</span>
                    </p>
                    <p className="jobdatas">
                      Experience:
                      <span className="jobspan">{applicant.experience}</span>
                    </p>
                    <p className="jobdatas">
                      Achievement:
                      <span className="jobspan">{applicant.achievement}</span>
                    </p>
                  </div>
                </div>
                <p className="jobdatas">
                  Cover Letter:
                  <span className="jobspan">
                    {showMore
                      ? applicant?.coverLetter
                      : `${applicant?.coverLetter.substring(0, 300)}`}
                    {applicant?.coverLetter.length > 300 && (
                      <button
                        className="seebtn"
                        onClick={() => setShowMore(!showMore)}
                      >
                        {showMore ? "...Show less" : "...Show more"}
                      </button>
                    )}
                  </span>
                </p>
                {applicant.steps === 2 && !applied && (
                  <div className="text-center">
                    <p className="jobdatas ms-3">
                      Written Test:{" "}
                      <a
                        className="text-primary"
                        href={
                          applicant?.testLink?.startsWith("http")
                            ? applicant?.testLink
                            : `https://${applicant?.testLink}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {applicant?.testLink?.startsWith("http")
                          ? applicant?.testLink
                          : `https://${applicant?.testLink}`}
                      </a>
                    </p>
                  </div>
                )}
                {applicant.steps === 3 && !applied && (
                  <div className="text-center">
                    <p className="m-0 jobdatas">
                      Interview Link:{" "}
                      <a
                        className="text-primary"
                        href={
                          applicant?.interviewData?.interviewLink?.startsWith(
                            "http"
                          )
                            ? applicant?.interviewData?.interviewLink
                            : `https://${applicant?.interviewData?.interviewLink}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {applicant?.interviewData?.interviewLink?.startsWith(
                          "http"
                        )
                          ? applicant?.interviewData?.interviewLink
                          : `https://${applicant?.interviewData?.interviewLink}`}
                      </a>
                    </p>
                    <p className="jobdatas">
                      Date:{" "}
                      <span className="jobspan">
                        {applicant?.interviewData?.interviewTime}
                      </span>
                    </p>
                  </div>
                )}
                <div className="d-flex mt-2 justify-content-between align-items-center">
                  <button
                    className="btnsmall"
                    onClick={() => openModal(applicant)}
                  >
                    সিভি দেখুন
                  </button>
                  {applied && applicant.steps < 1 && (
                    <div>
                      <button
                        className="btnsmall btngreen me-3"
                        onClick={() => handleApplicantSteps(applicant._id, 1)}
                      >
                        শর্টলিস্ট
                      </button>
                      <button
                        className="btnsmall btnreds ms-2"
                        onClick={() => handleApplicantSteps(applicant._id, 5)}
                      >
                        রিজেক্ট
                      </button>
                    </div>
                  )}
                  {applied && applicant.steps >= 1 && applicant.steps <= 4 && (
                    <button className="btnsmall btngreen me-3" disabled>
                      শর্টলিস্টেড
                    </button>
                  )}

                  {applied && applicant.steps === 5 && (
                    <button className="btnsmall btnreds" disabled>
                      রিজেক্টেড
                    </button>
                  )}
                  {!applied && applicant.steps === 1 && (
                    <div>
                      <button
                        className="btnsmall btngreen "
                        onClick={() => openTestModal(applicant)}
                      >
                        রিটেন টেস্ট
                      </button>
                      <button
                        className="mx-2 btnsmall btnred"
                        onClick={() => openInterviewModal(applicant)}
                      >
                        ইন্টারভিউ
                      </button>
                      <button
                        className="btnsmall btnreds ms-2"
                        onClick={() => handleApplicantSteps(applicant._id, 5)}
                      >
                        রিজেক্ট
                      </button>
                    </div>
                  )}

                  {!applied && applicant.steps === 2 && (
                    <div>
                      <button
                        className="mx-2 btnsmall btnred"
                        onClick={() => openInterviewModal(applicant)}
                      >
                        ইন্টারভিউ
                      </button>
                      <button
                        className="btnsmall btnreds ms-2"
                        onClick={() => handleApplicantSteps(applicant._id, 5)}
                      >
                        রিজেক্ট
                      </button>
                    </div>
                  )}
                  {!applied && applicant.steps === 3 && (
                    <div>
                      <button
                        className="btnsmall btnblue"
                        onClick={() => handleApplicantSteps(applicant._id, 4)}
                      >
                        সিলেক্টেড
                      </button>
                      <button
                        className="btnsmall btnreds ms-2"
                        onClick={() => handleApplicantSteps(applicant._id, 5)}
                      >
                        রিজেক্ট
                      </button>
                    </div>
                  )}
                  {!applied && applicant.steps === 4 && (
                    <div>
                      <button
                        className="btnsmall btnblue w-100 p-1"
                        onClick={() => handleApplicantSteps(applicant._id, 4)}
                        disabled
                      >
                        এপ্লিকেন্ট সিলেক্টেড হয়েছে
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      <Modal show={modalIsOpen} onHide={closeModal} size="lg" scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>CV of {selectedApplicant?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="pdf-container">
            {selectedApplicant && (
              <Document file={selectedApplicant?.pdf}>
                {Array.from(
                  new Array(selectedApplicant?.pdf?.numPages),
                  (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      width={750}
                    />
                  )
                )}
              </Document>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={closeModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
      {/* Test Modal */}
      <Modal
        show={isTestModalOpen}
        onHide={closeTestModal}
        size="md"
        scrollable={true}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>রিটেন টেস্ট</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={handleTestSubmit}>
              <div className="DashProfileInput">
                <label htmlFor="testLink">রিটেন টেস্ট লিংক</label>
                <input
                  type="text"
                  id="testLink"
                  name="testLink"
                  style={{ width: "100%" }}
                  placeholder="URL লিংক দিন"
                />
              </div>
              <div className="text-center">
                <button className="ButtonSave my-3" type="submit">
                  সাবমিট
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      {/* Interview Modal */}
      <Modal
        show={isInterviewModalOpen}
        onHide={closeInterviewModal}
        size="md"
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>ইন্টারভিউ</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "400px" }}>
          <form onSubmit={handleInterviewSubmit}>
            <div className="DashProfileInput">
              <label htmlFor="interviewTime">ইন্টারভিউ সময় নির্ধারণ করুন</label>
              <div className="date-picker-container w-100">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  timeIntervals={15}
                  minDate={new Date()}
                  name="interviewTime"
                />
              </div>
            </div>

            <div className="DashProfileInput">
              <label htmlFor="interviewLink">ইন্টারভিউ লিংক দিন</label>
              <input
                type="text"
                id="interviewLink"
                name="interviewLink"
                style={{ width: "100%" }}
                placeholder="URL লিংক দিন"
              />
            </div>

            <div className="DashProfileInput">
              <label htmlFor="message">ম্যাসেজ</label>
              <input
                type="text"
                id="message"
                name="message"
                style={{ width: "100%" }}
                placeholder="এপ্লিক্যান্টকে ম্যাসেজ দিন"
              />
            </div>
            <div className="text-center">
              <input
                className="jobsPostSubmit my-4"
                type="submit"
                value="সাবমিট"
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RecruiterJobCard;
