import React from 'react';
import UpcomingMeetings from '../components/UpcomingMeetings';

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
    return (
        <div style={{ display: 'flex', flexDirection: "column", height: '100vh', margin: '1rem' }}>
            <div>
                <h2>Profile</h2>
                <h3>Email</h3>
                <h3>Zipcode</h3>
            </div>
            <div style={{display: 'flex', alignContent: "flex-start", justifyContent: "left"}}>
                <div style={{margin: "1rem"}}>
                    <h3>Interest Areas</h3>
                    <ul style={{textDecoration: "none", listStyle: "none"}}>
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