import React, { useState } from "react";
import "./EnterprisePricing.css";

import { Container, Modal } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import config from "../../../../config/apiConfig";
import PageTitle from "../../../Common/PageTitle";
import Header from "../../../Header/Header";
import Footer from "../../Footer";

export default function EnterprisePricing() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (cardName) => {
    setShow(true);
    setCardNames(cardName); // Set the selected card name in the state
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [queries, setQueries] = useState("");

  const [cardNames, setCardNames] = useState("");

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
      pageNames: "for-enterprise",
      cardNames,
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
      <PageTitle title="ইউনিভ এন্টারপ্রাইজ প্রাইসিং " />
      <Header />
      <div className="container-fluid">
        <div className="containerSide">
          <h1 className=" enterPricingHead">
            আপনার প্রতিষ্ঠানের এমপ্লয়ীদের জন্য সাজান ইউনিক এক্সপেরিয়েন্স!
          </h1>
          <p className="enterPricingPara">
            প্রতিটি টীম আলাদা এবং তাদের ট্রেইনিং ও হতে হবে আলাদা। সেই
            কাস্টোমাইজড ট্রেইনিং ডিজাইন আপনি করতে পারবেন Unive এ।
          </p>
          <div className="row g-4  my-5">
            <div className="col-12 col-md-4">
              <div className="enterpricing1">
                <p className="enterpricingCat">টীম</p>
                <p className="enterpricingCatpara entereq">
                  যারা শিখতে আগ্রহী সেইসব টীম কে স্কিলড আপ করুন Unive এ। টীম
                  প্ল্যানে যা যা আছে:
                </p>
                <ul className="ms-2">
                  <li className="enterpricingCatList">
                    টীম সাবস্ক্রিপশন এবং লার্নার অ্যাকসেস
                  </li>
                  <li className="enterpricingCatList">
                    আনলিমিটেড অ্যাকসেস টু কোর্সেস
                  </li>
                  <li className="enterpricingCatList">
                    পার্সোনালাইজড লার্নিং প্ল্যান
                  </li>
                  <li className="enterpricingCatList">কমপ্লিশন সার্টিফিকেটস</li>
                </ul>
                <div className="text-center btnenter">
                  <button
                    className="EnterButton"
                    onClick={() => handleShow("টীম")}
                  >
                    যোগাযোগ করুন{" "}
                  </button>
                </div>
              </div>
            </div>
            <div className=" col-12 col-md-4">
              <div className="enterpricing2">
                <p className="enterpricingCat2">এন্টারপ্রাইজ</p>
                <p className="enterpricingCatpara2">
                  নতুন এমপ্লয়ীদের দ্রুততার সাথে প্রতিষ্ঠানে অনবোর্ড করুন, জব
                  রোল বুঝিয়ে দিন এবং টীম লার্নিং পারফরম্যান্স থেকে ডিসিশন নিন
                  এবং যোগ্য এমপ্লয়ীকে দায়িত্ব প্রদান করুন।এন্টারপ্রাইজ
                  প্ল্যানে টীমে যা আছে তা তো থাকছেই সাথে থাকছে:
                </p>
                <ul className="ms-2">
                  <li className="enterpricingCatList2">
                    টীম লার্নিং অ্যানালিটিকস
                  </li>
                  <li className="enterpricingCatList2">
                    অনবোর্ডিং নতুন টীম মেম্বার
                  </li>
                  <li className="enterpricingCatList2">
                    ইন্ডিভিজুয়াল এবং টীম ট্র্যাক প্রগ্রেস
                  </li>
                </ul>
                <div className=" text-center btnenter">
                  <button
                    className="EnterButton2"
                    onClick={() => handleShow("এন্টারপ্রাইজ")}
                  >
                    যোগাযোগ করুন{" "}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="enterpricing1">
                <p className="enterpricingCat">আনলিমিটেড</p>
                <p className="enterpricingCatpara pb-3">
                  যে সমস্ত প্রতিষ্ঠান এমপ্লয়ীদের ক্যারিয়ার প্রোগ্রেশন নিশ্চিত
                  করতে চান, এমপ্লয়ী পারফরম্যান্স এবং স্যাটিসফেকশন নিয়ে
                  কম্প্রোমাইজ করতে চান না প্ল্যান টি তাদের জন্য। আনলিমিটেডে
                  প্ল্যানে টীম এবং এন্টারপ্রাইজ প্ল্যানের সব কিছু তো থাকছেই:
                </p>
                <ul className="ms-2">
                  <li className="enterpricingCatList">
                    থার্ড পার্টি ইন্টিগ্রেশন
                  </li>
                  <li className="enterpricingCatList">
                    কাস্টমাইজড সলিউশন অ্যান্ড ফিচারস
                  </li>
                  <li className="enterpricingCatList">
                    প্রতিষ্ঠানের এমপ্লয়ীদের জন্য লাইফস্টাইল অফারস ফ্রম বেস্ট
                    ব্র্যান্ডস
                  </li>
                </ul>
                <div className="text-center btnenter">
                  <button
                    className="EnterButton"
                    onClick={() => handleShow("আনলিমিটেড")}
                  >
                    যোগাযোগ করুন{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="contribute2nd mb-5 row g-4 justify-content-center align-items-center ">
            <div className="col-12 col-md-5 text-center">
              <h2 className="contrifaq">কিছু কমন প্রশ্ন?</h2>
              <p className="contrifaqpara">
                আপনার প্রশ্নের উত্তর খুঁজে পাচ্ছেন না? <br /> আমাদের সাথে
                যোগাযোগ করুন!
              </p>
            </div>

            <div className="col-12 col-md-7">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    কোন প্ল্যান এ ইউজার লিমিট কত?
                  </Accordion.Header>
                  <Accordion.Body>
                    টিম প্ল্যান ৩ থেকে ২০ জন ইউজার এর জন্য। এন্টারপ্রাইজ প্ল্যান
                    ২০ বা তার বেশি ইউজার দের জন্য। আল্টিমেট প্ল্যান ৩০ বা তার
                    বেশি ইউজার দের জন্য।
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    আমরা কি ইচ্ছেমতো প্ল্যান চেঞ্জ করতে পারবো?
                  </Accordion.Header>
                  <Accordion.Body>
                    হ্যা। আপনি সাপোর্ট এর সাথে কথা বলে অন ডিমান্ড পরবর্তী বিলিং
                    সাইকেল থেকে প্ল্যান চেঞ্জ করতে পারবেন।
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    প্রাইসিং সম্পর্কে জানবেন কিভাবে?
                  </Accordion.Header>
                  <Accordion.Body>
                    অনুগ্রহপূর্বক আপনার জিজ্ঞাসা এবং কন্ট্যাক্ট নম্বর আমাদের কে
                    মেইল করুন বা ডেমো এর জন্য ফর্ম পূরণ করুন। আমাদের টিম ১ দিনের
                    মাঝে আপনার সাথে যোগাযোগ করবে।
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>

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
