import { NavLink, Outlet, useNavigate } from "react-router-dom";
import PageTitle from "../../../Common/PageTitle";
import "./UserPerformance.css";
import { useSelector } from "react-redux";
export default function UserPerfomance() {
  return (
    <div className="container-fluid px-0 DashRight">
      <PageTitle title="আমার পারফরম্যান্স" />
      <p className="DashProfileHead">আমার পারফরম্যান্স </p>
      <div className="d-flex DashSubProfile">
        <NavLink to="/Dashboard/userperfomance/">
          {({ isActive }) => (
            <div
              className={
                isActive ? "activeProfile dashProfileText" : "dashProfileText"
              }
            >
              <p className="link_text">
                কোর্স <span className="smNone">পারফরম্যান্স</span>
              </p>
            </div>
          )}
        </NavLink>
        <NavLink to="/Dashboard/userperfomance/job">
          {({ isActive }) => (
            <div
              className={
                isActive ? "activeProfile dashProfileText" : "dashProfileText"
              }
            >
              <p className="link_text">
                জব <span className="smNone">পারফরম্যান্স</span>{" "}
              </p>
            </div>
          )}
        </NavLink>
        <NavLink to="/Dashboard/userperfomance/skill">
          {({ isActive }) => (
            <div
              className={
                isActive ? "activeProfile dashProfileText" : "dashProfileText"
              }
            >
              <p className="link_text">
                স্কিল <span className="smNone">পারফরম্যান্স</span>
              </p>
            </div>
          )}
        </NavLink>
        {/* <NavLink to="/Dashboard/userperfomance/quiz">
          {({ isActive }) => (
            <div
              className={
                isActive ? "activeProfile dashProfileText" : "dashProfileText"
              }
            >
              <p className="link_text">
                কুইজ <span className="smNone">পারফরম্যান্স</span>
              </p>
            </div>
          )}
        </NavLink> */}
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
