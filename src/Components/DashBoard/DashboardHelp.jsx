import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useAdddiscussionFormMutation } from "../redux/rtk/features/DiscussionForm/discussionFormApi";
import "./DashboardHelp.css";

import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import config from "../../config/apiConfig";
import PageTitle from "../Common/PageTitle";
import AdminReplyHelpAndSupport from "./UserDasBoard/AdminReplyHelpAndSupport";

export default function DashboardHelp() {
  const { user } = useSelector((state) => state.auth);
  const [querydata, setQueryData] = useState([]);
  const [queryhelpdata, setQueryHelpData] = useState([]);
  const [adddiscussionForm, { isLoading, isError, isSuccess, error }] =
    useAdddiscussionFormMutation();

  const generateRandomNumber = () => {
    return Math.floor(10000000 + Math.random() * 90000000); // Generates a random number between 10000000 and 99999999
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
      await adddiscussionForm(data);

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

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/form`);
        const formData = response?.data?.data;
        setQueryData(formData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFormData();
  }, []);

  useEffect(() => {
    const fetchHelpData = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/help-and-support-reply`
        );
        const formData = response?.data?.data;
        setQueryHelpData(formData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHelpData();
  }, []);

  const formId = querydata[0]?._id;
  const helpId = queryhelpdata[0]?._id;

  return (
    <>
      <div className="mb-4">
        <PageTitle title="হেল্প এন্ড সাপোর্ট" />
        <h1 className="a-text"> হেল্প এন্ড সাপোর্ট!</h1>

        <div className="container mt-4">
          <form className="form-hr" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="input-modal-hr"
              type="text"
              defaultValue={user?.name}
              placeholder="নাম লিখুন"
              {...register("userName")}
            ></input>
            <input
              className="input-modal-hr"
              type="email"
              placeholder="ইমেইল লিখুন "
              defaultValue={user?.email}
              {...register("email")}
              readOnly
            ></input>

            <textarea
              type="text"
              className="input-modal-hr"
              placeholder="আপনার প্রবলেম  লিখুন "
              {...register("query")}
            />

            <input
              className="submit-input-tag"
              type="submit"
              disabled={isLoading}
              value="টিকেট তৈরি করুন"
            ></input>
          </form>
        </div>
      </div>

      <AdminReplyHelpAndSupport formId={formId} helpId={helpId} />
    </>
  );
}
