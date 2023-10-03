import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import "./UserPerformance.css";
ChartJS.register(ArcElement, Tooltip, Legend);
const options = {
  plugins: {
    responsive: true,
    legend: {
      position: "right",
      rtl: true,
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 30,
        margin: 10,
      },
    },
  },
};

export const data = {
  labels: [
    "কোর্স অ্যাসাইনমেন্ট",
    "কুইজ মার্কস",
    "কোর্স মডিউল অগ্রগতি",
    "সময়মত কোর্স সমাপ্তি",
    "কোর্স ভিডিও সময়সীমা ",
  ],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
export default function CoursePerfomance() {
  return (
    <div>
      {/* <div className="DashChart">
        <Doughnut data={data} width={100} height={20} options={options} />
      </div> */}

      <h2 className="text-center">বর্তমানে কোনো কোর্স পারফরমেন্স নেই </h2>
    </div>
  );
}
