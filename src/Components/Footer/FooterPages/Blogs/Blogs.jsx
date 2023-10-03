import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../../Common/PageTitle";
import Header from "../../../Header/Header";
import { useGetBlogsQuery } from "../../../redux/rtk/features/Blogs/BlogsApi";
import Footer from "../../Footer";
import "./Blogs.css";
function Blogs() {
  const { data } = useGetBlogsQuery();
  const blogs = data?.data;

  const navigate = useNavigate();
  return (
    <div>
      <PageTitle title="ইউনিভ ব্লগস" />
      <Header></Header>
      <div className="container-fluid Blogsection"></div>
      <div className="container my-5">
        <div className="row g-5">
          {blogs &&
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="col-12 col-md-6 col-lg-4"
                onClick={() => navigate(`/blogDetails/${blog._id}`)}
              >
                <div className="card blogcard">
                  <img
                    src={blog?.BlogImage}
                    className="card-img-top img-fluid cardsImg"
                    alt={blog?.blogTitle}
                  />
                  <div className="Blogtopic">
                    <span className="BlogtopicName">{blog?.blogTag}</span>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title blogtitle my-2">
                      {blog?.blogTitle.slice(0, 50)}
                      {blog?.blogTitle.length > 50 ? "..." : ""}
                    </h5>
                    <p className="mt-4 blogPara">
                      {blog?.blogText.split(" ").length > 30 ? (
                        <>
                          {blog?.blogText.slice(0, 191)}
                          {blog?.blogText.length > 191 ? "..." : ""}
                          <span className="text-primary">See More</span>
                        </>
                      ) : (
                        blog?.blogText
                      )}
                    </p>
                    <hr className="w-100 fw-bolder mx-auto my-2" />
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="bloggerName">{blog?.bloggerName}</p>
                      <p className="blogdate text-muted">
                        {format(new Date(blog.createdAt), "MMM-dd-yyyy")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default Blogs;
