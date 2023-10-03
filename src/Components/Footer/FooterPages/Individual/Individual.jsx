/* eslint-disable react/no-unknown-property */
import { Card, Col, Container, Row } from "react-bootstrap";

import { BsCheck2Circle } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import Header from "../../../Header/Header";

import config from "../../../../config/apiConfig";
import PageTitle from "../../../Common/PageTitle";
import Footer from "../../Footer";
import "./Individual.css";

export default function Individual() {
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
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <PageTitle title="ইউনিভ ইন্ডিভিজুয়াল প্রাইসিং" />
      <Header />

      <div className="container-fluid indisections">
        <div className="contentss">
          <h2 className="banner-indis">
            বর্তমানের ইন্ডাস্ট্রি প্র্যাকটিস ফোকাসড <br /> ট্রেইনিং শুরু করুন
            এখনি!
          </h2>
          <div className="bluebtns">
            <NavLink to="/learn">
              <button className="indibutton">ট্রেইনিং শুরু করুন</button>
            </NavLink>
          </div>
        </div>
      </div>

      <Container fluid data-aos="fade-down" className="text-center pt-5 ">
        <section className="container middle-cont">
          <p className="specials">ইউনিভ এর বিশেষত্ব!</p>
          <Row className="row-one ">
            <Col xs={12} md={8} className="mx-auto">
              <img
                className="img-fluid "
                src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/Unive+Developer/Interactive-Lesson-(700x500).png"
                alt=""
              />
            </Col>
            <Col xs={12} md={4} className="text-start  pt-5">
              <h3 className="sub-heads">ইন্টারেকটিভ ভিডিও লেসন</h3>
              <p className="text-start sub-heads-para pt-2">
                শিখুন ছোট ছোট ইন্টারেক্টিভ ভিডিও এর মাধ্যমে। <br /> শিখার সাথে
                সাথে নিজেকে যাচাই করে নিন ঝটপট।
              </p>
              <h3 className="mt-5 sub-heads pt-4">ইন্টারভিউ আয়োজন</h3>
              <p className="text-start sub-heads-para pt-2">
                সাক্সেসফুল কোর্স কমপ্লিটের ১৫ দিনের মাঝে ইন্টারভিউ <br /> এর
                ব্যবস্থা আপনার ট্রেনিং রিলেটেড ইন্ডাস্ট্রি সেক্টরে।
              </p>
            </Col>
          </Row>

          {/* 2nd row */}
          <Row>
            <Col xs={12} md={6} className="text-start pt-2">
              <h3 className="sub-heads">ইন্টারন্যাশনাল জব প্লেসমেন্ট</h3>
              <p className="text-start sub-heads-para pt-2">
                ভালো ফলাফল অর্জনের মাধ্যমে আপনি পেতে পারেন <br /> ইন্টারন্যাশনাল
                জব এর অফার। প্রয়োজনীয় ইন্টারভিউ <br /> থেকে শুরু করে জব
                অনবোর্ডিং এর যাবতীয় কাজ <br /> ইউনিভ আপনার হয়ে সম্পন্ন করবে।
              </p>
            </Col>
            <Col xs={12} md={6} className="pe-5 pt-3">
              <img
                className="mt-2 w-75"
                src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/Unive+Developer/Job-Placement.png"
                alt=""
              />
            </Col>
          </Row>
        </section>
      </Container>

      {/* how can we help */}

      <div className="text-center py-5 container-fluid">
        <section className=" mt-5 ">
          <h1 className="help-header">আমরা যেভাবে সার্ভিস দিয়ে থাকি!</h1>

          <div className="main-course-containers">
            <Row className="my-5 gx-5">
              <Col xs={12} md={4} className="mt-5">
                <Card className="h-100  border-0 cards-indi">
                  <Card.Img
                    variant="img-fluid"
                    src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/Unive+Developer/Subtract+(1).png"
                  />
                  <Card.Body className="text-start">
                    <Card.Title className="para-heading-indi">
                      ইন্ডাস্ট্রি নলেজ
                    </Card.Title>
                    <Card.Text className="para-heading-texts">
                      ইন্ডাস্ট্রি স্কিলস এবং নলেজ বর্তমান প্রেক্ষাপটে
                      ইন্ডাস্ট্রিতে দরকারি স্কিল এবং টেকনিক্যাল ইন্সটিটিউট এর
                      কারিকুলামের মাঝে গ্যাপ অনেক। ইউনিভ আপনাকে এই গ্যাপ পূরণে
                      অর্থাৎ ইন্ডাস্ট্রি এর জন্য প্র্যাকটিকাল নলেজ এবং স্কিল
                      নির্ভর ট্রেইনিং দিয়ে আপনাকে জব রোলের জন্য ফিট করে গড়ে
                      তুলে।
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {/* 2nd col */}
              <Col xs={12} md={4} className="mt-5">
                <Card className="h-100  border-0 cards-indi">
                  <Card.Img
                    variant="img-fluid"
                    src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/Unive+Developer/Subtract.png"
                  />
                  <Card.Body className="text-start">
                    <Card.Title className="para-heading-indi">
                      ইন্টারভিউ প্রিপারেশন
                    </Card.Title>
                    <Card.Text className="para-heading-texts">
                      স্কিল অ্যাসেসমেন্ট এবং ইন্টারভিউ প্রিপারেশন ইউনিভ আপনাকে
                      দেশে কিংবা দেশের বাইরে ড্রিম জবে ল্যান্ড করার জন্যে
                      প্রিপারেশন থেকে শুরু করে স্কিল অ্যাসেসমেন্ট, ইন্টারভিউ
                      অ্যারেঞ্জ এবং জবে অনবোর্ড হতে সাহায্য করে।
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              {/* 3rd col */}
              <Col xs={12} md={4} className="mt-5">
                <Card className="h-100  border-0 cards-indi">
                  <Card.Img
                    variant="img-fluid"
                    src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/Unive+Developer/Subtract+(3).png"
                  />
                  <Card.Body className="text-start">
                    <Card.Title className="para-heading-indi">
                      ক্যারিয়ারে আগাতে
                    </Card.Title>
                    <Card.Text className="para-heading-texts">
                      ক্যারিয়ারে আগাতে আপনার ক্যারিয়ার যাতে স্থবির না হয়ে যায়
                      আপনার স্কিল সেট ইন্ডাস্ট্রি এর সাথে তাল মিলিয়ে আপডেট না
                      হওয়ার কারণে, সেজন্য ইউনিভ আপনাকে প্রয়োজনীয় রিসোর্সেস এবং
                      সাপোর্ট দেয় যেন আপনি ক্যারিয়ারে এগোতে পারেন সহজেই।
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </section>
      </div>

      {/* pricing */}
      <Container fluid data-aos="fade-up" className="text-center py-5 middle">
        <h1 className="smallText-indi">আপনার পছন্দমত প্রাইসিং</h1>
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
                    handleCardClick("unive-for-individual", "Free Plan")
                  }
                >
                  শুরু করুন
                </Card.Footer>
              </Card>
            </Col>

            {/* 2nd plan */}
            <Col xs={12} md={4}>
              <Card className="text-center pt-5 carding-main" id="special-card">
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
                <p className="sub-desc-para">২৫০ টাকা/মাস করে ৩০০০ টাকা বছরে</p>

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
                    handleCardClick("unive-for-individual", "Annual Plan")
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
                    handleCardClick("unive-for-individual", "Growth Plan")
                  }
                >
                  শুরু করুন
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </section>
      </Container>

      <Footer />
    </>
  );
}
