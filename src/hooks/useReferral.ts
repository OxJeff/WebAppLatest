import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface ReferralStats {
  points: number;
  referrals: number;
  rank: number;
}

interface ReferralUser {
  address: string;
  points: number;
  referrals: number;
}

export function useReferral(walletAddress: string | null) {
  const [referralCode] = useState('ANIME' + Math.random().toString(36).substring(2, 8).toUpperCase());
  const [stats, setStats] = useState<ReferralStats>({ points: 0, referrals: 0, rank: 0 });
  const [leaderboard, setLeaderboard] = useState<ReferralUser[]>([]);

  // Simulate loading stored data
  useEffect(() => {
    if (walletAddress) {
      const storedStats = localStorage.getItem(`referral_stats_${walletAddress}`);
      if (storedStats) {
        setStats(JSON.parse(storedStats));
      }

      const storedLeaderboard = localStorage.getItem('referral_leaderboard');
      if (storedLeaderboard) {
        setLeaderboard(JSON.parse(storedLeaderboard));
      } else {
        // Initialize with dummy data
        const initialLeaderboard = [
          { address: '0x1234...5678', points: 1500, referrals: 25 },
          { address: '0x8765...4321', points: 1200, referrals: 20 },
          { address: '0x9876...5432', points: 800, referrals: 15 },
          { address: '0x5432...8765', points: 600, referrals: 10 },
          { address: '0x6789...0123', points: 400, referrals: 8 },
        ];
        setLeaderboard(initialLeaderboard);
        localStorage.setItem('referral_leaderboard', JSON.stringify(initialLeaderboard));
      }
    }
  }, [walletAddress]);

  const submitReferralCode = (code: string) => {
    if (!walletAddress) {
      toast.error('Please connect your wallet first');
      return;
    }

    // Simulate referral code validation
    if (code === referralCode) {
      toast.error("You can't use your own referral code");
      return;
    }

    // Check if code exists in localStorage
    const allCodes = JSON.parse(localStorage.getItem('referral_codes') || '{}');
    const referrerAddress = allCodes[code];

    if (!referrerAddress) {
      toast.error('Invalid referral code');
      return;
    }

    // Check if user has already been referred
    const referredUsers = JSON.parse(localStorage.getItem('referred_users') || '{}');
    if (referredUsers[walletAddress]) {
      toast.error('You have already used a referral code');
      return;
    }

    // Update referrer's stats
    const referrerStats = JSON.parse(localStorage.getItem(`referral_stats_${referrerAddress}`) || '{"points": 0, "referrals": 0, "rank": 0}');
    referrerStats.points += 100;
    referrerStats.referrals += 1;
    localStorage.setItem(`referral_stats_${referrerAddress}`, JSON.stringify(referrerStats));

    // Update referred user's stats
    const newStats = { ...stats, points: stats.points + 50 };
    setStats(newStats);
    localStorage.setItem(`referral_stats_${walletAddress}`, JSON.stringify(newStats));

    // Mark user as referred
    referredUsers[walletAddress] = true;
    localStorage.setItem('referred_users', JSON.stringify(referredUsers));

    // Update leaderboard
    const updatedLeaderboard = [...leaderboard];
    const referrerIndex = updatedLeaderboard.findIndex(user => user.address === referrerAddress);
    if (referrerIndex >= 0) {
      updatedLeaderboard[referrerIndex] = {
        ...updatedLeaderboard[referrerIndex],
        points: referrerStats.points,
        referrals: referrerStats.referrals,
      };
    }
    setLeaderboard(updatedLeaderboard);
    localStorage.setItem('referral_leaderboard', JSON.stringify(updatedLeaderboard));

    toast.success('Referral code applied successfully!');
  };

  // Store user's referral code
  useEffect(() => {
    if (walletAddress) {
      const allCodes = JSON.parse(localStorage.getItem('referral_codes') || '{}');
      allCodes[referralCode] = walletAddress;
      localStorage.setItem('referral_codes', JSON.stringify(allCodes));
    }
  }, [walletAddress, referralCode]);

  return {
    referralCode,
    stats,
    leaderboard,
    submitReferralCode,
  };
}