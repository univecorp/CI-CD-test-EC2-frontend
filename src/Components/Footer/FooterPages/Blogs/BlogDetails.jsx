import { format } from "date-fns";
import React from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../../Common/PageTitle";
import Header from "../../../Header/Header";
import { useGetBlogsByIdQuery } from "../../../redux/rtk/features/Blogs/BlogsApi";
import Footer from "../../Footer";
import "./Blogs.css";
function BlogDetails() {
  const { id } = useParams();
  const { data } = useGetBlogsByIdQuery(id);
  console.log(data);
  const blog = data?.data;
  const formattedDate = blog?.createdAt
    ? format(new Date(blog.createdAt), "MMM-dd-yyyy")
    : "";
  const blogText = blog?.blogText;
  const paragraphs = blogText?.split("\n\n").map((paragraph, index) => {
    const lines = paragraph?.split("\n").map((line, index) => {
      if (line.startsWith("* ")) {
        // Unordered List Item
        const listItem = line.substring(2);
        return <li key={index}>{listItem}</li>;
      } else if (line.startsWith("1. ")) {
        // Ordered List Item
        const listItem = line.substring(3);
        return <li key={index}>{listItem}</li>;
      } else if (line.startsWith("# ")) {
        // Heading 1
        const heading = line.substring(2);
        return <h1 key={index}>{heading}</h1>;
      } else if (line.startsWith("## ")) {
        // Heading 2
        const heading = line.substring(3);
        return <h2 key={index}>{heading}</h2>;
      } else if (line.startsWith("**")) {
        // Bold Text
        const boldText = line.substring(2, line.length - 2);
        return <strong key={index}>{boldText}</strong>;
      } else if (line.startsWith("_")) {
        // Italic Text
        const italicText = line.substring(1, line.length - 1);
        return <em key={index}>{italicText}</em>;
      } else if (line.startsWith("~~")) {
        // Strikethrough Text
        const strikethroughText = line.substring(2, line.length - 2);
        return <s key={index}>{strikethroughText}</s>;
      } else if (line.startsWith("__")) {
        // Underlined Text
        const underlinedText = line.substring(2, line.length - 2);
        return <u key={index}>{underlinedText}</u>;
      } else {
        // Normal Text
        return (
          <span key={index}>
            {line}
            <br />
          </span>
        );
      }
    });
    return <p key={index}>{lines}</p>;
  });
  return (
    <div>
      <PageTitle title={blog?.blogTitle} />
      <Header></Header>
      <div className="container">
        <img className="blog-Bigimage mt-5" src={blog?.BlogImage} alt="" />
        <p className="blogtitles mt-5">{blog?.blogTitle}</p>
        <div>
          <div>
            <p className="blogerName">{blog?.bloggerName}</p>
            <p className="text-secondary mb-5">{formattedDate}, 5 min read</p>
          </div>
          <div></div>
        </div>
        <p className="blogPara">{paragraphs}</p>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default BlogDetails;
