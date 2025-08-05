import React,{useEffect} from 'react'
import './App.css'
import ReachLinkPreview from './ReachLinkPreview'
import { GoogleOAuthProvider } from '@react-oauth/google';
function App() {

  return (
    <GoogleOAuthProvider clientId="817384216349-6knt6pfqq2ajhigvvojd1i2um8sedeg1.apps.googleusercontent.com">
    <div className="relative h-screen overflow-hidden">
     <ReachLinkPreview />
     </div>
     </GoogleOAuthProvider>
  )
}

export default App
