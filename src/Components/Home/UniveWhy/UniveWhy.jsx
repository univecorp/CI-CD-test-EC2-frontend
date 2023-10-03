import { Fade } from "react-reveal";
import { NavLink } from "react-router-dom";
import PageTitle from "../../Common/PageTitle";
import "./UniveWhy.css";
import img1 from "./univeWhy.png";
export default function UniveWhy() {
  return (
    <div className="main-div-why container">
      <PageTitle title="ইউনিভ" />
      <div className="paperDiv">
        <img
          src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/UniveWhy/paper-plane-top-part.png"
          alt=""
          className="paper-img"
        />
        <Fade left>
          <h1 className="header-unive-why">
            আপনার ক্যারিয়ার <br />
            গঠনে ইউনিভ!
          </h1>
        </Fade>

        <p className="unive-why-para">
          প্রোগ্রামগুলো ডিজাইন, ডেভেলপ এবং <br />
          প্রতিনিয়ত আপডেট করছেন ইন্ডাস্ট্রি <br />
          লিডিং ইঞ্জিনিয়াররা|
        </p>
        <img
          src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/UniveWhy/paper-plane-bootom-part.png"
          alt=""
          className="paper-img-one"
        />

        <NavLink to="/learn">
          {" "}
          <button className="see-more-btn">কোর্স এক্সপ্লোর করুন</button>
        </NavLink>

        <Fade right>
          <img src={img1} alt="" className="main-image-one" />
        </Fade>
      </div>
    </div>
  );
}
