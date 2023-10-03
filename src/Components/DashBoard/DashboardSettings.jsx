import React from "react";
import ResetPassword from "../Authentication/ResetPassword";
import PageTitle from "../Common/PageTitle";
import "./DashboardSettings.css";

export default function DashboardSettings() {
  return (
    <div>
      <PageTitle title="সেটিংস" />
      <h1 className="acc-text">পাসওয়ার্ড রিসেট করুন </h1>
      <ResetPassword></ResetPassword>
    </div>
  );
}
