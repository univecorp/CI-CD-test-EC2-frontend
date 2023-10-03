import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import config from "../../../config/apiConfig";
import HelpAndSupportReply from "./HelpAndSupportReply";
import "./InstructorManagement.css";
import { useSelector } from "react-redux";

export default function HelpAndSupport({ role }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  if (role !== user?.role) {
    navigate("/page-not-found");
  }
  // const { data, isLoading, isError, error } = useGetdiscussionFormQuery();
  const [querydata, setQueryData] = useState([]);
  const [emailData, setEmailData] = useState(null);
  const [activeStatusMap, setActiveStatusMap] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/form`);

      const sortedData = response?.data?.data.sort((a, b) => {
        if (a.resolvedStatus === "active" && b.resolvedStatus !== "active") {
          return -1; // 'a' comes first if it has active resolved status
        } else if (
          a.resolvedStatus !== "active" &&
          b.resolvedStatus === "active"
        ) {
          return 1; // 'b' comes first if it has active resolved status
        } else {
          // Sort by createdAt date in descending order
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });
      setQueryData(sortedData);
      fetchBrowseResolvedStatus(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBrowseResolvedStatus = async (data) => {
    try {
      const sortedData = data.sort((a, b) => {
        if (a.resolvedStatus === "active" && b.resolvedStatus !== "active") {
          return -1; // 'a' comes first if it has active resolved status
        } else if (
          a.resolvedStatus !== "active" &&
          b.resolvedStatus === "active"
        ) {
          return 1; // 'b' comes first if it has active resolved status
        } else {
          // Sort by createdAt date in descending order
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
      });

      const browseActiveStatusMap = {};
      sortedData.forEach((user) => {
        browseActiveStatusMap[user._id] = user.resolvedStatus;
      });
      setActiveStatusMap(browseActiveStatusMap);
    } catch (error) {
      console.error("Error fetching resolved status:", error);
    }
  };

  const handleToggle = async (Id, newStatus) => {
    try {
      await axios.post(`${config.apiUrl}/form/updateResolvedStatus`, {
        Id,
        resolvedStatus: newStatus,
      });
      setActiveStatusMap((prevStatusMap) => ({
        ...prevStatusMap,
        [Id]: newStatus,
      }));
      fetchData();
    } catch (error) {
      console.error("Error updating browseActive status:", error);
    }
  };
  const handleClick = (email) => {
    console.log("data", email);
    setEmailData(email);

    // <HelpAndSupportReply email={emailData}></HelpAndSupportReply>;
  };
  return (
    <div className="container-fluid px-4">
      <h1 className="instructor-header">Help and Support</h1>
      <div className="table-responsive">
        <table
          id="table"
          className="table table-striped mt-4 mb-4"
          style={{
            borderCollapse: "separate",
            borderSpacing: "0 20px",
          }}
        >
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Query</th>
              <th scope="col">Ticket Number</th>
              <th scope="col">Time</th>
              <th scope="col">Reply</th>
              <th scope="col">Status</th>
              {/* <th scope="col">Archived</th> */}
            </tr>
          </thead>
          <tbody>
            {querydata?.map((q) => {
              return (
                <tr
                  key={q._id}
                  style={{
                    backgroundColor:
                      activeStatusMap[q._id] === "active"
                        ? "#E9F6F4"
                        : "transparent",

                    padding: "20px",
                    borderRadius: "10px",

                    boxShadow: "10px 8px 11px -6px rgba(0, 0, 0, 0.41)",
                    WebkitBoxShadow: "10px 8px 11px -6px rgba(0, 0, 0, 0.41)",
                    MozBoxShadow: "10px 8px 11px -6px rgba(0, 0, 0, 0.41)",
                  }}
                >
                  <td>{q.email}</td>
                  <td>{q.query}</td>
                  <td>{q.ticketNumber}</td>
                  <td> {new Date(q.createdAt).toLocaleDateString()}</td>

                  <td>
                    <NavLink to="/Dashboard/help-and-support/reply">
                      <button
                        className="btn btn-info"
                        onClick={() => handleClick(q.email)}
                      >
                        Reply
                      </button>
                    </NavLink>
                    {emailData && <HelpAndSupportReply email={q.email} />}
                  </td>

                  <td>
                    <select
                      className="form-select"
                      value={activeStatusMap[q._id] || ""}
                      onChange={(e) => handleToggle(q._id, e.target.value)}
                      style={{
                        color:
                          activeStatusMap[q._id] === "active"
                            ? "#B31312"
                            : "#17594A",
                        border:
                          activeStatusMap[q._id] === "active"
                            ? "1px solid #B31312"
                            : "1px solid #17594A",
                        fontWeight: "800",
                      }}
                    >
                      <option value="active" style={{ color: "#B31312" }}>
                        Active
                      </option>
                      <option value="resolved" style={{ color: "#17594A" }}>
                        Resolved
                      </option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
