import React, { Suspense } from "react";
import { NavLink } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import PageTitle from "./../Common/PageTitle";
import FacebookChat from "./FacebookChat";
import Form from "./Form/Form";
import Course from "./StaticCourses/Course";
import Testmonial from "./Testimonial/Testimonial";
import UniveWhy from "./UniveWhy/UniveWhy";
import img1 from "./videothumb.png";
import "./home.css";
import ReactPlayer from "react-player";

const Companies = React.lazy(() => import("../Common/Companies"));

export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
        <PageTitle title="ইউনিভ" />
        <div className=" container-fluid headerStyle">
          <div className="row justify-content-center align-items-center">
            <div className="col-5 text-center">
              <img
                className="headerimg"
                src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/UniveBanner/Image.png"
                alt=""
              />
            </div>
            <div className="col-7 container bannerside">
              <div className="headerText">
                <h1 className="headertwo">জব ট্রেনিং</h1>
                <h1 className="headertwo">
                  <span className="sup-text">থেকে</span>
                  রিক্রুটমেন্ট
                </h1>
                <h1 className="headerone">সবই এখন এক প্লাটফর্মে!</h1>
              </div>
              <div className="headerButton">
                <NavLink to="/unive-for-individual">
                  {" "}
                  <button className="firstButton">আমি শিখতে চাই</button>
                </NavLink>

                <NavLink to="/jobs">
                  <button className="SecondButton">আমি জব খুঁজছি </button>
                </NavLink>

                <NavLink to="/unive-for-hr-recruiting">
                  {" "}
                  <button className="firstButton">আমি কর্মী খুঁজছি</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <section className="d-flex justify-content-evenly video-section">
          <div className="videodiv">
            {/* <img src={img1} alt="Video Thumbnail" className="thumbnail" /> */}
            {/* <video
              className="vid"
              loop="true"
              src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/UniveHomeVideo/UniveReview.mp4"
              controls
            /> */}

            <ReactPlayer
              className="vid"
              url="https://youtu.be/FV2mbwKKi0Q?si=tuB_u2YQ8GwtaLK5"
              controls
              youtubeConfig={{
                playerVars: {
                  modestbranding: 1, // Hide YouTube logo
                  showinfo: 0, // Hide video title and player actions
                },
              }}
            />
          </div>

          {/* <VideoRender/> */}

          <div className="second-section-div">
            {/* <h6 className="d-inline header-second">
              টেকনিক্যাল ট্রেইনিং | স্কিল অ্যাসেসমেন্ট | টেকনিক্যাল রিক্রুটমেন্ট
            </h6> */}

            <p className=" second-header-desc">
              হ্যান্ডস অন টেকনিক্যাল স্কিল শিখুন যেকোনো জায়গা থেকে। সেই সাথে
              স্কিল টেস্ট করে নিজের যোগ্যতা প্রমাণ করে জব নিশ্চিত করুন আপনার
              পছন্দসই ইন্ডাস্ট্রি তে!
            </p>
          </div>
        </section>
        <section className="third-section-div">
          <h4 className="fw-bolder local course-header mb-4 pt-5 ps-5 text-light fs-2 third-section-header">
            আমাদের কোর্সসমূহ
          </h4>
          <Course></Course>
        </section>
        {/* why unive  */}
        <UniveWhy />
        {/* testimonials */}
        <Testmonial></Testmonial>
        {/* Form */}
        <Form />
        {/* partners */}
        <h1
          className="header-company  text-center "
          style={{ marginTop: "12rem", marginBottom: "5rem" }}
        >
          আমাদের পার্টনার্স
        </h1>
        <Companies></Companies>
        {/* <MessengerCustomerChat
          pageId="103658422156150"
          appId="563733835761352"
          htmlRef="<REF_STRING>"
        /> */}
        <FacebookChat />
        <Footer />
      </Suspense>
    </>
  );
}
