import React, { useState } from 'react';
import { Share2, Trophy, Users } from 'lucide-react';

interface ReferralSectionProps {
  isWalletConnected: boolean;
}

function ReferralSection({ isWalletConnected }: ReferralSectionProps) {
  const [referralCode] = useState('ANIME' + Math.random().toString(36).substring(2, 8).toUpperCase());

  return (
    <section className="py-20 container mx-auto px-4 bg-gradient-to-b from-black/50 to-purple-900/20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Referral Program</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Invite friends and earn rewards together
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {[
          {
            icon: <Share2 className="w-8 h-8" />,
            title: "Share",
            description: "Invite friends using your unique code"
          },
          {
            icon: <Users className="w-8 h-8" />,
            title: "Connect",
            description: "Friends join using your referral"
          },
          {
            icon: <Trophy className="w-8 h-8" />,
            title: "Earn",
            description: "Both receive exclusive rewards"
          }
        ].map((step, index) => (
          <div key={index} className="bg-gradient-to-b from-purple-900/50 to-black/50 rounded-xl p-8 text-center backdrop-blur-lg border border-purple-500/20">
            <div className="mb-6 text-purple-400">{step.icon}</div>
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-gray-400">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-b from-purple-900/50 to-black/50 rounded-xl p-8 backdrop-blur-lg border border-purple-500/20">
          {isWalletConnected ? (
            <>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Your Referral Code</h3>
                <div className="flex">
                  <input
                    type="text"
                    value={referralCode}
                    readOnly
                    className="flex-1 bg-black/50 border border-purple-500/30 rounded-l-lg px-4 py-2 text-purple-400"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(referralCode)}
                    className="bg-purple-600 hover:bg-purple-700 px-4 rounded-r-lg"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Enter Friend's Code</h3>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter referral code"
                    className="flex-1 bg-black/50 border border-purple-500/30 rounded-l-lg px-4 py-2"
                  />
                  <button className="bg-purple-600 hover:bg-purple-700 px-4 rounded-r-lg">
                    Submit
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">Connect your wallet to access the referral program</p>
              <button
                onClick={() => {}}
                className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg"
              >
                Connect Wallet
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ReferralSection;