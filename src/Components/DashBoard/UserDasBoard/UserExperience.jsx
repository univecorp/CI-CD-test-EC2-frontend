import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { TagsInput } from "react-tag-input-component";
import { toast } from "react-toastify";
import {
  useUpdateUserInfoMutation,
  useUserByEmailQuery,
} from "../../redux/rtk/features/user/userApi";
import "./userProfile.css";

function UserExperience() {
  const { user } = useSelector((state) => state.auth);
  const { data } = useUserByEmailQuery(user?.email);
  const userInfo = data?.data;
  const [updateUserInfo, { isLoading, isSuccess, isError, error }] =
    useUpdateUserInfoMutation();
  const [tools, setTools] = useState([]);
  const [technicals, setTechnicals] = useState([]);
  const [otherSkills, setOthersSkills] = useState([]);
  const [workExperience, setWorkExperience] = useState([
    {
      company: "",
      companyType: "",
      position: "",
      department: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      canDelete: false,
      jobSkills: [],
      workNumber: 1,
    },
  ]);

  const { control, register, handleSubmit, setValue, reset, watch } = useForm();
  const workExperienceFields = watch("workExperience");
  const addWorkExperience = () => {
    const newWorkExperience = {
      company: "",
      companyType: "",
      position: "",
      department: "",
      startDate: "",
      endDate: "",
      jobSkills: [],
      isCurrent: false,
      canDelete: true,
      workNumber: workExperience.length + 1, // set workNumber based on current length
    };
    setWorkExperience([...workExperience, newWorkExperience]);
  };

  const deleteWorkExperience = (index) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience.splice(index, 1);
    setWorkExperience(newWorkExperience);
  };

  useEffect(() => {
    if (userInfo?.workExperience.length > 0) {
      setWorkExperience(userInfo?.workExperience);
    }
    if (userInfo) {
      setOthersSkills(userInfo?.otherSkills);
      setTechnicals(userInfo?.technicals);
      setTools(userInfo?.tools);
    }
  }, [userInfo]);

  function setvaluein() {
    setValue("tools", tools);
    setValue("technicals", technicals);
    setValue("otherSkills", otherSkills);
  }
  const onSubmit = async (data) => {
    console.log(data);
    try {
      // call the updateUserInfo mutation with the email and formData
      await updateUserInfo({ email: user.email, data: data });
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
  useEffect(() => {
    reset({ workExperience });
  }, [workExperience, reset]);
  return (
    <div className="container-fluid">
      <h2 className="DashtextPara">জব বিষয়ক তথ্য</h2>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-md-flex align-items-center justify-content-between">
            <div className="DashProfileInput">
              <label htmlFor="">আপনি যে বিষয়ে অভিজ্ঞ</label>
              <input
                type="text"
                id=""
                {...register("jobType")}
                placeholder="আপনি যে বিষয়ে অভিজ্ঞ তার নাম লিখুন"
                defaultValue={userInfo?.jobType}
              />
            </div>
            <div className="DashProfileInput">
              <label htmlFor="">আপনার প্রোজেক্ট / পোর্টফোলিও লিঙ্ক</label>
              <input
                type="text"
                id=""
                {...register("portfolio")}
                placeholder="আপনার প্রোজেক্ট / পোর্টফোলিও লিঙ্ক দিন"
                defaultValue={userInfo?.portfolio}
              />
            </div>
          </div>

          <div className="DashProfileInput">
            <label htmlFor="">আপনি যে সকল টুলস ব্যবহারে অভিজ্ঞ</label>
          </div>
          <TagsInput
            value={tools}
            placeHolder="টুলসের নাম লিখুন এবং এন্টার চাপুন"
            onChange={setTools}
            name="skills"
            max="5"
            required={false}
            className="custominput"
          />
          <div className="DashProfileInput">
            <label htmlFor="">টেকনিক্যাল স্কিল সমূহ</label>
          </div>
          <TagsInput
            value={technicals}
            onChange={setTechnicals}
            name="skills"
            max="5"
            placeHolder="স্কিলের নাম লিখুন এবং এন্টার চাপুন"
            required={false}
            className="custominput"
          />
          <div className="DashProfileInput">
            <label htmlFor="">অন্যান্য স্কিল সমূহ</label>
          </div>
          <TagsInput
            value={otherSkills}
            onChange={setOthersSkills}
            name="skills"
            placeHolder="স্কিলের নাম লিখুন এবং এন্টার চাপুন"
            max="5"
            required={false}
            className="custominput"
          />

          {workExperience.map((experience, index) => (
            <div key={index}>
              <p className="dashParaSmalls">
                জবের অভিজ্ঞতা {experience.workNumber}
              </p>
              <div className="d-md-flex align-items-center justify-content-between">
                <div className="DashProfileInput">
                  <label htmlFor="">যে প্রতিষ্ঠানে জব করছেন</label>
                  <input
                    type="text"
                    {...register(`workExperience.${index}.company`)}
                    placeholder="প্রতিষ্ঠানের নাম লিখুন"
                    defaultValue={workExperienceFields?.[index]?.company || ""}
                  />
                </div>
                <div className="DashProfileInput">
                  <label htmlFor="">প্রতিষ্ঠানের ধরন</label>
                  <input
                    type="text"
                    {...register(`workExperience.${index}.companyType`)}
                    placeholder="প্রতিষ্ঠানটি কি ধরনের লিখুন"
                    defaultValue={
                      workExperienceFields?.[index]?.companyType || ""
                    }
                  />
                </div>
              </div>

              <div className="d-md-flex align-items-center justify-content-between">
                <div className="DashProfileInput">
                  <label htmlFor="">পদবি</label>

                  <input
                    type="text"
                    {...register(`workExperience.${index}.Position`)}
                    placeholder="জবের পদবি লিখুন"
                    defaultValue={workExperienceFields?.[index]?.Position || ""}
                  />
                </div>
                <div className="DashProfileInput">
                  <label htmlFor="">ডিপার্টমেন্ট</label>

                  <input
                    type="text"
                    {...register(`workExperience.${index}.department`)}
                    placeholder="জবের ডিপার্টমেন্ট লিখুন"
                    defaultValue={
                      workExperienceFields?.[index]?.department || ""
                    }
                  />
                </div>
              </div>
              <div className="d-md-flex align-items-center justify-content-around">
                <div className="DashProfileInput">
                  <label htmlFor="">জবের সময়সীমা</label>
                  <input
                    type="date"
                    {...register(`workExperience.${index}.startDate`)}
                    placeholder="জব শুরুর সময় লিখুন"
                    defaultValue={
                      workExperienceFields?.[index]?.startDate || ""
                    }
                  />
                </div>
                <div className="DashProfileInput">
                  <label htmlFor="">জবের সময়সীমা</label>
                  <input
                    type="date"
                    {...register(`workExperience.${index}.endDate`)}
                    placeholder="জব শেষের সময় লিখুন"
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

              <div className="DashProfileInput">
                <label htmlFor="">জব থেকে প্রাপ্ত স্কিল সমূহ</label>
              </div>
              <input
                {...register(`workExperience.${index}.jobSkills`)}
                type="hidden"
              />
              <TagsInput
                value={
                  Array.isArray(experience.jobSkills)
                    ? experience.jobSkills
                    : []
                }
                onChange={(value) => {
                  setValue(`workExperience.${index}.jobSkills`, value);
                }}
                name={`workExperience.${index}.jobSkills`}
                max="5"
                placeholder="জব থেকে প্রাপ্ত স্কিল সমূহ লিখুন এবং এন্টার চাপুন"
                required={false}
                className="custominput"
              />
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
            type="button"
            className="dashParaSmallText"
            onClick={addWorkExperience}
          >
            + আরো জবের অভিজ্ঞতা যুক্ত করুন
          </p>
          <input
            onClick={() => setvaluein()}
            type="submit"
            className="DashUserSave"
            value="সেভ করুন"
          />
        </form>
      </div>
    </div>
  );
}

export default UserExperience;
