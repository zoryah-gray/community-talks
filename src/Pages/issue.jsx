// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import UpcomingMeetings from "../components/UpcomingMeetings";
// import FeedbackForm from "../components/FeedbackForm";
// import "../css/Issue.css";

// const meetings = [
//   {
//     id: "1234567890",
//     title: "Weekly Team Sync",
//     startTime: "2025-05-13T20:00:00",
//     password: "123456",
//   },
//   {
//     id: "9876543210",
//     title: "Project Planning",
//     startTime: "2025-05-13T15:00:00",
//     password: "654321",
//   },
// ];

// const SPECIAL_DEPT =
//   "City Council's Administration and Public Works Committee";

// const recordings = [
//   {
//     title: "May 12, 2025 - Meeting Recording",
//     url: "https://youtu.be/watch?v=RArWkNTRJl0",
//   },
//   {
//     title: "April 26, 2025 - Meeting Recording",
//     url: "https://youtu.be/watch?v=IQtLFnZeaDE",
//   },
// ];

// const members = [
//   { name: "Ald. Devon Reid", role: "Chair" },
//   { name: "Ald. Clare Kelly", role: "Vice Chair" },
//   { name: "Ald. Bobby Burns", role: "Member" },
// ];

// const DEPT_INFO = [
//   "Matters relating to the bills and purchases; budget policy; finance; fire; legal; licensing; personnel; public works, including: streets and alleys, lighting, refuse disposal, water and sewers, traffic control, and parking; public buildings, public transportation; public utilities; safety (including civil defense); liaison with the police and fire pension boards; and capital improvements. # OF MEMBERS: Five (5) Councilmembers are appointed."
// ];

// export default function IssuePage() {
//   const [showFeedback, setShowFeedback] = useState(false);
//   const { deptId } = useParams();
//   const navigate = useNavigate();
//   const readableDeptName = decodeURIComponent(deptId);
//   const isSpecial = readableDeptName === SPECIAL_DEPT;

//   return (
//     <div className="issue-page">
//       {/* 左侧 */}
//       <div className="issue-left">
//         <button className="back-button" onClick={() => navigate("/")}>
//           ← Back to Home
//         </button>

//         <h1 className="page-title">{readableDeptName}</h1>
//         <p className="page-subtitle"> <strong>DUTIES & RESPONSIBILITIES:</strong></p>
//         <div className="page-subtitle">
//           {DEPT_INFO}
//         </div>

//         {isSpecial && (
//           <div className="section-box">
//             <h2>👫 Members</h2>
//             <ul>
//               {members.map((m) => (
//                 <li key={m.name}>
//                   <strong>{m.name}</strong> – {m.role}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {isSpecial && (
//           <div className="section-box">
//             <h2>📽️ Recordings</h2>
//             <div className="recording-list">
//               {recordings.map((rec) => {
//                 const videoId = new URLSearchParams(
//                   new URL(rec.url).search
//                 ).get("v");
//                 return (
//                   <div key={rec.title} className="recording-item">
//                     <p>{rec.title}</p>
//                     <div className="video-wrapper">
//                       <iframe
//                         src={`https://www.youtube.com/embed/${videoId}`}
//                         title={rec.title}
//                         frameBorder="0"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                         allowFullScreen
//                       />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         <div className="section-box">
//           <h2>💬 Feedback</h2>
//           <button
//             onClick={() => setShowFeedback(true)}
//             className="submit-btn"
//           >
//             Submit Feedback
//           </button>
//         </div>

//         {showFeedback && (
//           <FeedbackForm
//             department={readableDeptName}
//             onClose={() => setShowFeedback(false)}
//           />
//         )}
//       </div>

     
//       <div className="issue-right">
//         <div className="section-box">
//           <h2>📅 Upcoming Zoom Meetings</h2>
//           <UpcomingMeetings meetings={meetings} />
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { ref, get } from "firebase/database";
import UpcomingMeetings from "../components/UpcomingMeetings";
import FeedbackForm from "../components/FeedbackForm";
import "../css/Issue.css";

export default function IssuePage() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const { category, slug } = useParams();
  const navigate = useNavigate();
  const readableCategory = decodeURIComponent(category);
  const readableName = decodeURIComponent(slug.replace(/-/g, " "));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(db, `detail/${readableCategory}/${slug}`));
        if (snapshot.exists()) {
          setDetailData(snapshot.val());
        } else {
          setDetailData(null);
        }
      } catch (err) {
        console.error("❌ Failed to load detail:", err);
      }
    };
    fetchData();
  }, [category, slug]);

  const meetings = [
    {
      id: "1234567890",
      title: "Weekly Team Sync",
      startTime: "2025-05-13T20:00:00",
      password: "123456",
    },
  ];

  return (
    <div className="issue-page">
      <div className="issue-left">
        <button className="back-button" onClick={() => navigate("/")}>
          ← Back to Home
        </button>

        <h1 className="page-title">{readableName}</h1>

        {detailData?.description && (
          <div className="section-box">
            <p className="page-subtitle">
              <strong>DUTIES & RESPONSIBILITIES:</strong>
            </p>
            <div>{detailData.description}</div>
          </div>
        )}

        {detailData?.members && (
          <div className="section-box">
            <h2>👫 Members</h2>
            <ul>
              {detailData.members.map((m, i) => (
                <li key={i}>
                  <strong>{m.name}</strong>
                  {m.role ? ` – ${m.role}` : ""} {m.term ? `(${m.term})` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}

        {detailData?.meetings && (
          <div className="section-box">
            <h2>📽️ Recordings</h2>
            <div className="recording-list">
              {detailData.meetings.map((rec, i) => {
                let videoId = "";
                try {
                  const urlObj = new URL(rec.link);
                  videoId = new URLSearchParams(urlObj.search).get("v") || urlObj.pathname.split("/").pop();
                } catch (_) {}

                return (
                  <div key={i} className="recording-item">
                    <p>{rec.date}</p>
                    <div className="video-wrapper">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={rec.date}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="section-box">
          <h2>💬 Feedback</h2>
          <button
            onClick={() => setShowFeedback(true)}
            className="submit-btn"
          >
            Submit Feedback
          </button>
        </div>

        {showFeedback && (
          <FeedbackForm
            department={readableName}
            onClose={() => setShowFeedback(false)}
          />
        )}
      </div>

      <div className="issue-right">
        <div className="section-box">
          <h2>📅 Upcoming Zoom Meetings</h2>
          <UpcomingMeetings meetings={meetings} />
        </div>
      </div>
    </div>
  );
}
