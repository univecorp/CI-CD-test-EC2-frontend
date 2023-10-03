import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import config from "../../../config/apiConfig";

const AdminReplyHelpAndSupport = ({ formId, helpId }) => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formResponse = await axios.get(`${config.apiUrl}/form/${formId}`);
        const formData = formResponse.data.data;

        const replyResponse = await axios.get(
          `${config.apiUrl}/help-and-support-reply/${helpId}`
        );
        const replyData = replyResponse.data.data;

        const mergedData = mergeData(formData, replyData);
        setData(mergedData);

        console.log("mdata", mergedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [formId, helpId]);

  const mergeData = (formData, replyData) => {
    if (!Array.isArray(formData)) {
      // Handle the case when formData is an object
      return [
        {
          ...formData,
          answer: replyData.answer || null,
          adminName: replyData.name || null,
          replyCreatedAt: replyData.createdAt || null,
        },
      ];
    }

    return formData.map((form, index) => {
      const reply = replyData[index];

      console.log(reply);
      return {
        ...form,
        answer: reply ? reply.answer : null,
        adminName: reply ? reply.name : null,
        replyCreatedAt: reply ? reply.createdAt : null,
      };
    });
  };

  const openModal = (data) => {
    setSelectedData(data);
  };

  const closeModal = () => {
    setSelectedData(null);
  };
  return (
    <div className="container-fluid px-4">
      <h1 className="instructor-header">টিকেটের বিস্তারিত</h1>

      <div className="table-responsive w-100">
        <table id="table" className="table table-striped mt-4 mb-4 ">
          <thead>
            <tr>
              {/* <th scope="col">Admin Name</th>
              <th scope="col">User Name</th> */}
              <th scope="col">Ticket Number</th>
              <th scope="col">Question</th>
              <th scope="col">Answer</th>

              <th scope="col">Reply Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((reply) => (
              <tr key={reply._id}>
                {/* <td>{reply.adminName}</td>
                <td>{reply.userName || reply.email}</td> */}
                <td className="td-mod-sc" onClick={() => openModal(reply)}>
                  {reply.ticketNumber}
                </td>
                <td className="td-mod-sc" onClick={() => openModal(reply)}>
                  {reply.query}
                </td>
                <td className="td-mod-sc" onClick={() => openModal(reply)}>
                  {reply.answer}
                </td>

                <td className="td-mod-sc" onClick={() => openModal(reply)}>
                  {new Date(reply.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={selectedData !== null} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title className="mod-title">
            টিকেটের বিস্তারিত তথ্য
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedData && (
            <>
              <p className="p-label">
                <label htmlFor="" className="mod-label">
                  {" "}
                  আপনার টিকেট নাম্বার :
                </label>{" "}
                {selectedData.ticketNumber}
              </p>
              <p className="p-label">
                {" "}
                <label className="mod-label"> আপনার কুয়েরি :</label>{" "}
                {selectedData.query}
              </p>
              <p className="p-label">
                {" "}
                <label className="mod-label"> আপনার এনসার :</label>{" "}
                {selectedData.answer}
              </p>

              <p className="p-label">
                {" "}
                <label className="mod-label"> রিপ্লাই টাইম :</label>{" "}
                {new Date(selectedData.createdAt).toLocaleString()}
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
};

export default AdminReplyHelpAndSupport;
