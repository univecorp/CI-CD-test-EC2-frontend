import { Navigation, Pagination } from "swiper";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import solarImg from "./Images/solar-pv-desing.jpeg";
import LpsImg from "./Images/LPS-installation.jpeg";

import "./Course.css";
// Import Swiper styles
import "swiper/css";

export default function Course() {
  return (
    <>
      <div className="containers d-flex ms-2 ">
        <Swiper
          spaceBetween={5}
          slidesPerView={3}
          pagination={{
            clickable: true,
          }}
          loop={true}
          navigation={true}
          modules={[Navigation, Pagination]}
          className="mySwiper mx-auto"
          breakpoints={{
            360: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1400: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
        >
          <SwiperSlide>
            <div className="cards mx-auto">
              <div className="cards-img">
                <img
                  src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/Unive+Home+Course/Solar-Installation-Course-Thumbnail+(1).png"
                  alt=""
                  className="cards-image"
                ></img>
              </div>

              <div className="cards-info">
                <p className="title ">সোলার ইন্স্টলেশন</p>

                <p className="mt-4 texts">
                  আপনি প্রায়শই সম্মানিত সোলার এনার্জি ব্যবহারকারীদের একটা অভিযোগ
                  করতে শুনে থাকবেন, "আমার সোলার প্যানেলগুলো তো ভাই ঠিকমতো কাজ
                  করে না! দশ লাখ টাকা দিয়ে বাড়ির ছাদে প্যানেল লাগ...
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="cards mx-auto">
              <div className="cards-img">
                <img
                  src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/Unive+Home+Course/Radiology-CourseThumbnail+(1).png"
                  alt=""
                  className="cards-image"
                ></img>
              </div>

              <div className="cards-info">
                <p className="title">রেডিওলজি</p>
                <p className="mt-4 texts">
                  রেডিওলজির প্রাথমিক কোর্স হিসাবে X-Ray কে বিবেচনা করা হয়। আপনি
                  যদি একজন রেডিওলজিস্ট হিসাবে নিজের ক্যারিয়ার গড়তে আগ্রহী হয়ে
                  থাকেন, তবে এ কোর্সটি আপনার জন্য...
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="cards mx-auto">
              <div className="cards-img">
                <img src={solarImg} alt="" className="cards-image"></img>
              </div>

              <div className="cards-info">
                <p className="title">সোলার পিভি সিস্টেম ডিজাইন</p>
                <p className="mt-4 texts">
                  যারা সোলার ইন্ডাস্ট্রি তে ক্যারিয়ার গড়তে চান তাদের জন্য
                  সোলার পিভি সিস্টেম ডিজাইন করতে পারা একটি গুরুত্বপূর্ণ স্কিল।
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="cards mx-auto">
              <div className="cards-img">
                <img src={LpsImg} alt="" className="cards-image"></img>
              </div>

              <div className="cards-info">
                <p className="title">এল পি এস ইনস্টলেশন</p>
                <p className="mt-4 texts">
                  বজ্রপাত থেকে বাঁচতে বিল্ডিংয়ের ছাদে বজ্রনিরোধক দণ্ড বা লাইটনিং
                  প্রোটেকশন সিস্টেম (LPS) ব্যবহার করা হয়। বাংলাদেশ সহ বিশ্বের
                  যেকোন দেশে একজন এল পি এস ইন্সটলার উচ্চ বেতনে ইপিসি কোম্পানিতে
                  চাকুরি খুঁজে নিতে পারেন।
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
