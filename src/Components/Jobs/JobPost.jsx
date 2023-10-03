import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import { ImLocation2 } from "react-icons/im";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import img2 from "../Jobs/JobBrowsing/bookmark (1).png";
import img1 from "../Jobs/JobBrowsing/bookmark.png";
import "../Jobs/JobBrowsing/jobscard.css";
import {
  useDeleteBookmarksMutation,
  usePostBookmarksMutation,
} from "../redux/rtk/features/bookmarks/bookmarkApi";

export default function JobPost({ job }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;
  const [deleteBookmarks] = useDeleteBookmarksMutation();

  useEffect(() => {
    setIsBookmarked(job?.bookmarked || false);
  }, [job?.bookmarked]);

  const [postBookmarks, { isLoading: isPosting, isError: postError }] =
    usePostBookmarksMutation();

  const handleBookmark = (id) => {
    postBookmarks({ jobId: id, userId })
      .unwrap()
      .then((response) => {
        toast.success("Bookmark added successfully", { autoClose: 1500 });
        setIsBookmarked(true); // Update the bookmark status
      })
      .catch((error) => {
        toast.success("Error addeding bookmark", { autoClose: 1500 });
        console.error("Error adding bookmark:", error);
      });
  };

  const handleRemoveBookmark = (jobId, userId) => {
    deleteBookmarks({ jobId, userId })
      .unwrap()
      .then((response) => {
        toast.success("Bookmark deleted successfully", { autoClose: 1500 });
        setIsBookmarked(false); // Update the bookmark status
      })
      .catch((error) => {
        console.error("Error deleting bookmark:", error);
        toast.error("Error deleting bookmark", { autoClose: 1500 });
      });
  };

  return (
    <div className="col-sm-12 col-md-6 col-lg-4  mb-4">
      <div className="card jobscard">
        {isBookmarked ? (
          <img
            src={img2}
            style={{ width: "25px" }}
            className="jobsBookmarks"
            onClick={() => handleRemoveBookmark(job?._id, userId)}
          />
        ) : (
          <img
            src={img1}
            style={{ width: "25px" }}
            className="jobsBookmarks"
            onClick={() => handleBookmark(job?._id)}
          />
        )}
        <div className="d-flex align-items-center">
          <img
            src={
              job.companyLogo
                ? job.companyLogo
                : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"
            }
            alt="Company"
            className="jobsCardImg img-fluid"
          />
          <div>
            <p className="JobsCardName">{job.companyName}</p>
            <span className="JobsCardSmall">
              {formatDistanceToNow(new Date(job?.updatedAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
        <div className="mt-3 d-flex align-items-center justify-content-between">
          <div>
            <p className="JobsdName ms-1">{job.jobTitle}</p>
            <p className="JobsCardSmall mt-1">
              <ImLocation2 className="mb-1" style={{ color: "#d9381e" }} />
              {job.location}
            </p>
          </div>
          <div className="mt-3 right-align">
            <p className="JobsCardSmBold">{job.jobExperience}</p>
            <p className="JobsCardSmall">Experience</p>
          </div>
        </div>

        {/* <p className="JobsCardPara">{job.jd.slice(0, 80) + "...."}</p> */}

        <div className="d-flex align-items-center justify-content-between mt-3">
          <div style={{ width: "60%" }}>
            {job?.skills && job.skills.length > 0
              ? job.skills.slice(0, 3).flatMap((skill, index) =>
                  skill.split(",").map((name, subIndex) => (
                    <span
                      key={index + "-" + subIndex}
                      className="badge jobsBadge1 mb-1"
                    >
                      {name.trim()}
                    </span>
                  ))
                )
              : null}

            {/* {job.skills &&
              job.skills.slice(0, 3).map((skill, index) => (
                <span key={index} className="badge jobsBadge1 mb-1">
                  {skill}
                </span>
              ))} */}
          </div>
          <div className="right-align">
            <p className="JobsCardSmBold">৳ {job.salaryRange}</p>
            <p className="JobsCardSmall">Salary Range</p>
          </div>
        </div>

        <div className="text-center jobsButtonPosi">
          <hr className="w-75 fw-bold mx-auto  h-border" />
          <NavLink to={`/jobsView/${job._id}`}>
            <button className="view-btns">View Details</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
