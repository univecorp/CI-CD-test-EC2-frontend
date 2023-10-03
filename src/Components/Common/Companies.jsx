import { Row } from "react-bootstrap";

import { Autoplay } from "swiper";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import logo1 from  "./Images/abdulmonem.png";
import logo2 from  "./Images/abulkhair.png";
import logo3 from  "./Images/aci.png";
import logo16 from "./Images/akij.png";
import logo4 from "./Images/AKKHAN.png";
import logo7 from "./Images/AnandaShipyard.png";
import logo8 from "./Images/banglalink.png";
import logo10 from "./Images/Bexi.png";
import logo9 from "./Images/BG.png";
import logo11 from "./Images/bkash.png";
import logo5 from "./Images/BSC.png";
import logo6 from "./Images/bsrm.png";
import logo12 from "./Images/BTI.png";
import logo13 from "./Images/citygroup.png";
import logo14 from "./Images/ConcordGrouplogo.png";
import logo15 from "./Images/ConfidenceGrouplogo.png";
import logo17 from "./Images/Edisongroup.png";
import logo18 from "./Images/Energypac.png";
import logo19 from "./Images/EskayefBangladesh.png";
import logo20 from "./Images/FairElectronics.png";
import logo21 from "./Images/foodpanda.png";
import logo22 from "./Images/grameenphone.png";
import logo23 from "./Images/Jamuna.png";
import logo25 from "./Images/Karnaphuli.png";
import logo24 from "./Images/kazi.png";
import logo26 from "./Images/KhulnaShipyard.png";
import logo27 from "./Images/ksrm.png";
import logo28 from "./Images/Meghna.png";
import logo29 from "./Images/Nasir.png";
import logo30 from "./Images/Navana.png";
import logo31 from "./Images/orion.png";
import logo32 from "./Images/partex.png";
import logo33 from "./Images/pathao.png";
import logo34 from "./Images/pran.png";
import logo35 from "./Images/Rangs.png";
import logo36 from "./Images/Reneta.png";
import logo37 from "./Images/RFL.png";
import logo38 from "./Images/Robi.png";
import logo39 from "./Images/RSRM.png";
import logo40 from "./Images/Runner.png";
import logo41 from "./Images/Sheltech.png";
import logo42 from "./Images/Sikder.png";
import logo43 from "./Images/Square.png";
import logo44 from "./Images/Summit.png";
import logo45 from "./Images/TK.png";
import logo46 from "./Images/Transcom.png";
import logo47 from "./Images/United.png";
import logo48 from "./Images/Walton.png";
import logo49 from "./Images/Western.png";


import "./Companies.css";
// Import Swiper styles
import "swiper/css";
export default function Companies() {
  return (
    <Row className=" overy  mx-auto text-center companies-containers">
      {/* img slides */}

      <Swiper
        spaceBetween={25}
        slidesPerView={6}
        effect={"fade"}
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo1}
              alt=""
              height="150"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto"
              src={logo2}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto  "
              src={logo3}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo4}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo5}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo6}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo7}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo8}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo9}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo10}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo11}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo12}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo13}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo14}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo15}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo16}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo17}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo18}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo19}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo20}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo21}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo22}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo23}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo24}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo25}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo26}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo27}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo28}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo29}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo30}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo31}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo32}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo33}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo34}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo35}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo36}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo37}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo38}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo39}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo40}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo41}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo42}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo43}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo44}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo45}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo46}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo47}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo48}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="  text-center">
            <img
              className="img-fluid mx-auto my-auto "
              src={logo49}
              alt=""
              height="80"
              width="75"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </Row>
  );
}
