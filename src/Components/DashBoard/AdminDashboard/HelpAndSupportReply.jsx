import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useAddHelpAndSupportReplyFormMutation } from "../../redux/rtk/features/helpAndSupportReply/helpAndSupportReply";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HelpAndSupportReply({ email, role }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  if (role !== user?.role) {
    navigate("/page-not-found");
  }
  console.log("em", email);
  const [addHelpAndSupportReplyForm, { isLoading, isError, isSuccess, error }] =
    useAddHelpAndSupportReplyFormMutation();

  const generateRandomNumber = () => {
    return Math.floor(10000000 + Math.random() * 90000000);
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const randomNumber = generateRandomNumber();
    data.ticketNumber = randomNumber;

    try {
      await addHelpAndSupportReplyForm(data);

      toast.success("সফলভাবে তথ্য সংগ্রহ হয়েছে!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error(error);
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    reset();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 mt-2">Reply User!</h2>
      <form className="form-hr" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input-modal-hr"
          type="text"
          placeholder="Enter your Name"
          {...register("name")}
        ></input>

        <textarea
          className="input-modal-hr"
          type="text"
          placeholder="Enter your Answer"
          {...register("answer")}
        ></textarea>

        <input className="submit-input-tag" type="submit"></input>
      </form>
    </div>
  );
}
