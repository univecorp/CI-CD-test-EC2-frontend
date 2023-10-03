import React, { useState } from "react";
import "./LeaderBoard.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function StudentLeaderBoard({ role }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!role.includes(user?.role)) {
    navigate("/page-not-found");
  }

  // const [students, setStudents] = useState(
  //   [
  //     {
  //       name: "John",
  //       score: 100,
  //       course: "cse",
  //       quiz: 30,
  //       assignment: 20,
  //       score: 50,
  //     },
  //     {
  //       name: "Jane",
  //       score: 80,
  //       course: "eee",
  //       quiz: 10,
  //       assignment: 20,
  //       score: 30,
  //     },
  //     {
  //       name: "Bob",
  //       score: 120,
  //       course: "civil",
  //       quiz: 20,
  //       assignment: 20,
  //       score: 40,
  //     },
  //   ].sort((a, b) => b.score - a.score)
  // );

  return (
    <div>
      {/* <h1 className="text-center mt-4 lead-head">স্টুডেন্ট লিডারবোর্ড</h1> */}

      {/* <div className="leaderboard-container table-responsive">
     
      <table className='tabl1'>
        <thead>
          <tr>
            <th className='th-lead'>রেঙ্ক</th>
            <th className='th-lead'>স্টুডেন্ট নেম</th>
            <th className='th-lead'>কোর্স নেম</th>
            <th className='th-lead'>কুইজ মার্ক </th>
            <th className='th-lead'>এসাইনমেন্ট মার্ক </th>
            <th className='th-lead'>টোটাল স্কোর </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.name}>
              <td className='td-lead'>{index + 1}</td>
              <td className='td-lead'>{student.name}</td>
              <td className='td-lead'>{student.course}</td>
              <td className='td-lead'>{student.quiz}</td>
              <td className='td-lead'>{student.assignment}</td>
              <td className='td-lead'>{student.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    
    </div> */}

      <div>
        <h3 className="c-soon-text">লিডারবোর্ড এখনো এভেইল্যাবল নেই </h3>
      </div>
    </div>
  );
}
