import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { Card } from "react-bootstrap";
import { Step, Stepper } from "react-form-stepper";
import { FaTrashAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../../config/apiConfig";
import PageTitle from "../../Common/PageTitle";
import { useGetAppliedJobsQuery } from "../../redux/rtk/features/Jobs/jobApi";
import {
  useDeleteBookmarksMutation,
  useGetBookmarksByIdQuery,
} from "../../redux/rtk/features/bookmarks/bookmarkApi";
import "./userProfileinfo.css";
function UserApplication() {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetAppliedJobsQuery(user?.email);
  const jobs = data?.data;
  const userId = user?._id;

  const [deleteBookmarks] = useDeleteBookmarksMutation();
  const ConnectorStyleProps = {
    activeColor: "#bdbdbd",
  };

  const { data: bookmarkedJobs, isLoading: isload } =
    useGetBookmarksByIdQuery(userId);

  const handleRemoveBookmark = async (jobId, userId) => {
    try {
      await deleteBookmarks({ jobId, userId }).unwrap();
      toast.success("Bookmark deleted successfully", { autoClose: 1800 });
    } catch (error) {
      console.error("Error deleting bookmark:", error);
      toast.error("Error deleting bookmark", { autoClose: 1800 });
    }
  };

  axios
    .get(`${config.apiUrl}/jobs`)
    .then((response) => {
      // Handle the response data
      const { totalPages, currentPage, results } = response.data;
      console.log("Total Pages:", totalPages);
      console.log("Current Page:", currentPage);
      console.log("Results:", results);
    })
    .catch((error) => {
      // Handle the error
      console.error("Error:", error.message);
    });
  const navigate = useNavigate();
  const handleViewJobs = (id) => {
    navigate(`/jobsView/${id}`);
  };
  return (
    <div className="container-fluid DashRight">
      <PageTitle title="আমার জবসমূহ" />
      <p className="DashProfileHead">আমার জবসমূহ</p>
      <div className="container-fluid px-0 py-2">
        <div className="row g-4">
          {jobs?.length > 0 && (
            <div className=" d-flex justify-content-around profileSmallPara">
              <p className="marleft">কোম্পানির নাম</p>
              <p className="marleft">জবের পজিশন</p>
              <p className="marleft">জবের স্ট্যাটাস</p>
            </div>
          )}
          {jobs?.length > 0 ? (
            jobs.map((job, index) => (
              <div className="col-12" key={index}>
                <Card className="shadow-sm py-2">
                  <div className="row justify-content-around align-items-center">
                    <div className="col-12 col-lg-4 mx-auto">
                      <div className="d-flex align-items-center ps-3">
                        <div>
                          <img
                            src={job?.jobId?.companyLogo}
                            alt=""
                            className="courseImage"
                          />
                        </div>
                        <div className="ps-3">
                          <p className="DashcourseName">
                            {job?.jobId?.companyName}
                          </p>
                          <p className="DashcourseTime">
                            {formatDistanceToNow(new Date(job?.updatedAt), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={() => handleViewJobs(job?.jobId?._id)}
                          className="ButtonSave ms-3 mt-3"
                        >
                          View job
                        </button>
                      </div>
                    </div>
                    <div className="col-12 col-lg-3 DashBlueJob ps-4">
                      <p>{job?.jobId?.jobTitle}</p>
                    </div>
                    {job?.steps && job?.steps == 5 ? (
                      <div className="col-12 col-lg-5">
                        <p className="text-center text-danger mt-2">
                          দুঃখিত! আপনার আবেদনটি সিলেক্টেড হয়নি।
                        </p>
                      </div>
                    ) : job?.steps && job?.steps == 4 ? (
                      <div className="col-12 col-lg-5">
                        <p className="text-center text-success mt-2">
                          🎉 অভিনন্দন! আপনি জবটির জন্য সিলেক্টেড।
                        </p>
                      </div>
                    ) : (
                      <div className="col-12 col-lg-5">
                        <div className="smstep">
                          <Stepper
                            activeStep={job?.steps}
                            connectorStyleConfig={ConnectorStyleProps}
                          >
                            <Step label="অ্যাপ্লাইড" />
                            <Step label="ইন রিভিউ" />
                            <Step label="রিটেন টেস্ট" />
                            <Step label="ইন্টারভিউ" />
                            <Step label="সিলেক্টেড" />
                          </Stepper>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    {job?.testLink && job?.steps !== 4 && (
                      <p className="jobdatas ms-3">
                        Written Test:
                        <a
                          className="jobspan"
                          href={
                            job?.testLink.startsWith("http")
                              ? job?.testLink
                              : `https://${job?.testLink}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {job?.testLink}
                        </a>
                      </p>
                    )}
                    {job?.interviewData && job?.steps !== 4 && (
                      <div className="me-5">
                        <p className="m-0 jobdatas">
                          Link:{" "}
                          <a
                            className="jobspan"
                            href={
                              job?.interviewData?.interviewLink.startsWith(
                                "http"
                              )
                                ? job?.interviewData?.interviewLink
                                : `https://${job?.interviewData?.interviewLink}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {job?.interviewData?.interviewLink}
                          </a>
                        </p>
                        <p className="jobdatas">
                          Date:{" "}
                          <span className="jobspan">
                            {job?.interviewData?.interviewTime}
                          </span>
                        </p>
                        <p className="jobdatas">
                          Message:{" "}
                          <span className="jobspan">
                            {job?.interviewData?.message}
                          </span>{" "}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            ))
          ) : (
            <h3 className="text-center my-5 fw-semibold">
              আপনি কোনো জবসে এপলাই করেননি
            </h3>
          )}
        </div>
        <p className="profileSmallPara mt-5">বুকমার্কড জবস</p>

        <div className="container px-0 my-5">
          <div className="row g-4">
            {!isload &&
              bookmarkedJobs.map((job) => (
                <div
                  className="col-12 col-md-6 col-lg-4"
                  key={bookmarkedJobs._id}
                >
                  <div className="DashJobBorder">
                    <div className="d-flex align-items-center">
                      <img
                        src={job?.companyLogo}
                        alt=""
                        className="courseImage"
                      />
                      <div className="ps-3">
                        <p className="DashcourseName">{job?.companyName}</p>
                        <p className="DashcourseTime">
                          {formatDistanceToNow(new Date(job?.updatedAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>
                    <p className="DashBlueJob">{job?.jobTitle}</p>
                    <div>
                      {job?.skills.map((skill, index) => (
                        <span className="DashjobBadge" key={index}>
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="DashcourseTime mt-3">
                      অভিজ্ঞতা :{" "}
                      <span className="DashJobSmallText">
                        {job?.jobExperience} বছর
                      </span>
                    </p>
                    <p className="DashcourseTime mt-1">
                      বেতন :
                      <span className="DashJobSmallText">
                        {job?.salaryRange}
                      </span>
                    </p>
                    <p className="DashcourseTime mt-1">
                      <IoLocation className="joblocationIcon" /> {job?.location}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mb-2  ">
                      <NavLink to={`/jobsView/${job._id}`}>
                        <button className="DashjobButton2">
                          অ্যাপ্লাই করুন
                        </button>
                      </NavLink>
                      <FaTrashAlt
                        className="jobTrashIcon"
                        onClick={() => handleRemoveBookmark(job?._id, userId)}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserApplication;
