import React, { useState, useEffect } from 'react';
import '../styles/Profile.css'; // Ensure you have this CSS file for styles

function Profile() {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [matrixRain, setMatrixRain] = useState([]);
  const fullText = 'Profile';
  
  // Update time every second
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  // Typing animation effect
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);



  // Matrix rain effect
  useEffect(() => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const createMatrixRain = () => {
      const drops = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        chars: Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]),
        speed: Math.random() * 3 + 1,
        opacity: Math.random() * 0.3 + 0.1,
      }));
      setMatrixRain(drops);
    };

    createMatrixRain();

    const rainInterval = setInterval(() => {
      setMatrixRain(prev => 
        prev.map(drop => ({
          ...drop,
          chars: drop.chars.map(() => 
            Math.random() > 0.95 ? chars[Math.floor(Math.random() * chars.length)] : drop.chars[Math.floor(Math.random() * drop.chars.length)]
          ),
        }))
      );
    }, 150);

    return () => clearInterval(rainInterval);
  }, []);

  // Check if it's late night hours for coffee animation
  const isLateNight = () => {
    const hour = currentTime.getHours();
    return hour >= 23 || hour <= 2;
  };

  const getProductivityLevel = () => {
    const hour = currentTime.getHours();
    if (hour >= 23 || hour <= 2) return 'MAXIMUM OVERDRIVE';
    if (hour >= 20 || hour <= 4) return 'HIGH ENERGY';
    if (hour >= 9 && hour <= 17) return 'STANDARD MODE';
    return 'LOW POWER';
  };

  const getCodeStatus = () => {
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    if (hour >= 23 || hour <= 2) {
      const statuses = [
        'DEBUGGING INTENSIFIES', 'COFFEE LEVEL: CRITICAL', 'TABS: 47 AND COUNTING',
        'RUBBER DUCK DEPLOYED', 'STACK OVERFLOW LOADED', 'MIDNIGHT BREAKTHROUGH MODE'
      ];
      return statuses[Math.floor(minute / 10) % statuses.length];
    }
    return 'SYSTEM IDLE';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden profile-container">


      {/* Matrix Rain Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        {matrixRain.map(drop => (
          <div
            key={drop.id}
            className="absolute text-green-400 text-xs font-mono leading-3 matrix-drop"
            style={{
              left: `${drop.x}%`,
              opacity: drop.opacity,
              animationDuration: `${20 + drop.speed * 5}s`,
            }}
          >
            {drop.chars.map((char, i) => (
              <div key={i}>{char}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Terminal Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-2 sm:px-4 py-2 font-mono text-xs sm:text-sm relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500 animate-pulse"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 animate-pulse delay-150"></div>
            </div>
            <span className="text-gray-300 text-xs sm:text-sm truncate">~/dev/portfolio/profile.js</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4 text-xs">
            <span className="text-green-400 hidden sm:inline">● ONLINE</span>
            <span className="text-green-400 sm:hidden">●</span>
            <span className="text-blue-400 hidden sm:inline">{getProductivityLevel()}</span>
            <span className="text-blue-400 sm:hidden text-xs">
              {getProductivityLevel().split(' ')[0]}
            </span>
            <span className="text-purple-400 text-xs">{currentTime.toLocaleTimeString('en-US', { 
              hour12: false, 
              hour: '2-digit', 
              minute: '2-digit'
            })}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8 sm:pb-12 text-black relative z-10">
        {/* Animated Header with Typing Effect */}
        <div className="text-center mb-8 sm:mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-500/20 to-purple-600/20 blur-3xl animate-pulse"></div>
          <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent inline-block relative z-10">
            {displayedText}
            <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
          </h1>
          <div className="mt-4 flex justify-center space-x-2 relative z-10">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping delay-75"></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-ping delay-150"></div>
          </div>
          <div className="mt-2 text-sm font-mono text-gray-400 animate-pulse">
            {getCodeStatus()}
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6 md:grid md:grid-cols-3">

          {/* About Me */}
          <div className="group shiny-card md:col-span-2 md:row-span-2 hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-400/10 to-transparent rounded-full spin-slow"></div>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center">
              <span className="mr-2">$</span> system config
              <div className="ml-auto text-xs bg-green-400/20 px-2 py-1 rounded font-mono text-green-400">
                {isLateNight() ? 'NIGHT_MODE' : 'DAY_MODE'}
              </div>
            </h2>
            <div className="space-y-4 text-white leading-relaxed">
              <p className="opacity-0 fade-in-up text-white hover:text-green-300 transition-colors duration-300" style={{ animationDelay: '0.2s' }}>
                hey  i’m someone who likes breaking stuff just to figure out how it works and how to make it better
              </p>
              <p className="opacity-0 fade-in-up text-white hover:text-blue-300 transition-colors duration-300" style={{ animationDelay: '0.4s' }}>
                i'm into web dev, data, and security. basically building, fixing, and sometimes wrecking things (on purpose)
              </p>
              <p className="opacity-0 fade-in-up text-white hover:text-purple-300 transition-colors duration-300" style={{ animationDelay: '0.6s' }}>
                i like digging into messy code, figuring out what’s broken, and turning it into something that actually works. most nights you’ll catch me up way too late chasing some bug or testing out some random idea that popped into my head. that’s just when things click for me
              </p>
              <p className="opacity-0 fade-in-up text-white hover:text-yellow-300 transition-colors duration-300" style={{ animationDelay: '0.8s' }}>
                right now i’m looking for a spot where i can bring that curiosity and problem-solving mindset to a team that cares about building smart, secure systems. i’m all about learning, messing around with new ideas, and seeing how far i can push things
              </p>
              <p className="opacity-0 fade-in-up font-medium text-white hover:text-pink-300 transition-colors duration-300" style={{ animationDelay: '1s' }}>
                if that sounds like your kind of vibe, let’s connect
              </p>
            </div>

            <div className="mt-6 flex space-x-2">
              <div className="px-3 py-1 bg-green-400/20 text-green-400 rounded-full text-xs font-mono animate-pulse">
                status: available
              </div>
              <div className="px-3 py-1 bg-blue-400/20 text-blue-400 rounded-full text-xs font-mono">
                mode: {isLateNight() ? 'hacker' : 'developer'}
              </div>
            </div>
          </div>

          {/* Visual Clock Animation - Enhanced */}
          <div className="group shiny-card hover:scale-105 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-transparent to-blue-400/5 animate-pulse"></div>
            <div className="flex flex-col items-center justify-center h-full space-y-4 relative z-10">
              {/* Live Status Indicator */}
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-mono text-green-400">LIVE</span>
              </div>
              
              {/* Digital Clock Display */}
              <div className="font-mono text-3xl text-green-400 bg-black bg-opacity-70 px-4 py-2 rounded-lg border border-green-400 shadow-lg shadow-green-400/20 relative">
                <div className="absolute inset-0 bg-green-400/10 animate-pulse rounded-lg"></div>
                <span className="relative z-10">
                  {currentTime.toLocaleTimeString('en-US', { 
                    hour12: false, 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </span>
              </div>
              
              {/* Productivity Meter */}
              <div className="w-full max-w-32">
                <div className="text-xs text-center text-gray-400 mb-1 font-mono">PRODUCTIVITY</div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      isLateNight() 
                        ? 'w-full bg-gradient-to-r from-green-400 to-green-600 animate-pulse' 
                        : 'w-1/2 bg-gradient-to-r from-blue-400 to-blue-600'
                    }`}
                  ></div>
                </div>
              </div>
              
              {/* Peak Hours Indicator */}
              <div className="flex space-x-2 items-center">
                <div className="text-xs text-gray-300 font-mono">PEAK:</div>
                <div className="flex space-x-1">
                  {Array.from({length: 5}, (_, i) => (
                    <div key={i} className={`w-2 rounded transition-all duration-300 ${
                      isLateNight() 
                        ? `h-${4 + i} bg-green-400 animate-bounce` 
                        : 'h-2 bg-gray-600'
                    }`} style={{animationDelay: `${i * 0.1}s`}}></div>
                  ))}
                </div>
              </div>
              
              {/* Coffee & Code Status */}
              {isLateNight() && (
                <div className="flex flex-col items-center space-y-2 fade-in">
                  <div className="flex space-x-2 items-center">
                    <div className="text-2xl animate-bounce">☕</div>
                    <div className="text-2xl animate-bounce delay-300">💻</div>
                    <div className="text-2xl animate-bounce delay-500">🚀</div>
                  </div>
                  <div className="text-xs text-green-400 font-mono animate-pulse text-center">
                    NIGHT_OWL_MODE_ACTIVE
                  </div>
                </div>
              )}
              
              {/* 24-Hour Activity Visualization */}
              <div className="w-full">
                <div className="text-xs text-center text-gray-400 mb-2 font-mono">24H ACTIVITY</div>
                <div className="flex space-x-0.5 justify-center">
                  {Array.from({length: 24}, (_, i) => {
                    const isCurrentHour = i === currentTime.getHours();
                    return (
                      <div key={i} className={`w-1 rounded transition-all duration-500 relative ${
                        isCurrentHour
                          ? 'h-8 bg-gradient-to-t from-yellow-400 to-yellow-200 animate-pulse shadow-lg'
                          : (i >= 23 || i <= 2) 
                            ? 'h-6 bg-gradient-to-t from-green-400 to-green-200 hover:h-7' 
                            : i >= 9 && i <= 17 
                              ? 'h-3 bg-gradient-to-t from-blue-400 to-blue-200 hover:h-4' 
                              : 'h-1 bg-gray-600 hover:h-2'
                      }`}>
                        {isCurrentHour && (
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-yellow-400 font-mono animate-bounce">
                            NOW
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1 font-mono">
                  <span>00</span>
                  <span>12</span>
                  <span>23</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Music/Jams */}
          <div className="group shiny-card hover:scale-105 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-pulse"></div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center">
                <span className="mr-2">♪</span> dev jams
              </h2>
              <div className="flex space-x-1">
                <div className="w-1 h-4 bg-green-400 animate-pulse"></div>
                <div className="w-1 h-6 bg-blue-400 animate-pulse delay-75"></div>
                <div className="w-1 h-3 bg-purple-400 animate-pulse delay-150"></div>
                <div className="w-1 h-5 bg-pink-400 animate-pulse delay-200"></div>
              </div>
            </div>
            <div className="space-y-3 text-white">
              <div className="space-y-2">
                <p className="font-medium text-green-300 flex items-center">
                  <span className="mr-2">🎵</span> on repeat:
                </p>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  {[
                    'Billy Joel', 'Frank Ocean', 'Daniel Caesar', 'Laufey', 'Only Monday',
                    'PURPEECH', 'Jaehyun (NCT)', 'LeeHi', 'Wave To Earth', 'Kaytranada'
                  ].map((artist, i) => (
                    <span key={artist} className="hover:text-green-300 transition-colors cursor-default flex items-center opacity-0 fade-in-left" style={{animationDelay: `${0.1 * i}s`}}>
                      <span className="mr-1 text-xs">▸</span> {artist}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-purple-300 flex items-center">
                  <span className="mr-2">🎙️</span> podcasts:
                </p>
                <div className="text-sm space-y-1">
                  <span className="block hover:text-red-300 transition-colors">▸ Rotten Mango</span>
                  <span className="block hover:text-orange-300 transition-colors">▸ Bake in a Murder, Bake in a Mystery</span>
                  <span className="block hover:text-yellow-300 transition-colors">▸ Moral of The Story</span>
                  <span className="text-xs text-gray-300 ml-2">by Stephanie Soo</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <div className="px-3 py-1 bg-purple-400/20 text-purple-400 rounded-full text-xs font-mono animate-pulse">
                ♪ currently vibing
              </div>
            </div>
          </div>

        </div>

        {/* Enhanced Floating Elements */}
        <div className="fixed bottom-4 right-4 space-y-2 pointer-events-none">
          <div className="text-2xl animate-bounce delay-100 hover:scale-125 transition-transform">🌙</div>
          <div className="text-xl animate-pulse hover:scale-125 transition-transform">💻</div>
          {isLateNight() && (
            <>
              <div className="text-lg animate-bounce delay-300 hover:scale-125 transition-transform">☕</div>
              <div className="text-sm animate-ping delay-500">🔥</div>
            </>
          )}
        </div>

        {/* System Stats Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700 px-4 py-2 font-mono text-xs text-gray-400">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex space-x-6">
            </div>
            <div className="flex space-x-4">
              <span className="text-green-400">● READY</span>
              <span>focus: {isLateNight() ? '100%' : '75%'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;