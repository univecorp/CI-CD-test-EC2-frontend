import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import "./../Profile.css";
import "./AdminProfile.css";
function AdminProfile() {
  return (
    <div className="container-fluid px-0 DashRight">
      <p className="DashProfileHead">আমার প্রোফাইল</p>
      <div className="d-flex DashSubProfile">
        <NavLink to="/Dashboard/adminprofile/">
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

      
      </div>
      <div className="d-md-flex align-items-start justify-content-around">
        <div className="text-center">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            alt=""
            className="DashUserImage"
          />
          <div>
            <GrEdit className="usericons" />
            <RiDeleteBin5Line className="usericons text-danger" />
          </div>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
export default AdminProfile;
