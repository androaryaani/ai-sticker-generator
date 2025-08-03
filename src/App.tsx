import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import OnboardingGuide from './components/OnboardingGuide';
import Home from './pages/Home';
import Settings from './pages/Settings';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('arul-ai-onboarding-completed');
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <Footer />
        <OnboardingGuide 
          isOpen={showOnboarding} 
          onClose={() => setShowOnboarding(false)} 
        />
      </div>
    </Router>
  );
}

export default App;