import axios from "axios";
import { useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import config from "../../../../config/apiConfig";
import "./demo.css";
export default function Demo() {
  //    modal display function and state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //    modal2 display function and state
  const [showT, setShowT] = useState(false);
  const handleCloseT = () => setShowT(false);
  const handleShowT = () => {
    handleClose();
    setShowT(true);
  };
  // local state
  const [data, setData] = useState({});
  // form input field changes handle
  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newUser = { ...data };
    newUser[field] = value;
    setData(newUser);
    console.log(newUser);
  };
  // submition function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    axios
      .post(`${config.apiUrl}/demo`, data)
      .then((res) => (res.data ? handleShowT() : ""));
  };
  return (
    <Container className="my-5 w-75">
      <Row className="my-5 demo">
        <Col xs={12} md={6}>
          <img
            className="img-fluid"
            src="https://thumbs.dreamstime.com/b/solution-loading-vector-illustration-concepts-problem-solving-progress-doodle-121718155.jpg"
            alt=""
          />
        </Col>
        <Col xs={12} md={6} className="text-start mt-5 mx-0 pb-5 smallCenter">
          <h2 className="smallCenter">আপনি কি আগ্রহী?</h2>
          <p>
            দেখুন Unive কিভাবে আপনার প্রতিষ্ঠানের এমপ্লয়ী প্রোডাক্টিভিটি এবং
            এমপ্লয়ী এক্সপেরিয়েন্স কে এনরিচ করতে পারে।
          </p>
          <Button
            variant="primary"
            className="mx-auto bluebtns"
            onClick={handleShow}
          >
            {" "}
            ডেমো এর জন্য ক্লিক করুন
          </Button>
        </Col>
      </Row>
      {/* modal 1 */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h2 className="mx-auto ps-5">Fill up the form</h2>
        </Modal.Header>
        <Modal.Body>
          <Container className="py-2">
            {/* Login form */}
            <form className="mt-3  py-3" onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="floatingInput"
                label="Full Name"
                className="mt-2 mb-5 text-start"
              >
                <Form.Control
                  type="text"
                  name="FullName"
                  className="text-start"
                  placeholder="Jane doe"
                  onChange={handleOnChange}
                />
              </FloatingLabel>
              {/* --------- */}
              <FloatingLabel
                controlId="floatingInput"
                label="Company Name"
                className="mt-2 mb-5 text-start"
              >
                <Form.Control
                  type="text"
                  name="company"
                  className="text-start"
                  placeholder="xyz"
                  onChange={handleOnChange}
                />
              </FloatingLabel>
              {/* ----------- */}
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mt-2 mb-5 text-start"
              >
                <Form.Control
                  type="email"
                  className="text-start"
                  placeholder="name@example.com"
                  name="email"
                  onChange={handleOnChange}
                />
              </FloatingLabel>
              {/* ------------- */}

              <FloatingLabel
                controlId="floatingInput"
                label="Phone Number"
                className="mt-2 mb-5 text-start"
              >
                <Form.Control
                  type="number"
                  name="PhoneNumber"
                  className="text-start"
                  placeholder="01299123"
                  onChange={handleOnChange}
                />
              </FloatingLabel>
              {/*------------  */}
              <button className="btn btn-primary d-block w-100 mx-auto mt-2 py-3 ms-2 mb-5">
                Submit{" "}
              </button>
            </form>
          </Container>
        </Modal.Body>
      </Modal>
      {/* thanks modal */}
      <Modal show={showT} onHide={handleCloseT}>
        <Modal.Header closeButton>
          <Modal.Title>Thanks for your interest</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          One of our representatives will get back to you asap.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseT}>
            Ok!!
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
