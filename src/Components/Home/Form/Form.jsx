import { useState } from "react";
import { toast } from "react-toastify";
import config from "../../../config/apiConfig";
import "./Form.css";

export default function Form() {
  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const resetForm = () => {
    setName("");

    setPhone("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,

      phone,
    };

    fetch(`${config.apiUrl}/contact-form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API response:", formData);
        toast.success("ইউনিভ থেকে অতিশীগ্রই আপনার সাথে যোগাযোগ করা হবে ");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    resetForm();
  };
  return (
    <>
      <section className="main-contain">
        <section className="fifth-section-div d-flex justify-content-evenly align-items-center">
          <div className="fifth-header-div">
            <h6 className="fifth-header">
              ফ্রী পরামর্শ পেতে আমাদের সাথে যোগাযোগ করুন
            </h6>

            <form className="form-div" onSubmit={handleSubmit}>
              <div className="form-div-one">
                <label htmlFor="" className="label-one">
                  আপনার নাম <span className="text-danger">*</span>
                </label>
              </div>
              <br />
              <input
                type="text"
                placeholder=" আপনার নাম লিখুন"
                className="input-one ms-5 cursor"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <br />
              <div className="">
                <label htmlFor="" className="label-two">
                  আপনার মোবাইল নাম্বার <span className="text-danger">*</span>
                </label>
              </div>
              <br />
              <input
                type="text"
                className="input-two ms-5 cursor"
                placeholder="মোবাইল নাম্বার লিখুন"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <br />
              <div className="text-center ">
                <input
                  type="submit"
                  className="submit"
                  value="রিকোয়েস্ট এ  কল ব্যাক"
                />
              </div>
            </form>
          </div>

          <img
            src="https://unive-web-media.s3.ap-south-1.amazonaws.com/Website+Media/Unive+Form/Login-Form-ushuhc.png"
            className="mx-auto img-fluid fromimg"
            alt=""
          />
        </section>
      </section>
    </>
  );
}
