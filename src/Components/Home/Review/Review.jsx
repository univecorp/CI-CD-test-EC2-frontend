import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Review.css";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";
export default function Review() {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={70}
        autoplay={true}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        breakpoints={{
          370: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },

          768: {
            slidesPerView: 4,
          },
        }}
      >
        <SwiperSlide>
          <div class="container">
            <div class="card">
              <div class="box">
                <div class="content">
                 
                  <h3>Solar Installation</h3>
                  {/* <p></p> */}
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="container">
            <div class="card">
              <div class="box">
                <div class="content">
                 
                  <h3>Radiology</h3>
                
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="container">
            <div class="card">
              <div class="box">
                <div class="content">
                
                  <h3>Driving</h3>
                
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="container">
            <div class="card">
              <div class="box">
                <div class="content">
              
                  <h3>VR</h3>
               
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
       
      </Swiper>
    </>
  );
}
