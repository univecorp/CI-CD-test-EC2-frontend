import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { BsArrowReturnRight, BsArrowRightShort } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import Swal from "sweetalert2";
import config from "../../../config/apiConfig";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import {
  useJobByIdQuery,
  useJobsApplyMutation,
  useQueriesMutation,
  useReplyMutation,
} from "../../redux/rtk/features/Jobs/jobApi";
import PageTitle from "./../../Common/PageTitle";
import "./JobView.css";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderWidth: 2,
  borderRadius: 2,
  margin: "0px",
  borderColor: "#1e3cba",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};
const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
function JobsViews() {
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [show, setShow] = useState(false);
  const [reply, setReply] = useState("");
  const { user } = useSelector((state) => state.auth);
  const {
    data: jobsData,
    isLoading,
    isError,
  } = useJobByIdQuery(id, { pollingInterval: 10000 });
  const [jobsApply, { error }] = useJobsApplyMutation();
  const [sendQuestions] = useQueriesMutation();
  const [sendReply, { isSuccess }] = useReplyMutation();
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (user?.role === "User") {
      setShow(true);
    } else {
      Swal.fire({
        icon: "info",
        title: "আপনি জবস প্রার্থী নন!",
      });
    }
  };

  const [experience, setExperience] = useState("");
  const [achievement, setAchievement] = useState("");
  const [education, setEducation] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };
  const handleAchievement = (event) => {
    setAchievement(event.target.value);
  };

  const handleEducationChange = (event) => {
    setEducation(event.target.value);
  };

  const handleCoverLetterChange = (event) => {
    setCoverLetter(event.target.value);
  };
  useEffect(() => {
    if (jobsData) {
      setJobs(jobsData);
    }
  }, [jobsData]);
  const formData = new FormData();
  const {
    getRootProps,
    getInputProps,
    fileRejections,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024, // 2 MB in bytes
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <p className="text-dark text-center fw-bold" key={file.path}>
      <ImCross className="me-2 text-dark" />
      {file.name}
      {formData.append("fileName", file.name)};
    </p>
  ));
  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB in bytes

    const fileSizeErrorMessage =
      file.size > maxSizeInBytes ? (
        <p className="text-danger">
          File size exceeds the maximum limit of 2 MB.
        </p>
      ) : null;

    const errorMessages = fileSizeErrorMessage
      ? []
      : errors.map((e) => (
          <p className="text-danger" key={e.code}>
            {e.message}
          </p>
        ));

    return (
      <p className="text-dark text-center fw-bold" key={file.path}>
        <ImCross className="me-2 text-dark" />
        {file.name}
        {fileSizeErrorMessage}
        {errorMessages}
      </p>
    );
  });

  const [applied, setApplied] = useState(null);

  useEffect(() => {
    const checkApplied = async () => {
      try {
        const { data } = await axios.post(
          `${config.apiUrl}/jobsapply/isApplied`,
          {
            applicantId: user?._id,
            jobId: id,
          }
        );
        setApplied(data.success);
      } catch (err) {
        console.log(err);
      }
    };

    checkApplied();
  }, [id]);

  const [buttonText, setButtonText] = useState("Copy this job link");

  const handleClick = () => {
    const link = window.location.origin + location.pathname;

    navigator.clipboard
      .writeText(link)
      .then(() => {
        setButtonText("Copied");
        console.log("Link copied!");
      })
      .catch((error) => {
        console.error("Failed to copy link:", error);
      });
  };

  const fullName = user?.firstName + " " + user?.lastName;
  const handleSubmits = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("jobId", id);
    formData.append("applicantId", user?._id);
    formData.append("name", fullName);
    formData.append("emails", user.email);
    formData.append("phone", user.phone);
    formData.append("achievement", achievement);
    formData.append("experience", experience);
    formData.append("education", education);
    formData.append("coverLetter", coverLetter);
    formData.append("pdf", acceptedFiles[0]);
    formData.append("images", user?.image);

    console.log("Send data information", formData);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      if (acceptedFiles.length === 0) {
        throw new Error("Please check your PDF file");
      }

      const res = await jobsApply(formData);
      console.log(res);

      if (
        res?.error?.data?.message === "You have already applied for this job"
      ) {
        throw new Error("You have already applied for this job");
      }

      if (res?.error) {
        throw new Error("An error occurred during job application submission");
      }

      if (res?.data?.message === "Job applied successfully") {
        Swal.fire(
          "Congratulations!",
          "Your application has been successfully submitted",
          "success"
        );
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error occurred",
        text: error.message, // Display the specific error message
      });
    }
  };
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const handleReply = (id) => {
    const data = {
      reply,
      userId: id,
    };
    sendReply(data);
    setReply("");
  };
  const handleQuestion = (data) => {
    const queData = {
      ...data,
      userId: user?._id,
      email: user?.email,
      jobId: id,
    };
    sendQuestions(queData);
    console.log(queData);
    reset();
  };
  return (
    <>
      <PageTitle title={`${jobs?.data?.jobTitle}`} />
      <Header></Header>
      <div className="container">
        <div className="row g-3 g-md-5 g-lg-5">
          <div className="col-12 col-lg-8 py-5 jobsBackground">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {jobs?.data?.jobTitle == "" ? null : (
                  <p className="JobsPostName">{jobs?.data?.jobTitle}</p>
                )}
                {jobs?.data?.companyName == "" ? null : (
                  <p className="JobsCompanyName">{jobs?.data?.companyName}</p>
                )}
              </div>
              <div>
                {jobs?.data?.companyLogo == "" ? null : (
                  <img
                    src={jobs?.data?.companyLogo}
                    width={90}
                    height={90}
                    alt=""
                    className="rounded"
                  />
                )}
              </div>
            </div>
            {jobs?.data?.companyDescription == "" ? null : (
              <div>
                <p className="JobsHead">Company Description</p>
                <p className="JobsViewPara">{jobs?.data?.companyDescription}</p>
              </div>
            )}

            {jobs?.data?.companyDescription == "" ? null : (
              <div>
                <p className="JobsHead">Job Description</p>
                <p className="JobsViewPara">{jobs?.data?.jobDescription}</p>
              </div>
            )}

            {jobs?.data?.jobRequirements == "" ? null : (
              <div>
                <p className="JobsHead">Responsibilities</p>
                {jobs.data?.jobRequirements.length > 0 ? (
                  jobs.data.jobRequirements
                    .slice(0, 3)
                    .map((requirement, index) => (
                      <ul className="JobPostBullet" key={index}>
                        {requirement.split(",").map((item, subIndex) => (
                          <li key={index + "-" + subIndex}>{item.trim()}</li>
                        ))}
                      </ul>
                    ))
                ) : (
                  <p className="text-primary">N/A</p>
                )}
              </div>
            )}

            {jobs?.data?.jobRequirements == "" ? null : (
              <div>
                <p className="JobsHead">Skills</p>

                {jobs.data?.skills.length > 0 ? (
                  jobs.data.skills.slice(0, 3).map((skill, index) => (
                    <ul className="JobPostBullet" key={index}>
                      {skill.split(",").map((item, subIndex) => (
                        <li key={index + "-" + subIndex}>{item.trim()}</li>
                      ))}
                    </ul>
                  ))
                ) : (
                  <p className="text-primary">N/A</p>
                )}
              </div>
            )}

            {jobs?.data?.jobExperience == "" ? null : (
              <div>
                <p className="JobsHead">Experience Requirements</p>
                <ul className="JobPostBullet">
                  <li> {jobs?.data?.jobExperience}</li>
                </ul>
              </div>
            )}

            {jobs?.data?.education == "" ? null : (
              <div>
                <p className="JobsHead">Educational Requirements</p>
                <ul className="JobPostBullet">
                  <li>{jobs?.data?.education}</li>
                </ul>
              </div>
            )}

            {jobs?.data?.jobType == "" ? null : (
              <div>
                <p className="JobsHead">Employment Status</p>
                <ul className="JobPostBullet">
                  <li>{jobs?.data?.jobType}</li>
                </ul>
              </div>
            )}

            {jobs?.data?.location == "" ? null : (
              <div>
                <p className="JobsHead">Job Location</p>
                <ul className="JobPostBullet">
                  <li>{jobs?.data?.location}</li>
                </ul>
              </div>
            )}

            {jobs?.data?.salaryRange == "" ? null : (
              <div>
                <p className="JobsHead">Salary</p>
                <ul className="JobPostBullet">
                  <li>{jobs?.data?.salaryRange}</li>
                </ul>
              </div>
            )}

            {jobs?.data?.compensation == "" ? null : (
              <div>
                <p className="JobsHead">Compensation & Other Benefits</p>
                {jobs.data?.compensation.length > 0 ? (
                  jobs.data.compensation.slice(0, 3).map((skill, index) => (
                    <ul className="JobPostBullet" key={index}>
                      {skill.split(",").map((item, subIndex) => (
                        <li key={index + "-" + subIndex}>{item.trim()}</li>
                      ))}
                    </ul>
                  ))
                ) : (
                  <p className="text-primary">N/A</p>
                )}
              </div>
            )}

            <div className="text-center mt-4">
              {!applied ? (
                <button className="JobPostButton" onClick={handleShow}>
                  Apply Now
                </button>
              ) : (
                <button
                  className="btn btn-warning"
                  disabled
                  onClick={handleShow}
                >
                  Already Applied
                </button>
              )}
            </div>

            <div className="mt-5">
              <h2 className=" mb-4">সাধারণ জিজ্ঞাসা (Q&A)</h2>
              <div className=" my-2">
                {jobsData?.data?.queries?.map(
                  ({ question, email, reply, id }) => (
                    <div key={id}>
                      <small className="text-secondary">{email}</small>
                      <p className="text-lg text-primary font-medium">
                        {question}
                      </p>
                      {reply?.map(
                        (
                          item,
                          index // Use reply instead of user.reply
                        ) => (
                          <p
                            key={index}
                            className="d-flex align-items-center gap-2 position-relative"
                          >
                            <BsArrowReturnRight /> {item}
                          </p>
                        )
                      )}

                      {user?.role === "Recruiter" && (
                        <div className="d-flex gap-3 my-5 align-items-center">
                          <input
                            placeholder="Reply"
                            type="text"
                            className="QNAInput"
                            onBlur={(e) => setReply(e.target.value)}
                          />
                          <button
                            className="QNAbutton"
                            type="button"
                            onClick={() => handleReply(id)}
                          >
                            <BsArrowRightShort className="QNAicon" size={30} />
                          </button>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>

              {user?.role === "User" && (
                <form onSubmit={handleSubmit(handleQuestion)}>
                  <div className="d-flex gap-3 my-5 align-items-center">
                    <input
                      placeholder="এই জবসের ব্যাপারে কোনোকিছু জানতে চাইলে জিজ্ঞাসা করুন "
                      type="text"
                      className="QNAInput"
                      {...register("question")}
                    />
                    <button className="QNAbutton" type="submit">
                      <BsArrowRightShort className="QNAicon" size={30} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="col-12 col-lg-4 py-5 ">
            <p className="mb-4 fs-5 fs-bolder text-center">
              Category: <span className="fs-6">{jobs?.data?.jobCategory}</span>
            </p>
            <div className="justify-content-center JobsSummery">
              <p className="text-center JobsSumHead">Jobs Summery</p>
              <div className="ps-3 pb-2">
                <p className="JobsSumPara">
                  Published on:{" "}
                  <span className="JobsSumText">{jobs?.data?.postedDate}</span>
                </p>
                <p className="JobsSumPara">
                  Vacancy:{" "}
                  <span className="JobsSumText">{jobs?.data?.jobVacancy}</span>
                </p>
                <p className="JobsSumPara">
                  Employment Status:{" "}
                  <span className="JobsSumText">{jobs?.data?.jobType}</span>
                </p>
                <p className="JobsSumPara">
                  Experience:{" "}
                  <span className="JobsSumText">
                    {jobs?.data?.jobExperience} Years
                  </span>{" "}
                </p>
                <p className="JobsSumPara">
                  Gender:{" "}
                  <span className="JobsSumText">{jobs?.data?.gender}</span>
                </p>
                <p className="JobsSumPara">
                  Age: <span className="JobsSumText">{jobs?.data?.age}</span>
                </p>
                <p className="JobsSumPara">
                  Job Location:{" "}
                  <span className="JobsSumText">{jobs?.data?.location}</span>
                </p>
                <p className="JobsSumPara">
                  Salary:{" "}
                  <span className="JobsSumText">{jobs?.data?.salaryRange}</span>
                </p>
                <p className="JobsSumPara">
                  Application Deadline:{" "}
                  <span className="JobsSumText">{jobs?.data?.jobDeadline}</span>
                </p>
              </div>
            </div>
            {!applied ? (
              <p
                className="text-center JobsSumBut mt-3 mb-4"
                onClick={handleShow}
              >
                Apply Now
              </p>
            ) : (
              <p className="text-center JobsSumBut3 mt-3 mb-4">
                Already Applied
              </p>
            )}

            <p className="text-center JobsCopy mt-3 mb-4" onClick={handleClick}>
              {buttonText}
            </p>
            <div className="sharebox">
              <p className="text-center JobsSumBut2 ">Share this Jobpost</p>
              <div className="mx-auto ShareJob">
                <EmailShareButton
                  url={`https://unive.com.bd${location.pathname}`}
                  subject={`Application for ${jobs?.data?.jobTitle}`}
                  body={`Become a ${jobs?.data?.jobTitle} at ${jobs?.data?.companyName}`}
                >
                  <EmailIcon size={32} round />
                </EmailShareButton>
                <LinkedinShareButton
                  url={`https://unive.com.bd${location.pathname}`}
                  title={`Become a ${jobs?.data?.jobTitle} at ${jobs?.data?.companyName}`}
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <FacebookShareButton
                  url={`https://unive.com.bd${location.pathname}`}
                  quote={`Become a ${jobs?.data?.jobTitle} at ${jobs?.data?.companyName}`}
                  hashtag="#Unive"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <WhatsappShareButton
                  url={`https://unive.com.bd${location.pathname}`}
                  title={`Become a ${jobs?.data?.jobTitle} at ${jobs?.data?.companyName}`}
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <FacebookMessengerShareButton
                  url={`https://unive.com.bd${location.pathname}`}
                  quote={`Become a ${jobs?.data?.jobTitle} at ${jobs?.data?.companyName}`}
                  hashtag="#Unive"
                >
                  <FacebookMessengerIcon size={32} round />
                </FacebookMessengerShareButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        scrollable={true}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fs-5 baloo">
            Apply for {jobs?.data?.jobTitle} at {jobs?.data?.companyName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="contact-form row p-2" onSubmit={handleSubmits}>
            <div className="form-field col-lg-6">
              <input
                name="name"
                className="input-text js-input"
                type="text"
                value={fullName}
              />
              <label className="label" htmlFor="name">
                Name <span className="text-danger">*</span>
              </label>
            </div>
            <div className="form-field col-lg-6 ">
              <input
                name="email"
                className="input-text js-input"
                type="email"
                value={user?.email}
                readOnly
              />
              <label className="label" htmlFor="email">
                E-mail <span className="text-danger">*</span>
              </label>
            </div>
            <div className="form-field col-lg-6 ">
              <input
                name="achievement"
                className="input-text js-input"
                type="text"
                onChange={handleAchievement}
              />
              <label className="label" htmlFor="company">
                Relevant Achivements / Certification (if any)
              </label>
            </div>
            <div className="form-field col-lg-6 ">
              <PhoneInput
                inputProps={{
                  name: "phone",
                  value: `${user?.phone}`,
                  autoFocus: false,
                  readOnly: true,
                }}
                country={"bd"}
                masks={{ bd: ".. ... ... .." }}
              />
              <label className="label" htmlFor="phone">
                Contact Number <span className="text-danger">*</span>
              </label>
            </div>
            <div className="form-field col-lg-6 ">
              <input
                name="experience"
                className="input-text js-input"
                type="text"
                onChange={handleExperienceChange}
              />
              <label className="label" htmlFor="company">
                Relevant Experience (if any)
              </label>
            </div>
            <div className="form-field col-lg-6 ">
              <input
                name="education"
                className="input-text js-input"
                type="text"
                onChange={handleEducationChange}
              />
              <label className="label" htmlFor="company">
                Latest Education <span className="text-danger">*</span>
              </label>
            </div>
            <div className="form-field col-lg-12">
              <input
                name="coverLetter"
                className="input-text js-input"
                type="text"
                onChange={handleCoverLetterChange}
              />
              <label className="label" htmlFor="message">
                Cover letter
              </label>
            </div>
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />
              <p className="text-dark text-center mt-2 my-auto baloo">
                Drag your resume here, or{"  "}
                <span className="text-primary">click</span> to select resume
              </p>
              <ul>{acceptedFileItems}</ul>
              <ul>{fileRejectionItems}</ul>
            </div>
            <div className="form-field col-lg-12">
              <div className="text-center">
                <input
                  className="submit-btn text-center"
                  type="submit"
                  value="Submit"
                />
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Footer></Footer>
    </>
  );
}

export default JobsViews;
