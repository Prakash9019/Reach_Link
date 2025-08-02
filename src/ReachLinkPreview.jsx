import React, { useState } from 'react';

// Main background assets
import BG from './assets/IntroBG85.jpg';
import upperBG from './assets/IntroBGx22.jpg';
import logo from './assets/logo.svg';

// --- 1. IMPORT YOUR SLIDE IMAGES ---
// I've imported the images from your screenshot.
import slide1 from './assets/Vertx Deck (2)_page-0001.jpg';
import slide2 from './assets/Vertx Deck (2)_page-0002.jpg';
import slide3 from './assets/Vertx Deck (2)_page-0003.jpg';
import slide4 from './assets/Vertx Deck (2)_page-0004.jpg';
import slide5 from './assets/Vertx Deck (2)_page-0005.jpg';
import slide6 from './assets/Vertx Deck (2)_page-0006.jpg';
import slide7 from './assets/Vertx Deck (2)_page-0007.jpg';
import slide8 from './assets/Vertx Deck (2)_page-0008.jpg';
import slide9 from './assets/Vertx Deck (2)_page-0009.jpg';
import slide10 from './assets/Vertx Deck (2)_page-0010.jpg';
import slide11 from './assets/Vertx Deck (2)_page-0011.jpg';
import slide12 from './assets/Vertx Deck (2)_page-0012.jpg';
import slide13 from './assets/Vertx Deck (2)_page-0013.jpg';
import slide14 from './assets/Vertx Deck (2)_page-0014.jpg';


// --- 2. CREATE AN ARRAY OF THE SLIDES ---
const deckSlides = [
  slide1, slide2, slide3, slide4, slide5, slide6, slide7,
  slide8, slide9, slide10, slide11, slide12, slide13, slide14
];


