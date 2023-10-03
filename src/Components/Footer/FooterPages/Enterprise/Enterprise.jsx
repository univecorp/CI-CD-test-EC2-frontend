import { Button, Col, Container, Modal, Row } from "react-bootstrap";

import img1 from "./custom-growth-plan.jpeg";
import img2 from "./training.jpeg";

import { useState } from "react";
import config from "../../../../config/apiConfig";
import PageTitle from "../../../Common/PageTitle";
import Header from "../../../Header/Header";
import Footer from "../../Footer";
import "./Enterprise.css";
import img3 from "./best.jpeg";

export default function Enterprise() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [queries, setQueries] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");

    setPhoneNumber("");
    setPhoneNumber("");
    setQueries("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      pageNames: "unive-for-enterprise",
      name,
      email,
      phoneNumber,
      queries,
    };

    fetch(`${config.apiUrl}/footerpages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API response:", formData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    resetForm();
  };
  return (
    <div>
      <PageTitle title="ইউনিভ এন্টারপ্রাইজ" />
      <Header />
      {/* top part */}
      <Container data-aos="fade-down" className="my-5 mb-4">
        <section className="text-center ">
          <h2 className="ent-header">
            আপনার কোম্পানীর এমপ্লয়ীদের ট্রেইনিং এর জন্য আল্টিমেট প্ল্যাটফর্ম
          </h2>
          <h4 className="ent-sub-header ps-1">
            পার্সোনালাইজড লার্নিং এবং অনবোর্ডিং হোক ইউনিভ এর সাথে <br />
          </h4>
          <div className=" mt-3">
            <Button
              className="p-3 m-3 bluebtns mb-5"
              href="#"
              onClick={handleShow}
            >
              যোগাযোগ করুন
            </Button>
          </div>
          <div>
            <img
              className="img-fluid w-75"
              src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/OtherImagesandVideo/images/enterprise/top.png"
              alt=""
            />
          </div>
        </section>
      </Container>
      {/* Complete Enablement Toolkit */}
      <Container data-aos="fade-up-right" fluid className="text-center py-5 ">
        {/* 1st row */}
        <section className="container mt-5">
          <h1 className="ent-head-two">
            Unive এন্টারপ্রাইজ সলিউশন ব্যবহার করে আপনার টীম কে কন্টিনিউয়াস
            ডেভেলপ করুন
          </h1>
          {/* Enable Engineer */}
          <Row className="my-5">
            <Col xs={12} md={6} className="mb-3">
              <img className="img-fluid" src={img3} alt="" />
            </Col>
            <Col xs={12} md={6}>
              <h3 className="text-start ent-sub-one">
                আপনার এমপ্লয়ীদের থেকে বেস্ট <br></br> পারফরম্যান্স বের করে আনুন
              </h3>
              <p className="text-start ent-sub-two">
                আপনার কোম্পানীর এমপ্লয়ীরা যাতে তাদের সেরাটা কোম্পানি কে দিতে
                পারে সেজন্য তাদের প্রতিনিয়ত আপটুডেট রাখা এবং প্রয়োজনীয় সফট
                এবং হার্ড স্কিল এর ট্রেইনিং হতে পারে ইউনিভে।
              </p>
              <div className="text-start">
                <p className="ent-sub-three">
                  {" "}
                  সম্পূর্ণ পার্সোনালাইজড জাস্ট ইন টাইম লার্নিং এর সুবিধা।
                </p>
                <p className="ent-sub-four">
                  {" "}
                  এমপ্লয়ীদের অন ডিমান্ড ট্রেইনিং দিন অ্যাক্টিভ লার্নিং এর
                  মাধ্যমে। এজাইল মেথডে এমপ্লয়ীরা ও শিখে ফেলবে নতুন স্কিলস
                  দ্রুততার সাথে।
                </p>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
      {/* 2nd row */}
      <Container data-aos="fade-left">
        <Row>
          <Col xs={12} md={6}>
            <h3 className="ent-sub-one">কাস্টম গ্রোথ প্ল্যান</h3>
            <p className="text-start ent-sub-two">
              কোম্পানি এর মাঝে রাইজিং স্টার দের খুঁজে বের করুন এবং তাদের জন্য
              কাস্টম গ্রোথ প্ল্যান ডিজাইন করুন কোম্পানি এর লং টার্ম ফিউচার কে
              লক্ষ্য করে।
            </p>
            <div className="text-start ">
              <p className="ent-sub-three">
                {" "}
                মনিটর করুন টীম বা যেকোনো এমপ্লয়ী এর প্রগ্রেস
              </p>
              <p className="ent-sub-four">
                টীম বা এমপ্লয়ী এর রিয়েল টাইম লার্নিং এবং স্কিল প্রগ্রেস দেখুন
                ড্যাশবোর্ড এর মাধ্যমে। প্রমোশন বা দায়িত্ব প্রদানের ক্ষেত্রে যা
                হতে পারে গুরুত্বপূর্ণ একটি সিগনাল।
              </p>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <img className="img-fluid" src={img1} alt="" />
          </Col>
        </Row>
      </Container>
      {/* 3rd row */}
      <Container data-aos="fade-right" fluid className="text-center py-5 ">
        <section className="container mt-5">
          <Row className="my-5">
            <Col xs={12} md={6} className="mb-3">
              <img className="img-fluid" src={img2} alt="" />
            </Col>
            <Col xs={12} md={6}>
              <h3 className="ent-sub-one me-4">
                ট্রেইনিং ম্যাটেরিয়ালস অ্যাকসেস করুন সবসময়
              </h3>
              <p className="text-start ent-sub-two">
                যে কোনো জায়গা থেকে, যেকোনো ডিভাইস থেকে, অনলাইন বা অফলাইন যে
                কোনো অবস্থায় ট্রেইনিং ম্যাটেরিয়ালস আপনার হাতের নাগালে। ওয়েব
                বা অ্যাপ থেকে অ্যাকসেস করুন ইন্টারনেট ছাড়া।
              </p>
              <div className="text-start">
                <p className="ent-sub-three">শিখুন অফলাইনে</p>
                <p className="ent-sub-four">
                  ট্রেইনিং ম্যাটেরিয়ালস বা কোর্স কন্টেন্ট ডাউনলোড করে শিখুন
                  অফলাইনে। নোট লিখে রাখুন এবং নিজেকে যাচাই করুন কুইজলেট দিয়ে।
                </p>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
      {/* 4th row */}
      <Container data-aos="fade-left ">
        <Row>
          <Col xs={12} md={6}>
            <h3 className="ent-sub-one">
              কোনো ফিজিক্যাল এবং টেকনোলজিক্যাল সেটআপ ছাড়াই দ্রুত শিখান Unive এ!
            </h3>
            <p className="text-start ent-sub-two">
              কোনো ডেভ এনভায়রনমেন্ট সেট করার প্রয়োজন নেই। ব্রাউজারেই
              ইন্টারেক্টিভলি কোড লিখুন এবং রান করুন।{" "}
            </p>
            <div className="text-start">
              <p className="ent-sub-three">অন দি গো আইটি ট্রেইনিং</p>
              <p className="ent-sub-four">
                ব্রাউজার দিয়ে ডামি ওয়ার্কস্পেস এনভায়রনমেন্টে দিন আইটি
                ট্রেইনিং।{" "}
              </p>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <img
              className="img-fluid"
              src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/OtherImagesandVideo/images/enterprise/row-4-1.png"
              alt=""
            />
          </Col>
        </Row>
      </Container>

      <br></br>

      <Footer />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h2 className="mx-auto ps-5">Please Fill up the form</h2>
        </Modal.Header>
        <Modal.Body>
          <Container className="py-2">
            <form className="form-hr" onSubmit={handleSubmit}>
              <input
                className="input-modal-hr"
                type="text"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              <input
                className="input-modal-hr"
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input
                className="input-modal-hr"
                type="text"
                placeholder="Enter your Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              ></input>
              <textarea
                className="input-modal-hr"
                type="text"
                placeholder="Enter your Queries"
                value={queries}
                onChange={(e) => setQueries(e.target.value)}
              ></textarea>

              <input className="submit-input-tag" type="submit"></input>
            </form>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}
