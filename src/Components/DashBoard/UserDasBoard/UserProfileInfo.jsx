import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MdVerifiedUser } from "react-icons/md";
import {
  useUpdateUserInfoMutation,
  useUserByEmailQuery,
} from "../../redux/rtk/features/user/userApi";
import "./userProfileinfo.css";
function UserProfileInfo() {
  const { user } = useSelector((state) => state.auth);
  const { data } = useUserByEmailQuery(user?.email);

  const [updateUserInfo, { isLoading, isSuccess, isError, error }] =
    useUpdateUserInfoMutation();
  const userInfo = data?.data;

  const { register, setValue, handleSubmit } = useForm();
  const [inputs, setInputs] = useState([]);
  const verifiedItem = data?.data?.verifiedStatus;

  useEffect(() => {
    if (userInfo) {
      setInputs(userInfo.social || []);
    }
  }, [userInfo]);

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };

  const addInput = () => {
    const newInputs = [...inputs, ""];
    setInputs(newInputs);
  };

  const deleteInput = (index) => {
    if (index >= 1) {
      const newInputs = [...inputs];
      newInputs.splice(index, 1);
      setInputs(newInputs);
    }
  };

  const onSubmit = async (data) => {
    const formData = {};
    if (data.firstName) {
      formData.firstName = data.firstName;
    }
    if (data.lastName) {
      formData.lastName = data.lastName;
    }
    if (data.address) {
      formData.address = data.address;
    }
    if (data.bio) {
      formData.bio = data.bio;
    }
    if (data.birth) {
      formData.birth = data.birth;
    }
    if (data.city) {
      formData.city = data.city;
    }
    if (data.country) {
      formData.country = data.country;
    }
    if (data.facebook) {
      formData.facebook = data.facebook;
    }
    if (data.linkedin) {
      formData.linkedin = data.linkedin;
    }
    if (data.gender) {
      formData.gender = data.gender;
    }

    // Add the `inputs` object as-is
    formData.social = inputs;
    console.log("this form data", formData);
    try {
      // call the updateUserInfo mutation with the email and formData
      await updateUserInfo({ email: user.email, data: formData });
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
      console.error(error.response.data);
      // Handle error
      toast.error(error.response.data.message, {
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
  };

  return (
    <div className="container-fluid">
      <h2 className="DashtextPara">
        ব্যক্তিগত তথ্য{" "}
        {verifiedItem === "verified" ? (
          <span>
            <MdVerifiedUser className="verified-icon"></MdVerifiedUser>
          </span>
        ) : (
          <span>
            <MdVerifiedUser className="unverified-icon"></MdVerifiedUser>
          </span>
        )}
      </h2>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-md-flex align-items-center justify-content-between">
            <div className="DashProfileInput">
              <label htmlFor="">ফার্স্টনেম</label>
              <input
                type="text"
                defaultValue={userInfo?.firstName}
                {...register("firstName")}
                placeholder="আপনার ফার্স্টনেম লিখুন "
              />
            </div>
            <div className="DashProfileInput">
              <label htmlFor="">লাস্টনেম </label>
              <input
                type="text"
                defaultValue={userInfo?.lastName}
                {...register("lastName")}
                placeholder="আপনার লাস্টনেম লিখুন "
              />
            </div>
          </div>
          <div className="d-md-flex align-items-center justify-content-between">
            <div className="DashProfileInput">
              <label htmlFor="">ইমেইল</label>
              <input
                type="email"
                value={userInfo?.email}
                {...register("email")}
                readOnly
                placeholder="আপনার ইমেইল এড্রেস লিখুন "
              />
            </div>
          </div>
          <div className="d-md-flex align-items-center justify-content-around">
            <div className="DashProfileInput">
              <label htmlFor="">পাসওয়ার্ড</label>
              <input
                type="password"
                {...register("password")}
                value={userInfo?.password.slice(0, 8)}
              />
            </div>
            <div className="DashProfileInput">
              <label htmlFor="">ফোন নাম্বার</label>
              <input
                type="phone"
                readOnly
                {...register("phone")}
                value={userInfo?.phone}
              />
            </div>
          </div>
          <div className="DashProfileInput">
            <label htmlFor="">ঠিকানা</label>
            <input
              type="text"
              style={{ width: "95%" }}
              defaultValue={userInfo?.address || ""}
              {...register("address")}
              placeholder="আপনার ঠিকানা লিখুন"
            />
          </div>
          <div className="d-md-flex align-items-center justify-content-around">
            <div className="DashProfileInput">
              <label htmlFor="">শহর/প্রদেশ</label>
              <input
                type="text"
                defaultValue={userInfo?.city}
                {...register("city")}
                placeholder="আপনার শহরের নাম লিখুন"
              />
            </div>
            <div className="DashProfileInput">
              <label htmlFor="">দেশ</label>
              <input
                type="text"
                defaultValue={userInfo?.country}
                {...register("country")}
                placeholder="আপনার দেশের নাম লিখুন"
              />
            </div>
          </div>
          <div className="d-md-flex align-items-center justify-content-around">
            <div className="DashProfileInput">
              <label htmlFor="gender">লিঙ্গ</label>
              <select
                id="gender"
                defaultValue={userInfo?.gender}
                {...register("gender")}
              >
                <option value="পুরুষ">পুরুষ</option>
                <option value="মহিলা">মহিলা</option>
                <option value="অন্যান্য">উভয়</option>
              </select>
            </div>
            <div className="DashProfileInput">
              <label htmlFor="">জন্ম তারিখ</label>
              <input
                type="date"
                defaultValue={userInfo?.birth}
                {...register("birth")}
              />
            </div>
          </div>
          <div className="DashProfileInput">
            <label htmlFor="">আপনার সম্পর্কে</label>
            <textarea
              placeholder="আপনার সম্পর্কে বিস্তারিত লিখুন"
              defaultValue={userInfo?.bio}
              {...register("bio")}
            ></textarea>
          </div>
          <div className="DashProfileInput">
            <label htmlFor="">সোশাল প্রোফাইল</label>
            <div className="input-container">
              <img
                src="https://img.freepik.com/premium-vector/blue-social-media-logo_197792-1759.jpg"
                alt=""
              />
              <input
                type="text"
                placeholder="আপনার ফেইসবুক লিংক দিন"
                defaultValue={userInfo?.facebook}
                {...register("facebook")}
                style={{ width: "95%" }}
              />
            </div>
            <div className="input-container">
              <img
                src="https://static.vecteezy.com/system/resources/previews/018/930/587/original/linkedin-logo-linkedin-icon-transparent-free-png.png"
                alt=""
              />
              <input
                type="text"
                placeholder="আপনার লিংকডইন লিংক দিন"
                style={{ width: "95%" }}
                defaultValue={userInfo?.linkedin}
                {...register("linkedin")}
              />
            </div>
          </div>
          {inputs.map((input, index) => (
            <div key={index}>
              <div className="DashProfileInput">
                <div className="input-container">
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/003/731/316/small/web-icon-line-on-white-background-image-for-web-presentation-logo-icon-symbol-free-vector.jpg"
                    alt=""
                  />
                  <input
                    type="text"
                    placeholder="আরো সোশ্যাল লিংক যুক্ত করুন "
                    {...register(`input-${index}`)}
                    value={input}
                    onChange={(event) => handleInputChange(index, event)}
                    style={{ width: "95%" }}
                  />
                </div>
              </div>
              {index >= 1 && (
                <p
                  type="button"
                  className="dashParaSmallText"
                  onClick={() => deleteInput(index)}
                >
                  Delete
                </p>
              )}
            </div>
          ))}
          <p type="button" onClick={addInput} className="dashParaSmallText">
            + আরো প্রোফাইল যুক্ত করুন
          </p>
          <input type="submit" className="DashUserSave" value="সেভ করুন" />
        </form>
      </div>
    </div>
  );
}

export default UserProfileInfo;
