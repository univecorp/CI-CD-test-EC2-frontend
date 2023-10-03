import { formatDistanceToNow } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { Badge, Dropdown, Image } from "react-bootstrap";
import { FiLogOut } from "react-icons/fi";
import { IoNotifications, IoNotificationsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import logo1 from "../images/logos/unive_logo.svg";
import { logout } from "../redux/rtk/features/auth/authSlice";
import { useUserByEmailQuery } from "../redux/rtk/features/user/userApi";
import "./Profile.css";

function DashHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { data } = useUserByEmailQuery(user?.email, {
    pollingInterval: 3000,
  });
  const userInfo = data?.data;

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const notificationRef = useRef();

  useEffect(() => {
    // Assuming 'data.Notifications' is the array of notifications
    setNotifications(data?.data?.notifications || []);
  }, [data]);

  useEffect(() => {
    // Calculate the unread count whenever the notifications array changes
    const newUnreadCount = notifications.reduce((count, notification) => {
      return notification.isRead ? count : count + 1;
    }, 0);

    // Only update the state if the newUnreadCount is different from the current state
    if (newUnreadCount !== unreadCount) {
      setUnreadCount(newUnreadCount);
    }
  }, [notifications, unreadCount]);

  useEffect(() => {
    // Retrieve the unread count from Local Storage when the component mounts for the first time
    const storedUnreadCount = localStorage.getItem("unreadCount");
    if (storedUnreadCount !== null) {
      setUnreadCount(Number(storedUnreadCount)); // Convert the value from string to number
    }

    // Add click event listener to document to handle clicks outside of the notification dropdown
    const handleOutsideClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleNotificationIconClick = () => {
    // Mark all notifications as read when clicking the notification icon
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      isRead: true,
    }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
    localStorage.setItem("unreadCount", "0"); // Update the Local Storage with "0" as a string
    setShowNotifications((prevState) => !prevState);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="container-fluid px-0 sticky-top backroundDash">
      <div className="p-2 dashHeadss d-flex justify-content-around align-items-center">
        <NavLink to="/">
          <Image
            src={logo1}
            width="100"
            height=""
            className="d-inline-block mt-1 align-top img-fluid logo-image logos"
            alt="React Bootstrap logo"
          />
        </NavLink>
        <input
          className="inputsSearch"
          type="text"
          name="search"
          id="search"
          placeholder="সার্চ করুন"
        />
        <div className="d-flex align-items-center justify-content-between">
          <Dropdown ref={notificationRef}>
            <Dropdown.Toggle
              variant="link"
              id="notificationDropdown"
              onClick={handleNotificationIconClick}
              className="custom-toggle-class"
            >
              {/* Combine the icon and badge in the toggle */}
              <div className="d-flex align-items-center">
                <IoNotificationsOutline className="DashHeadIcons position-relative p-0 mx-3" />
                <Badge
                  variant="primary"
                  className="notification-badge position-absolute"
                  id="notificationBadge"
                >
                  {unreadCount}
                </Badge>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu show={showNotifications}>
              {notifications?.length > 0 ? (
                <div>
                  {notifications.map((notification, index) => (
                    <div key={index}>
                      <div
                        className={`d-flex align-items-center mt-2 ${
                          notification.isRead ? "read-notification" : ""
                        }`}
                      >
                        <IoNotifications className="DashHeadIcon2 mx-3" />
                        <div>
                          <p className="DashJobSmallText p-0 m-0">
                            {notification?.jobsteps}
                          </p>
                          <p className="DashcourseTime p-0">
                            {/* {formatDistanceToNow(
                              new Date(notification?.lastDate),
                              {
                                addSuffix: true,
                              }
                            )} */}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <p>No new Notification</p>
                </div>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="ms-2 custom-dropdown">
            <Dropdown.Toggle id="avatar-dropdown">
              <Image
                src={
                  userInfo?.image == null
                    ? "https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/UniveHome+Testimonials/userimage.jpg"
                    : userInfo?.image
                }
                alt="Avatar"
                fluid
                className="circle-img"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-center">
              <Dropdown.Item
                onClick={() => navigate("/")}
                className="DropText"
                href="#"
              >
                হোম
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
      </div>
    </div>
  );
}

export default DashHeader;
