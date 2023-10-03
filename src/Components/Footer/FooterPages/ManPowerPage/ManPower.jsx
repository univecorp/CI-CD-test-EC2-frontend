import { useState } from "react";
import { Accordion, Button, Col, Container, Modal, Row } from "react-bootstrap";
import config from "../../../../config/apiConfig";
import Companies from "../../../Common/Companies";
import PageTitle from "../../../Common/PageTitle";
import Header from "../../../Header/Header";
import hr from "../../../images/hr/hr.png";
import loud from "../../../images/hr/loud.png";
import resume from "../../../images/hr/resume.png";
import search from "../../../images/hr/search.png";
import Footer from "../../Footer";
import "./ManPower.css";
export default function Maas() {
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
      pageNames: "manpower-as-a-service",
      name,
      email,
      phoneNumber,
      queries,
      subject,
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
      <PageTitle title="ম্যানপাওয়ার এন্টারপ্রাইজ" />
      <Header />
      {/* top */}
      <Container>
        <Row data-aos="fade-up" className="my-5">
          <Col xs={12} md={7} className="text-start ms-3 mb-3">
            <h2 className="fs-1 ">
              আপনার প্রতিষ্ঠানের বা প্রজেক্টের জন্য ম্যানপাওয়ার নিন ইউনিভ থেকে।
            </h2>
            <h4 className="my-4 mx-1 smallText">
              দেশে কিংবা বিদেশে যে কোনো ধরনের কাজে স্কিলড বা সেমি স্কিলড বা লো
              স্কিলড ম্যানপাওয়ার লাগলেআপনি কোনো রকম ঝামেলা ছাড়াই ম্যানপাওয়ার
              সার্ভিস নিশ্চিত করুন Unive থেকে।
            </h4>
            <Button className="p-3 mt-3 bluebtns" href="#" onClick={handleShow}>
              আরো জানতে কথা বলুন আমাদের সাথে
            </Button>
          </Col>
          <Col xs={12} md={4}>
            <img className="img-fluid " src={hr} alt="" />
          </Col>
        </Row>
      </Container>
      {/* logos */}
      <Container data-aos="fade-down" fluid className="middle">
        <Container>
          <h5 className="text-center my-5">
            ইউনিভ থেকে বাল্কে ম্যানপাওয়ার নিচ্ছে দেশে ও বিদেশের লিডিং
            ইন্ডাস্ট্রিস:
          </h5>
          <Companies />
        </Container>
      </Container>
      {/* empower */}
      <Container data-aos="fade-up" className="text-center my-5">
        <h2 className="fs-1">
          আপনার প্রজেক্ট বা কাজের জন্য মানানসই ম্যানপাওয়ার বাছাই করুন।
        </h2>
        <h5 className="smallText my-4">
          আমাদের সুবিশাল ম্যানপাওয়ার এর ডেটাবেজ থেকে আপনার কাজ সঠিক ভাবে
          সম্পন্ন করার জন্য অভিজ্ঞতাসম্পন্ন ম্যানপাওয়ার বেছে নিতে পারেন অন
          ডিমান্ড বেসিসে।{" "}
        </h5>
        <Row className="my-5">
          <Col xs={12} md={7}>
            <img className="img-fluid" src={search} alt="" />
          </Col>
          <Col xs={12} md={5}>
            <h2 className="fs-1 text-start">
              বাছাই করুন যোগ্য লোকবল অতিরিক্ত সময় নষ্ট করা ছাড়া।
            </h2>
            <h5 className="smallText my-4 text-start">
              ম্যানপাওয়ার বা লোকবল বাছাই করতে আপনার প্রতিষ্ঠানের যে
              গুরুত্বপূর্ণ প্রোডাক্টিভ টাইম নষ্ট হচ্ছে তা কমিয়ে আনতে ব্যবহার
              করতে পারেন ইউনিভ।
            </h5>
          </Col>
        </Row>
      </Container>
      <Container data-aos="fade-up-left" className="text-center my-5 middle">
        <Row className="my-5">
          <Col xs={12} md={5}>
            <h2 className="fs-1 text-start">
              ম্যানপাওয়ার নিন সমগ্র বাংলাদেশ থেকে বাংলাদেশ বা বিশ্বের যেকোনো
              প্রান্তে কাজ করার জন্য।
            </h2>
            <h5 className="smallText my-4 text-start">
              ম্যানপাওয়ার নিন সমগ্র বাংলাদেশ থেকে বিশ্বের যেকোনো প্রান্তে কাজ
              করার জন্য। আমাদের ম্যানপাওয়ার বিশ্বের যেকোনো প্রান্তে কাজ করতে
              সর্বদা প্রস্তুত। প্রত্যেকের পাসপোর্ট এবং নিজ নিজ কাজের স্কিল
              সার্টিফিকেট আছে যা আপনাকে ঠিক সময়ে সঠিক ভাবে কাজ ডেলিভারির
              নিশ্চয়তা দেয়।
            </h5>
          </Col>
          <Col xs={12} md={7}>
            <img className="img-fluid" src={resume} alt="" />
          </Col>
        </Row>
      </Container>
      <Container data-aos="fade-up-right" className="text-center my-5">
        <Row className="my-5">
          <Col xs={12} md={7}>
            <img className="img-fluid" src={search} alt="" />
          </Col>
          <Col xs={12} md={5}>
            <h2 className="fs-1 text-start">
              ট্রেইনিং ম্যাটেরিয়ালস ঠিক আপনার কোম্পানি বা প্রজেক্ট এর জবের জন্য
            </h2>
            <p className="smallText my-2 text-start">
              আমরা নিশ্চিত করবো আপনার কোম্পানী এর ম্যানপাওয়ার চাহিদা অনুসারে
              কাষ্টমাইজ্ড ট্রেইনিং পাথ যাতে করে বাছাইকৃত লোকবলরা তাদের সেরা
              পারফরম্যান্স দিতে পারে।
            </p>
            <p className="my-4 text-start">
              পরবর্তীতে একই জব রোলের জন্য আপডেটেড ট্রেইনিং ম্যাটেরিয়ালস দিয়ে
              ম্যানপাওয়ার বাছাই করতে পারবেন খুব সহজেই।
            </p>
          </Col>
        </Row>
      </Container>
      <Container
        data-aos="fade-up-left "
        className="text-center my-5 middle py-5"
      >
        <Row className="my-5">
          <Col xs={12} md={5}>
            <h2 className="fs-1 text-start">
              দক্ষ লোকবল জোগাড় করা আমাদের উপর ছেড়ে দিন।
            </h2>
            <p className="smallText my-2 text-start">
              আপনার কাজের জন্য ম্যানপাওয়ার বা লোকবল জোগাড় থেকে শুরু করে
              সম্পূর্ণ কাজ সমাধা করা আমাদের উপর ছেড়ে দিন যাতে আপনি গুরুত্বপূর্ণ
              কাজে সময় দিতে পারেন।
            </p>
          </Col>
          <Col xs={12} md={7}>
            <img className="img-fluid" src={loud} alt="" />
          </Col>
        </Row>
      </Container>
      {/* contact */}
      {/* <Container
        data-aos="fade-up"
        fluid
        className="bg-primary text-center py-5"
      >
        <h2 className="text-white">ইউনিভ সম্পর্কে আরও জানতে যোগাযোগ করুন!</h2>
        <Container className="bg-white bigWidth text-center mx-auto p-5 py-3">
          <ContactForm />
        </Container>
      </Container> */}
      {/* faq */}
      <Container data-aos="fade-down" className="bigWidth text-center my-5">
        <h2 className="my-5 fs-1">কিছু কমন প্রশ্ন</h2>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Unive এর ট্রেইনিং বা কোর্স ম্যাটেরিয়ালস এর বিশেষত্ব কি?
            </Accordion.Header>
            <Accordion.Body>
              Unive এ আমরা বিশ্বাস করি ফর্মুলা মনে রাখা বা মুখস্ত রাখা বা
              ইনস্টিটিউশনের রেজাল্ট ক্যান্ডিডেট নির্বাচনে অতটা গুরুত্বপূর্ণ নয়
              যতটা গুরুত্বপূর্ণ নলেজ এর প্র্যাকটিক্যাল প্রয়োগ, যেকোনো সমস্যা
              সমাধানে অ্যানালিটিক্যাল অ্যাবিলিটি, বুদ্ধিমান চিন্তা এবং গ্রোথ
              মাইন্ডসেট। সেজন্য আমাদের ট্রেইনিং ম্যাটেরিয়ালস এর মূল উদ্দেশ্য
              প্র্যাকটিক্যাল কন্টেন্টস।
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
              অন্যান্য প্ল্যাটফর্ম এর সাথে আমাদের পার্থক্য হচ্ছে অন্যান্যরা
              টোটাল রিক্রুটমেন্ট প্রসেস এর একটি অংশ নিয়ে কাজ করছে। অন্যদিকে,
              Unive পুরো রিক্রুটমেন্ট জার্নি বা প্রফেশনাল ক্যারিয়ার এর জন্য একটি
              কমপ্লিট সলিউশন।
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              আমরা কি ক্যান্ডিডেট এর পারফরম্যান্স ট্র্যাক করতে পারবো?
            </Accordion.Header>
            <Accordion.Body>
              হ্যা। আপনারা কোম্পানি এর অ্যাডমিন প্যানেল থেকে আপনাদের ক্যান্ডিডেট
              এর পারফরম্যান্স ট্র্যাক করতে পারবেন এবং এ থেকে ক্যান্ডিডেট এর
              ডেডিকেশন এবং কমপিটেন্সি এর ধারণাও পেয়ে যাবেন।
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
      <Container fluid className="middle py-5 text-center">
        <h2 className=" my-2 fs-2 ">রেডী টু স্টার্ট?</h2>
        <p className=" my-4 smallText text-muted">
          আপনি যদি আগ্রহী হন তাহলে যোগাযোগ করুন আমাদের টিম এর সাথে।
        </p>
        <Button variant="btn btn-primary" onClick={handleShow}>
          {" "}
          কথা বলুন আমাদের রিপ্রেজেন্টেটিভ এর সাথে
        </Button>
      </Container>
      <Footer />

      {/* modal */}

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
