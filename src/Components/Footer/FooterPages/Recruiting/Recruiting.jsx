import { useState } from "react";
import { Accordion, Button, Col, Container, Modal, Row } from "react-bootstrap";
import config from "../../../../config/apiConfig";
import Companies from "../../../Common/Companies";
import PageTitle from "../../../Common/PageTitle";
import Header from "../../../Header/Header";
import Form from "../../../Home/Form/Form.jsx";
import Footer from "../../Footer";
import "./Recruiting.css";
export default function Recruiting() {
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
      pageNames: "unive-for-hr-recruiting",
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
    <>
      <Header />
      <PageTitle title="ইউনিভ রিক্রুটমেন্ট" />
      {/* top */}
      <Container className="main-cont">
        <Row data-aos="fade-up" className="my-5">
          <Col xs={12} md={7} className="text-start ms-3 mb-3">
            <h2 className="rec-header">
              আপনার প্রতিষ্ঠানের জন্য এমপ্লয়ী <br /> খুঁজুন খুব সহজে ইউনিভ এর
              মাধ্যমে।
            </h2>
            <h4 className="my-4 mx-1 rec-para">
              ডিজাইন করুন ইন্টারভিউ প্রিপারেশন কোর্স এবং সম্পূর্ণ রিক্রুটমেন্ট
              প্রসেস সম্পন্ন করুন আমাদের প্লাটফর্মে। <br /> শুধুমাত্র যোগ্য
              ক্যান্ডিডেটদের ইন্টারভিউ নেওয়ার আয়োজন করে ইউনিভ আপনার
              প্রতিষ্ঠানের প্রোডাক্টিভিটি লস বাঁচিয়ে দেয়। <br />
            </h4>
            {/* click button */}
            <Button className="p-3 mt-3 bluebtns" onClick={handleShow}>
              ট্রাই করুন ইউনিভ ফর রিক্রুটমেন্ট
            </Button>
          </Col>
          <Col xs={12} md={4}>
            <img
              className="img-fluid"
              src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/OtherImagesandVideo/images/hr/hr.png"
              alt=""
            />
          </Col>
        </Row>
      </Container>
      {/* logos */}
      <Container data-aos="fade-down" fluid>
        <Container>
          <h5 className="text-center  sub-header-rec">
            ইউনিভ এর রিক্রুটমেন্ট প্ল্যাটফর্ম ইউজ করছে দেশের ইন্ডাস্ট্রি লিডিং
            কোম্পানিরা
          </h5>
          <Companies />
        </Container>
      </Container>
      {/* empower */}
      <Container data-aos="fade-up" className="text-center my-5">
        <h2 className="can-sub-rec">
          আপনার ক্যান্ডিডেটদের জব রোল এর জন্য প্রস্তুত করুন ইউনিভে।
        </h2>
        <h5 className="can-sub-rec-one my-4">
          আমাদের রিক্রুটিং প্ল্যান আপনার প্রতিষ্ঠানের জব এর জন্য প্রয়োজনীয়
          নলেজ এবং প্র্যাক্টিস সম্বলিত কোর্স তৈরি করতে আপনাকে সাহায্য করবে।
        </h5>
        <Row className="row-img-one">
          <Col xs={12} md={7}>
            <img
              className="img-fluid"
              src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/OtherImagesandVideo/images/hr/search.png"
              alt=""
            />
          </Col>
          <Col xs={12} md={5}>
            <h2 className="img-text-one text-start">
              বাছাই করুন যোগ্য ক্যান্ডিডেট <br></br> অতিরিক্ত সময় নষ্ট করা
              ছাড়া।
            </h2>
            <h5 className="img-text-sub-one my-4 text-start">
              প্রার্থী বাছাই করতে আপনার প্রতিষ্ঠানের যে গুরুত্বপূর্ণ প্রোডাক্টিভ
              টাইম নষ্ট হচ্ছে তা কমিয়ে আনতে ব্যবহার করতে পারেন ইউনিভ।
            </h5>
          </Col>
        </Row>
      </Container>

      <Container data-aos="fade-up-left" className="text-center my-5 ">
        <Row className="row-img-one">
          <Col xs={12} md={5}>
            <h2 className="img-text-one text-start">
              বেস্ট ক্যান্ডিডেট বাছাই করুন <br></br> সমগ্র বাংলাদেশ থেকে
            </h2>
            <h5 className="img-text-sub-one  my-4 text-start">
              বেশিরভাগ ক্ষেত্রেই রেফারেন্স এর মাধ্যমে প্রার্থী বাছাইয়ে উঠে আসে
              না যোগ্য প্রার্থী। এক গবেষণায় দেখা গেছে, যথার্থ রিক্রুটমেন্ট
              প্রসেসের মাধ্যমে যোগ্য প্রার্থী বাছাই করে আপনার প্রতিষ্ঠানের
              প্রোডাক্টিভিটি বাড়ানো সম্ভব ৫০% পর্যন্ত! ইউনিভ নিশ্চিত করে আপনি
              আপনার জব প্লেসমেন্ট এর জন্য সবচেয়ে যোগ্য প্রার্থী নির্বাচিত
              করছেন।
            </h5>
          </Col>
          <Col xs={12} md={7}>
            <img
              className="img-fluid"
              src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/OtherImagesandVideo/images/hr/resume.png"
              alt=""
            />
          </Col>
        </Row>
      </Container>
      <Container data-aos="fade-up-right" className="text-center my-5">
        <Row className="row-img-one">
          <Col xs={12} md={7}>
            <img
              className="img-fluid"
              src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/OtherImagesandVideo/images/hr/search.png"
              alt=""
            />
          </Col>
          <Col xs={12} md={5}>
            <h2 className="img-text-one text-start">
              ট্রেইনিং ম্যাটেরিয়ালস ঠিক আপনার <br></br> কোম্পানি এর জব রোলটির
              জন্য
            </h2>
            <p className="img-text-sub-one my-2 text-start">
              আমরা নিশ্চিত করবো আপনার কোম্পানী এর জব রোলের চাহিদা অনুসারে
              কাষ্টমাইজ্ড ট্রেইনিং পাথ যাতে করে ক্যান্ডিডেট তার সেরা
              পারফরম্যান্স দিতে পারে।
            </p>
            <p className="img-text-sub-two  text-start">
              পরবর্তীতে একই জব রোলের জন্য আপডেটেড ট্রেইনিং ম্যাটেরিয়ালস দিয়ে
              ক্যান্ডিডেট বাছাই করতে পারবেন খুব সহজেই।
            </p>
          </Col>
        </Row>
      </Container>
      <Container data-aos="fade-up-left " className="text-center ">
        <Row className="row-img-one">
          <Col xs={12} md={5}>
            <h2 className="img-text-one text-start">
              দিন বেটার ক্যান্ডিডেট এক্সপেরিয়েন্স!
            </h2>
            <p className="img-text-sub-one my-2 text-start">
              পজিটিভ ইন্টারভিউ এক্সপেরিয়েন্স একজন ক্যান্ডিডেটকে আপনার
              প্রতিষ্ঠানের প্রতি আরো ইন্টারেস্টেড করে তুলে এবং আপনার প্রতিষ্ঠান
              বা ব্র্যান্ডের ভ্যালু বৃদ্ধি করে।
            </p>
          </Col>

          <Col xs={12} md={7} className="second-img-column">
            <img
              className="img-fluid "
              src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/OtherImagesandVideo/images/hr/loud.png"
              alt=""
            />
          </Col>
        </Row>
      </Container>
      {/* contact */}

      <div className="form-sec">
        <Form></Form>
      </div>

      {/* faq */}
      <Container data-aos="fade-down" className="text-center my-5">
        <h2 className="my-5 faq-header">কিছু কমন প্রশ্ন</h2>

        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Unive এর ট্রেইনিং বা কোর্স ম্যাটেরিয়ালস এর বিশেষত্ব কি?
            </Accordion.Header>
            <Accordion.Body>
              Unive এ আমরা বিশ্বাস করি ফর্মুলা মনে রাখা বা মুখস্ত রাখা বা
              ইনস্টিটিউশনের রেজাল্ট ক্যান্ডিডেট নির্বাচনে অতটা গুরুত্বপূর্ণ নয়
              যতটা গুরুত্বপূর্ণ নলেজ এর প্র্যাককটিক্যাল প্রয়োগ, যেকোনো সমস্যা
              সমাধানে অ্যানালিটিক্যাল অ্যাবিলিটি, বুদ্ধিমান চিন্তার ধরন,গ্রোথ
              মাইন্ডসেট। সেজন্য আমাদের ট্রেইনিং ম্যাটেরিয়ালস এর মূল উদ্দেশ্য
              প্রাকটিক্যাল কন্টেন্টস।
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>রিক্রুটিং প্ল্যান কাদের জন্য?</Accordion.Header>
            <Accordion.Body>
              রিক্রুটিং প্ল্যান হচ্ছে সে সব কোম্পানিদের জন্য যারা প্রতিনিয়ত
              এমপ্লয়ীজ রিক্রুট করছেন, যারা ইকুয়াল অপরচুনিটি তে বিশ্বাস করেন
              এবং ক্যান্ডিডেট কে ভালো রিক্রুটিং এক্সপেরিয়েন্স দিতে চান।
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              আপনাদের সাথে লিংকডইন, বি ডি জবস ইত্যাদি এর পার্থক্য কি?
            </Accordion.Header>
            <Accordion.Body>
              অন্যান্য প্ল্যাটফর্ম এর সাথে আমাদের পার্থক্য হচ্ছে অন্যান্য রা
              টোটাল রিক্রুটমেন্ট প্রসেস এর একটি অংশ নিয়ে কাজ করছে। অন্যদিকে,
              Unive এর রিক্রুটিং প্ল্যাটফর্ম পুরো রিক্রুটমেন্ট জার্নি এর জন্য
              একটি কমপ্লিট সলিউশন।
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>
              আমরা কি ক্যান্ডিডেট এর পারফরম্যান্স ট্র্যাক করতে পারবো?
            </Accordion.Header>
            <Accordion.Body>
              হ্যাঁ| আপনারা কোম্পানি এর অ্যাডমিন প্যানেল থেকে আপনাদের
              ক্যান্ডিডেট এর পারফরম্যান্স ট্র্যাক করতে পারবেন এবং এ থেকে
              ক্যান্ডিডেট এর ডেডিকেশন এবং কমপিটেন্সি এর ধারণাও পেয়ে যাবেন।
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>

      <Container fluid className=" py-5 text-center">
        <h2 className=" my-2  ready-start ">রেডী টু স্টার্ট?</h2>
        <p className=" my-4 smallText ready-start-sub ">
          আপনি যদি আগ্রহী হন তাহলে যোগাযোগ করুন আমাদের টিম এর সাথে।
        </p>
      </Container>
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
    </>
  );
}
