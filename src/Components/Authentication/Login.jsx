import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import gogo from "../images/logos/icons8-google.svg";
import { login } from "../redux/rtk/features/auth/authSlice";
import vdo1 from "./63787-secure-login.mp4";
import "./Login.css";

import "react-phone-input-2/lib/style.css";

const Login = () => {
  const [loginMode, setLoginMode] = useState("email");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { user, isLoading, isError, error } = useSelector(
    (state) => state.auth
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (loginMode === "email") {
        const userData = {
          email,
          password,
        };
        await dispatch(login(userData));
      } else if (loginMode === "phone") {
        const phoneData = {
          phone,
          password,
        };

        await dispatch(login(phoneData));
      }
      setErr("");
    } catch (error) {
      if (error?.response?.data?.message) {
        setErr(error.response.data.message);
        console.log(error.response.data.message);
      } else {
        setErr("An error occurred");
      }
    }
  };

  useEffect(() => {
    if (!isLoading && user) {
      toast.success("লগইন সম্পন্ন হয়েছে!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate(location?.state?.from || "/");
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (isError) {
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
      console.log(error);
    }
  }, [isError, error]);

  return (
    <>
      <div>
        <Header></Header>
        <div className="container">
          <h2 className="text-center my-5 text-primary loginpara">
            ইউনিভে লগইন করুন{" "}
          </h2>

          <div className="row g-4 justify-content-around align-items-center">
            <div className="col-12 col-md-6">
              <div className="text-center">
                {loginMode === "email" ? (
                  <form
                    className="contact-form row loginStyle"
                    onSubmit={onSubmit}
                  >
                    <div className="form-field col-12">
                      <input
                        required={true}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-text js-input"
                        type="text"
                      />
                      <label className="label" htmlFor="email">
                        আপনার ইমেইল<span className="text-danger">*</span>
                      </label>
                    </div>

                    {err && <div className="text-danger">{err}</div>}

                    <div className="form-field col-12 ">
                      <input
                        className="input-text js-input"
                        type="password"
                        required={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label className="label" htmlFor="company">
                        পাসওয়ার্ড লিখুন <span className="text-danger">*</span>
                      </label>
                    </div>

                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => {
                        setLoginMode(loginMode === "email" ? "phone" : "email");
                      }}
                    >
                      {loginMode === "email"
                        ? "মোবাইল দিয়ে লগইন করুন "
                        : "ইমেইল  দিয়ে লগইন করুন "}
                    </button>
                    <Link
                      to="/resetPassword"
                      className="loginpara text-decoration-underline"
                    >
                      পাসওয়ার্ড ভুলে গেছেন ?
                    </Link>
                    <p className="loginpara">
                      ইউনিভ প্ল্যাটফর্মে নতুন ?{" "}
                      <Link
                        to={"/registration"}
                        className={"text-decoration-underline text-primary"}
                      >
                        রেজিস্টার
                      </Link>{" "}
                      করুন
                    </p>

                    <div className="mb-5 col-lg-12">
                      <div className="text-center">
                        <button
                          className="submit-btn text-center"
                          type="submit"
                        >
                          লগইন করুন
                        </button>
                      </div>
                      <p className="hrline my-4">OR</p>
                      <button className="btn  border border-1 d-block mb-5 mx-auto text-dark">
                        <img src={gogo} alt="" height="30" width="30" /> Google
                        Sign In
                      </button>
                    </div>
                  </form>
                ) : (
                  <form
                    className="contact-form row loginStyle"
                    onSubmit={onSubmit}
                  >
                    <div className="form-field col-12">
                      <input
                        required={true}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input-text js-input"
                        type="text"
                      />

                      <label className="label" htmlFor="phone">
                        আপনার মোবাইল নম্বর
                        <span className="text-danger">*</span>
                      </label>
                    </div>

                    <div className="form-field col-12">
                      <input
                        required={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-text js-input"
                        type="password"
                      />
                      <label className="label" htmlFor="password">
                        পাসওয়ার্ড<span className="text-danger">*</span>
                      </label>
                    </div>

                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => {
                        setLoginMode(loginMode === "email" ? "phone" : "email");

                        reset(email);
                      }}
                    >
                      {loginMode === "email"
                        ? "মোবাইল দিয়ে লগইন করুন "
                        : "ইমেইল  দিয়ে লগইন করুন "}
                    </button>

                    <Link
                      to="/resetPassword"
                      className="loginpara text-decoration-underline"
                    >
                      পাসওয়ার্ড ভুলে গেছেন ?
                    </Link>
                    <p className="loginpara">
                      ইউনিভ প্ল্যাটফর্মে নতুন ?{" "}
                      <Link
                        to={"/registration"}
                        className={"text-decoration-underline text-primary"}
                      >
                        রেজিস্টার
                      </Link>{" "}
                      করুন
                    </p>

                    <div className="mb-5 col-lg-12">
                      <div className="text-center">
                        <button
                          className="submit-btn text-center"
                          type="submit"
                          // onClick={sendSms}
                        >
                          লগইন করুন
                        </button>
                      </div>
                      <p className="hrline my-4">OR</p>
                      <button className="btn  border border-1 d-block mb-5 mx-auto text-dark">
                        <img src={gogo} alt="" height="30" width="30" /> Google
                        Sign In
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="mx-auto loginvideo">
                <video
                  loop="true"
                  autoPlay="autoplay"
                  muted
                  className="lotti-why w-75"
                >
                  <source src={vdo1} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Login;
