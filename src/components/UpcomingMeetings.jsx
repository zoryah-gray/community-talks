import React, { useEffect, useState } from "react";

export default function UpcomingMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await fetch("/api/zoom/meetings"); // 👈 后端代理地址
        const data = await res.json();
        setMeetings(data.meetings || []);
      } catch (error) {
        console.error("Failed to load Zoom meetings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  if (loading) return <p className="text-gray-500">Loading meetings...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Upcoming Meetings</h2>
      {meetings.length === 0 && (
        <p className="text-gray-400">No upcoming meetings</p>
      )}
      {meetings.map((meeting) => (
        <div key={meeting.id} className="mb-4 border p-3 rounded-lg shadow-sm">
          <h4 className="font-medium">{meeting.topic}</h4>
          <p className="text-sm text-gray-600">
            {new Date(meeting.start_time).toLocaleString()}
          </p>
          <a
            href={`https://zoom.us/j/${meeting.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            Join Meeting
          </a>
        </div>
      ))}
    </div>
  );
}
