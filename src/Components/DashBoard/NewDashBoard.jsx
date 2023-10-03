import { useEffect, useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import {
  FaBars,
  FaBriefcase,
  FaBriefcaseMedical,
  FaClipboardList,
  FaGraduationCap,
  FaIndustry,
  FaRegChartBar,
  FaUserAlt,
} from "react-icons/fa";
import { FcGraduationCap } from "react-icons/fc";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { GiTeacher } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { IoBriefcaseSharp } from "react-icons/io5";
import { RiDiscussFill } from "react-icons/ri";
import { TbCertificate, TbMessageChatbot } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PageTitle from "../Common/PageTitle";
import { logout } from "../redux/rtk/features/auth/authSlice";
import DashHeader from "./DashHeader";
import "./NewDashboard.css";
import img3 from "./UserDasBoard/conversation.png";
import img2 from "./UserDasBoard/online-learning.png";
import img1 from "./UserDasBoard/recruitment.png";

function NewDashBoard() {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(() => {
    const storedValue = localStorage.getItem("isOpen");
    return storedValue !== null ? JSON.parse(storedValue) : false;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    Swal.fire({
      title: "আপনি কি লগআউট করতে চাচ্ছেন ?",
      showCancelButton: true,
      cancelButtonText: "না",
      confirmButtonText: "হ্যাঁ",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(logout());
        navigate("/");
      }
    });
  };
  // Update localStorage whenever isOpen changes
  useEffect(() => {
    localStorage.setItem("isOpen", JSON.stringify(isOpen));
  }, [isOpen]);
  const toggle = () => setIsOpen(!isOpen);
  const isActiveOverview = (match, location) => {
    return location.pathname === "/Dashboard/";
  };
  return (
    <div className="container-fluid px-0">
      <PageTitle title="ড্যাশবোর্ড" />
      <div className="d-flex">
        <div className="dashMainHead">
          <div style={{ width: isOpen ? "250px" : "50px" }} className="sidebar">
            <div className="top_section">
              {user?.role === "User" ? (
                <h1
                  style={{ display: isOpen ? "block" : "none" }}
                  className="logo"
                >
                  ইউজার
                </h1>
              ) : user?.role === "Admin" ? (
                <h1
                  style={{ display: isOpen ? "block" : "none" }}
                  className="logo"
                >
                  অ্যাডমিন
                </h1>
              ) : user?.role === "SuperAdmin" ? (
                <h1
                  style={{ display: isOpen ? "block" : "none" }}
                  className="logo"
                >
                  Super Admin
                </h1>
              ) : user?.role === "Instructor" ? (
                <h1
                  style={{ display: isOpen ? "block" : "none" }}
                  className="logo"
                >
                  ইন্সট্রাক্টর
                </h1>
              ) : user?.role === "Recruiter" ? (
                <h1
                  style={{ display: isOpen ? "block" : "none" }}
                  className="logo"
                >
                  রিক্রুটার
                </h1>
              ) : null}
              <div
                style={{ marginLeft: isOpen ? "80px" : "0px" }}
                className="bars"
              >
                <FaBars onClick={toggle} className="tog-bars" />
              </div>
            </div>

            {/* user drawer start here */}
            {user?.role === "User" && (
              <>
                <NavLink to="/Dashboard/userprofile/">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <FaUserAlt className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        আমার প্রোফাইল
                      </p>
                    </div>
                  )}
                </NavLink>
                <NavLink to="/Dashboard/usercourses">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <FaGraduationCap className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        আমার কোর্স
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/userapplication">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <FaBriefcase className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        আমার জব
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/user-skill-show">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <FaGraduationCap className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        আমার স্কিল আসসেসমেন্ট
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/usercertificate">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <TbCertificate className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        আমার সার্টিফিকেশন
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/userperfomance/">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <FaRegChartBar className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        আমার পারফরম্যান্স
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/UserDisscussion">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <HiOutlineChatBubbleLeftRight className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        ডিসকাশন
                      </p>
                    </div>
                  )}
                </NavLink>
                <NavLink to="/Dashboard/UniveAI">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <TbMessageChatbot className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        ইউনিভ এআই
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/dashboard-help">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <BiSupport className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        হেল্প এন্ড সাপোর্ট
                      </p>
                    </div>
                  )}
                </NavLink>
              </>
            )}
            {/* user drawer End here */}

            {/* Instructor Dashboard drawer start here */}

            {user?.role === "Instructor" && (
              <>
                <NavLink to="/Dashboard/instructorprofile/">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <FaUserAlt className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        আমার প্রোফাইল
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/instructordashboard">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <FaGraduationCap className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        কোর্সসমূহ
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/course-queries">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <FaGraduationCap className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        কোর্স কুয়েরিস
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/leaderboard">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <FaClipboardList className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        লিডারবোর্ড
                      </p>
                    </div>
                  )}
                </NavLink>

                {/* <NavLink to="/Dashboard/userperfomance/">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <FaRegChartBar className="icon" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        স্টুডেন্ট পারফরম্যান্স
                      </p>
                    </div>
                  )}
                </NavLink> */}

                {/* <div>
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <HiOutlineChatBubbleLeftRight className="icon" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        ডিসকাশন
                      </p>
                    </div>
                  )}
                </div> */}
              </>
            )}

            {/* Instructor Dashboard drawer ends here */}

            {/* Recruiter Dashboard drawer start here  */}
            {user?.role === "Recruiter" && (
              <>
                <NavLink to="/Dashboard/recruiterProfile/">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <FaIndustry className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        কোম্পানি প্রোফাইল
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/recruiterJobPost/">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <FaBriefcaseMedical className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        জব পোস্ট
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/recruiterJobs/">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <IoBriefcaseSharp className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        এক্টিভ জবস
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/recruiterDiscussion/">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <RiDiscussFill className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        জবস ডিসকাশন
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/skill-assessment-form">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <FaGraduationCap className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        স্কিল আসসেসমেন্ট ফর্ম
                      </p>
                    </div>
                  )}
                </NavLink>
              </>
            )}
            {/* Recruiter Dashboard drawer end here  */}

            {/* Admin Dashboard starts here */}
            {user?.role === "Admin" && (
              <>
                <NavLink to="/Dashboard/adminprofile/">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <FaUserAlt className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        আমার প্রোফাইল
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/all-user">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <HiUserGroup className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        ইউজার
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/user-management">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <FaGraduationCap className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        লার্নার
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/recruiter-management">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      {/* <FaClipboardList className="icon" /> */}
                      <img src={img1} style={{ width: "20px" }}></img>
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        রিক্রুটারসমূহ
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/instructor-management">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <GiTeacher className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        ইন্সট্রাক্টর
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/external-queries">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <AiFillQuestionCircle className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        এক্সটার্নাল কুয়েরিস
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/get-scholarships">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <FcGraduationCap className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        স্কলারশিপ ডাটা
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/help-and-support">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      {/* <FcGraduationCap className="icon" /> */}
                      <img src={img3} alt="" style={{ width: "20px" }} />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        হেল্প এন্ড সাপোর্ট
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/admindashboard">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      {/* <FaGraduationCap className="icon" /> */}
                      <img src={img2} style={{ width: "20px" }}></img>
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        কোর্সসমূহ
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/show-skillAssesmentData">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <FaUserAlt className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        স্কিল এসেসমেন্ট ডাটা
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/recruiterJobPost/">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <FaGraduationCap className="icons" />
                      {/* <img src={img2} style={{ width: "20px" }}></img> */}
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        জব পোস্ট
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/recruiterJobs/">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <FaGraduationCap className="icons" />
                      {/* <img src={img2} style={{ width: "20px" }}></img> */}
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        জব এডিট
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/user-analytics/">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <FaRegChartBar className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        ইউজার এনালাইটিক্স
                      </p>
                    </div>
                  )}
                </NavLink>

                <NavLink to="/Dashboard/dashboard-Blogs">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "actives dashHead d-flex align-item-center"
                          : "dashHead d-flex align-item-center"
                      }
                    >
                      <TfiWrite className="icons" />
                      <p
                        style={{ display: isOpen ? "block" : "none" }}
                        className="link_text"
                      >
                        ব্লগস
                      </p>
                    </div>
                  )}
                </NavLink>
              </>
            )}
            {/* Admin Dashboard ends here */}

            <NavLink to="/Dashboard/dashboard-settings">
              {({ isActive }) => (
                <div
                  className={
                    isActive
                      ? "actives dashHead d-flex align-item-center mt-5"
                      : "dashHead d-flex align-item-center mt-5"
                  }
                >
                  <FiSettings className="icons" />
                  <p
                    style={{ display: isOpen ? "block" : "none" }}
                    className="link_text"
                  >
                    সেটিংস
                  </p>
                </div>
              )}
            </NavLink>

            <div className={"dashHead d-flex align-item-center"}>
              <FiLogOut className="icons" />
              <p
                onClick={() => handleLogout()}
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text curso"
              >
                লগ আউট
              </p>
            </div>
          </div>
        </div>

        <div className="container-fluid px-0 smfix">
          <DashHeader />
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default NewDashBoard;
