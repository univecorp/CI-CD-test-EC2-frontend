import axios from "axios";
import { format } from "date-fns";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import config from "../../../config/apiConfig";
import { useGetRecruiterJobsQuery } from "../../redux/rtk/features/Jobs/jobApi";
import "./Recruiter.css";
import Loader from "../../Loader/Loader";

function RecruiterJobs({ role }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!role.includes(user?.role)) {
    navigate("/page-not-found");
  }

  const [currentFilter, setCurrentFilter] = useState("all");
  const { data, isLoading, isError, refetch } = useGetRecruiterJobsQuery(
    user?.email
  );
  const recruiterJobs = data?.data || [];

  if (isLoading) {
    <div>
      <Loader />
    </div>;
  }

  if (isError) {
    return <p>Error occurred while fetching jobs.</p>;
  }

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  // Filter the jobs based on the currentFilter value
  const filteredJobs =
    currentFilter === "archived"
      ? recruiterJobs.filter((job) => job.archived)
      : recruiterJobs.filter((job) => !job.archived);
  console.log(recruiterJobs.filter((job) => !job.archived));
  const handleEditJobs = (jobId) => {
    console.log(jobId);
    navigate(`/Dashboard/EditJobs/${jobId}`);
  };

  const handleView = (jobId) => {
    navigate(`/Dashboard/view-applicants/${jobId}`);
  };

  const handleViewJobs = (id) => {
    navigate(`/jobsView/${id}`);
  };

  const archiveJobs = async (jobId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, archive it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.patch(
          `${config.apiUrl}/jobs/archive/${jobId}`
        );
        console.log("isArchive", response);
        if (response.status === 200) {
          refetch();
          Swal.fire("Archived!", "The job has been archived.", "success");
        } else {
          Swal.fire("Error", "Failed to archive the job.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Failed to archive the job.", "error");
      }
    }
  };

  return (
    <div className="container">
      <h2 className="DashtextPara my-4">আপনার পোস্টকৃত জবসমূহ </h2>
      <button
        className={`btn btn-primary ${currentFilter === "all" ? "active" : ""}`}
        onClick={() => handleFilterChange("all")}
      >
        সব জবস
      </button>
      <button
        className={`btn btn-primary mx-3 ${
          currentFilter === "archived" ? "active" : ""
        }`}
        onClick={() => handleFilterChange("archived")}
      >
        আর্কাইভ জবস
      </button>
      <div className="row">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job?._id} className="col-12 my-3">
              <div className="card shadow-md jobsHover">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div>
                      <img
                        src={job?.companyLogo}
                        alt=""
                        style={{
                          width: "100px",
                          height: "100px",
                        }}
                        className="courseImage"
                      />
                    </div>
                    <div className="ps-3">
                      <h5 className="jobstitles">{job?.jobTitle}</h5>
                      <p className="jobdatas">
                        Posted:
                        <span className="jobspan">
                          {format(new Date(job?.createdAt), "MMM-dd-yyyy")}
                        </span>
                      </p>
                      <p className="jobdatas">
                        Deadline:{" "}
                        <span className="jobspan">
                          {format(new Date(job?.jobDeadline), "MMM-dd-yyyy")}
                        </span>
                      </p>
                      <p className="jobdatas">
                        Job Status:
                        {new Date(job?.jobDeadline) < new Date() ? (
                          <span className="text-danger jobspan">Expired</span>
                        ) : (
                          <span className="text-success jobspan">Active</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="jobsParas ">Applicants:</p>
                    <p className="text-center jobsbolds">
                      {job?.jobApply?.length}
                    </p>
                  </div>

                  <div>
                    <p className="jobsParas">View Status</p>
                    <p className="text-center jobsbolds">
                      0/{job?.jobApply?.length}
                    </p>
                  </div>
                  <div className="btn-group-vertical">
                    <button
                      className="btnsmall"
                      onClick={() => handleView(job?._id)}
                    >
                      Applicants List
                    </button>
                    <button
                      className="btnsmall btnblue"
                      onClick={() => handleEditJobs(job?._id)}
                    >
                      Edit Job
                    </button>
                    <button
                      className="btnsmall btngreen"
                      onClick={() => handleViewJobs(job?._id)}
                    >
                      View Post
                    </button>
                    <button
                      className="btnsmall btnred"
                      onClick={() => archiveJobs(job?._id)}
                    >
                      Archive Job
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>You have no jobs.</p>
        )}
      </div>
    </div>
  );
}

export default RecruiterJobs;
