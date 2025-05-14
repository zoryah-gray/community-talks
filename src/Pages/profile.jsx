import React from 'react';
import { useEffect, useState } from 'react';
import UpcomingMeetings from '../components/UpcomingMeetings';
import { auth } from "../firebase"; // adjust path if needed
import { db } from "../firebase";
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


export default function ProfilePage(){
    const [email, setEmail] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [newZipcode, setNewZipcode] = useState("");
  
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            setEmail(user.email);
          }
        });
    
        return () => unsubscribe();
    }, []);

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
            
            <div style={{display: 'flex', alignContent: "flex-start", justifyContent: "left"}}>
                <div style={{margin: "1rem"}}>
                    <h3>Interest Areas</h3>
                    <ul style={{textDecoration: "none", listStyle: "none"}}>
                        <li>City Council's Administration and Public Works Committee
                            <button>Go To Page</button>
                            <button>Remove</button>
                        </li> 
                        <li>City Housing Committee 
                            <button>Go To Page</button>
                            <button>Remove</button>
                        </li> 
                        <li>
                            Police Review Committee
                            <button>Go To Page</button>
                            <button>Remove</button>
                        </li>
                        <li>
                            Environment Board 
                            <button>Go To Page</button>
                            <button>Remove</button>
                        </li>
                        <li>
                            Zoning Committee 
                            <button>Go To Page</button>
                            <button>Remove</button>
                            </li>
                    </ul>
                </div>
                <div style={{margin: "1rem"}}>
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
                <UpcomingMeetings meetings={meetings}/>
            </div>
        </div>
    );
}