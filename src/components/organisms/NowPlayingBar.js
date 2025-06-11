import React from 'react';

function NowPlayingBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img src="/assets/images/now-playing.jpg" alt="Now Playing" className="w-10 h-10 rounded-lg" />
        <div>
          <h3 className="text-sm font-semibold">Project Title</h3>
          <p className="text-xs text-gray-400">Category</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="bg-primary hover:bg-green-600 p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 19l3.197 2.132A1 1 0 0014 21.168V8.832a1 1 0 00-1.555-.832L9.75 11.168a1 1 0 000 1.664z" />
          </svg>
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <input type="range" min="0" max="100" value="50" className="w-32" />
        <span className="text-xs text-gray-400">0:30 / 3:45</span>
      </div>
    </div>
  );
}

export default NowPlayingBar;