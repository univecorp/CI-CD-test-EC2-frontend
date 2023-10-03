import React from "react";
import { Accordion, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./NoFound.css";
const Nopage = () => {
  return (
    // 404 image
    <>
      <Header />
      <Container className="text-center my-5 py-5 ">
        {/* <img src={pic} alt="" className='img-fluid'  /> */}
        <h3 className="no-found-header">
          আপনি যেই পেজটি খুঁজছেন <br /> এটি বর্তমানে পাওয়া যাচ্ছে না
        </h3>
        <NavLink to="/">
          <h3 className="my-5 text-decoration-underline">Go Home</h3>
        </NavLink>
      </Container>
      <Footer></Footer>
    </>
  );
};
export default Nopage;
