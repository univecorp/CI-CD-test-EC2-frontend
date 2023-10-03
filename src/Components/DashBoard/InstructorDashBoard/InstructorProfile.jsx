import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./../Profile.css";
import "./InstructorProfile.css";
import { useSelector } from "react-redux";
function InstructorProfile({ role }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!role.includes(user?.role)) {
    navigate("/page-not-found");
  }

  return (
    <div className="container-fluid px-0 DashRight">
      <p className="DashProfileHead">আমার প্রোফাইল</p>
      <div className="d-flex DashSubProfile">
        <NavLink to="/Dashboard/instructorprofile/">
          {({ isActive }) => (
            <div
              className={
                isActive ? "activeProfile dashProfileText" : "dashProfileText"
              }
            >
              <p className="link_text">ব্যক্তিগত প্রোফাইল</p>
            </div>
          )}
        </NavLink>

        <NavLink to="/Dashboard/instructorprofile/instructoreducation/">
          {({ isActive }) => (
            <div
              className={
                isActive ? "activeProfile dashProfileText" : "dashProfileText"
              }
            >
              <p className="link_text">একাডেমিক প্রোফাইল</p>
            </div>
          )}
        </NavLink>
      </div>

      <Outlet></Outlet>
    </div>
  );
}
export default InstructorProfile;
