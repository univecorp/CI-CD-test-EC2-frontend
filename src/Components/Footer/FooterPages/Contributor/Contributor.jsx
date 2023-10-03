import { useState } from "react";
import { Accordion, Container, Modal } from "react-bootstrap";
import config from "../../../../config/apiConfig";
import Header from "../../../Header/Header";
import Footer from "../../Footer";
import "../EnterprisePricing/EnterprisePricing.css";
import PageTitle from "./../../../Common/PageTitle";
import "./Contributor.css";

export default function Contributor() {
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
      pageNames: "become-a-contributor",
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
      <PageTitle title="কন্ট্রিবিউট" />
      <Header />
      <div className="main-containers">
        <div className="content">
          <h2 className="centered-text text-center">
            Unive <span className="fw-bold">ব্লগে লিখুন!</span>{" "}
          </h2>
          <p className="centered-para">
            Unive ব্লগে লিখার মাধ্যমে আপনি বাংলাদেশী ওয়ার্কফোর্সকে আপনার
            এক্সপার্ট অপিনিয়ন বা ইনসাইট দিয়ে সাহায্য করতে পারেন। আমরা যারা
            ইন্ডাস্ট্রি এক্সপার্ট আছি সবাই আমাদের নিজ নিজ ইন্ডাস্ট্রি
            প্র্যাক্টিস, অবজারভেশন এবং উইজডম যদি সবার মাঝে ছড়িয়ে দেই, সেটা হতে
            পারে দেশ এবং দেশের মানুষের জন্য আমাদের একটি উপহার।প্রতিনিয়ত
            মূল্যবান লিখার মাধ্যমে হয়ে উঠুন Unive ইন্ডাস্ট্রি এক্সপার্ট
          </p>
          <div className="text-center mb-4">
            <button className="cont-btn" onClick={handleShow}>
              Become a Contributor!
            </button>
          </div>
        </div>
      </div>
      <div className="contribute2nd">
        <div className="row g-3 g-lg-5 g-md-5 justify-content-center align-items-center">
          <div className="col-12 col-md-7 col-lg-6">
            <div className="dots">
              <div className="row mx-auto">
                <div className="col-6">
                  <p className="dotesPara">Unive -এ কেন লিখবেন?</p>
                  <ul>
                    <li className="dotesText">
                      Unive আপনাকে কন্টেন্ট লিখা থেকে শুরু করে পাবলিশ করা
                      পর্যন্ত পুরোটা সময় হেল্প করে যাতে কোনো ভুল না থাকে।
                      এছাড়া Unive আপনার হয়ে আপনার কন্টেন্ট এর ডিসকাশন মডারেট
                      করে থাকে।
                    </li>
                    <li className="dotesText">
                      Unive এ লিখার মাধ্যমে আপনি ইন্ডাস্ট্রির এক জন এক্সপার্ট
                      হিসেবে পরিচিত হয়ে উঠবেন ইউনিভ ইন্ডাস্ট্রি অ্যাফিলিয়েট
                      প্রোগ্রাম এর মাধ্যমে।
                    </li>
                  </ul>
                </div>
                <div className="col-6">
                  <p className="dotesPara">আপনার জন্য কি আছে?</p>
                  <ul>
                    <li className="dotesText">
                      আপনার যদি লিখার মাধ্যমে নিজের ধারণা বুঝানোর ভালো হাত থাকে
                      তাহলে যেকোনো বিষয় ইন প্র্যাক্টিক্যাল Unive এর স্পন্সরড
                      প্রোগ্রামে শিখেও শেয়ার করতে পারেন আমাদের প্লাটফর্মে।
                    </li>
                    <li className="dotesText">
                      নিয়মিত লিখার মাধ্যমে হয়ে উঠতে পারেন ইন্ডাস্ট্রি এর
                      রিসোর্স পারসন।
                    </li>
                    <li className="dotesText">
                      Unive এর সুবিশাল লার্নার কমিউনিটিতে আপনার কোর্স বা
                      ট্রেইনিং ম্যাটেরিয়ালস পাবলিশ করার সুযোগ।
                    </li>
                  </ul>
                </div>
              </div>

              <div className="row g-md-5  px-3">
                <div className="col-6 ">
                  <p className="dotesPara">কিভাবে শুরু করবেন?</p>
                  <ul>
                    <li className="dotesText">
                      প্রথমে Unive এ ফ্রী একাউন্ট খুলে ফেলুন এবং Unive ব্লগ এ
                      আপনার আর্টিকেল বা আর্টিকেল এর কিছু অংশ সাবমিট করুন। Unive
                      মডারেটর আপনার সাথে অতিসত্বর যোগাযোগ করবে।
                    </li>
                  </ul>
                </div>
                <div className="col-6 pt-5">
                  <p className="dotsm">এ বিষয়ে আরো জানতে হলে যোগাযোগ করুন </p>
                  <p className="dotesPara dotspan">support@unive.com.bd</p>
                  <img
                    className="dotsImg"
                    src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/Contributor/girl.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5 col-lg-6">
            <img
              className="img-fluid"
              src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/Contributor/test.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="contribute3">
        <h2 className="contribute3Head">কন্ট্রিবিউট করুন Unive ব্লগে!</h2>
        <p className="contribute3Head2">
          আপনি দুই উপায়ে Unive ব্লগে কন্ট্রিবিউট করতে পারেন।
        </p>
        <div className="contribute3Row row g-3 align-items-center">
          <div className="col-12 col-md-4">
            <p className="contribute3Para">কমিউনিটি কন্ট্রিবিউটর হিসেবে</p>
            <ul>
              <li className="contribute3Text">লিখা শুরু করুন সাইন আপ করেই।</li>
              <li className="contribute3Text">
                পয়েন্ট অর্জন করুন আপনার কন্টেন্ট এর রেটিং এর উপর। পরবর্তীতে
                পয়েন্ট রিডিম করে সংগ্রহ করুন লাইফস্টাইল গিফট কার্ড।
              </li>
              <li className="contribute3Text">
                অংশগ্রহণ করুন Unive এর সেমিনার, ওয়ার্কশপে ইন্ডাস্ট্রি এক্সপার্ট
                হিসেবে।
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-4 text-center othoba contribute3Para">
            অথবা
          </div>
          <div className="col-12 col-md-4">
            <p className="contribute3Para">
              টেকনিক্যাল রাইটিং এর জন্য ওয়ার্কশপ পার্টিসিপেন্ট হিসেবে
            </p>
            <ul>
              <li className="contribute3Text">
                দুই সপ্তাহের ওয়ার্কশপে শিখানো হবে টেকনিক্যাল আর্টিকেল কিভাবে
                লিখে এবং কন্টেন্ট ডেলিভারি ইন্টুইটিভ করার উপায় সমূহ।
              </li>
              <li className="contribute3Text">
                ওয়ার্কশপে অংশগ্রহণ করে বেস্ট প্র্যাক্টিস মেনে আপনি সম্পূর্ণ
                একটি আর্টিকেল প্রকাশ করবেন।
              </li>
              <li className="contribute3Text">
                ডেভেলপ করা স্কিল দিয়ে পরবর্তীতে আপনি যেকোনো বিষয়ে সহজবোধ্য করে
                আলোচনা এবং লিখতে সক্ষম হবেন এবং Unive সার্টিফাইড ইন্ডাস্ট্রি
                এক্সপার্ট এর সুযোগ থাকছে।
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <div className="contriDiv">
        <h2 className="contriTexts">এখনি লিখা শুরু করুন!</h2>
        <div className="text-center">
          <button className="ContriButton">লিখুন</button>
        </div>
      </div> */}

      <div className="contribute2nd mb-5 row g-4 justify-content-center align-items-center ">
        <div className="col-12 col-md-5 text-center">
          <h2 className="contrifaq">কিছু কমন প্রশ্ন?</h2>
          <p className="contrifaqpara">
            আপনার প্রশ্নের উত্তর খুঁজে পাচ্ছেন না? <br /> আমাদের সাথে যোগাযোগ
            করুন!
          </p>
        </div>

        <div className="col-12 col-md-7">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                এখানে কি কোনো রিভিউ প্রসেস আছে?
              </Accordion.Header>
              <Accordion.Body>
                জ্বি, এখানে আপনি আর্টিকেল সাবমিট করলে একটি রিভিউ প্রসেস দিয়ে
                যাবে। আপনি আর্টিকেল সাবমিট করার পর অনতিবিলম্বে আপনার সাথে
                যোগাযোগ করা হবে।
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>আমি কোন টপিক নিয়ে লিখবো?</Accordion.Header>
              <Accordion.Body>
                আপনি Unive এর টপিক লিস্ট থেকে যেকোনো টপিক নিয়ে লিখতে পারেন
                কিংবা আমাদের সাজেস্ট করতে পারেন নতুন কোনো টপিক।
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      <Footer></Footer>

      {/* form modal*/}
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
