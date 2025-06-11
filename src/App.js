import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ProjectsGrid from './components/ProjectsGrid';
import ProjectDetailSpotify from './pages/ProjectDetailSpotify';
import Profile from './pages/Profile';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
import './styles/SpotifyAnimations.css';

function App() {
  const [nowPlaying, setNowPlaying] = useState(null);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        backgroundImage: `url("/images/bg.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="backdrop-blur-sm bg-black/40 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div
            className="main-content"
            style={{
              background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(10, 10, 10, 0.98))',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '10px',
              border: '1px solid rgba(40, 40, 40, 0.5)',
              margin: '1vw',
              marginTop: '7vw',
              padding: '1rem',
              // Remove overflow: 'hidden' to allow dropdowns to be visible
              // overflow: 'hidden',
              position: 'relative',
              // Add specific overflow handling for better mobile support
              overflowX: 'hidden', // Prevent horizontal scroll
              overflowY: 'visible', // Allow vertical overflow for dropdowns
            }}
          >
            <Switch>
              <Route exact path="/" component={ProjectsGrid} />
              <Route path="/project/:id" component={ProjectDetailSpotify} />
              <Route path="/profile" component={Profile} />
              <Route path="/resume" component={Resume} />
              <Route path="/contact" component={Contact} />
              <Route path="/about" component={Profile} />
            </Switch>
          </div>
        </main>
        <Footer />

        {/* Mini player at the bottom */}
        {nowPlaying && (
          <div
            className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 py-2 px-4 flex items-center"
            style={{ height: '60px', zIndex: 1000 }}
          >
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded overflow-hidden mr-3">
                  <img
                    src={nowPlaying.imageUrl}
                    alt={nowPlaying.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium">{nowPlaying.title}</h4>
                  <p className="text-gray-400 text-xs">{nowPlaying.techStack.join(', ')}</p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <div className="w-1 bg-green-500 animate-equalizer h-3"></div>
                <div className="w-1 bg-green-500 animate-equalizer-2 h-4"></div>
                <div className="w-1 bg-green-500 animate-equalizer h-2"></div>
                <div className="w-1 bg-green-500 animate-equalizer-3 h-3"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;