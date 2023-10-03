import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import config from "../../../config/apiConfig";
import InstructorReplyCourseDiscussion from "../../DashBoard/UserDasBoard/InstructorReplyCourseDiscussion";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import { useAddcoursediscussionFormMutation } from "../../redux/rtk/features/CourseDiscussion/courseDiscussionApi";
import { useUserByEmailQuery } from "../../redux/rtk/features/user/userApi";
import "./CourseDiscussion.css";
export default function CourseDiscussion() {
  const { user } = useSelector((state) => state.auth);
  const [querydata, setQueryData] = useState([]);
  const [discussiondata, setDiscussionData] = useState([]);
  const { data } = useUserByEmailQuery(user?.email);
  const enrollments = data?.data?.enrollments;

  const [addcoursediscussionForm, { isLoading, isError, isSuccess, error }] =
    useAddcoursediscussionFormMutation();

  const generateRandomNumber = () => {
    return Math.floor(10000000 + Math.random() * 90000000);
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const randomNumber = generateRandomNumber();
    data.ticketNumber = randomNumber;

    try {
      await addcoursediscussionForm(data);

      toast.success("সফলভাবে তথ্য সংগ্রহ হয়েছে!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error(error);
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    reset();
  };
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/course-discussion-reply`
        );
        const formData = response?.data?.data;

        setQueryData(formData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFormData();
  }, []);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/course-discussion`);
        const formData = response?.data?.data;
        console.log("fdata", formData);
        setDiscussionData(formData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFormData();
  }, []);

  const replyId = querydata[0]?._id;
  const discussionId = discussiondata[0]?._id;
  return (
    <>
      <Header></Header>
      <h2 className="main-head-query-instructor">
        ইন্সট্রাক্টরকে জিজ্ঞেস করুন
      </h2>
      <div className="container main-discussion">
        <form className="form-hr-disc" onSubmit={handleSubmit(onSubmit)}>
          <select className="input-modal-hr-disc" {...register("courseName")}>
            {enrollments?.map((course, index) => (
              <option key={index} value={course.courseName}>
                {course.courseName}
              </option>
            ))}
          </select>

          <textarea
            type="text"
            className="input-modal-hr-disc"
            placeholder="আপনার প্রশ্ন লিখুন "
            {...register("query")}
          />

          <input
            className="submit-input-tag-disc"
            type="submit"
            disabled={isLoading}
          ></input>
        </form>

        <InstructorReplyCourseDiscussion
          replyId={replyId}
          discussionId={discussionId}
        />
      </div>

      <Footer></Footer>
    </>
  );
}
