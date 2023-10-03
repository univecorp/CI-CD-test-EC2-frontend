import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { useSelector } from "react-redux";
import config from "../../../config/apiConfig";
import PageTitle from "../../Common/PageTitle";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import JobPost from "../JobPost";
import "./jobbrowse.css";
import "./jobscard.css";
export default function JobBrowsing() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = {
          userId,
          searchTerm,
          page: currentPage,
          limit: 9,
          sortBy: "createdAt",
          sortOrder: "desc",
          ...filters,
        };

        const response = await axios.get(`${config.apiUrl}/jobs`, {
          params: queryParams,
        });
        console.log("mongodb link:", `${config.apiUrl}`);
        const { results, totalPages } = response.data;
        setJobs(results);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error retrieving job listings:", error);
      }
    };

    fetchData();
  }, [userId, searchTerm, filters, currentPage, sortBy, sortOrder]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page when search term changes
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    setCurrentPage(1); // Reset current page when filter changes
  };

  const handleSortChange = (event) => {
    const { name, value } = event.target;
    if (name === "sortBy") {
      setSortBy(value);
    } else if (name === "sortOrder") {
      setSortOrder(value);
    }
    setCurrentPage(1); // Reset current page when sorting changes
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  let content = "";
  if (jobs.length === 0) {
    content = <h5 className="text-center text-danger mt-5">No jobs found!</h5>;
  } else {
    content = (
      <div className="row g-4 mt-4">
        {jobs.map((job, index) => (
          <JobPost key={index} job={job} />
        ))}
      </div>
    );
  }
  return (
    <>
      <PageTitle title="ইউনিভ জবস" />
      <Header />
      <div className="container mb-5">
        <h1 className="text-center jobs-header">ইউনিভ জবস</h1>
        <br />
        <input
          type="text"
          value={searchTerm}
          className="jobSearch"
          onChange={handleSearch}
          placeholder="জবসের নাম লিখুন"
        />
        <select
          className="me-2 p-1 w-50"
          name="jobCategory"
          onChange={handleFilterChange}
        >
          <option value="" selected>
            সব বিভাগের জবস
          </option>
          <option value="Electrical engineering">
            ইলেকট্রিকাল ইঞ্জিনিয়ারিং (Electrical Engineering)
          </option>
          <option value="IT">
            আইটি / কম্পিউটার সাইন্স (IT / Computer Science)
          </option>
          <option value="Mechanical engineering">
            মেকানিকাল ইঞ্জিনিয়ারিং (Mechanical Engineering)
          </option>
          <option value="engineering">
            সিভিল ইঞ্জিনিয়ারিং (Civil Engineering)
          </option>
          <option value="engineering">
            টেক্সটাইল ইঞ্জিনিয়ারিং (Textile Engineering)
          </option>
          <option value="Others">অন্যান (Others)</option>
          {/* Add more options for other filter fields */}
        </select>
        <select
          className="mx-2 p-1 mobilefiler"
          name="jobType"
          onChange={handleFilterChange}
        >
          <option value="" selected>
            সব ধরনের জবস
          </option>
          <option value="Full-time">ফুলটাইম (Full-time)</option>
          <option value="Part-time">খন্ডকালীন (Part-time)</option>
          <option value="Contractual">চুক্তিভিত্তিক (Contractual)</option>
          <option value="Internship">ইন্টার্নশীপ (Internship)</option>
          {/* Add more options for job types */}
        </select>
        {/* <select className="mx-2 p-1" name="sortBy" onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="jobTitle">Job Title</option>
          <option value="salaryRange">Salary Range</option>
        </select> */}
        {content}
        {jobs.length > 0 && (
          <div className="pagination-container">
            <Pagination className="custom-pagination">
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={handlePreviousPage}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
              />
            </Pagination>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
