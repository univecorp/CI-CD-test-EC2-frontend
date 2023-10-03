import React, { useEffect, useState } from "react";

import axios from "axios";
import { Modal } from "react-bootstrap";
import config from "../../../config/apiConfig";

export default function InstructorReplyCourseDiscussion({
  replyId,
  discussionId,
  userEmail,
}) {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formResponse = await axios.get(
          `${config.apiUrl}/course-discussion-reply/${replyId}`
        );
        const formData = formResponse.data.data;
        console.log(formData, "formdata");
        const replyResponse = await axios.get(
          `${config.apiUrl}/course-discussion/${discussionId}`
        );
        const replyData = replyResponse.data.data;

        const mergedData = mergeData(formData, replyData);
        setData(mergedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [replyId, discussionId]);

  const mergeData = (formData, replyData) => {
    if (!Array.isArray(formData)) {
      return [
        {
          ...formData,
          answer: replyData?.answer || null,
          query: replyData?.query || null,
          replyCreatedAt: replyData.createdAt || null,
        },
      ];
    }

    return formData.map((form, index) => {
      const reply = replyData[index];

      console.log("rep", reply);
      return {
        ...form,
        answer: replyData?.answer || null,
        query: replyData?.query || null,

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
      <h1 className="instructor-header">ইন্সট্রাক্টর থেকে রিপ্লাই</h1>

      <div className="table-responsive">
        <table id="table" className="table table-striped mt-4 mb-4 ">
          <thead>
            {/* <th scope="col">Ticket Number</th> */}
            <th scope="col">আপনার প্রশ্ন </th>
            <th scope="col">ইন্সট্রাক্টরের উত্তর </th>

            <th scope="col">রিপ্লাই টাইম </th>
          </thead>
          <tbody>
            {data?.map((reply) => (
              <tr key={reply._id}>
                <td className="td-mod-sc" onClick={() => openModal(reply)}>
                  {reply.query}
                </td>
                <td className="td-mod-sc" onClick={() => openModal(reply)}>
                  Got it
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
}
