import React, { Suspense } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Header from "../../../Header/Header";
import Footer from "../../Footer";

import { BsCheck2Circle } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import config from "../../../../config/apiConfig";
import PageTitle from "../../../Common/PageTitle";
import "./forIndividual.css";

const Companies = React.lazy(() => import("../../../Common/Companies"));

export default function Unlimited() {
  const handleCardClick = (pageNames, cardNames) => {
    fetch(`${config.apiUrl}/footerpages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pageNames, cardNames }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response if needed
        console.log(data);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };
  return (
    <>
      <Header />
      <PageTitle title="ইউনিভের সাথে শিখুন " />
      {/* top part */}
      <Container data-aos="fade-up-right" className="my-5">
        <section className="text-center ">
          <h2 className="unlimited-head">
            ক্যারিয়ারে এগিয়ে থাকুন Unive এর সাথে
          </h2>
          <h4 className=" mt-3 unlimited-head-para mx-auto">
            যারা ক্যারিয়ারে উত্তরোত্তর সাফল্য লাভ করেন তাদের সাফল্যের কারণ তারা
            প্রতিনিয়ত নতুন নতুন স্কিল শিখছেন। <br /> Unive এর মাধ্যমে আপনিও
            থাকতে পারেন আপ টু ডেট এবং নতুন নতুন স্কিল যোগ করতে পারেন নিজের
            ক্যারিয়ারে।
          </h4>
        </section>
      </Container>
      <Suspense>
        <Container
          fluid
          data-aos="fade-up-left"
          className="middle text-center my-5"
        >
          {/* price card */}

          <section className="container mt-5">
            <Row className="my-5">
              {/* first plan */}
              <Col xs={12} md={4} className="mt-5 mb-4">
                <Card className="text-center pt-5 carding-main">
                  <Card.Title className="title-plan"> ফ্রী প্ল্যান </Card.Title>

                  <h4 className="money">
                    ০ টাকা<span className="month">/ মাস</span>
                  </h4>

                  <p></p>
                  <p className="fs-5"></p>

                  <p className="text-decoration-underline"></p>
                  <Card.Body className="text-start mx-auto my-3">
                    <p className=" pricing-text">
                      <BsCheck2Circle className="icon  me-2" />
                      আনলিমিটেড ট্রেনিং ভিডিও
                    </p>
                    <p className=" pricing-text">
                      <BsCheck2Circle className="icon  me-2" />১ টি স্কিল
                      অ্যাসেসমেন্ট এর সুযোগ/ মাস
                    </p>
                    <p className=" pricing-text">
                      <BsCheck2Circle className="icon me-2" />
                      রেগুলার ওয়েবিনার
                    </p>
                  </Card.Body>
                  <Card.Footer
                    className="foot-card"
                    onClick={() =>
                      handleCardClick("unive-learning", "Free Plan")
                    }
                  >
                    শুরু করুন
                  </Card.Footer>
                </Card>
              </Col>

              {/* 2nd plan */}
              <Col xs={12} md={4}>
                <Card
                  className="text-center pt-5 carding-main"
                  id="special-card"
                >
                  <Card.Title className="title-plan">
                    অ্যানুয়াল প্ল্যান
                  </Card.Title>
                  <p className="text-decoration-line-through dan-money">
                    ৫০০ টাকা/ মাস
                  </p>
                  <h4 className="money">
                    ২৫০ টাকা<span className="month">/ মাস</span>
                  </h4>
                  <p className="desc-para"> ৫০% ডিসকাউন্টে</p>
                  <p className="sub-desc-para">
                    ২৫০ টাকা/মাস করে ৩০০০ টাকা বছরে
                  </p>

                  <p className="text-decoration-underline"></p>
                  <Card.Body className="text-start mx-auto my-3">
                    <p className="pricing-text">
                      <BsCheck2Circle className="icon  me-2" />
                      লাইফটাইম ট্রেইনিং অ্যাকসেস অ্যান্ড কুইজ
                    </p>
                    <p className="pricing-text">
                      <BsCheck2Circle className="icon  me-2" />
                      ট্রেইনিং কম্পলিশন সার্টিফিকেট
                    </p>
                    <p className="pricing-text">
                      <BsCheck2Circle className="icon  me-2" />
                      নো লিমিট ইন্টারভিউ আয়োজন
                    </p>
                    <p className="pricing-text">
                      <BsCheck2Circle className="icon  me-2" />
                      ইন্টারন্যাশনাল জব প্লেসমেন্ট
                    </p>
                    <p className="pricing-text">
                      <BsCheck2Circle className="icon  me-2" />
                      জব সাপোর্ট ২৪/৭
                    </p>
                  </Card.Body>
                  <Card.Footer
                    className="foot-card"
                    onClick={() =>
                      handleCardClick("unive-learning", "Annual Plan")
                    }
                  >
                    শুরু করুন
                  </Card.Footer>
                </Card>
              </Col>
              {/* 3rd plan */}
              <Col xs={12} md={4} className="mt-5">
                <Card className="text-center pt-5 carding-main">
                  <Card.Title className="title-plan">গ্রোথ ট্র্যাক</Card.Title>
                  {/* <p className='text-decoration-line-through'></p> */}
                  <h4 className="money">
                    ১০০০ টাকা<span className="month">/ কোর্স </span>
                  </h4>
                  <p></p>
                  <p className="fs-5"></p>

                  <p className="text-decoration-underline"></p>
                  <Card.Body className="text-start mx-auto my-3">
                    <p className=" pricing-text">
                      <BsCheck2Circle className=" me-2 icon " />
                      আনলিমিটেড ট্রেইনিং কন্টেন্ট অ্যাকসেস অ্যান্ড কুইজ
                    </p>
                    <p className=" pricing-text">
                      <BsCheck2Circle className=" me-2 icon " />
                      ট্রেইনিং কম্পলিশন সার্টিফিকেট
                    </p>
                    <p className=" pricing-text">
                      <BsCheck2Circle className=" me-2 icon " />
                      কোর্স/ ট্রেইনিং রিলেটেড ইন্টারভিউ আয়োজন
                    </p>
                  </Card.Body>
                  <Card.Footer
                    className="foot-card"
                    onClick={() =>
                      handleCardClick("unive-learning", "Growth Plan")
                    }
                  >
                    শুরু করুন
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </section>

          <p className="top-middle-header">
            Unive এ শিখছে দেশের প্রথম সারির প্রতিষ্ঠান গুলোর এমপ্লয়ীরা এবং সেসব
            ইন্ডাস্ট্রিতে জব করতে ইচ্ছুক প্রার্থীরা
          </p>
          <Container>
            <Companies />
          </Container>
        </Container>
        {/* Course you need */}
        <Container data-aos="fade-up" className="middle-cont">
          <Row className="g-4 g-md-5 g-lg-5">
            <Col xs={12} md={4} className="text-center mb-3 ">
              <img
                src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/OtherImagesandVideo/images/unlimited/5187419.jpg"
                alt="someimage"
                className="img-fluid"
              />
              <h3 className="pt-2 middle-cont-head">জব ফোকাসড ট্রেইনিং</h3>
              <p className="middle-cont-para">
                প্রতিটি ট্রেইনিং ম্যাটেরিয়ালস কারেন্ট ডিমান্ডিং জবস এর উপর
                ফোকাস করে তৈরি করা। ট্রেইনিং করে নিজেকে এগিয়ে রাখুন জব রোলের
                জন্য। সাধারণত এমপ্লয়ার তাকেই নেয় যে জব সম্পর্কে ভালো আইডিয়া
                রাখে।
              </p>
            </Col>
            <Col xs={12} md={4} className="text-center mb-3">
              <img
                src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/OtherImagesandVideo/images/unlimited/pale-job-search.png"
                alt="someimage"
                className="img-fluid"
              />
              <h3 className="pt-2 middle-cont-head">ল্যান্ড ইন ইউর ড্রিম জব</h3>
              <p className="middle-cont-para">
                ট্রেইনিং বা অ্যাসেসমেন্ট এ ভালো ফলাফল করে ল্যান্ড করুন আপনার
                ড্রিম জবে। ভালো ফলাফল করা আপনার দায়িত্ব, বাদবাকি আমাদের।
              </p>
            </Col>
            <Col xs={12} md={4} className="text-center ">
              <img
                src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/OtherImagesandVideo/images/unlimited/jaconda-planning-1.png"
                alt="someimage"
                className="img-fluid"
              />
              <h3 className=" middle-cont-head">
                যেকোনো সময় ক্যান্সেল করুন আপনার প্ল্যান
              </h3>
              <p className="middle-cont-para mt-1">
                আপনার যদি ভালো না লাগে যেকোনো সময় ক্যান্সেল করুন আপনার প্ল্যান।
                যে ট্রেইনিং আপনি কিনছেন বা শেষ করেছেন তার অ্যাকসেস এবং
                সার্টিফিকেশন তো থাকছেই সবসময়।{" "}
              </p>
            </Col>
          </Row>
          <Row className="my-5 py-5 smallCenter">
            <Col xs={12} md={6} className="my-5 py-5">
              <h3 className="cert-header">
                এমপ্লয়ারদের কাছে স্কিল শো অফ করুন
              </h3>
              <p className="cert-para">
                অ্যাসেসমেন্ট এর মাধ্যমে টেস্ট করুন স্কিল <br /> কিংবা
                সার্টিফিকেট এর মাধ্যমে শো অফ করুন স্কিল।
              </p>
            </Col>
            <Col xs={12} md={6}>
              <img
                src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/OtherImagesandVideo/images/unlimited/certi.png"
                className="img-fluid"
                alt=""
              />
            </Col>
          </Row>
        </Container>
      </Suspense>
      <Footer />
    </>
  );
}
