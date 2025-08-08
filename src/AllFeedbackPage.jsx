// src/pages/AllFeedbackPage.jsx

import React, { useState, useEffect } from 'react';
import analytics from './utils/analytics';

const AllFeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await analytics.getAllFeedback();
        if (response.success) {
          setFeedbackList(response.feedback);
        }
      } catch (error) {
        console.error("Failed to fetch all feedback:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">Loading Feedback Feed...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">All Feedback Submissions</h1>
        
        <div className="space-y-6">
          {feedbackList.length > 0 ? (
            feedbackList.map((item) => (
              <div key={item._id} className="bg-gray-800 p-5 rounded-lg shadow-lg">
                {/* User Info Header */}
                <div className="flex items-center mb-4">
                  <img
                    className="h-10 w-10 rounded-full object-cover mr-4"
                    src={item.user.profilePictureUrl || `https://api.dicebear.com/8.x/initials/svg?seed=${item.user.name || 'Anonymous'}`}
                    alt="User Avatar"
                  />
                  <div>
                    <p className="font-semibold">{item.user.name || 'Anonymous'}</p>
                    <p className="text-xs text-gray-400">{item.user.email || 'No email'}</p>
                  </div>
                </div>
                
                {/* Feedback Content */}
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-lg font-bold">
                    Score: <span className="text-blue-400">{item.score}/10</span>
                  </p>
                  <blockquote className="mt-2 text-gray-300 italic border-l-4 border-gray-600 pl-4">
                    {item.message || 'No message provided.'}
                  </blockquote>
                  <p className="text-xs text-gray-500 text-right mt-4">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No feedback has been submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllFeedbackPage;