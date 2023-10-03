import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../../../Header/Header";
import scholarship from "./Scholarship.jpeg";

import { toast } from "react-toastify";
import config from "../../../../config/apiConfig";
import PageTitle from "../../../Common/PageTitle";
import Footer from "../../Footer";
import "./Scholarship.css";
export default function Scholarships() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [highestEducation, setHighestEducation] = useState("");
  const [whatLearnFromUnive, setwhatLearnFromUnive] = useState("");
  const [careerBenefit, setcareerBenefit] = useState("");
  const [whyNeedScholarship, setwhyNeedScholarship] = useState("");
  const resetForm = () => {
    setFullName("");
    setEmail("");

    setPhone("");
    setHighestEducation("");
    setwhatLearnFromUnive("");
    setcareerBenefit("");
    setwhyNeedScholarship("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      fullName,
      email,
      phone,
      highestEducation,
      whatLearnFromUnive,
      careerBenefit,
      whyNeedScholarship,
    };

    fetch(`${config.apiUrl}/scholarship`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API response:", formData);
        toast.success("Form submitted successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    resetForm();
  };

  return (
    <>
      <PageTitle title="ইউনিভ স্কলারশিপ" />
      <Header />
      <Container className="my-5">
        <Row>
          {/* briefing  */}
          <Col xs={12} md={5} className="first-sco-col">
            <h2 className="scholarship-head">ইউনিভ স্কলারশিপ এ আবেদন করুন!</h2>
            <img
              className="img-fluid my-3"
              src={scholarship}
              alt=""
              srcSet=""
            />
            <p className=" scholar-para">
              ‘ইউনিভ সকলের সমান সুযোগ সুবিধায় বিশ্বাসী। কোন কিছু শিখা এবং তা
              প্রয়োগ করার ক্ষেত্রে আপনি যদি মনে করেন আপনি এক্সেপশনাল গুণের
              অধিকারী এবং শিখার ক্ষেত্রে আর্থিক ভাবে স্বাবলম্বী নন তাহলে
              অনুগ্রহপূর্বক ইউনিভ স্কলারশিপ এর জন্য এপ্লাই করুন। প্রকৃতপক্ষে
              ইউনিভ স্কলারশিপ তাদের জন্য যারা যথাযথ সুযোগ এবং সুবিধার অভাবে
              নিজের মেধার সদ্ব্যবহার করতে পারছেন না। এছাড়া আপনি যদি মনে করেন
              আপনি ইউনিভ স্কলারশিপের জন্য যোগ্য ক্যান্ডিডেট আপনি ফর্ম পূরণ করে
              এপ্লাই করে ফেলুন।
            </p>
          </Col>

          {/* form */}
          <Col xs={12} md={7}>
            <h2 className="text-center  mt-2 scholar-form mb-5">
              {" "}
              ইনফরমেশনগুলো ফিল আপ করুন!
            </h2>

            <form className="form-hr" onSubmit={handleSubmit}>
              <input
                className="input-modal-hr"
                type="text"
                placeholder="আপনার পুরো নাম "
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              ></input>

              <input
                className="input-modal-hr"
                type="email"
                placeholder="ইমেইল অ্যাড্রেস "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input
                className="input-modal-hr"
                type="text"
                placeholder="ফোন নাম্বার"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></input>

              <textarea
                className="input-modal-hr"
                type="text"
                placeholder="সর্বোচ্চ শিক্ষাগত যোগ্যতা "
                value={highestEducation}
                onChange={(e) => setHighestEducation(e.target.value)}
              ></textarea>

              <textarea
                className="input-modal-hr"
                type="text"
                placeholder="আপনি ইউনিভ থেকে কি শিখতে চান?"
                value={whatLearnFromUnive}
                onChange={(e) => setwhatLearnFromUnive(e.target.value)}
              ></textarea>

              <textarea
                className="input-modal-hr"
                type="text"
                placeholder="এখান থেকে যা শিখতে চান তা আপনার ক্যারিয়ারে কি কাজে লাগবে?"
                value={careerBenefit}
                onChange={(e) => setcareerBenefit(e.target.value)}
              ></textarea>

              <textarea
                className="input-modal-hr"
                type="text"
                placeholder="আপনার কি জন্য স্কলারশিপ দরকার?"
                value={whyNeedScholarship}
                onChange={(e) => setwhyNeedScholarship(e.target.value)}
              ></textarea>

              <input className="submit-input-tag" type="submit"></input>
            </form>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}
