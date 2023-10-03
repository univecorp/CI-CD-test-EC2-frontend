import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  useDeleteCourseMutation,
  useGetCourseQuery,
  useUpdateCourseActionMutation,
} from "../../redux/rtk/features/Course/courseApi";
import "./AdminDashboard.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loader from "../../Loader/Loader";

export default function AdminDashBoard({ role }) {
  const { data, isLoading, isError, error, refetch } = useGetCourseQuery();

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (role !== user?.role) {
    navigate("/page-not-found");
  }
  const [updateCourseAction, { isLoading: isUpdating }] =
    useUpdateCourseActionMutation();

  const [
    deleteCourse,
    { data: cdata, isLoading: load, isError: isErr, error: err, isSuccess },
  ] = useDeleteCourseMutation();

  const handleAdd = () => {
    navigate("/addcourse");
  };

  const handleDelete = () => {
    if (cdata?.data?._id) deleteCourse(cdata?.data?._id);
    console.log(data?.data?._id);
  };

  useEffect(() => {
    if (isSuccess) navigate("/instructordashboard");
  }, [isSuccess, navigate]);

  let content = null;

  if (isLoading) {
    content = (
      <div>
        <Loader />
      </div>
    );
  }

  if (!isLoading && isError) {
    content = (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (!isLoading && !isError && data?.data?.length === 0) {
    content = (
      <div className="alert alert-danger" role="alert">
        Course not found!!
      </div>
    );
  }

  useEffect(() => {
    // Refetch the user data initially
    refetch();
  }, [refetch]);

  const handleActionChange = async (id, newCourseAction) => {
    try {
      await updateCourseAction({ id, courseAction: newCourseAction });
      toast.success("course actions changed!");
      refetch();
    } catch (error) {
      console.error("Failed to course actions changed", error);
    }
  };

  if (!isLoading && !isError && data?.data?.length > 0) {
    content = (
      <>
        {data?.data?.map((course) => (
          <tbody
            key={course._id}
            style={{
              boxShadow: "10px 8px 11px -6px rgba(0, 0, 0, 0.41)",
              WebkitBoxShadow: "10px 8px 11px -6px rgba(0, 0, 0, 0.41)",
              MozBoxShadow: "10px 8px 11px -6px rgba(0, 0, 0, 0.41)",
            }}
          >
            <tr>
              <td>{course.name}</td>

              <td>{course.coursetag}</td>
              <td>
                {" "}
                <img
                  src={course.image}
                  alt="course-img"
                  style={{ width: "50px" }}
                ></img>
              </td>

              <td>
                <div className="d-flex">
                  <Button
                    variant="danger"
                    className="me-2 e-button"
                    onClick={handleDelete}
                    id="delete-btn"
                  >
                    Archived Course
                  </Button>

                  <Button
                    variant="success"
                    onClick={() => navigate(`/coursedit/${course._id}`)}
                    className="e-button"
                    id="edit-btn"
                  >
                    Edit Course
                  </Button>
                </div>
              </td>

              <td scope="col">
                <select
                  value={course?.courseAction}
                  onChange={(e) =>
                    handleActionChange(course?._id, e.target.value)
                  }
                  style={{
                    backgroundColor: "#f5f5f5",
                    padding: "5px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                >
                  <option value="published">Published</option>
                  <option value="live">Live</option>
                  <option value="draft">Draft</option>
                </select>
              </td>
            </tr>
          </tbody>
        ))}
      </>
    );
  }

  return (
    <>
      <div className="container-fluid px-4">
        <Button
          variant="primary"
          className="me-2 e-button mt-4"
          onClick={handleAdd}
          id="add-btn"
        >
          Add Course
        </Button>
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
                <th scope="col">Name</th>

                <th scope="col">Course Tag</th>
                <th scope="col">Image</th>
                <th scope="col">Delete/Edit</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            {content}
          </table>
        </div>
      </div>
    </>
  );
}
