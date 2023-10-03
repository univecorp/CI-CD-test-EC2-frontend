import { Button, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Header from "../../../Header/Header";
import useData from "../../../Courses/FetchCourseFromAPI/dataload";
import Footer from "../../Footer";
import img1 from './Interior-Design-Course-Thumbnail 1.png'
import "./Assessment.css";

export default function Assessments() {


  const [item] = useData();
  return (
    <>
      <Header />

      <div className="container-fluid assesections">
        <div className="content">
          <h2 className="main-head-two-assessment">
            আপনার স্কিল গ্যাপ খুঁজে বের করুন!
          </h2>
          <p className="assessment-para ">
            অ্যাসেসমেন্টের মাধ্যমে যে বিষয় গুলোতে আপনার স্কিল গ্যাপ আছে কিংবা
            <br /> ইমপ্রুভ এর সুযোগ আছে তা চিহ্নিত করতে পারবেন।
          </p>
          <div className="bluebtns MButtons">
            <NavLink to="/job_browse">
              <button className="assessment-btns">ট্রাই করুন ইউনিভ জবস</button>
            </NavLink>
          </div>
        </div>
      </div>

      <Container data-aos="fade-up-left" className="main-bod">
        <Row className="g-4">
          {/* course card left side */}
          <Col xs={6}>
            {item.slice(0, item.length / 2).map((id) => (
              <Row
                key={id._id}
                xs={1}
                className="g-3 my-3 mb-4 assessment-main-divs"
              >
                <Col xs={12} md={4}>
                  <img className="img-fluid " src={img1} alt="" />
                </Col>
                <Col xs={12} md={8}>
                  <h5 className="assessment-head">অ্যাসেসমেন্ট</h5>
                  <h2 className="my-2 text-start ass-course-name">
                    {id.coursename}
                  </h2>
                  <NavLink to={`/learn/${id.coursename}`}>
                    <Button
                      className="prev-btn"
                      variant="py-2 px-5 d-block my-5 me-3 ms-auto"
                    >
                      Preview
                    </Button>
                  </NavLink>
                </Col>
              </Row>
            ))}
          </Col>
          {/* course card right side */}
          <Col xs={6}>
            {item.slice(item.length / 2, item.length).map((id) => (
              <Row
                key={id._id}
                xs={1}
                className="g-3 my-3 mb-4 assessment-main-divs"
              >
                <Col xs={12} md={4}>
                  <img className="img-fluid " src={img1} alt="" />
                </Col>
                <Col xs={12} md={8}>
                  <h5 className="assessment-head">অ্যাসেসমেন্ট</h5>
                  <h2 className="my-2 text-start ass-course-name">
                    {id.coursename}
                  </h2>
                  <NavLink to={`/learn/${id.coursename}`}>
                    {" "}
                    <Button
                      className=" prev-btn"
                      variant="py-2 px-5 d-block my-5 me-3 ms-auto"
                    >
                      {" "}
                      Preview
                    </Button>
                  </NavLink>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
        {/* course section ends */}
      </Container>

      <Footer />
    </>
  );
}
