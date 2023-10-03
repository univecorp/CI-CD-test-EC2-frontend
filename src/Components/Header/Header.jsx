import { Container, Dropdown, Image, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import logo1 from "../images/logos/unive_logo.svg";
import { logout } from "../redux/rtk/features/auth/authSlice";
import { useUserByEmailQuery } from "../redux/rtk/features/user/userApi";
import "./header.css";

export default function Header() {
  const { token, user } = useSelector((state) => state.auth);

  const email = user?.email;
  const { data } = useUserByEmailQuery(user?.email);
  const userInfo = data?.data;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Navbar
      className="mb-2 head sticky-top"
      fluid
      collapseOnSelect
      expand="lg"
      style={{ height: "70px" }}
    >
      <Container className="navbar-light" fluid>
        <NavLink to="/">
          <Navbar.Brand href="#home" className="me-5">
            <img
              src={logo1}
              width="100"
              height=""
              className="d-inline-block mt-1 align-top img-fluid logo-image"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="fw-bold ms-auto mt-2 align-items-center">
            <NavLink to="/how-it-works">
              <Nav.Link className="ms-3 header-text " href="/how-it-works">
                কিভাবে কাজ করে
              </Nav.Link>
            </NavLink>

            <NavLink to="/jobs">
              <Nav.Link className="ms-3 header-text" href="#course">
                জব
              </Nav.Link>
            </NavLink>

            <NavLink to="/learn">
              <Nav.Link className="ms-3 header-text" href="#course">
                কোর্স
              </Nav.Link>
            </NavLink>
            <NavLink to="/contact">
              <Nav.Link className="ms-3 header-text" href="/contact">
                যোগাযোগ
              </Nav.Link>
            </NavLink>
            {email ? (
              <div className="d-flex align-items-center justify-content-center">
                <Dropdown className="ms-5 ps-0 custom-dropdown">
                  <Dropdown.Toggle id="avatar-dropdown">
                    <Image
                      src={
                        userInfo?.image == null
                          ? "https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/UniveHome+Testimonials/userimage.jpg"
                          : userInfo?.image
                      }
                      alt="user Image"
                      fluid
                      className="circle-img"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-center">
                    <Dropdown.Item
                      onClick={() => navigate("/DashBoard")}
                      className="DropText"
                      href="#"
                    >
                      ড্যাশবোর্ড
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="DropText"
                      onClick={() => handleLogout()}
                    >
                      লগ আউট <FiLogOut />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <p className="dashHeadName m-0">{user?.firstName}</p>
              </div>
            ) : null}
            {!email && (
              <Link className="text-primary" to="/login">
                <button className="sign-btn">সাইন ইন</button>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
