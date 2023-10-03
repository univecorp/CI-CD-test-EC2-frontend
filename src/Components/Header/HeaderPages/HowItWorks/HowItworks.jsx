import { Col, Container, Ratio, Row } from "react-bootstrap";
import Footer from "../../../Footer/Footer";
import vid5 from "../../../images/How-It-works/certificate.mp4";
import vid3 from "../../../images/How-It-works/certificate2.mp4";
import vid7 from "../../../images/How-It-works/communicate-with-customer.mp4";
import Header from "../../Header";

import vid4 from "../../../images/How-It-works/107653-trophy.mp4";
import vid2 from "../../../images/How-It-works/step-progressbar.mp4";
import vid1 from "../../../images/How-It-works/study.mp4";
import vid6 from "../../../images/How-It-works/support-centre.mp4";

import vid9 from "../../../images/whyUnive/exams-preparation.mp4";
import "./HowItWorks.css";
export default function HowItworks() {
  return (
    <div className="main-works">
      <Header />
      {/* unive why */}
      <Container className="main-cont-div">
        <section className="main-conts">
          <h2 className="text-center why-unive-head" data-aos="fade-up-right">
            কেন ইউনিভ?
          </h2>
          <div className="row g-3">
            <div className="col-12 col-md-6 col-lg-6">
              <div>
                <ul>
                  <li className="list-why">
                    সম্পূর্ণ বাংলায় টেকনিক্যাল বিষয় শিখে নিজের স্কিল যাচাই
                    করতে স্কিল টেস্ট করুন।
                  </li>

                  <li className="list-why">
                    স্কিল টেস্টে ভালো ফলাফল করে পেতে পারেন নিশ্চিত জব অফার দেশের
                    প্রথম সারির কোম্পানি থেকে।
                  </li>

                  <li className="list-why">
                    এছাড়া প্রয়োজনীয় ভাষাগত যোগ্যতা এবং পাসপোর্ট প্রস্তুত থাকলে
                    পেতে পারেন জব অফার বিশ্বের যেকোনো প্রান্ত থেকে।
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              {/* <img src={img1} alt="" className="img-fluid"></img> */}
              <video
                loop="true"
                autoPlay="autoplay"
                muted
                className="lotti-why"
              >
                <source src={vid9} type="video/mp4" />
              </video>
            </div>
          </div>
        </section>
      </Container>

      {/* how unive works */}
      <h2 data-aos="fade-up-right" className="text-center main-header-why">
        ইউনিভ কিভাবে কাজ করে?
      </h2>
      {/* vid1 */}
      <Container className=" my-5">
        <Row>
          <Col data-aos="fade-up-left" xs={12} md={6}>
            <Ratio aspectRatio="16x9">
              <video loop="true" autoPlay="autoplay" muted>
                <source src={vid1} type="video/mp4" />
              </video>
            </Ratio>
          </Col>

          <Col data-aos="fade-right" xs={12} md={6} className="my-auto">
            <Container>
              <h2 className="text-center free">ফ্রি তে কোর্স শুরু করুন।</h2>
            </Container>
          </Col>
        </Row>
      </Container>
      {/* gif2 */}
      <Container fluid className=" my-5">
        <Row>
          <Col
            data-aos="fade-up"
            xs={12}
            md={6}
            className="my-auto order-md-1  order-2 "
          >
            <Container>
              <h2 className="text-center free">
                কোর্স প্রোগ্রেস সেভ করে রাখতে <br /> ইমেইল বা ফোন নাম্বার দিয়ে
                লগইন করুন।{" "}
              </h2>
            </Container>
          </Col>
          <Col
            data-aos="fade-left"
            xs={12}
            md={6}
            className="order-md-2  order-1"
          >
            <Ratio aspectRatio="16x9">
              <video loop="true" autoPlay="autoplay" muted>
                <source src={vid2} type="video/mp4" />
              </video>
            </Ratio>
          </Col>
        </Row>
      </Container>
      {/* gif3 */}
      <Container fluid className=" my-5">
        <Row>
          <Col data-aos="fade-down" xs={12} md={6}>
            <Ratio aspectRatio="16x9">
              <video loop="true" autoPlay="autoplay" muted>
                <source src={vid3} type="video/mp4" />
              </video>
            </Ratio>
          </Col>
          <Col data-aos="fade-up" xs={12} md={6} className="my-auto">
            <Container>
              <h2 className="text-center free">
                সকল কোর্স ছোট ছোট সহজবোধ্য <br /> লার্নিং মডিউলে বিভক্ত।
              </h2>
            </Container>
          </Col>
        </Row>
      </Container>
      {/* gif4 */}
      <Container fluid className=" my-5">
        <Row>
          <Col
            data-aos="fade-down"
            xs={12}
            md={6}
            className="my-auto order-md-1 order-2"
          >
            <Container>
              <h2 className="text-center free">
                আপনার কোর্স পারফরম্যান্স বা স্কিল <br /> অ্যাসেসমেন্ট এর উপরে
                লিডারবোর্ডে <br /> স্থান করে জিতে নিন আকর্ষণীয় পুরস্কার।
              </h2>
            </Container>
          </Col>
          <Col
            data-aos="fade-left"
            xs={12}
            md={6}
            className="order-md-2 order-1"
          >
            <Ratio aspectRatio="16x9">
              <video loop="true" autoPlay="autoplay" muted>
                <source src={vid4} type="video/mp4" />
              </video>
            </Ratio>
          </Col>
        </Row>
      </Container>
      {/* gif5 */}
      <Container fluid className=" my-5">
        <Row>
          <Col data-aos="fade-right" xs={12} md={6}>
            <Ratio aspectRatio="16x9">
              <video loop="true" autoPlay="autoplay" muted>
                <source src={vid5} type="video/mp4" />
              </video>
            </Ratio>
          </Col>
          <Col data-aos="fade-down" xs={12} md={6} className="my-auto">
            <Container>
              <h2 className="text-center free ">
                কোর্স সম্পন্ন করার পর আপনার লাইফটাইম <br /> ইউনিক Unive
                সার্টিফিকেট লিংক <br /> শেয়ার করুন এম্প্লয়ারদের সাথে।
              </h2>
            </Container>
          </Col>
        </Row>
      </Container>
      {/* gif6 */}
      <Container fluid className=" my-5">
        <Row>
          <Col
            data-aos="fade-down"
            xs={12}
            md={6}
            className="my-auto order-md-1 order-2"
          >
            <Container>
              <h2 className="text-center free">
                আপনার স্টাডি ফিল্ডের ইন্ডাস্ট্রি সার্ভারে <br /> জয়েন করুন
                যেকোনো তথ্য বা সার্কুলার এর জন্য।
              </h2>
            </Container>
          </Col>
          <Col data-aos="fade-up" xs={12} md={6} className="order-md-2 order-1">
            <Ratio aspectRatio="16x9">
              <video loop="true" autoPlay="autoplay" muted>
                <source src={vid6} type="video/mp4" />
              </video>
            </Ratio>
          </Col>
        </Row>
      </Container>
      {/* gif7 */}
      <Container fluid className=" my-5">
        <Row>
          <Col data-aos="fade-up" xs={12} md={6}>
            <Ratio aspectRatio="16x9">
              <video loop="true" autoPlay="autoplay" muted>
                <source src={vid7} type="video/mp4" />
              </video>
            </Ratio>
          </Col>
          <Col data-aos="fade-down" xs={12} md={6} className="my-auto">
            <Container>
              <h2 className="text-center free">
                কোর্সের যেকোনো কনফিউশন বা জিজ্ঞাসা <br /> দ্রুততম সময়ে সমাধান
                করুন ইন্ডাস্ট্রি রিসোর্স <br /> পারসনদের কাছ থেকে।
              </h2>
            </Container>
          </Col>{" "}
        </Row>
      </Container>

      <Footer />
    </div>
  );
}
