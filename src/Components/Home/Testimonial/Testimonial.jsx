import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Testmonial.css";
// Import Swiper styles
import { useState } from "react";
import "swiper/css";
import VideoRender from "../VideoRender/VideoRender";
// import required modules
function Testmonial() {
  const [modalShow, setModalShow] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [title, setTitle] = useState("");

  function handleThumbnailClick(id, title) {
    setModalShow(true);
    setVideoId(id);
    setTitle(title);
  }
  return (
    <>
      <div className="testimonis">
        <div className="containers main-div-review">
          <h1 className="review-header">
            কেন আপনি ইউনিভকেই <br /> বেছে নিবেন?
          </h1>
        </div>
        <Swiper
          spaceBetween={5}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          loop={true}
          navigation={true}
          modules={[Navigation, Pagination]}
          className="mySwiper second-div-review"
          breakpoints={{
            360: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
              slidesPerGroup: 2,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
          }}
        >
          <SwiperSlide>
            <div className="testup d-flex justify-content-around  align-items-center">
              <h4 className="second-header">স্কিল ফোকাসড টেস্ট দিয়েই চাকরি!</h4>

              <img
                className="imageDiv"
                src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/UniveHome+Testimonials/tarek-thumbnail-webpage.png"
                alt="testimonial-image"
                onClick={() =>
                  handleThumbnailClick("FV2mbwKKi0Q", "Testimonial of Tarek")
                }
              />
            </div>
          </SwiperSlide>

          {/* 2nd slide */}
          <SwiperSlide>
            <div className="testup  d-flex justify-content-around  align-items-center">
              <h4 className="second-header">
                স্কিল এসেসমেন্ট এর মাধ্যমে এক ধাপ এগিয়ে থাকুন!
              </h4>
              <img
                className="imageDiv"
                src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/UniveHome+Testimonials/sakib-thumbnail-webpage.png"
                alt=""
                onClick={() =>
                  handleThumbnailClick("Bf_Var_HiuU", "Testimonial of Sakib")
                }
              />
            </div>
          </SwiperSlide>

          {/* 3rd slide */}
          <SwiperSlide>
            <div className="testup  d-flex justify-content-around  align-items-center">
              <h4 className="second-header">
                রিক্রুটমেন্ট ফেইজ পাস করে <br></br> হয়ে উঠুন যোগ্য প্রার্থী!
              </h4>
              <img
                className="imageDiv"
                src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/UniveHome+Testimonials/sadia-thumbnail-webpage.PNG"
                alt=""
                onClick={() =>
                  handleThumbnailClick("QyAn8Kwz19Q", "Testimonial of Sadia")
                }
              />
            </div>
          </SwiperSlide>

          {/* 4th slide */}
          <SwiperSlide>
            <div className="testup  d-flex justify-content-around  align-items-center">
              <h4 className="second-header">
                ইউনিভের মাধ্যমে নিশ্চিত করুন আপনার ক্যারিয়ার গ্রোথ!
              </h4>
              <img
                className="imageDiv"
                src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/UniveHome+Testimonials/anamika-thumbnail-webpage.PNG"
                alt=""
                onClick={() =>
                  handleThumbnailClick("mRXwFMLCFTg", "Testimonial of Anamika")
                }
              />
            </div>
          </SwiperSlide>
        </Swiper>

        <VideoRender
          show={modalShow}
          videoId={videoId}
          title={title}
          onHide={() => setModalShow(false)}
        />
      </div>
    </>
  );
}

export default Testmonial;
