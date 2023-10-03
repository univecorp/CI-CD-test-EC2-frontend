import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { TagsInput } from "react-tag-input-component";
import { toast } from "react-toastify";
import {
  useUpdateUserInfoMutation,
  useUserByEmailQuery,
} from "../../redux/rtk/features/user/userApi";
import "./userProfileinfo.css";
function UserEducation() {
  const { user } = useSelector((state) => state.auth);
  const { data } = useUserByEmailQuery(user?.email);
  const userInfo = data?.data;
  console.log("this is rtk data", userInfo);
  const [updateUserInfo, { isLoading, isSuccess, isError, error }] =
    useUpdateUserInfoMutation();
  const { control, register, handleSubmit, setValue, reset, watch, getValues } =
    useForm();
  const workExperienceFields = watch("workExperience", "training");
  const [workExperience, setWorkExperience] = useState([
    {
      institution: "",
      educationLevel: "",
      degree: "",
      group: "",
      location: "",
      result: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      canDelete: false,
      workNumber: 1,
    },
  ]);

  const addWorkExperience = () => {
    const newWorkExperience = {
      institution: "",
      educationLevel: "",
      degree: "",
      group: "",
      startDate: "",
      endDate: "",
      location: "",
      result: "",
      canDelete: true,
      workNumber: workExperience.length + 1, // set workNumber based on current length
    };
    setWorkExperience([...workExperience, newWorkExperience]);
  };

  useEffect(() => {
    reset({ ...getValues(), workExperience: workExperience });
  }, [workExperience]);

  const deleteWorkExperience = (index) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience.splice(index, 1);
    setWorkExperience(newWorkExperience);
  };

  const [training, setTraining] = useState([
    {
      institution: "",
      educationLevel: "",
      degree: "",
      group: "",
      startDate: "",
      endDate: "",
      location: "",
      result: "",
      canDelete: false,
      workNumber: 1,
    },
  ]);

  const addtraining = () => {
    const newTrainExperience = {
      institution: "",
      name: "",
      year: "",
      time: "",
      location: "",
      details: "",
      trainSkills: [],
      canDelete: true,
      workNumber: training.length + 1, // set workNumber based on current length
    };
    setTraining([...training, newTrainExperience]);
  };

  const deletetraining = (index) => {
    const newTrainExperience = [...training];
    newTrainExperience.splice(index, 1);
    setTraining(newTrainExperience);
  };

  useEffect(() => {
    if (userInfo?.education.length > 0) {
      setWorkExperience(userInfo.education);
    }
    if (userInfo?.training.length > 0) {
      setTraining(userInfo.training);
    }
  }, [userInfo]);

  useEffect(() => {
    reset({
      ...getValues(),
      workExperience: workExperience,
      training: training,
    });
  }, [workExperience, training]);

  const onSubmit = async (data) => {
    const formData = {
      education: data.workExperience,
      training: data.training,
    };
    console.log("this education form data", formData);
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
      <h2 className="DashtextPara">একাডেমিক তথ্য</h2>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          {workExperience?.map((experience, index) => (
            <div key={index}>
              <p className="dashParaSmalls">
                শিক্ষা প্রতিষ্ঠান {experience.workNumber}
              </p>
              <div className="d-md-flex align-items-center justify-content-between">
                <div className="DashProfileInput">
                  <label htmlFor="">শিক্ষা প্রতিষ্ঠানের নাম</label>
                  <input
                    type="text"
                    {...register(`workExperience.${index}.institution`)}
                    placeholder="আপনার শিক্ষা প্রতিষ্ঠানের নাম লিখুন"
                    defaultValue={
                      workExperienceFields?.[index]?.institution || ""
                    }
                  />
                </div>
                <div className="DashProfileInput">
                  <label htmlFor="">শিক্ষার লেভেল</label>
                  <select
                    {...register(`workExperience.${index}.educationLevel`)}
                    defaultValue={
                      workExperienceFields?.[index]?.educationLevel || ""
                    }
                  >
                    <option value="">শিক্ষার লেভেল নির্বাচন করুন</option>

                    <option value="Masters">মাস্টার্স</option>
                    <option value="Hons">ব্যাচেলর্স</option>
                    <option value="Diploma">ডিপ্লোমা </option>
                    <option value="HSC">এইচএসসি </option>
                    <option value="SSC">এসএসসি</option>
                    <option value="JSC">জেএসসি </option>
                    <option value="PSC">পিএসসি </option>
                    <option value="PSC">দাখিল </option>
                    <option value="PSC"> আলিম </option>
                    <option value="PSC"> অন্যান্য </option>
                  </select>
                </div>
              </div>

              <div className="d-md-flex align-items-center justify-content-between">
                <div className="DashProfileInput">
                  <label htmlFor="">ডিগ্রী</label>
                  <input
                    type="text"
                    {...register(`workExperience.${index}.degree`)}
                    placeholder="ডিগ্রীর নাম লিখুন"
                    defaultValue={experience?.degree}
                  />
                </div>
                <div className="DashProfileInput">
                  <label htmlFor="">গ্রুপ/মেজর</label>
                  <input
                    type="text"
                    {...register(`workExperience.${index}.group`)}
                    placeholder="শিক্ষার গ্রুপ লিখুন"
                    defaultValue={workExperienceFields?.[index]?.group || ""}
                  />
                </div>
              </div>

              <div className="d-md-flex align-items-center justify-content-between">
                <div className="DashProfileInput">
                  <label htmlFor="">শিক্ষা প্রতিষ্ঠানের অবস্থান</label>
                  <input
                    type="text"
                    {...register(`workExperience.${index}.location`)}
                    placeholder="শিক্ষা প্রতিষ্ঠানের অবস্থান লিখুন"
                    defaultValue={workExperienceFields?.[index]?.location || ""}
                  />
                </div>
                <div className="DashProfileInput">
                  <label htmlFor="">রেজাল্ট</label>
                  <input
                    type="text"
                    {...register(`workExperience.${index}.result`)}
                    placeholder="ফলাফল লিখুন"
                    defaultValue={workExperienceFields?.[index]?.result || ""}
                  />
                </div>
              </div>
              <div className="d-md-flex align-items-center justify-content-around">
                <div className="DashProfileInput">
                  <label htmlFor="">পড়াশুনা শুরুর বছর</label>
                  <input
                    type="date"
                    {...register(`workExperience.${index}.startDate`)}
                    placeholder="Start Date"
                    defaultValue={
                      workExperienceFields?.[index]?.startDate || ""
                    }
                  />
                </div>
                <div className="DashProfileInput">
                  <label htmlFor="">পড়াশুনা শেষের বছর</label>
                  <input
                    type="date"
                    {...register(`workExperience.${index}.endDate`)}
                    placeholder="endDate"
                    defaultValue={workExperienceFields?.[index]?.endDate || ""}
                    disabled={
                      watch(`workExperience.${index}.isCurrent`) || false
                    }
                  />
                </div>
              </div>
              <input
                type="checkbox"
                className="mt-4 me-2"
                {...register(`workExperience.${index}.isCurrent`)}
                checked={watch(`workExperience.${index}.isCurrent`) || false}
                onChange={(e) => {
                  setValue(
                    `workExperience.${index}.isCurrent`,
                    e.target.checked
                  );
                }}
              />
              <label>বর্তমানে কর্মরত আছি</label>

              {experience.canDelete && (
                <p
                  type="button"
                  onClick={() => deleteWorkExperience(index)}
                  className="dashParaSmallText"
                >
                  বাদ দিন
                </p>
              )}
            </div>
          ))}
          <p
            className="dashParaSmallText"
            type="button"
            onClick={addWorkExperience}
          >
            + আরো শিক্ষা প্রতিষ্ঠান যুক্ত করুন
          </p>

          {training.map((experience, index) => (
            <div key={index}>
              <p className="dashParaSmalls">ট্রেইনিং {experience.workNumber}</p>
              <div className="d-md-flex align-items-center justify-content-between">
                <div className="DashProfileInput">
                  <label htmlFor="">প্রতিষ্ঠানের নাম</label>
                  <input
                    type="text"
                    {...register(`training.${index}.institution`)}
                    placeholder="ট্রেনিংকৃত প্রতিষ্ঠানের নাম লিখুন"
                    defaultValue={experience?.institution}
                  />
                </div>
                <div className="DashProfileInput">
                  <label htmlFor="">ট্রেইনিং এর নাম</label>
                  <input
                    type="text"
                    {...register(`training.${index}.name`)}
                    placeholder="ট্রেইনিংএর নাম লিখুন"
                    defaultValue={experience?.name}
                  />
                </div>
              </div>

              <div className="d-md-flex align-items-center justify-content-between">
                <div className="DashProfileInput">
                  <label htmlFor="">ট্রেইনিং প্রাপ্তির বছর</label>
                  <input
                    type="text"
                    {...register(`training.${index}.year`)}
                    placeholder="ট্রেনিং প্রাপ্তির সময় লিখুন "
                    defaultValue={experience?.year}
                  />
                </div>
                <div className="DashProfileInput">
                  <label htmlFor="">সময়কাল (মাস) </label>
                  <input
                    type="text"
                    {...register(`training.${index}.time`)}
                    placeholder="ট্রেনিং এর সময়কাল লিখুন"
                    defaultValue={experience?.time}
                  />
                </div>
              </div>

              <div className="d-md-flex align-items-center justify-content-between">
                <div className="DashProfileInput">
                  <label htmlFor="">প্রতিষ্ঠানের অবস্থান</label>
                  <input
                    type="text"
                    {...register(`training.${index}.location`)}
                    placeholder="ট্রেনিং প্রতিষ্ঠানের অবস্থান লিখুন "
                    defaultValue={experience?.location}
                  />
                </div>
                <div className="DashProfileInput">
                  <label htmlFor="">ট্রেইনিং এর বিবরণ</label>

                  <input
                    type="text"
                    {...register(`training.${index}.details`)}
                    placeholder="ট্রেনিং সম্পর্কে বিস্তারিত লিখুন"
                    defaultValue={experience?.details}
                  />
                </div>
              </div>

              <div className="DashProfileInput">
                <label htmlFor="">ট্রেইনিং থেকে প্রাপ্ত স্কিল সমূহ</label>
              </div>
              <input
                {...register(`training.${index}.trainSkills`)}
                type="hidden"
              />
              <TagsInput
                value={
                  Array.isArray(experience.trainSkills)
                    ? experience.trainSkills
                    : []
                }
                onChange={(value) => {
                  setValue(`training.${index}.trainSkills`, value);
                }}
                name={`training.${index}.trainSkills`}
                max="5"
                required={false}
                className="custominput"
              />
              {experience.canDelete && (
                <p
                  type="button"
                  onClick={() => deletetraining(index)}
                  className="dashParaSmallText"
                >
                  বাদ দিন
                </p>
              )}
            </div>
          ))}
          <p type="button" className="dashParaSmallText" onClick={addtraining}>
            + আরো ট্রেইনিং যুক্ত করুন
          </p>
          <input type="submit" className="DashUserSave" value="সেভ করুন" />
        </form>
      </div>
    </div>
  );
}

export default UserEducation;
