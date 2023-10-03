import "chart.js/auto";

import { Bar, Line } from "react-chartjs-2";
import { useGetUsersQuery } from "../../redux/rtk/features/user/userApi";
import "./userAnalytics.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../../config/apiConfig";

// eslint-disable-next-line react/prop-types
export default function UserAnalytics({ role }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (role !== user?.role) {
    navigate("/page-not-found");
  }
  const { data: users, isLoading } = useGetUsersQuery();

  useEffect(() => {
    axios
      .get(`${config.apiUrl}/get-user-count`)
      .then((response) => {
        const userData = response?.data?.data || [];
        setData(userData);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  // Calculate the counts for each role based on the total user count
  const totalUserCount = users?.data?.length || 0;

  const adminCount =
    users?.data?.filter((user) => user.role === "Admin").length || 0;
  const recruiterCount =
    users?.data?.filter((user) => user.role === "Recruiter").length || 0;
  const instructorCount =
    users?.data?.filter((user) => user.role === "Instructor").length || 0;
  const userCount =
    users?.data?.filter((user) => user.role === "User").length || 0;

  const verifiedUsers =
    users?.data?.filter((user) => user.verifiedStatus === "verified").length ||
    0;

  const UnverifiedUsers =
    users?.data?.filter((user) => user.verifiedStatus === "unverified")
      .length || 0;

  const chartData = {
    labels: ["Total Users"],
    datasets: [
      {
        label: "Admin",
        data: [adminCount],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        barThickness: 60,
      },
      {
        label: "Recruiter",
        data: [recruiterCount],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        barThickness: 60,
      },
      {
        label: "Instructor",
        data: [instructorCount],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        barThickness: 60,
      },
      {
        label: "User",
        data: [userCount],
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        barThickness: 60,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "User Roles",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "User Count",
        },
        beginAtZero: true,
      },
    },
  };

  const chartData1 = {
    labels: ["Total Verified Users"],
    datasets: [
      {
        label: "verified",
        data: [verifiedUsers],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        barThickness: 60,
      },
      {
        label: "unverified",
        data: [UnverifiedUsers],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        barThickness: 60,
      },
    ],
  };

  const chartOptions1 = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "User Verified/Unverified Status",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "User Verified/Unverified Count",
        },
        beginAtZero: true,
      },
    },
  };

  const formatData = () => {
    const labels = data.map((item) => {
      const date = new Date(item.currentDateSignUp);

      console.log(date);
      return date.toLocaleDateString();
    });

    const signCountData = data.map((item) => item.signCount);

    const loginCountData = data.map((item) => item.loginCount);

    return {
      labels,
      datasets: [
        {
          label: "Sign Count",
          data: signCountData,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          fill: false,
        },
        {
          label: "Login Count",
          data: loginCountData,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          fill: false,
        },
      ],
    };
  };

  return (
    <>
      <h1 className="user-analytics-header">User Analytics</h1>
      <div className="user-analytics-container mx-auto">
        {isLoading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div className="d-flex">
            <div className="chart-container">
              <Bar data={chartData} options={chartOptions} />
            </div>
            <div className="chart-container">
              <Bar data={chartData1} options={chartOptions1} />
            </div>

            <div className="chart-container">
              <Line data={formatData()} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
