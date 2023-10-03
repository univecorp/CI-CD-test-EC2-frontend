import emailjs from "@emailjs/browser";
import React, { useRef } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

export default function ContactForm() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_g95jpy4",
        "template_868nu6d",
        form.current,
        "pYBmMY9-bsl22t9xH"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <form ref={form} onSubmit={sendEmail} className=" mx-auto">
      <div className="my-3">
        {/* <label className='d-block text-start'>নাম</label>
                <input className='input-group' type="text" name="user_name" placeholder=' আপনার নাম' /> */}
        <FloatingLabel
          controlId="floatingInput"
          label="নাম"
          className="mt-2 mb-5 text-start"
        >
          <Form.Control
            type="text"
            className="text-start"
            placeholder=" আপনার নাম"
            name="user_name"
          />
        </FloatingLabel>
      </div>
      <div className="my-3">
        {/* <label className='d-block text-start'>ইমেইল</label>
                <input className='input-group' type="email" name="user_email" placeholder='আপনার ইমেইল' /> */}
        <FloatingLabel
          controlId="floatingInput"
          label="ইমেইল"
          className="mt-2 mb-5 text-start"
        >
          <Form.Control
            type="email"
            className="text-start"
            name="user_email"
            placeholder="আপনার ইমেইল"
          />
        </FloatingLabel>
      </div>
      <div className="my-3">
        {/* <label className='d-block text-start'>মেসেজ</label>
                <textarea className='input-group' name="message" placeholder='আপনার মেসেজটি লিখুন' /> */}
        <FloatingLabel
          controlId="floatingTextarea2"
          label="আপনার মেসেজটি লিখুন"
        >
          <Form.Control
            as="textarea"
            className="text-start"
            name="message"
            placeholder="আপনার মেসেজটি লিখুন"
            style={{ height: "100px" }}
          />
        </FloatingLabel>
      </div>
      <div className="text-end">
        <input
          type="submit"
          className="btn btn-primary px-4"
          value="সেন্ড করুন"
        />
      </div>
    </form>
  );
}
