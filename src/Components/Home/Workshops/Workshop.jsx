import { Container } from "react-bootstrap";

import { Navigation, Pagination } from "swiper";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "./workshop.css";

import "swiper/css";
import PageTitle from "../../Common/PageTitle";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
function Workshops() {
  return (
    <>
      <PageTitle title="কার্যক্রম" />
      <Header></Header>
      <div className="main-worksho-cont">
        <div>
          <h1 className="text-center  header-workshop">আমাদের কার্যক্রম</h1>
          <h4 className="text-center  sub-header-workshop">
            আমরাই প্রথম দেশের টেকনিক্যাল ট্রেনিং এবং রিক্রুটমেন্ট প্ল্যাটফর্ম।
          </h4>
        </div>

        <Container className="workshop-container mx-auto">
          <div className="slidermx mx-auto">
            <Swiper
              slidesPerView={3}
              spaceBetween={5}
              pagination={{
                clickable: true,
              }}
              loop={true}
              navigation={true}
              modules={[Navigation, Pagination]}
              className="mySwiper"
              breakpoints={{
                360: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
              }}
            >
              <SwiperSlide>
                <div className="mt-3">
                  <div className="workimg">
                    <p className="worktext">ইউনিভ ওয়ার্কশপ (In-House)</p>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="mt-3">
                  <div className="workimg2">
                    <p className="worktext">ইউনিভ ওয়ার্কশপ (At Campus)</p>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="mt-3">
                  <div className="workimg3">
                    <p className="worktext">ইউনিভ এক্সপেরিয়েন্স সেন্টার</p>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="mt-3">
                  <div className="workimg4">
                    <p className="worktext">ক্যারিয়ার গ্রোথে ইউনিভ</p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </Container>
      </div>

      <Footer></Footer>
    </>
  );
}

export default Workshops;
