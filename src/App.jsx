import React,{useEffect} from 'react'
import './App.css'
import ReachLinkPreview from './ReachLinkPreview'
import UserDetailPage from './UserDetailPage';
import AllFeedbackPage from './AllFeedbackPage';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserListPage from './AnalyticsPage';
function App() {

  return (
    <GoogleOAuthProvider clientId="817384216349-6knt6pfqq2ajhigvvojd1i2um8sedeg1.apps.googleusercontent.com">
    <div className="relative h-screen overflow-hidden">

      
      <Routes>
        <Route path="/" element={<ReachLinkPreview />} />
        <Route path="/analytics" element={<UserListPage />} />
        <Route path="/analytics/feedback" element={<AllFeedbackPage />} />
        {/* NEW ROUTE: for the user detail page */}
        <Route path="/analytics/user/:userUUID" element={<UserDetailPage />} />
      </Routes>
     </div>
     </GoogleOAuthProvider>
  )
}

export default App
