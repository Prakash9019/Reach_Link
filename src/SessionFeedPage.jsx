// src/pages/SessionFeedPage.jsx

import React, { useState, useEffect } from 'react';
import analytics from '../utils/analytics';

const SessionFeedPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await analytics.getAllSessions();
        if (response.success) {
          setSessions(response.sessions);
        }
      } catch (error) {
        console.error("Failed to fetch all sessions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">Loading Session Feed...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Master Session Feed</h1>
        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
          <table className="min-w-full text-white">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">User</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Duration</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm hidden md:table-cell">Slides</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm hidden lg:table-cell">Score</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm hidden xl:table-cell">Message</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Active</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {sessions.map((session) => (
                <tr key={session._id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover mr-4"
                        src={session.userProfilePictureUrl || `https://api.dicebear.com/8.x/initials/svg?seed=${session.userName || '?'}`}
                        alt="Avatar"
                      />
                      <div>
                        <p className="font-semibold">{session.userName || 'Anonymous'}</p>
                        <p className="text-xs text-gray-400">{session.userEmail || 'N/A'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">{new Date(session.createdAt).toLocaleString()}</td>
                  <td className="py-3 px-4 font-mono whitespace-nowrap">{session.totalSessionTime}</td>
                  <td className="py-3 px-4 hidden md:table-cell">{session.slideViews}</td>
                  <td className="py-3 px-4 hidden lg:table-cell">{session.score || 'N/A'}</td>
                  <td className="py-3 px-4 hidden xl:table-cell truncate max-w-xs">{session.message || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${session.isActive ? 'bg-green-500 text-green-900' : 'bg-gray-600 text-gray-200'}`}>
                      {session.isActive ? 'Yes' : 'No'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SessionFeedPage;