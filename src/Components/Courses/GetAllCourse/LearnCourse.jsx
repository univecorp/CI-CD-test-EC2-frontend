import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseCard from "../CourseCard/CourseCard";

import axios from "axios";
import config from "../../../config/apiConfig";
import PageTitle from "../../Common/PageTitle";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import { useGetCourseQuery } from "../../redux/rtk/features/Course/courseApi";
import "./learnCourse.css";
import loader from "./unive_logo.svg";
import Loader from "../../Loader/Loader";
export default function Learn() {
  const [searchQuery, setSearchQuery] = useState([]);
  const [results, setResults] = useState([]);
  const { data, isLoading, isError, error: err } = useGetCourseQuery();

  const [error, setError] = useState(null);
  const [filteredPolls, setfilteredPolls] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/course-search`, {
          params: {
            query: searchQuery,
          },
        });
        const data = response.data;

        if (response.status) {
          setResults(data);
        } else {
          setError("Error occurred while fetching results");
          setResults([]);
        }
      } catch (error) {
        setError("Error occurred while fetching results");
        setResults([]);
      }
    };

    if (searchQuery !== "") {
      fetchResults();
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (data) {
      setfilteredPolls(data?.data || []);
    }
  }, [data]);

  // const filteredData = (courseTag) => {
  //   if (data?.data) {
  //     const updatedItems = data?.data?.filter((curElem) => {
  //       return curElem.coursetag === courseTag;
  //     });

  //     setfilteredPolls(updatedItems);
  //   }
  // };

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
      <div>
        <p>Course not found!!</p>
      </div>
    );
  }

  if (!isLoading && !isError && data?.data?.length === 0) {
    content = (
      <div>
        <p>Course not found!!</p>
      </div>
    );
  }

  if (!isLoading && !isError && data?.data?.length > 0) {
    content = (
      <>
        {searchQuery !== "" &&
        results.length === 0 &&
        filteredPolls.length === 0 ? (
          <div className="alert alert-danger" role="alert">
            No courses found!
          </div>
        ) : (
          (searchQuery !== "" ? results : filteredPolls).map((course) => (
            <div className="col-12 col-md-6 col-lg-4" key={course._id}>
              <CourseCard course={course} />
            </div>
          ))
        )}
      </>
    );
  }

  return (
    <>
      <PageTitle title="ইউনিভ কোর্স" />
      <Header />

      <div className="container-fluid main-head">
        <div className="content-course">
          <h2 className="banner-indis-course">ফ্রি কোর্স শুরু করুন ইউনিভ এ!</h2>
        </div>
      </div>

      <Container>
        <h2 className="our-courses">আমাদের কোর্সসমূহ</h2>

        <input
          type="text"
          className="input-search-courses"
          placeholder="কোর্স সার্চ করুন!"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="row g-4 ">{content}</div>
      </Container>

      <Footer />
    </>
  );
}
