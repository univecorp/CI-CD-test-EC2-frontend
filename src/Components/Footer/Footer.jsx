import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./footer.css";

import foot from "../images/logos/Unive-v3-1.png";

import fb from "./Fb Icon.svg";
import ld from "./Linkedin Icon.svg";
import tw from "./Twitter Icon.svg";
import yt from "./YT Icon.svg";
import insta from "./Instagram Icon.svg";

import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUserByEmailQuery } from "../redux/rtk/features/user/userApi";

const Footer = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const {
    data,

    error: err,
  } = useUserByEmailQuery(user?.email);
  return (
    <Container fluid className="footers pb-5 ps-2 ">
      <Container className="text-secondary my-5 pt-3">
        <img src={foot} alt="" />
        <p className="text-light mt-3 ">Skill focused learning platform </p>
        <hr className="bg-light" />

        <Row className="my-5 ms-2 words">
          {/*  footer img */}
          <Col xs={4} md={2} className="me-2">
            <p className="text-white fw-bolder fs-5">Solutions</p>
            <NavLink to="/unive-for-individual">
              <p className="ashText">Unive for Individuals</p>
            </NavLink>
            <NavLink to="/unive-for-hr-recruiting">
              <p className="ashText">Unive for HR/ Recruiting</p>
            </NavLink>

            <NavLink to="/unive-for-enterprise">
              <p className="ashText">Unive for Enterprise</p>
            </NavLink>

            <p
              className="ashText"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/show-skill-assessment")}
            >
              Skill Assessment
            </p>
          </Col>
          <Col xs={4} md={2} className=" mx-3 pe-5">
            <Row>
              <Col xs={2} md={12}>
                <p className="text-white fw-bolder fs-5">Products</p>
                <NavLink to="/unive-learning">
                  {" "}
                  <p className="ashText">Unive Learning</p>
                </NavLink>

                {/* <NavLink to="/skill-assessments ">
                  <p className="ashText">Unive Skill Assessments</p>
                </NavLink> */}
              </Col>
              <Col xs={3} md={12} className="d-none d-md-block text-white">
                <p className="text-white fw-bolder fs-5">Plans</p>
                <NavLink to="/unive-for-individual">
                  {" "}
                  <p className="ashText">For Individuals</p>
                </NavLink>
                <NavLink to="/for-enterprise ">
                  {" "}
                  <p className="ashText">For Enterprise</p>
                </NavLink>
                <NavLink to="/manpower-as-a-service">
                  <p className="ashText">For Manpower as a Service</p>
                </NavLink>
              </Col>
            </Row>
          </Col>
          <Col xs={5} md={12} className="d-block d-md-none text-white">
            <p className="text-white fw-bolder fs-5">Plans</p>
            <NavLink to="/unive-for-individual">
              {" "}
              <p className="ashText">For Individuals</p>
            </NavLink>
            <NavLink to="/for-enterprise">
              {" "}
              <p className="ashText"> For Enterprise</p>
            </NavLink>

            <NavLink to="/manpower-as-a-service">
              <p className="ashText">For Manpower as a Service</p>
            </NavLink>
          </Col>

          <Col xs={4} md={2} className=" me-5 pe-2">
            <Row>
              <Col xs={12} className="mb-4">
                <p className="text-white fw-bolder fs-5">Resources</p>
                <NavLink to="/blogs">
                  <p className="ashText">Unive Blog</p>
                </NavLink>
                <NavLink to="/activities">
                  {" "}
                  <p className="ashText">Our Activities</p>
                </NavLink>
              </Col>
              <Col xs={12} className="d-none d-md-block">
                <p className="text-white fw-bolder fs-5">Contribute</p>
                <NavLink to="/become-an-unive-instructor">
                  <p className="ashText">Become an Instructor</p>
                </NavLink>
                <NavLink to="/become-a-contributor">
                  <p className="ashText">Become a Contributor</p>
                </NavLink>
              </Col>
            </Row>
          </Col>

          <Col xs={5} md={12} className="d-block d-md-none text-white">
            <p className="text-white fw-bolder fs-5">Legal</p>
            <NavLink to="/privacy-policy">
              <p className="ashText">Privacy Policy</p>
            </NavLink>

            <NavLink to="/terms-of-service">
              <p className="ashText">Terms of Service</p>
            </NavLink>
            <NavLink to="/business-terms-of-service">
              {" "}
              <p className="ashText"> Business Terms of Service</p>
            </NavLink>
          </Col>
          <Col xs={4} className=" d-block d-md-none me-5 pe-4 ">
            <p className="text-white fw-bolder fs-5">Contribute</p>
            <NavLink to="/become-an-unive-instructor">
              <p className="ashText">Become an Instructor</p>
            </NavLink>
            <NavLink to="/become-a-contributor">
              <p className="ashText">Become a Contributor</p>
            </NavLink>
          </Col>
          <Col xs={2} className=" me-5 pe-5">
            <Row>
              <Col xs={12} className=" d-none d-md-block">
                <p className="text-white fw-bolder fs-5">Legal</p>
                <NavLink to="/privacy-policy">
                  <p className="ashText">Privacy Policy</p>
                </NavLink>

                <NavLink to="/terms-of-service">
                  <p className="ashText">Terms of Service</p>
                </NavLink>
                <NavLink to="/business-terms-of-service">
                  {" "}
                  <p className="ashText">Business Terms of Service</p>
                </NavLink>
              </Col>
              <Col xs={12} className="d-none d-md-block">
                <NavLink to="/careers">
                  {" "}
                  <p className="ashText">Careers</p>
                </NavLink>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={2} className="">
            <p className="text-white fw-bolder fs-5">More</p>
            <NavLink to="/learn">
              {" "}
              <p className="ashText">Course Catalog</p>
            </NavLink>
            <NavLink to="/scholarships">
              {" "}
              <p className="ashText">Scholarships</p>
            </NavLink>

            <NavLink to="/contact">
              <p className="ashText">Contact Us</p>
            </NavLink>
          </Col>
        </Row>
        <hr />

        <Row className="">
          <Col xs={8}>
            <div className="d-flex  mt-2 d-none d-md-block">
              <a
                href="https://www.facebook.com/univebd"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <img src={fb} alt="" height="25" width="25" className="me-2" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCrMXsiaPOkylyCwRLrMGK2w"
                target="_blank"
                rel="noreferrer"
              >
                <img src={yt} alt="" height="25" width="25" className="mx-2" />
              </a>
              <a
                href="https://www.linkedin.com/company/univebd/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={ld} alt="" height="25" width="25" className="mx-2" />
              </a>
              <a
                href="https://twitter.com/univecorp"
                target="_blank"
                rel="noreferrer"
              >
                <img src={tw} alt="" height="25" width="25" className="mx-2" />
              </a>
              <a
                href="https://www.instagram.com/univebd/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={insta}
                  alt=""
                  height="25"
                  width="25"
                  className="mx-2"
                />
              </a>
            </div>
          </Col>
          <Col xs={4} className="pe-auto d-none d-md-block mt-2">
            <p className="ashText">2023 Unive © All rights reserved.</p>
          </Col>
        </Row>
      </Container>

      <Container xs={4} className="pe-auto d-block d-md-none">
        <div className="d-flex justify-content-center mb-5 ">
          <a
            href="https://www.facebook.com/univebd"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            <img src={fb} alt="" height="25" width="25" className="me-2" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCrMXsiaPOkylyCwRLrMGK2w"
            target="_blank"
            rel="noreferrer"
          >
            <img src={yt} alt="" height="25" width="25" className="mx-2" />
          </a>
          <a
            href="https://www.linkedin.com/company/univebd/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={ld} alt="" height="25" width="25" className="mx-2" />
          </a>
          <img src={tw} alt="" height="25" width="25" className="mx-2" />
          <a
            href="https://www.instagram.com/univebd/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={insta} alt="" height="25" width="25" className="mx-2" />
          </a>
        </div>
        <p className="ashText words text-center">
          2023 Unive © All rights reserved.
        </p>
      </Container>
    </Container>
  );
};

export default Footer;
