import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RoadmapPage from './pages/RoadmapPage';
import ReferralPage from './pages/ReferralPage';
import { useWallet } from './hooks/useWallet';

function App() {
  const { address, isConnecting, connectWallet } = useWallet();

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white">
        <Toaster position="top-right" />
        <Header 
          isWalletConnected={!!address} 
          onConnectWallet={connectWallet}
          isConnecting={isConnecting}
          walletAddress={address}
        />
        <Routes>
          <Route path="/" element={<HomePage isWalletConnected={!!address} />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/referrals" element={<ReferralPage isWalletConnected={!!address} walletAddress={address} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;