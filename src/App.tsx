import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import NewChat from './components/NewChat';
import Chat from './components/Chat';
import ChatHistory from './components/ChatHistory';
import Dashboard from './components/Dashboard';
import DreamTeam from './components/DreamTeam';
import GYBLiveNetwork from './components/GYBLiveNetwork';
import UserProfile from './components/UserProfile';
import Settings from './components/Settings';
import UserOnboarding from './components/UserOnboarding';
import GYBTeamChat from './components/GYBTeamChat';
import Analytics from './components/Analytics';
import Upload from './components/Upload';
import NewPost from './components/NewPost';
import Profile from './components/Profile';
import Portfolio from './components/Portfolio';
import Resume from './components/Resume';
import Integrations from './components/Integrations';
import WorkHistory from './components/WorkHistory';
import Invites from './components/Invites';
import Reviews from './components/Reviews';
import Rewards from './components/Rewards';
import Payments from './components/Payments';
import Earnings from './components/Earnings';
import { useAuth } from './contexts/AuthContext';

const App: React.FC = () => {
  const { isAuthenticated, isVerified } = useAuth();

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white text-navy-blue">
        {isAuthenticated && <Header />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              isAuthenticated ? (
                isVerified ? <Navigate to="/dashboard" /> : <Navigate to="/verify" />
              ) : (
                <UserOnboarding />
              )
            } />
            <Route path="/new-chat" element={isAuthenticated ? <NewChat /> : <Navigate to="/" />} />
            <Route path="/chat/:chatId" element={isAuthenticated ? <Chat /> : <Navigate to="/" />} />
            <Route path="/chat-history" element={isAuthenticated ? <ChatHistory /> : <Navigate to="/" />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/dream-team" element={isAuthenticated ? <DreamTeam /> : <Navigate to="/" />} />
            <Route path="/gyb-live-network" element={isAuthenticated ? <GYBLiveNetwork /> : <Navigate to="/" />} />
            <Route path="/user-profile/:userId" element={isAuthenticated ? <UserProfile /> : <Navigate to="/" />} />
            <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/" />} />
            <Route path="/gyb-team-chat" element={isAuthenticated ? <GYBTeamChat /> : <Navigate to="/" />} />
            <Route path="/analytics" element={isAuthenticated ? <Analytics /> : <Navigate to="/" />} />
            <Route path="/upload" element={isAuthenticated ? <Upload /> : <Navigate to="/" />} />
            <Route path="/new-post" element={isAuthenticated ? <NewPost /> : <Navigate to="/" />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />
            <Route path="/portfolio" element={isAuthenticated ? <Portfolio /> : <Navigate to="/" />} />
            <Route path="/resume" element={isAuthenticated ? <Resume /> : <Navigate to="/" />} />
            <Route path="/settings/integrations" element={isAuthenticated ? <Integrations /> : <Navigate to="/" />} />
            <Route path="/work-history" element={isAuthenticated ? <WorkHistory /> : <Navigate to="/" />} />
            <Route path="/invites" element={isAuthenticated ? <Invites /> : <Navigate to="/" />} />
            <Route path="/reviews" element={isAuthenticated ? <Reviews /> : <Navigate to="/" />} />
            <Route path="/rewards" element={isAuthenticated ? <Rewards /> : <Navigate to="/" />} />
            <Route path="/payments" element={isAuthenticated ? <Payments /> : <Navigate to="/" />} />
            <Route path="/earnings" element={isAuthenticated ? <Earnings /> : <Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;