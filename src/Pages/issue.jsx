

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { ref, get } from "firebase/database";
import UpcomingMeetings from "../components/UpcomingMeetings";
import FeedbackForm from "../components/FeedbackForm";
import "../css/Issue.css";
import { parse, format, isValid, addHours } from "date-fns";


const isValidUrl = (str) => {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
};


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

  const formatKey = (key) =>
    key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="issue-page">
      <div className="issue-left">
        <button className="back-button" onClick={() => navigate("/")}>
          ← Back to Home
        </button>

        <h1 className="page-title">{readableName}</h1>

        {detailData?.description && (
          <div className="section-box">
            <p className="page-subtitle" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              Duties & Responsibilities:
            </p>
            <div>
              {detailData.description
                .split(/(?<=\.)\s+/)
                .filter(Boolean)
                .map((para, idx) => (
                  <p key={idx} style={{ marginBottom: "0.6em" }}>{para.trim()}</p>
                ))}
            </div>
          </div>
        )}

        {/* {detailData?.members && (
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
        )} */}
        {detailData?.members && (
          <div className="section-box">
            <h2>👫 Members</h2>
            <ul>
              {detailData.members.map((m, i) => (
                <li key={i}>
                  {m.profileLink ? (
                    <a href={m.profileLink} target="_blank" rel="noopener noreferrer">
                      <strong>{m.name}</strong>
                    </a>
                  ) : (
                    <strong>{m.name}</strong>
                  )}
                  {m.role ? ` – ${m.role}` : ""} {m.term ? ` (${m.term})` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}


        {detailData?.recordings && (
          <div className="section-box">
            <h2>📽️ Recordings</h2>
            <div className="recording-list">
              {detailData.recordings.map((rec, i) => {
                let videoId = "";
                try {
                  const urlObj = new URL(rec.link);
                  videoId =
                    new URLSearchParams(urlObj.search).get("v") ||
                    urlObj.pathname.split("/").pop();
                } catch (_) { }

                return (
                  <div key={i} className="recording-item">
                    <p>{rec.date || rec.title}</p>
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

        {detailData &&
          Object.entries(detailData).map(([key, value]) => {
            if (["description",'lastUpdated', "members", 'meetings', "recordings", "meetingPlace", "meetingSchedule"].includes(key)) return null;


            if (Array.isArray(value)) {
              return (
                <div key={key} className="section-box">
                  <h2>{formatKey(key)}</h2>
                  <ul>
                    {value.map((v, i) => (
                      <li key={i}>{typeof v === "string" ? v : JSON.stringify(v)}</li>
                    ))}
                  </ul>
                </div>
              );
            }

            return (
              <div key={key} className="section-box">
                <h2>{formatKey(key)}</h2>
                {/* <p>{typeof value === "string" ? value : JSON.stringify(value)}</p>
                 */}
                {typeof value === "string" ? (
                  isValidUrl(value) ? (
                    <a href={value} target="_blank" rel="noopener noreferrer">
                      {value}
                    </a>
                  ) : (
                    <p>{value}</p>
                  )
                ) : (
                  <p>{JSON.stringify(value)}</p>
                )}


              </div>
            );
          })}

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
              {detailData?.lastUpdated && (
        <div style={{ fontSize: "0.9em", color: "#666", marginTop: "1em", paddingLeft: "0.5em" }}>
          Last updated: {new Date(detailData.lastUpdated).toLocaleString()}
        </div>
      )}
      </div>



      <div className="issue-right">
        <div className="section-box">
          <h2>📅 Upcoming Meetings</h2>
          {/* <UpcomingMeetings meetings={meetings} /> */}

          {detailData?.meetingSchedule && (
            <p><strong>Schedule:</strong> {detailData.meetingSchedule}</p>
          )}
          {detailData?.meetingPlace && (
            <p><strong>Location:</strong> {detailData.meetingPlace}</p>
          )}
        </div>

        {detailData?.meetings && detailData.meetings.length > 0 && (
          <div className="section-box">
            <h2>📌 Scheduled In-Person Meetings</h2>
            <ul className="meeting-list">
              {detailData.meetings.map((meeting, i) => {
                const [rawStart, rawEnd] = (meeting.time || "").split(" - ");
                const dateStr = meeting.date;
                const location = meeting.location || "";
                const title = meeting.title || "Meeting";

                let startDateTime = null;
                let endDateTime = null;
                let calendarUrl = "#";
                const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

                // ✅ 解析开始时间
                if (dateStr && rawStart) {
                  startDateTime = parse(`${dateStr} ${rawStart}`, "yyyy-MM-dd h:mm a", new Date());

                  if (isValid(startDateTime)) {
                    // ✅ 如果提供了结束时间，解析它；否则默认一小时后
                    if (rawEnd) {
                      endDateTime = parse(`${dateStr} ${rawEnd}`, "yyyy-MM-dd h:mm a", new Date());
                      if (!isValid(endDateTime)) {
                        endDateTime = addHours(startDateTime, 1);
                      }
                    } else {
                      endDateTime = addHours(startDateTime, 1);
                    }

                    // ✅ 构造 Google Calendar 链接
                    calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${format(startDateTime, "yyyyMMdd'T'HHmmss")}/${format(endDateTime, "yyyyMMdd'T'HHmmss")}&location=${encodeURIComponent(location)}`;
                  }
                }

                return (
                  <li key={i} className="meeting-item" style={{ marginBottom: "1em" }}>
                    <div className="meeting-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <strong>{title}</strong>
                      <div style={{ display: "flex", gap: "0.5em" }}>
                        <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-map">
                          📍 Show on Map
                        </a>
                        <a href={calendarUrl} target="_blank" rel="noopener noreferrer" className="btn btn-calendar">
                          📅 Add to Calendar
                        </a>
                      </div>
                    </div>
                    <p style={{ margin: "0.3em 0 0 0.5em" }}>
                      <span>📆 {meeting.date}</span><br />
                      <span>🕒 {meeting.time || "Time not specified"}</span><br />
                      <span>📌 {location}</span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

      </div>


    </div>
  );
}
