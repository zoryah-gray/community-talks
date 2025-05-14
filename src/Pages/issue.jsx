import React, { useState } from "react";
import { useParams } from "react-router-dom"; // ✅ 获取路由参数
import UpcomingMeetings from "../components/UpcomingMeetings";
import FeedbackForm from "../components/FeedbackForm";

const meetings = [
  {
    id: "1234567890",
    title: "Weekly Team Sync",
    startTime: "2025-05-13T20:00:00",
    password: "123456",
  },
  {
    id: "9876543210",
    title: "Project Planning",
    startTime: "2025-05-13T15:00:00",
    password: "654321",
  },
];

const IssuePage = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const { deptId } = useParams(); // ✅ 获取部门路径名
  const readableDeptName = deptId
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div style={{ display: "flex", height: "100vh", margin: "1rem" }}>
      <div style={{ flex: 3, padding: "20px", overflowY: "auto" }}>
        <h1>Department: {readableDeptName}</h1>
        <p>This is where your issue content goes.</p>

        <button onClick={() => setShowFeedback(true)}>📝 Submit Feedback</button>

        {showFeedback && (
          <FeedbackForm
            department={readableDeptName}
            onClose={() => setShowFeedback(false)}
          />
        )}
      </div>

      <div style={{ flex: 2, borderLeft: "1px solid #ddd", overflowY: "auto" }}>
        <UpcomingMeetings meetings={meetings} />
      </div>
    </div>
  );
};

export default IssuePage;
