import { Container } from "react-bootstrap";
import PageTitle from "../../../Common/PageTitle";
import Header from "../../../Header/Header";
import Form from "../../../Home/Form/Form";
import Footer from "../../Footer";
import "./Contact.css";
export default function Contact() {
  return (
    <>
      <PageTitle title="যোগাযোগ" />
      <Header />
      <h2 data-aos="fade-down " className="text-center py-5 contact-header">
        সরাসরি মেসেজ করুন{" "}
      </h2>
      {/* form */}

      <div className="main-body-contact">
        <Form />
      </div>

      {/* pic2 */}
      <Container data-aos="fade-up-right" fluid className="my-5 py-5">
        <Container className=" text-center my-3">
          <p className="cont-add">যোগাযোগের ঠিকানা</p>
          <p className="cont-par">ইউনিভ</p>
          <p className="cont-par">লেভেল ৪, ভিশন ২০২১ টাওয়ার </p>
          <p className="cont-par">
            কারওয়ান বাজার বাণিজ্যিক এলাকা, ঢাকা-১২১৫, বাংলাদেশ
          </p>
          <p className="cont-main">
            {" "}
            <span className="cont-contant">ইমেইল:</span> contact@unive.com.bd
          </p>
          <p className="cont-main">
            {" "}
            <span className=" cont-contant"> যোগাযোগঃ </span> +8801781761794
          </p>
          <p className="cont-main">
            {" "}
            <span className=" cont-contant">
              {" "}
              Website:
            </span> www.unive.com.bd{" "}
          </p>
        </Container>
      </Container>
      <Footer />
    </>
  );
}
