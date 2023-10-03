/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Accordion, Button, Container, Modal } from "react-bootstrap";
import config from "../../../../config/apiConfig";
import PageTitle from "../../../Common/PageTitle";
import Header from "../../../Header/Header";
import Footer from "../../Footer";
import "./Instructor.css";
export default function Instructor() {
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
      pageNames: "become-an-unive-instructor",
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
      <PageTitle title="ইন্সট্র্রাক্টর" />
      <Header />
      {/* top */}

      <div className="container-fluid instsections">
        <div className="contentInsterc">
          {/* <h2 className="banner-inster">
            ইন্সট্রাক্টর হয়ে ক্যারিয়ার গড়ুন সাথে সাহায্য করুন <br /> লক্ষাধিক
            শিক্ষার্থীর ক্যারিয়ার গঠনে!
          </h2> */}
        </div>
      </div>

      <div className="container my-5">
        <h2 className="instructorHead">নেশন বিল্ডিং এ কাজ করুন</h2>
        <div className="row g-2 g-md-5 justify-content-center align-items-center">
          <div className="col-6">
            <p className="instructorPara">
              Unive টীমে ইন্সট্রাক্টর হিসেবে যোগ দিয়ে
            </p>
            <p className="smallText">
              আপনার এক্সপেরিয়েন্স এবং এক্সপার্টাইজ শেয়ার করে দক্ষ মানবসম্পদ
              গড়তে সরাসরি অবদান রাখুন।
            </p>
            <p className="smallText">
              আপনার কোর্স বা ট্রেইনিং থেকে আয়ের সুযোগ তো থাকছেই।
            </p>
            <Button className="p-3 mt-3" onClick={handleShow}>
              Become an Instructor
            </Button>
          </div>
          <div className="col-6">
            <img
              src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/OtherImagesandVideo/images/instructor/instruct.png"
              alt=""
              className="img-fluid"
            />
          </div>
        </div>
      </div>

      <div className="container">
        <h2 className="instructorHead">Unive এ শিখাবেন কেন?</h2>

        <div
          className="row g-3 g-md-5 g-lg-5 justify-content-center align-items-center
        my-3"
        >
          <div className="col-6">
            <img
              src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/OtherImagesandVideo/images/instructor/chair.png"
              alt=""
              className="img-fluid"
            />
          </div>
          <div className="col-6">
            <p className="instructorPara">
              Unive এ ইন্টারেক্টিভিটির মাধ্যমে শিখানোর সুযোগ
            </p>
            <p className="smallText">
              ইন্টারেক্টিভ কন্টেন্ট এর মাধ্যমে সাবলীলভাবে আপনার মেসেজ বা আইডিয়া
              আপনি আপনার লার্নারদের শিখাতে পারবেন। এটি পজিটিভ লার্নার ফিডব্যাক
              তৈরি করে।
            </p>
          </div>
        </div>

        <div className="row g-3 g-md-5 g-lg-5  justify-content-center align-items-center my-3">
          <div className="col-6">
            <p className="instructorPara">ভিডিও এর মাঝে কুইজ</p>
            <p className="smallText">
              আপনার ট্রেইনিং কিংবা কোর্স এর ভিডিও এর মাঝেই কুইজ সেট করে সাথে
              সাথে লার্নারদের নলেজ চেক করে নিন। সেই সাথে টেক্সট কুইজ এর অপশন তো
              আছেই। যেকোনো অ্যাসেসমেন্ট বা অ্যাসাইনমেন্টের ফলাফল অটোমেট করুন
              অটোমেশন ফিচার দিয়ে।
            </p>
          </div>
          <div className="col-6">
            <img
              src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/OtherImagesandVideo/images/instructor/code.png"
              alt=""
              className="img-fluid"
            />
          </div>
        </div>

        <div className="row g-3 g-md-5 g-lg-5  justify-content-center align-items-center my-3">
          <div className="col-6">
            <img
              src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/OtherImagesandVideo/images/instructor/ppl.png"
              alt=""
              className="img-fluid"
            />
          </div>
          <div className="col-6">
            <p className="instructorPara">
              কানেক্টেড থাকুন ওয়ার্ল্ডওয়াইড ইন্ডাস্ট্রি নেটওয়ার্ক এ
            </p>
            <p className="smallText">
              সারা বিশ্বজুড়ে আপনার ট্রেইনিং ম্যাটেরিয়ালস সম্পর্কিত ইন্ডাস্ট্রি
              এর সাথে যুক্ত থাকুন Unive এর ইন্ডাস্ট্রি অ্যাফিলিয়েশন প্রোগ্রাম
              এর মাধ্যমে।
            </p>
          </div>
        </div>

        <div className="row g-3 g-md-5 g-lg-5  justify-content-center align-items-center my-5">
          <div className="col-6">
            <p className="instructorPara">সাপোর্ট ২৪/৭</p>
            <p className="smallText">
              ইন্টারেক্টিভ কন্টেন্ট এর মাধ্যমে সাবলীলভাবে আপনার মেসেজ বা আইডিয়া
              আপনি আপনার লার্নারদের শিখাতে পারবেন। এটি পজিটিভ লার্নার ফিডব্যাক
              তৈরি করে।
            </p>
          </div>
          <div className="col-6">
            <img
              src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/OtherImagesandVideo/images/instructor/phone.png"
              alt=""
              className="img-fluid"
            />
          </div>
        </div>
      </div>

      <hr className="w-25 fw-bold mx-auto my-3" />

      <div className="container my-5">
        <div className="row g-3 g-md-5 g-lg-5 ">
          <div className="col-12 col-md-4">
            <div className="card shadow instrCard">
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25634.png"
                className="card-img-top circleAvater"
                alt="Hollywood Sign on The Hill"
              />
              <div className="card-body">
                <div className="text-center">
                  <h5 className="card-title my-2 text-center">সায়মা কবির</h5>
                  <small className="text-muted">
                    সিনিয়র লেকচারার, ঢাকা নার্সিং ইনস্টিটিউট
                  </small>
                </div>
                <hr className="w-50 fw-bold mx-auto my-3" />
                <p className="card-text mt-4">
                  "কোর্স ডিজাইন করা খুবই সহজ। আমি কোর্স প্ল্যান করার পর এক রাতেই
                  পুরো কোর্স ফরম্যাট Unive এ ডিজাইন করতে পেরেছি যা নিঃসন্দেহে
                  ইন্ডাস্ট্রি বেস্ট"
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card shadow instrCard">
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25634.png"
                className="card-img-top circleAvater"
                alt="Hollywood Sign on The Hill"
              />
              <div className="card-body">
                <div className="text-center">
                  <h5 className="card-title my-2 text-center">জাহিন খান</h5>
                  <small className="text-muted">
                    সফটওয়্যার ইঞ্জিনিয়ার, অ্যামাজন
                  </small>
                </div>
                <hr className="w-50 fw-bold mx-auto my-3" />
                <p className="card-text mt-4">
                  "ইন্টুইটিভ ইন্সট্রাক্টর প্যানেল। এছাড়া স্টুডেন্টদের জন্য ইন
                  ব্রাউজার কোডিং স্যান্ডবক্স থাকাতে অন দি গো স্টুডেন্টরা শিখতে
                  পারছে"
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card shadow instrCard">
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25634.png"
                className="card-img-top circleAvater"
                alt="Hollywood Sign on The Hill"
              />
              <div className="card-body">
                <div className="text-center">
                  <h5 className="card-title my-2 text-center">বাবু তালুকদার</h5>
                  <small className="text-muted">
                    মোবাইল রিপেয়ার টেকনিশিয়ান
                  </small>
                </div>
                <hr className="w-50 fw-bold mx-auto my-3" />
                <p className="card-text mt-4">
                  "আমি শুরুতে ইউটিউবে আমার মোবাইল রিপেয়ার ভিডিও আপলোড করতাম
                  পরবর্তীতে Unive সম্পর্কে জানতে পেরে এখানে কোর্স নিচ্ছি।"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        <div className=" row justify-content-center align-items-center">
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
                  অনুগ্রহপূর্বক আপনি Unive ইনস্ট্রাক্টর ফরম পূরণ করলেই আমাদের
                  টীম আপনার সাথে অতিসত্বর যোগাযোগ করবে।
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>আমি কোন টপিক নিয়ে লিখবো?</Accordion.Header>
                <Accordion.Body>
                  গ্রেট! আপনি আমাদেরকে ইমেইল করুন কিংবা ইনস্ট্রাক্টর ফরম ফিল আপ
                  করুন। আমাদের টীম আপনাকে আইডিয়া ক্রিয়েশন থেকে শুরু করে
                  ট্রেইনিং ডিজাইন প্রতিটি ক্ষেত্রে সাহায্য করবে। আপনি আপনার
                  এক্সপেরিয়েন্স এবং এক্সপার্টাইজ নিয়ে আসুন, একে ট্রেইনিং এ
                  রূপদান করা থেকে শুরু করে বাকিটা Unive এর দায়িত্ব।
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>আমি কোন টপিক নিয়ে লিখবো?</Accordion.Header>
                <Accordion.Body>
                  Unive এ সমস্ত ট্রেইনিং প্র্যাক্টিক্যাল এবং বর্তমান ইন্ডাস্ট্রি
                  প্র্যাক্টিস কে হাইলাইট করে। ইনস্ট্রাক্টর হিসেবে আপনার ফোকাস
                  থাকতে হবে আপনি যে ইন্ডাস্ট্রির জন্য ট্রেইনিং দিচ্ছেন তা যেনো
                  আপ টু ডেট ইন্ডাস্ট্রি প্র্যাক্টিস কে ফলো করে। আমরা পুঁথিগত
                  কন্টেন্ট কে ডিসকারেজ করি। আমাদের দেওয়া গাইডলাইন ফলো করলেই
                  আপনি অনেকদূর এগিয়ে থাকবেন প্রথম সারির ইন্সট্রাক্টর হিসেবে।
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>

      <Footer />

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
    </div>
  );
}
