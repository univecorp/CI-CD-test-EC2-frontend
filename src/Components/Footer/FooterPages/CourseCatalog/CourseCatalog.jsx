// import { useEffect, useState } from "react";
// import { Button, Container, Row, Spinner } from "react-bootstrap";
// import { useParams } from "react-router-dom";
// import CourseCard from "../../../Common/ShowSingleCourse";
// import RestCourses from "../../../Common/RestCourses";
// import Header from "../../../Header/Header";
// import dr from "../../../images/icons8-down-arrow-40.png";
// import Footer from "../../Footer";

// export default function CourseCatalog() {
//   const { tag } = useParams();
//   // local state
//   const [course, setCourse] = useState([]);
//   const [disp, setdisp] = useState(false);
//   // display more or less course
//   const handleShow = () => {
//     setdisp(!disp);
//   };
//   // loading daat
//   useEffect(() => {
//     fetch(`https://api.unive.com.bd/api/courses/${tag}`)
//       .then((res) => res.json())
//       .then((data) => setCourse(data));
//   }, [tag]);

//   return (
//     <>
//       <Header />
//       {!course.length === 0 && <Spinner animation="border" variant="danger" />}
//       {course.length > 0 && (
//         <Container className="my-5">
//           <h2 className="text-center">
//             Explore the {tag === "IT" ? "IT" : "Technical"} Courses
//           </h2>
//           <hr className=" w-50 fw-bold  mx-auto" />
//           <Row xs={1} md={3} className="g-4 bigMargin">
//             {course.slice(0, 5).map((id) => (
//               <CourseCard id={id} />
//             ))}
//             <RestCourses show={disp} courses={course.slice(5)} />
//           </Row>
//           <Button
//             className="my-5 px-5 py-3"
//             onClick={handleShow}
//             variant="outline-dark"
//           >
//             {!disp ? "show more" : "show Less"}{" "}
//             <img src={dr} height={22} alt="" />
//           </Button>
//         </Container>
//       )}
//       <Footer />
//     </>
//   );
// }
