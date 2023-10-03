import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import config from "../../../config/apiConfig";
import {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
} from "../../redux/rtk/features/user/userApi";
import "./Usermanagement.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";

export default function AllUsers({ role }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  if (role !== user?.role) {
    navigate("/page-not-found");
  }
  const [activeStatusMap, setActiveStatusMap] = useState({});
  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUsersQuery();

  const userId = user._id;
  const [updateUserRole, { isLoading: isUpdating }] =
    useUpdateUserRoleMutation();

  useEffect(() => {
    // Fetch the initial browseActive status from the server
    fetchBrowseActiveStatus();
  }, [userId]);

  useEffect(() => {
    // Refetch the user data initially
    refetch();
  }, [refetch]);

  const fetchBrowseActiveStatus = async () => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/getBrowserStatus/${userId}`
      );
      const browseActiveStatusMap = {};
      if (Array.isArray(response.data)) {
        response.data.forEach((user) => {
          browseActiveStatusMap[user._id] = user.browseActive;
        });
      } else if (response.data) {
        browseActiveStatusMap[response.data._id] = response.data.browseActive;
      }
      setActiveStatusMap(browseActiveStatusMap);
    } catch (error) {
      console.error("Error fetching browseActive status:", error);
    }
  };

  const handleRoleChange = async (email, newRole) => {
    try {
      await updateUserRole({ email, role: newRole });
      toast.success("User role updated successfully!");
      refetch();
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  const handleToggle = async (userId) => {
    try {
      const newStatus =
        activeStatusMap[userId] === "active" ? "inactive" : "active";
      await axios.post(`${config.apiUrl}/updateBrowserStatus`, {
        userId,
        browseActive: newStatus,
      });
      setActiveStatusMap((prevStatusMap) => ({
        ...prevStatusMap,
        [userId]: newStatus,
      }));
    } catch (error) {
      console.error("Error updating browseActive status:", error);
    }
  };
  let content = null;
  if (isLoading) {
    return (content = (
      <div>
        <Loader />
      </div>
    ));
  }

  if (isError) {
    return <div>{error?.message}</div>;
  }

  return (
    <div className="container-fluid px-4">
      <h1 className="user-header">All Users</h1>
      <div className="table-responsive">
        <table
          id="table"
          className="table table-striped mt-4 mb-4"
          style={{
            borderCollapse: "separate",
            borderSpacing: "0 20px",
          }}
        >
          <thead>
            <tr key={user._id}>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Assign Role</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.data.map((user) => (
                <tr
                  key={user.id}
                  style={{
                    boxShadow: "10px 8px 11px -6px rgba(0, 0, 0, 0.41)",
                    WebkitBoxShadow: "10px 8px 11px -6px rgba(0, 0, 0, 0.41)",
                    MozBoxShadow: "10px 8px 11px -6px rgba(0, 0, 0, 0.41)",
                  }}
                >
                  <td scope="col">{user.firstName}</td>
                  <td scope="col">{user.lastName}</td>
                  <td scope="col">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.email, e.target.value)
                      }
                      style={{
                        backgroundColor: "#f5f5f5",
                        padding: "5px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                      <option value="SuperAdmin">Super Admin</option>
                      <option value="Recruiter">Recruiter</option>
                      <option value="Instructor">Instructor</option>
                    </select>
                  </td>
                  <td scope="col">{user.phone}</td>
                  <td scope="col">{user.email}</td>
                  <td scope="col">
                    <span>
                      {user.status === "active" ? "Verified" : "Unverified"}
                    </span>
                  </td>
                  <td scope="col">
                    <button
                      className={`btn ${
                        activeStatusMap[user._id] === "active"
                          ? "btn-secondary"
                          : "btn-info"
                      }`}
                      onClick={() => handleToggle(user._id)}
                    >
                      {activeStatusMap[user._id] === "active"
                        ? "Access Off"
                        : "Access On"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