const ReachLinkPreview = () => {
  // Define the order of global tabs
  const tabOrder = ['DECK', 'BRIEF', 'NOTES', 'SCORE'];
  // State to manage the currently active global tab
  const [activeTab, setActiveTab] = useState(tabOrder[0]);

  // States for DECK and NOTES sliders
  const [deckSlideIndex, setDeckSlideIndex] = useState(0);
  const [notesSlideIndex, setNotesSlideIndex] = useState(0);

  // Content for NOTES slider
  const notesSlides = [
    { title: 'Market Opportunity', text: "There's a growing market opportunity in hyperlocal pet wellness combining doorstep vet care, organic pet food delivery, and real-time health tracking. Gen Z pet parents are driving the demand." },
    { title: 'Business Model', text: "We offer unparalleled efficiency and data-driven insights to businesses, while providing seamless, personalized services to end-users. Our integrated suite reduces operational overhead and enhances user experience." },
    { title: 'Potential Metrics', text: "We track key user engagement metrics, including Monthly Active Users (MAU), session duration, and feature adoption rates. Our goal is to achieve a 40% month-over-month increase in MAU in the first year." },
    { title: 'Company Description', text: "Octartech Private Limited is an AI-powered fundraising suite for startups and investors. Our flagship product, VERTX AI, streamlines the entire fundraising process, from pitch deck creation to investor outreach and deal management, leveraging generative AI to provide a competitive edge in a crowded market." },
  ];

  // State and handlers for SCORE tab
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const handleScoreChange = (event) => setScore(parseFloat(event.target.value));
  const handleFeedbackChange = (event) => setFeedback(event.target.value);
  const handleSubmit = () => setSubmitted(true);
  const minScore = 0;
  const maxScore = 10;
  const fillPercentage = ((score - minScore) / (maxScore - minScore)) * 100;

  // Handlers for individual sliders
  const handleNextSlide = (tabName) => {
    if (tabName === 'DECK') {
      setDeckSlideIndex(prevIndex => (prevIndex < deckSlides.length - 1 ? prevIndex + 1 : prevIndex));
    } else if (tabName === 'NOTES') {
      setNotesSlideIndex(prevIndex => (prevIndex < notesSlides.length - 1 ? prevIndex + 1 : prevIndex));
    }
  };

  const handlePrevSlide = (tabName) => {
    if (tabName === 'DECK') {
      setDeckSlideIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (tabName === 'NOTES') {
      setNotesSlideIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    }
  };

  // Function to render content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'DECK':
        return (
          // The parent is now relative to position the buttons correctly
          <div className="relative w-full h-[71vh]">
            <div className="w-full h-full flex items-center justify-center bg-black">
              <img
                src={deckSlides[deckSlideIndex]}
                alt={`Deck Slide ${deckSlideIndex + 1}`}
                className="w-full h-full object-contain" // Use object-contain to see the whole slide
              />
            </div>
            {/* --- 3. RESPONSIVE SLIDER NAVIGATION --- */}
            {/* This div centers on mobile and moves to the right on desktop */}
            <div className="absolute bottom-4 w-full md:w-auto md:right-36 flex justify-center md:justify-end gap-3">
              <div className="bg-black/50 p-1 rounded-md flex gap-3">
                  <button
                    onClick={() => handlePrevSlide('DECK')}
                    disabled={deckSlideIndex === 0}
                    className="px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors duration-200 text-white disabled:text-gray-500 disabled:cursor-not-allowed"
                  >
                    Prev
                  </button>
                  <span className="text-white text-xs px-2 flex items-center">{deckSlideIndex + 1} / {deckSlides.length}</span>
                  <button
                    onClick={() => handleNextSlide('DECK')}
                    disabled={deckSlideIndex === deckSlides.length - 1}
                    className="px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors duration-200 text-white disabled:text-gray-500 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
              </div>
            </div>
          </div>
        );
      case 'BRIEF':
        return (
            <div style={{ fontFamily: "'Crimson Text', serif" }} className="bg-black w-full h-[71vh] p-6 md:p-12 rounded-lg shadow-xl text-gray-200 mx-auto overflow-y-auto">
                <div className="text-center mb-4">
                  <h1 className="text-xl md:text-2xl font-semibold mb-1">OCTARTECH PRIVATE LIMITED</h1>
                  <p className="text-xl md:text-2xl text-white mb-2"> <span className='italic'>Founded on</span> <span className='font-semibold'>JULY 2025</span></p>
                  <div className="flex justify-center space-x-2 text-[10px] uppercase opacity-80">
                    <a href="#" className="text-gray-300">Website</a>
                    <span className="text-gray-500">|</span>
                    <a href="#" className="text-gray-300">LinkedIn</a>
                  </div>
                </div>
                <div className='border-[0.5px] justify-center mx-auto w-[100px] mb-6 border-white' />
                <div className="mb-6 text-center">
                  <h2 className="text-xs font-semibold uppercase underline tracking-wider text-white/50 mb-1">Product</h2>
                  <p className="text-[16px] font-semibold">VERTX AI</p>
                </div>
                <div className="mb-8 text-center">
                  <h2 className="text-xs font-semibold uppercase underline tracking-wider text-white/50 mb-1">Description</h2>
                  <p className="text-[16px] font-semibold">End to end AI Fundraising Suite</p>
                </div>
                <div className="flex flex-wrap justify-around gap-y-6 gap-x-4 mb-10 mx-auto items-center max-w-3xl text-center">
                  <div><h3 className="text-xs font-semibold uppercase underline tracking-wider text-white/50 mb-1">Sectors</h3><p className="text-[16px] font-semibold">AI, Generative Tech, FinTech</p></div>
                  <div><h3 className="text-xs font-semibold uppercase underline tracking-wider text-white/50 mb-1">Stage</h3><p className="text-[16px] font-semibold">Pre-Revenue</p></div>
                  <div><h3 className="text-xs font-semibold uppercase underline tracking-wider text-white/50 mb-1">Category</h3><p className="text-[16px] font-semibold">B2B, B2C, B2B2C</p></div>
                  <div><h3 className="text-xs font-semibold uppercase underline tracking-wider text-white/50 mb-1">Model</h3><p className="text-[16px] font-semibold">SaaS</p></div>
                  <div><h3 className="text-xs font-semibold uppercase underline tracking-wider text-white/50 mb-1">HQ</h3><p className="text-[16px] font-semibold">India</p></div>
                </div>
                <div className="text-center mb-2">
                  <h2 className="text-[16px] flex justify-center mx-auto font-semibold uppercase underline tracking-wider text-white/50 mb-2">Team</h2>
                  <div className="grid grid-cols-3 gap-2 text-white mx-auto max-w-sm">
                    <div className="flex flex-col items-center"><p className="text-xs font-semibold">Praneeth Kumar</p><p className="text-xs font-semibold mb-1">CEO</p><a href="#" className="text-[10px] uppercase">LinkedIn</a></div>
                    <div className="flex flex-col items-center"><p className="text-xs font-semibold">Surya Prakash</p><p className="text-xs font-semibold mb-1">CTO</p><a href="#" className="text-[10px] uppercase">LinkedIn</a></div>
                    <div className="flex flex-col items-center"><p className="text-xs font-semibold">Tharan PS</p><p className="text-xs font-semibold mb-1">CMO</p><a href="#" className="text-[10px] uppercase">LinkedIn</a></div>
                  </div>
                </div>
              </div>
        );
      case 'NOTES':
        const currentNote = notesSlides[notesSlideIndex];
        return (
          <div className="relative w-full h-[71vh]">
            <div style={{ fontFamily: "'Crimson Text', serif" }} className="p-4 h-full text-center text-gray-300 flex flex-col justify-center items-center bg-black md:p-8 rounded-lg shadow-xl mx-auto">
              <h2 style={{ fontFamily: "'Crimson Text', serif" }} className="text-3xl md:text-4xl text-white/60 font-serif italic mb-8">{currentNote.title}</h2>
              <p style={{ fontFamily: "'Crimson Text', serif" }} className="text-xl md:text-2xl text-white max-w-xl">{currentNote.text}</p>
            </div>
            <div className="absolute bottom-4 w-full md:w-auto md:right-36 flex justify-center md:justify-end gap-3">
                 <div className="bg-black/50 p-1 rounded-md flex gap-3">
                    <button
                        onClick={() => handlePrevSlide('NOTES')}
                        disabled={notesSlideIndex === 0}
                        className="px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors duration-200 text-white disabled:text-gray-500"
                    >
                        Prev
                    </button>
                    <button
                        onClick={() => handleNextSlide('NOTES')}
                        disabled={notesSlideIndex === notesSlides.length - 1}
                        className="px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors duration-200 text-white disabled:text-gray-500"
                    >
                        Next
                    </button>
                </div>
            </div>
          </div>
        );
      case 'SCORE':
        return (
          <div style={{ fontFamily: "'Crimson Text', serif" }} className="p-4 md:p-8 w-full bg-black/55 mx-auto h-[71vh] text-center text-gray-300">
            {!submitted ? (
              <>
                <h2 className="text-3xl md:text-4xl font-normal mb-8 md:mb-16">Score This Startup</h2>
                <div className="flex flex-col items-center mb-8">
                  <input
                    type="range" min={minScore} max={maxScore} step="0.1" value={score} onChange={handleScoreChange}
                    className="w-full max-w-md md:max-w-xl lg:max-w-4xl h-2 appearance-none cursor-pointer range-lg"
                    style={{ background: `linear-gradient(to right, #D1D5DB ${fillPercentage}%, #4B5563 ${fillPercentage}%)` }}
                  />
                  <p className="text-5xl md:text-6xl font-bold mt-4">{score.toFixed(1)}</p>
                </div>
                <div>
                  <textarea
                    className="w-full max-w-md md:max-w-xl lg:max-w-4xl mx-auto h-32 p-4 mb-8 bg-white/5 border border-gray-700 rounded-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                    placeholder="Write your thoughts or message here..."
                    value={feedback} onChange={handleFeedbackChange}
                  ></textarea>
                </div>
                <div className='justify-end flex max-w-md md:max-w-xl lg:max-w-4xl mx-auto'>
                  <button onClick={handleSubmit} className="px-4 py-2 text-white font-bold text-lg md:text-xl rounded-lg transition duration-200 hover:bg-white/10">
                    SUBMIT
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-3xl md:text-4xl font-serif italic mb-4">You've scored {score.toFixed(1)} for this pitch</h2>
                <p className="text-xl md:text-2xl leading-relaxed max-w-2xl">{feedback || 'No Feedback Given.'}</p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-inter flex flex-col items-center" style={{ fontFamily: "'Crimson Text', serif" }}>
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${BG})` }}></div>
      <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{ backgroundImage: `url(${upperBG})` }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950 to-transparent opacity-80"></div>
      <div className="relative z-10 w-full flex flex-col items-center pt-8 md:pt-12 pb-8 px-4">
        <nav className="flex space-x-4 md:space-x-8 mb-4">
          {tabOrder.map((tab) => (
            <button
              key={tab}
              style={{ fontFamily: "'Crimson Text', serif" }}
              className={`text-lg md:text-xl font-bold uppercase tracking-wider px-2 md:px-4 py-2 transition-all duration-300 ease-in-out ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
        <div className="rounded-lg shadow-2xl w-full max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </div>
      <footer style={{ fontFamily: "'Crimson Text', serif" }} className="relative z-10 text-gray-500 text-sm flex items-center py-4 mt-auto">
        REACHLINK by <img className='w-4 h-4 mx-2' src={logo} alt="Vertx Logo" /> VERTX
      </footer>
    </div>
  );
};

export default ReachLinkPreview;