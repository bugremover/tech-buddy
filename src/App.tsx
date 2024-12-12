import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ChatInterface from './components/ChatInterface';
import Navbar from './components/Layout/Navbar';
import Login from './components/Auth/Login';
import { AuthProvider } from './contexts/AuthContext';
import ProfileModal from './components/Profile/ProfileModal';
import HistoryModal from './components/History/HistoryModal';

function App() {
  const [showProfile, setShowProfile] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
        <Navbar
          onProfileClick={() => setShowProfile(true)}
          onHistoryClick={() => setShowHistory(true)}
        />
        <main className="container mx-auto px-4 py-4 md:py-8">
          <ChatInterface />
        </main>

        <AnimatePresence>
          {showProfile && (
            <ProfileModal onClose={() => setShowProfile(false)} />
          )}
          {showHistory && (
            <HistoryModal onClose={() => setShowHistory(false)} />
          )}
        </AnimatePresence>
      </div>
    </AuthProvider>
  );
}

export default App;