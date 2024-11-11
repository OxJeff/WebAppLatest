import React, { useState } from 'react';
import { Trophy, Users } from 'lucide-react';
import { useReferral } from '../hooks/useReferral';

interface ReferralPageProps {
  isWalletConnected: boolean;
  walletAddress?: string | null;
}

function ReferralPage({ isWalletConnected, walletAddress }: ReferralPageProps) {
  const { referralCode, stats, leaderboard, submitReferralCode } = useReferral(walletAddress);
  const [inputCode, setInputCode] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReferralCode(inputCode);
    setInputCode('');
  };

  return (
    <main className="py-12 container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        {isWalletConnected ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-b from-purple-900/50 to-black/50 rounded-xl p-8 text-center backdrop-blur-lg border border-purple-500/20">
                <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Your Points</h3>
                <p className="text-3xl font-bold text-purple-400">{stats.points}</p>
              </div>
              <div className="bg-gradient-to-b from-purple-900/50 to-black/50 rounded-xl p-8 text-center backdrop-blur-lg border border-purple-500/20">
                <Users className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Total Referrals</h3>
                <p className="text-3xl font-bold text-purple-400">{stats.referrals}</p>
              </div>
              <div className="bg-gradient-to-b from-purple-900/50 to-black/50 rounded-xl p-8 text-center backdrop-blur-lg border border-purple-500/20">
                <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Your Rank</h3>
                <p className="text-3xl font-bold text-purple-400">#{stats.rank || '-'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-b from-purple-900/50 to-black/50 rounded-xl p-8 backdrop-blur-lg border border-purple-500/20">
                <h3 className="text-xl font-bold mb-4">Your Referral Code</h3>
                <div className="flex">
                  <input
                    type="text"
                    value={referralCode}
                    readOnly
                    className="flex-1 bg-black/50 border border-purple-500/30 rounded-l-lg px-4 py-2 text-purple-400"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(referralCode);
                      toast.success('Referral code copied to clipboard!');
                    }}
                    className="bg-purple-600 hover:bg-purple-700 px-4 rounded-r-lg"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-b from-purple-900/50 to-black/50 rounded-xl p-8 backdrop-blur-lg border border-purple-500/20">
                <h3 className="text-xl font-bold mb-4">Enter Friend's Code</h3>
                <form onSubmit={handleSubmit} className="flex">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Enter referral code"
                    className="flex-1 bg-black/50 border border-purple-500/30 rounded-l-lg px-4 py-2"
                  />
                  <button 
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 px-4 rounded-r-lg"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>

            <div className="bg-gradient-to-b from-purple-900/50 to-black/50 rounded-xl p-8 backdrop-blur-lg border border-purple-500/20">
              <h3 className="text-2xl font-bold mb-6">Top Referrers</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-purple-500/20">
                      <th className="pb-4 px-4">Rank</th>
                      <th className="pb-4 px-4">Address</th>
                      <th className="pb-4 px-4">Points</th>
                      <th className="pb-4 px-4">Referrals</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((user, index) => (
                      <tr key={index} className="border-b border-purple-500/10 last:border-0">
                        <td className="py-4 px-4">#{index + 1}</td>
                        <td className="py-4 px-4">{user.address}</td>
                        <td className="py-4 px-4">{user.points}</td>
                        <td className="py-4 px-4">{user.referrals}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-400 mb-8">Please connect your wallet to view your referral stats and leaderboard</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default ReferralPage;