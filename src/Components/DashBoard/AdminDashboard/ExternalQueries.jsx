import { useEffect, useState } from "react";
import "./InstructorManagement.css";

import axios from "axios";
import { Modal } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import config from "../../../config/apiConfig";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
export default function ExternalQueries({ role }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  if (role !== user?.role) {
    navigate("/page-not-found");
  }
  const [querydata, setQueryData] = useState([]);
  const [activeStatusMap, setActiveStatusMap] = useState({});
  const [selectedData, setSelectedData] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/footerpages`);

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
      const browseActiveStatusMap = {};
      data.forEach((user) => {
        browseActiveStatusMap[user._id] = user.resolvedStatus;
      });
      setActiveStatusMap(browseActiveStatusMap);
    } catch (error) {
      console.error("Error fetching resolved status:", error);
    }
  };

  const handleToggle = async (Id, newStatus) => {
    try {
      await axios.post(`${config.apiUrl}/footerpages/updateResolvedStatus`, {
        Id,
        resolvedStatus: newStatus,
      });
      // Update the resolved status in the local state
      setActiveStatusMap((prevStatusMap) => ({
        ...prevStatusMap,
        [Id]: newStatus,
      }));

      // Re-fetch the sorted data
      fetchData();
    } catch (error) {
      console.error("Error updating browseActive status:", error);
    }
  };
  const openModal = (data) => {
    setSelectedData(data);
  };

  const closeModal = () => {
    setSelectedData(null);
  };
  return (
    <div className="container-fluid px-4">
      <h1 className="instructor-header">External Queries</h1>

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
              <th scope="col">Time</th>
              <th scope="col">Card Names</th>
              <th scope="col">Page Name</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Queries</th>

              <th scope="col">Reply</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {querydata?.map((q) => {
              return (
                <tr
                  key={q._id}
                  className="card-tr curs"
                  style={{
                    backgroundColor:
                      activeStatusMap[q._id] === "active"
                        ? "#E9F6F4"
                        : "transparent",

                    padding: "20px",

                    boxShadow: "10px 8px 11px -6px rgba(0, 0, 0, 0.41)",
                    WebkitBoxShadow: "10px 8px 11px -6px rgba(0, 0, 0, 0.41)",
                    MozBoxShadow: "10px 8px 11px -6px rgba(0, 0, 0, 0.41)",
                  }}
                >
                  <td className="td-mod-sc" onClick={() => openModal(q)}>
                    {new Date(q.createdAt).toLocaleString()}
                  </td>
                  <td className="td-mod-sc" onClick={() => openModal(q)}>
                    {q.cardNames}
                  </td>
                  <td className="td-mod-sc" onClick={() => openModal(q)}>
                    {q.pageNames}
                  </td>
                  <td className="td-mod-sc" onClick={() => openModal(q)}>
                    {q.name}
                  </td>
                  <td className="td-mod-sc" onClick={() => openModal(q)}>
                    {q.email}
                  </td>
                  <td className="td-mod-sc" onClick={() => openModal(q)}>
                    {q.phoneNumber}
                  </td>

                  <td className="td-mod-sc" onClick={() => openModal(q)}>
                    {q.queries}
                  </td>

                  <td>
                    <NavLink to="/Dashboard/external-queries/reply">
                      <button className="btn btn-info">Reply</button>
                    </NavLink>
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
                            : "1px solid #1f38bb",
                        fontWeight: "800",
                      }}
                    >
                      <option
                        value="active"
                        style={{ color: "#B31312", fontWeight: "600" }}
                      >
                        Active
                      </option>
                      <option
                        value="resolved"
                        style={{ color: "#17594A", fontWeight: "600" }}
                      >
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

      <Modal show={selectedData !== null} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title className="mod-title">External Queries</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedData && (
            <>
              <p className="p-label">
                {" "}
                <label className="mod-label"> আপনার কুয়েরি :</label>{" "}
                {selectedData?.queries
                  ? selectedData?.queries
                  : "No queries here"}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary mod-btn" onClick={closeModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
