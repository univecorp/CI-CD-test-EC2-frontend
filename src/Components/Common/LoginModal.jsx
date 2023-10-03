import { useState } from "react";
import { Button, Container, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import gogo from "../images/logos/icons8-google.svg";
export default function LoginModal({ Lshow, handleCloseL }) {
  const [LoginData, setLoginData] = useState({});
  const { signGoogle, emailPass, error, resetPass } = useAuth();
  const history = useNavigate();
  const location = useLocation();
  // login form field changes handle
  const handleOnChangeL = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...LoginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
    console.log(newLoginData);
  };
  // google sign in method

  const handleLogin = () => {
    signGoogle(location, history);
    handleCloseL();
  };
  // email pass login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(LoginData);
    emailPass(LoginData.email, LoginData.pass, location, history);
    handleCloseL();
  };
  // reset email
  const handleRest = () => {
    resetPass(LoginData.email);
  };

  return (
    <Modal show={Lshow} onHide={handleCloseL}>
      <Modal.Header closeButton>
        <h2 className="mx-auto ps-5">Welcome Back</h2>
      </Modal.Header>
      <Modal.Body>
        <Container className="py-2">
          {/* Login form */}
          <h2 className="text-start fs-3 fw-bold">Sign in to your account</h2>
          <form className="mt-3  py-3" onSubmit={handleLoginSubmit}>
            {/*email  */}
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
                onChange={handleOnChangeL}
              />
            </FloatingLabel>

            {/* --------password-------- */}
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-5 "
            >
              <Form.Control
                type="password"
                className="text-start"
                name="pass"
                placeholder="Password"
                onChange={handleOnChangeL}
              />
            </FloatingLabel>
            <Button variant="link" onClick={handleRest}>
              Reset/Forget? password
            </Button>
            {error ? <p className="text-danger text-center">{error}</p> : ""}

            <button className="btn btn-primary d-block mx-auto my-3 py-3 px-5 ">
              Login{" "}
            </button>
          </form>
          {/* google sign in */}
          <p className="fs-5 my-3">Stay signed in</p>
          <button
            className="btn  border border-1 d-block mb-5 mx-auto text-dark"
            onClick={handleLogin}
          >
            {" "}
            <img src={gogo} alt="" height="30" width="30" /> Google Sign In
          </button>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
