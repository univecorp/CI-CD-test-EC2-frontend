import { setHours, setMinutes } from "date-fns";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams } from "react-router";
import { useJobByIdQuery } from "../../redux/rtk/features/Jobs/jobApi";
import "./Recruiter.css";
import { useSelector } from "react-redux";
export const Shortlisted = ({ role }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (role !== user?.role) {
    navigate("/page-not-found");
  }

  const [showMore, setShowMore] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isTestModalOpen, setTestModalOpen] = useState(false);
  const [isInterviewModalOpen, setInterviewModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useJobByIdQuery(id);
  const applicantList = data?.data?.jobApply;
  console.log(applicantList);
  const filteredList = applicantList?.filter(
    (obj) => obj.steps >= 1 && obj.steps <= 4
  );
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);

  const openModal = (applicant) => {
    setModalIsOpen(true);
    setSelectedApplicant(applicant);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openTestModal = () => {
    setTestModalOpen(true);
  };

  const closeTestModal = () => {
    setTestModalOpen(false);
  };

  const openInterviewModal = () => {
    setInterviewModalOpen(true);
  };

  const closeInterviewModal = () => {
    setInterviewModalOpen(false);
  };
  return (
    <div>
      <div className="container">
        {!isLoading &&
          filteredList.map((applicant) => (
            <div className="card shadow-lg my-4 p-2" key={applicant._id}>
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div>
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
                        alt=""
                        style={{
                          width: "120px",
                          height: "120px",
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
                <div className="d-flex mt-2 justify-content-between align-items-center">
                  <button
                    className="btnsmall"
                    onClick={() => openModal(applicant)}
                  >
                    সিডি দেখুন
                  </button>
                  <div>
                    <button
                      className="btnsmall btngreen "
                      onClick={openTestModal}
                    >
                      রিটেন টেস্ট
                    </button>
                    <button
                      className="mx-2 btnsmall btnred"
                      onClick={openInterviewModal}
                    >
                      ইন্টারভিউ{" "}
                    </button>
                    <button className="btnsmall btnblue">সিলেক্টেড </button>
                    <button className="btnsmall btnreds ms-2">রিজেক্ট</button>
                  </div>
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
        style={{ height: "400px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>রিটেন টেস্ট</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form>
              <div className="DashProfileInput">
                <label htmlFor="jobDeadline">রিটেন টেস্ট লিংক দিন</label>
                <input
                  style={{ width: "100%", height: "50px" }}
                  type="text"
                  name=""
                  id=""
                  placeholder="URL"
                />
                <div className="text-center mt-4">
                  <button className="ButtonSave" type="submit">
                    সাবমিট
                  </button>
                </div>
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
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>ইন্টারভিউ</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "400px" }}>
          <form action="">
            <div className="DashProfileInput">
              <label htmlFor="jobDeadline">
                ইন্টারভিউ তারিখ এবং সময় নির্ধারণ করুন{" "}
              </label>
            </div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className="custom-datepicker"
              minDate={new Date()}
            />
            <div className="DashProfileInput">
              <label htmlFor="jobDeadline">অনলাইন ইন্টারভিউ লিংক দিন </label>
              <input
                style={{ width: "100%", height: "50px" }}
                type="text"
                name=""
                id=""
                placeholder="URL"
              />
              <label htmlFor="jobDeadline">এপ্লিক্যান্টকে মেসেজ দিন</label>
              <input
                style={{ width: "100%", height: "50px" }}
                type="text"
                name=""
                id=""
                placeholder="URL"
              />
            </div>
            <div className="text-center mt-4">
              <button className="ButtonSave" type="submit">
                সাবমিট
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
