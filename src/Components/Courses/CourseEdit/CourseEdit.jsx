import React from "react";

import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";

import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleCourseQuery } from "../../redux/rtk/features/Course/courseApi";
import EditForm from "./EditForm";
import { useSelector } from "react-redux";
import Loader from "../../Loader/Loader";

export default function CourseEdit({ role }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!role.includes(user?.role)) {
    navigate("/page-not-found");
  }
  const { id } = useParams();

  const { data, isLoading, isError, error } = useGetSingleCourseQuery(id);

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

  if (!isLoading && !isError && data?.data?._id) {
    content = (
      <>
        <EditForm course={data?.data}></EditForm>
      </>
    );
  }

  return (
    <>
      <Header></Header>
      <div>
        <h2 className="edit-course-header">কোর্স এডিট করুন!</h2>

        {content}
      </div>

      <Footer></Footer>
    </>
  );
}
