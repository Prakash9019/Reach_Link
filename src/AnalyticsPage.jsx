// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import analytics from './utils/analytics'; // Adjust path if needed

// const AnalyticsPage = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await analytics.getUsersForTable();
//         if (response.success) {
//           setUsers(response.users);
//         }
//       } catch (error) {
//         console.error("Failed to fetch users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []); // Empty dependency array ensures this runs only once on mount

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
//         <p className="text-xl">Loading Analytics...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-white mb-6">User Analytics</h1>
        
//         {/* Container for the table to allow horizontal scrolling on small screens */}
//         <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
//           <table className="min-w-full text-white">
//             <thead className="bg-gray-700">
//               <tr>
//                 <th className="text-left py-3 px-4 uppercase font-semibold text-sm">User</th>
//                 <th className="text-left py-3 px-4 uppercase font-semibold text-sm hidden md:table-cell">Location</th>
//                 <th className="text-left py-3 px-4 uppercase font-semibold text-sm hidden lg:table-cell">Device</th>
//                 <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Watch Time</th>
//                 <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Last Seen</th>
//               </tr>
//             </thead>
//             <tbody className="text-gray-300">
//               {users.map((user) => (
//                 <tr key={user._id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-200">
//                   <td className="py-3 px-4">
//                     <Link to={`/analytics/user/${user.userUUID}`} className="flex items-center group">
//                       <img 
//                         className="h-10 w-10 rounded-full object-cover mr-4 flex-shrink-0" 
//                         src={user.profilePictureUrl || `https://api.dicebear.com/8.x/initials/svg?seed=${user.name || 'Anonymous'}`} 
//                         alt={user.name || 'User Avatar'} 
//                       />
//                       <div>
//                         <p className="font-semibold group-hover:text-blue-400 transition-colors duration-200">{user.name || 'Anonymous'}</p>
//                         <p className="text-xs text-gray-400 truncate">{user.email || 'No email'}</p>
//                       </div>
//                     </Link>
//                   </td>
//                   <td className="py-3 px-4 hidden md:table-cell">
//                     {user.location?.city && user.location?.country ? `${user.location.city}, ${user.location.country}` : 'N/A'}
//                   </td>
//                   <td className="py-3 px-4 hidden lg:table-cell">
//                     {user.device?.browser && user.device?.os ? `${user.device.browser} on ${user.device.os}` : 'N/A'}
//                   </td>
//                   <td className="py-3 px-4 whitespace-nowrap">
//                     {`${Math.round(user.totalWatchTime / 60000)} min`}
//                   </td>
//                   <td className="py-3 px-4 whitespace-nowrap">
//                     {new Date(user.lastSeen).toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsPage;

// src/pages/UserListPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import analytics from './utils/analytics';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // UPDATED: Call the new summary endpoint
        const response = await analytics.getUserSummary();
        if (response.success) {
          setUsers(response.users);
        }
      } catch (error) {
        console.error("Failed to fetch user summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">Loading User Data...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">User Summary</h1>
        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
          <table className="min-w-full text-white">
            <thead className="bg-gray-700">
              <tr>
                {/* UPDATED: All new table headers */}
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">User</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm hidden md:table-cell">Device</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm hidden lg:table-cell">Total Views</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Total Watch Time</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Last Seen</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm hidden lg:table-cell">Score</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm hidden xl:table-cell">Message</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm hidden xl:table-cell">Top Slide</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Active</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {users.map((user) => (
                <tr key={user.userUUID} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-200">
                  {/* User Cell with Link */}
                  <td className="py-3 px-4">
                    <Link to={`/analytics/user/${user.userUUID}`} className="flex items-center group">
                      <img 
                        className="h-10 w-10 rounded-full object-cover mr-4 flex-shrink-0" 
                        src={user.profilePictureUrl || `https://api.dicebear.com/8.x/initials/svg?seed=${user.name || '?'}`} 
                        alt={user.name || 'User Avatar'} 
                      />
                      <div>
                        <p className="font-semibold group-hover:text-blue-400">{user.name || 'Anonymous'}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email || 'N/A'}</p>
                      </div>
                    </Link>
                  </td>
                  {/* All other data cells */}
                  <td className="py-3 px-4 hidden md:table-cell capitalize">{user.deviceType || 'N/A'}</td>
                  <td className="py-3 px-4 hidden lg:table-cell">{user.totalViews}</td>
                  <td className="py-3 px-4 whitespace-nowrap font-mono">{user.totalWatchTime}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{user.lastSeen}</td>
                  <td className="py-3 px-4 hidden lg:table-cell">{user.score || 'N/A'}</td>
                  <td className="py-3 px-4 hidden xl:table-cell truncate max-w-xs">{user.message || 'N/A'}</td>
                  <td className="py-3 px-4 hidden xl:table-cell truncate max-w-xs">{user.highestEngagementSlide || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${user.isActive ? 'bg-green-500 text-green-900' : 'bg-gray-600 text-gray-200'}`}>
                      {user.isActive ? 'Yes' : 'No'}
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

export default UserListPage;