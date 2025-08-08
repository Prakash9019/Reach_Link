// src/pages/UserDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import analytics from './utils/analytics';

const UserDetailPage = () => {
  const { userUUID } = useParams(); // Get userUUID from the URL
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
   console.log(userUUID);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await analytics.getUserDetails(userUUID);
        if (response.success) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [userUUID]);

  if (loading) {
    return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">Loading User Data...</div>;
  }

  if (!userData) {
    return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">User not found.</div>;
  }

  const { user, sessions, feedback } = userData;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/analytics" className="text-blue-400 hover:underline mb-6 block">&larr; Back to Analytics</Link>

        {/* User Profile Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 flex flex-col sm:flex-row items-center">
          <img
            className="h-24 w-24 rounded-full object-cover mr-0 sm:mr-6 mb-4 sm:mb-0"
            src={user.profilePictureUrl || `https://api.dicebear.com/8.x/initials/svg?seed=${user.name || 'Anonymous'}`}
            alt="User Avatar"
          />
          <div>
            <h1 className="text-3xl font-bold">{user.name || 'Anonymous User'}</h1>
            <p className="text-gray-400">{user.email}</p>
            <p className="text-sm text-gray-500">Last Seen: {new Date(user.lastSeen).toLocaleString()}</p>
          </div>
        </div>

        {/* View Sessions Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">View Sessions ({sessions.length})</h2>
          <div className="space-y-4">
            {sessions.map(session => (
              <div key={session._id} className="bg-gray-800 p-4 rounded-lg">
                <p className="font-semibold">Session ID: <span className="text-gray-400 font-mono text-xs">{session.sessionId}</span></p>
                <p>Date: {new Date(session.createdAt).toLocaleString()}</p>
                <p>Total Time: {Math.round(session.totalSessionTime / 1000)} seconds</p>
                <div className="mt-2 border-t border-gray-700 pt-2">
                  <h4 className="font-semibold mb-1">Slides Viewed:</h4>
                  <ul className="list-disc list-inside text-gray-400 text-sm">
                    {session.slideViews.map((view, index) => (
                      <li key={index}>{view.slideTitle} ({Math.round(view.watchTime / 1000)}s)</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Feedback Submissions ({feedback.length})</h2>
           <div className="space-y-4">
              {feedback.map(fb => (
                <div key={fb._id} className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-lg font-bold">Score: <span className="text-blue-400">{fb.score}/10</span></p>
                  <p className="mt-2 text-gray-300 italic">"{fb.message || 'No message provided.'}"</p>
                  <p className="text-xs text-gray-500 mt-2">Submitted at: {new Date(fb.createdAt).toLocaleString()}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;