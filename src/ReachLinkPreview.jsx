import React, { useState } from 'react';
// --- NEW IMPORTS for the new library ---
import { Document, Page, pdfjs } from 'react-pdf';

// --- CORRECTED CSS IMPORTS ---
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Other assets
import BG from './assets/IntroBG85.jpg';
import upperBG from './assets/IntroBGx22.jpg';
import logo from './assets/logo.svg';

import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// 2. Set the worker path using the import
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;


const ReachLinkPreview = () => {
    // --- State for the new library ---
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1); // Page numbers start at 1
    const pdfUrl = "https://storage.googleapis.com/rech_link/1754052241774-Vertx%20Deck%20(2).pdf";

    // --- The rest of your state remains the same ---
    const tabOrder = ['DECK', 'BRIEF', 'NOTES', 'SCORE'];
    const [activeTab, setActiveTab] = useState(tabOrder[0]);
    const [notesSlideIndex, setNotesSlideIndex] = useState(0);
    const notesSlides = [
        { title: 'Market Opportunity', text: "There's a growing market opportunity in hyperlocal pet wellness combining doorstep vet care, organic pet food delivery, and real-time health tracking. Gen Z pet parents are driving the demand." },
        { title: 'Business Model', text: "We offer unparalleled efficiency and data-driven insights to businesses, while providing seamless, personalized services to end-users. Our integrated suite reduces operational overhead and enhances user experience." },
        { title: 'Potential Metrics', text: "We track key user engagement metrics, including Monthly Active Users (MAU), session duration, and feature adoption rates. Our goal is to achieve a 40% month-over-month increase in MAU in the first year." },
        { title: 'Company Description', text: "Octartech Private Limited is an AI-powered fundraising suite for startups and investors. Our flagship product, VERTX AI, streamlines the entire fundraising process, from pitch deck creation to investor outreach and deal management, leveraging generative AI to provide a competitive edge in a crowded market." },
    ];
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleScoreChange = (event) => setScore(parseFloat(event.target.value));
    const handleFeedbackChange = (event) => setFeedback(event.target.value);
    const handleSubmit = () => setSubmitted(true);
    const minScore = 0;
    const maxScore = 10;
    const fillPercentage = ((score - minScore) / (maxScore - minScore)) * 100;
    
    // --- Functions for react-pdf ---
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const goToPrevPage = () => setPageNumber(prev => (prev - 1 > 0 ? prev - 1 : 1));
    const goToNextPage = () => setPageNumber(prev => (prev + 1 <= numPages ? prev + 1 : numPages));
    
    // --- Functions for NOTES tab ---
    const handleNextNote = () => {
        setNotesSlideIndex(prevIndex => (prevIndex < notesSlides.length - 1 ? prevIndex + 1 : prevIndex));
    };
    const handlePrevNote = () => {
        setNotesSlideIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };


    const renderContent = () => {
        switch (activeTab) {
            case 'DECK':
                return (
                    <div style={{ position: 'relative', height: '71vh', backgroundColor: '#525659' }}>
                        <div className="flex justify-center items-center h-full overflow-y-auto">
                           <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                                <Page pageNumber={pageNumber} />
                           </Document>
                        </div>
                        
                        <div className="absolute bottom-4 right-36 flex items-center gap-3 bg-black/50 p-1 rounded-md">
                            <button onClick={goToPrevPage} className="px-2 py-1 rounded-md text-xs font-semibold uppercase text-white hover:bg-white/20" disabled={pageNumber <= 1}>
                                Prev
                            </button>
                            <span className="text-white text-xs px-2">Page {pageNumber} of {numPages}</span>
                            <button onClick={goToNextPage} className="px-2 py-1 rounded-md text-xs font-semibold uppercase text-white hover:bg-white/20" disabled={pageNumber >= numPages}>
                                Next
                            </button>
                        </div>
                    </div>
                );

            case 'BRIEF':
                 return (
                    <div style={{ fontFamily: "'Crimson Text', serif" }} className="bg-black w-7xl h-[71vh] p-6 md:p-12 rounded-lg shadow-xl text-gray-200 mx-auto overflow-y-auto">
                        <div className="text-center mb-4">
                            <h1 className="text-xl md:text-2xl font-semibold mb-1">OCTARTECH PRIVATE LIMITED</h1>
                            <p className="text-xl md:text-2xl text-white mb-2"> <span className='italic'>Founded on</span> <span className='font-semibold'>JULY 2025</span></p>
                            <div className="flex justify-center space-x-2 text-[10px] uppercase opacity-80">
                                <a href="#" className="text-gray-300">Website</a>
                                <span className="text-gray-500">|</span>
                                <a href="#" className="text-gray-300">LinkedIn</a>
                            </div>
                        </div>
                        <div className='border-[0.5px] justify-center mx-auto w-[100px] mb-6 border-white'/>
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
                    <div style={{ position: 'relative', height: '71vh' }}>
                        <div style={{ fontFamily: "'Crimson Text', serif" }} className="p-4 h-full text-center text-gray-300 flex flex-col justify-center items-center bg-black md:p-8 rounded-lg shadow-xl mx-auto">
                            <h2 style={{ fontFamily: "'Crimson Text', serif" }} className="text-3xl md:text-4xl text-white/60 font-serif italic mb-8">{currentNote.title}</h2>
                            <p style={{ fontFamily: "'Crimson Text', serif" }} className="text-xl md:text-2xl text-white max-w-xl">{currentNote.text}</p>
                        </div>
                        <div style={{ fontFamily: "'Crimson Text', serif" }} className="absolute bottom-4 right-36 flex gap-3">
                            <button onClick={handlePrevNote} disabled={notesSlideIndex === 0} className={`px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${notesSlideIndex === 0 ? 'text-gray-500 cursor-not-allowed' : 'cursor-pointer text-white'}`}>Prev</button>
                            <button onClick={handleNextNote} disabled={notesSlideIndex === notesSlides.length - 1} className={`px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${notesSlideIndex === notesSlides.length - 1 ? 'text-gray-500 cursor-not-allowed' : 'cursor-pointer text-white'}`}>Next</button>
                        </div>
                    </div>
                );

            case 'SCORE':
                return (
                    <div style={{ fontFamily: "'Crimson Text', serif" }} className="p-8 w-7xl bg-black/55 mx-auto h-[71vh] text-center text-gray-300">
                        {!submitted ? (
                            <>
                                <h2 className="text-3xl md:text-4xl font-normal mb-15">Score This Startup</h2>
                                <div className="flex flex-col items-center mb-8">
                                    <input type="range" min={minScore} max={maxScore} step="0.1" value={score} onChange={handleScoreChange} className="w-full max-w-6xl h-2 appearance-none cursor-pointer range-lg" style={{ background: `linear-gradient(to right, #D1D5DB ${fillPercentage}%, #4B5563 ${fillPercentage}%)`, WebkitAppearance: 'none', MozAppearance: 'none' }}/>
                                    <p className="text-5xl md:text-6xl font-bold mt-4">{score.toFixed(1)}</p>
                                </div>
                                <div><textarea className="w-full max-w-6xl mx-auto h-32 p-4 mb-8 bg-white/4 border border-[#B8B8B821] rounded-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none" placeholder="Write your thoughts or message here..." value={feedback} onChange={handleFeedbackChange}></textarea></div>
                                <div className='justify-end flex max-w-6xl'><button onClick={handleSubmit} className="px-3 py-1 text-white font-bold text-xl rounded-lg transition duration-200">SUBMIT</button></div>
                            </>
                        ) : (
                            <div style={{ fontFamily: "'Crimson Text', serif" }} className="flex flex-col items-center justify-center h-full">
                                <h2 className="text-3xl md:text-4xl font-serif italic mb-4">You've scored {score.toFixed(1)} for this pitch</h2>
                                <p className="text-xl md:text-2xl leading-relaxed max-w-2xl">{feedback ? feedback : 'No Feedback Given.'}</p>
                            </div>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen inset-0 bg-cover bg-center text-white font-inter flex flex-col items-center justify-between relative" style={{ backgroundImage: `url(${BG})`, fontFamily: "'Crimson Text', serif" }}>
            <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${BG})` }}></div>
            <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{ backgroundImage: `url(${upperBG})` }}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950 to-transparent opacity-80"></div>
            <div className="relative z-10 w-full mx-auto flex flex-col items-start pt-12 pb-8 px-4 sm:px-6 lg:px-8">
                <nav className="flex space-x-8 mb-4 ml-0 md:ml-32">
                    {tabOrder.map((tab) => (
                        <button key={tab} style={{ fontFamily: "'Crimson Text', serif" }} className={`text-xl font-bold uppercase tracking-wider px-4 py-2 transition-all duration-300 ease-in-out ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`} onClick={() => setActiveTab(tab)}>
                            {tab}
                        </button>
                    ))}
                </nav>
                <div className="rounded-lg shadow-2xl w-full">
                    {renderContent()}
                </div>
            </div>
            <footer style={{ fontFamily: "'Crimson Text', serif" }} className="relative z-10 text-gray-500 text-sm flex items-center py-4">
                REACHLINK by <img className='w-4 h-4 mx-2' src={logo} alt="Vertx Logo" /> VERTX
            </footer>
        </div>
    );
};

export default ReachLinkPreview;