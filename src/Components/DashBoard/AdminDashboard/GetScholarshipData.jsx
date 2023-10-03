import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import config from "../../../config/apiConfig";
import "./GetScholarshipData.css";
import "./InstructorManagement.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function GetScholarshipData({ role }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  if (role !== user?.role) {
    navigate("/page-not-found");
  }
  const [scholarshipdata, setScholarshipData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [activeStatusMap, setActiveStatusMap] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  // const token = localStorage.getItem("token");
  // const tokenWithoutQuotes = token.replace(/^"(.*)"$/, "$1");

  const fetchData = async () => {
    try {
      // const config = {
      //   headers: {
      //     authorization: `${tokenWithoutQuotes}`,
      //   },
      // };

      const response = await axios.get(`${config.apiUrl}/scholarship`);
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
      setScholarshipData(sortedData);
      fetchBrowseResolvedStatus(sortedData);
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
      await axios.post(`${config.apiUrl}/scholarship/updateResolvedStatus`, {
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
      <h1 className="instructor-header">Scholarship Data</h1>

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
              <th scope="col">আপনার পুরো নাম</th>
              <th scope="col">ইমেইল অ্যাড্রেস</th>
              <th scope="col">ফোন নাম্বার</th>
              <th scope="col">শিক্ষাগত যোগ্যতা</th>
              <th scope="col">কি শিখতে চান?</th>
              <th scope="col">আপনার ক্যারিয়ারে কি কাজে লাগবে?</th>
              <th scope="col">আপনার কি জন্য স্কলারশিপ দরকার?</th>
              <th scope="col">সময়</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {scholarshipdata?.map((s) => {
              return (
                <tr
                  key={s._id}
                  style={{
                    backgroundColor:
                      activeStatusMap[s._id] === "active"
                        ? "#E9F6F4"
                        : "transparent",
                    boxShadow: "10px 8px 11px -6px rgba(0, 0, 0, 0.41)",
                    WebkitBoxShadow: "10px 8px 11px -6px rgba(0, 0, 0, 0.41)",
                    MozBoxShadow: "10px 8px 11px -6px rgba(0, 0, 0, 0.41)",
                  }}
                >
                  <td className="td-mod-sc" onClick={() => openModal(s)}>
                    {s.fullName}
                  </td>
                  <td className="td-mod-sc" onClick={() => openModal(s)}>
                    {s.email}
                  </td>
                  <td className="td-mod-sc" onClick={() => openModal(s)}>
                    {s.phone}
                  </td>
                  <td className="td-mod-sc" onClick={() => openModal(s)}>
                    {s.highestEducation}
                  </td>
                  <td className="td-mod-sc" onClick={() => openModal(s)}>
                    {s.whatLearnFromUnive.slice(0, 10)}
                  </td>
                  <td className="td-mod-sc" onClick={() => openModal(s)}>
                    {s.careerBenefit.slice(0, 10)}
                  </td>
                  <td className="td-mod-sc" onClick={() => openModal(s)}>
                    {s.whyNeedScholarship.slice(0, 10)}
                  </td>
                  <td className="td-mod-sc" onClick={() => openModal(s)}>
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <select
                      className="form-select w-100"
                      value={activeStatusMap[s._id] || ""}
                      onChange={(e) => handleToggle(s._id, e.target.value)}
                      style={{
                        color:
                          activeStatusMap[s._id] === "active"
                            ? "#B31312"
                            : "#17594A",
                        border:
                          activeStatusMap[s._id] === "active"
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

      <Modal show={selectedData !== null} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title className="mod-title">
            স্কলারশিপ এর বিস্তারিত তথ্য!!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedData && (
            <>
              <p className="p-label">
                <label htmlFor="" className="mod-label">
                  আপনার পুরা নাম :
                </label>{" "}
                {selectedData.fullName}
              </p>

              <p className="p-label">
                {" "}
                <label className="mod-label"> ইমেইল :</label>{" "}
                {selectedData.email}
              </p>

              <p className="p-label">
                {" "}
                <label className="mod-label"> ফোন নম্বর :</label>{" "}
                {selectedData.phone}
              </p>

              <p className="p-label">
                <label htmlFor="" className="mod-label">
                  {" "}
                  শিক্ষাগত যোগ্যতা :
                </label>{" "}
                {selectedData.highestEducation}
              </p>

              <p className="p-label">
                <label htmlFor="" className="mod-label">
                  আপনি উনিভ থেকে কি শিখতে চান :
                </label>{" "}
                {selectedData.whatLearnFromUnive}
              </p>

              <p className="p-label">
                <label htmlFor="" className="mod-label">
                  ক্যারিয়ার এ প্রয়োজনীয়তা :
                </label>{" "}
                {selectedData.careerBenefit}
              </p>

              <p className="p-label">
                <label htmlFor="" className="mod-label">
                  {" "}
                  কেন দরকার :
                </label>{" "}
                {selectedData.whyNeedScholarship}
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
