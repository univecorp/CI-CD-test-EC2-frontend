import React from "react";
import { useSelector } from "react-redux";
import {
  useGetUsersQuery,
  useUserByEmailQuery,
} from "../../redux/rtk/features/user/userApi";
import "./InstructorManagement.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";

export default function InstructorManagement({ role }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (role !== user?.role) {
    navigate("/page-not-found");
  }
  const { data: users, isLoading, isError, error } = useGetUsersQuery();

  const { data } = useUserByEmailQuery(user?.email);

  let content = null;
  if (isLoading) {
    return (content = (
      <div>
        <Loader />
      </div>
    ));
  }

  if (isError) {
    return <div> {error.message}</div>;
  }
  const filteredUsers = users?.data?.filter(
    (user) => user.role === "Instructor"
  );

  return (
    <div className="container-fluid px-4">
      <h1 className="instructor-header">Instructors</h1>

      <div className="table-responsive">
        <table
          id="table"
          className="table table-striped mt-4 mb-4 "
          style={{
            borderCollapse: "separate",
            borderSpacing: "0 20px",
          }}
        >
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Role</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers &&
              filteredUsers.map((user) => (
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
                  <td scope="col">{user.role}</td>
                  <td scope="col">{user.phone}</td>
                  <td scope="col">{user.email}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
