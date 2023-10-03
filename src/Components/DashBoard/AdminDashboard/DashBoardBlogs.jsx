import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import config from "../../../config/apiConfig";
import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
} from "../../redux/rtk/features/Blogs/BlogsApi";
function DashBoardBlogs({ role }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  if (role !== user?.role) {
    navigate("/page-not-found");
  }
  const { register, handleSubmit, reset } = useForm();
  const { data, refetch } = useGetBlogsQuery();
  const blogs = data?.data;
  console.log(blogs);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    bloggerName: "",
    blogText: "",
    blogTitle: "",
    blogTag: "",
    blogImage: "",
  });

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`${config.apiUrl}/blogs/${id}`);
      setShowModal(true);
      setFormData(response?.data?.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };
  const [deleteBlog] = useDeleteBlogMutation();

  const handleDelete = async (id) => {
    Swal.fire({
      title: "আপনি কি ব্লগস ডিলিট করতে চাচ্ছেন ?",
      showCancelButton: true,
      cancelButtonText: "না",
      confirmButtonText: "হ্যাঁ",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBlog(id);
          refetch();
          showToast("Blog Deleted Successfully!", "success");
        } catch (error) {
          showToast("Failed to delete the Blog!", "error");
        }
      }
    });
  };

  const showToast = (message, type) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleCreate = () => {
    // Handle create logic here
    console.log("Create new blog");
    setShowModal(true);
    setFormData({
      bloggerName: "",
      blogText: "",
      blogTitle: "",
      blogTag: "",
      blogImage: "",
    });
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("bloggerName", formData.bloggerName);
    formDataObj.append("blogText", formData.blogText);
    formDataObj.append("blogTitle", formData.blogTitle);
    formDataObj.append("blogTag", formData.blogTag);
    formDataObj.append("blogImage", selectedImage);

    // Log the entries of the FormData
    for (const entry of formDataObj.entries()) {
      console.log("Form data entry:", entry);
    }

    if (formData._id) {
      try {
        const response = await axios.patch(
          `${config.apiUrl}/blogs/${formData._id}`,
          formDataObj,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
            },
          }
        );
        toast.success("Blog Updated Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        refetch();
        reset();
      } catch (error) {
        toast.error("Blog Update failed!", {
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
    } else {
      try {
        const response = await axios.post(
          `${config.apiUrl}/blogs`,
          formDataObj,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
            },
          }
        );
        refetch();
        toast.success("New Blog Posted Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        reset();
      } catch (error) {
        toast.error("New Blog Post failed!", {
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
    }
  };
  return (
    <div className="container">
      <h2 className="text-center mt-3">Welcome to Unive Blogs</h2>
      <Button variant="success" onClick={handleCreate} className="my-4">
        Create a Blog +
      </Button>
      <Table responsive striped bordered hover>
        <thead className="dark">
          <tr>
            <th>Blog Image</th>
            <th>Blogger Name</th>
            <th>Blog Title</th>
            <th>Blog Tag</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog) => (
            <tr key={blog?._id}>
              <td>
                <img
                  src={blog?.BlogImage}
                  alt={blog?.blogTitle}
                  className="img-fluid"
                  style={{ width: "70px", height: "70px" }}
                />
              </td>
              <td>{blog?.bloggerName}</td>
              <td>
                {`${blog?.blogTitle?.split(" ").slice(0, 3).join(" ")} ... `}
              </td>
              <td>{blog?.blogTag}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/blogDetails/${blog._id}`)}
                >
                  View
                </Button>
                <Button
                  className="m-2"
                  variant="warning"
                  onClick={() => handleEdit(blog._id)}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(blog._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        scrollable
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {formData._id ? "Edit Blog" : "Create Blog"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={onFormSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="DashProfileInput">
              <label htmlFor="bloggerName">Blogger Name:</label>
              <input
                type="text"
                id="bloggerName"
                name="bloggerName"
                value={formData.bloggerName}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </div>
            <div className="DashProfileInput">
              <label htmlFor="blogText">Blog Text:</label>
              <textarea
                id="blogText"
                name="blogText"
                value={formData.blogText}
                onChange={handleChange}
                style={{ height: "300px", width: "100%", resize: "vertical" }}
              />
            </div>
            <div className="DashProfileInput">
              <label htmlFor="blogTitle">Blog Title:</label>
              <input
                type="text"
                id="blogTitle"
                name="blogTitle"
                value={formData.blogTitle}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </div>
            <div className="DashProfileInput">
              <label htmlFor="blogTag">Blog Tag:</label>
              <input
                type="text"
                id="blogTag"
                name="blogTag"
                value={formData.blogTag}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </div>
            <div className="DashProfileInput">
              <label htmlFor="blogImage">Blog Image:</label>
              <input
                type="file" // Change the input type to file
                id="blogImage"
                name="blogImage"
                onChange={(e) => setSelectedImage(e.target.files[0])}
                accept="image/*"
                style={{ width: "100%" }}
                className="p-1"
              />
            </div>
            <Button className="mt-4" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DashBoardBlogs;
