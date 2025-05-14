import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UpcomingMeetings from '../components/UpcomingMeetings';
import { auth, db } from "../firebase";
import { ref, set, get, child } from "firebase/database";

const meetings = [
  {
    id: '1234567890',
    title: 'Weekly Team Sync',
    startTime: '2025-05-13T10:00:00',
    password: '123456',
  },
  {
    id: '9876543210',
    title: 'Project Planning',
    startTime: '2025-05-13T15:00:00',
    password: '654321',
  },
];

const initialInterests = [
  { label: "City Council's Administration and Public Works Committee", path: "administration" },
  { label: "City Housing Committee", path: "housing" },
  { label: "Police Review Committee", path: "police-review" },
  { label: "Environment Board", path: "environment" },
  { label: "Zoning Committee", path: "zoning" },
];

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [newZipcode, setNewZipcode] = useState("");
  const [interests, setInterests] = useState(initialInterests); // ✅ 本地兴趣点状态

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setEmail(user.email);
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `users/${user.uid}`));
        if (snapshot.exists()) {
          setZipcode(snapshot.val().zipcode || "");
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleZipcodeUpdate = async () => {
    const user = auth.currentUser;
    if (user) {
      await set(ref(db, `users/${user.uid}`), {
        email: user.email,
        zipcode: newZipcode,
      });
      setZipcode(newZipcode);
      setNewZipcode("");
    }
  };

  const handleRemoveInterest = (path) => {
    // ✅ 从当前兴趣列表中移除该 path
    setInterests((prev) => prev.filter((item) => item.path !== path));
    // ✅ 可选：这里可以同步更新到数据库
  };

  return (
    <div style={{ display: 'flex', flexDirection: "column", height: '100vh', margin: '1rem' }}>
      <div>
        <h2>Profile</h2>
        <h3>Email: {email}</h3>
        <h3>Zipcode: {zipcode}</h3>
        <input
          type="text"
          placeholder="Enter new zipcode"
          value={newZipcode}
          onChange={(e) => setNewZipcode(e.target.value)}
        />
        <button onClick={handleZipcodeUpdate}>Update Zipcode</button>
      </div>

      <div style={{ display: 'flex', alignItems: "flex-start", justifyContent: "left" }}>
        <div style={{ margin: "1rem" }}>
          <h3>Interest Areas</h3>
          <ul style={{ textDecoration: "none", listStyle: "none" }}>
            {interests.map((item) => (
              <li key={item.path}>
                {item.label}
                <button onClick={() => navigate(`/department/${item.path}`)}>Go To Page</button>
                <button onClick={() => handleRemoveInterest(item.path)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ margin: "1rem" }}>
          <h3>Engagement Preferences:</h3>
          <ul>
            <li>Written submissions</li>
            <li>Social media</li>
            <li>Virtual Comments</li>
          </ul>
          <button>Update Preferences</button>
        </div>
      </div>

      <div>
        <UpcomingMeetings meetings={meetings} />
      </div>
    </div>
  );
}
