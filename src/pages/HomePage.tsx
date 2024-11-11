import React from 'react';
import ProductShowcase from '../components/ProductShowcase';
import CompanySection from '../components/CompanySection';
import CommunitySection from '../components/CommunitySection';

interface HomePageProps {
  isWalletConnected: boolean;
}

function HomePage({ isWalletConnected }: HomePageProps) {
  return (
    <main>
      <ProductShowcase isWalletConnected={isWalletConnected} />
      <CompanySection />
      <CommunitySection />
    </main>
  );
}

export default HomePage;