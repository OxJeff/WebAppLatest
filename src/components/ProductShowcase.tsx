import React, { useState } from 'react';
import { Bot, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductShowcaseProps {
  isWalletConnected: boolean;
}

function ProductShowcase({ isWalletConnected }: ProductShowcaseProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const characters = [
    {
      name: "Sakura",
      description: "A cheerful and determined character with healing abilities",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80"
    },
    {
      name: "Kazuto",
      description: "A skilled swordsman with a strategic mind",
      image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?auto=format&fit=crop&q=80"
    },
    {
      name: "Yuki",
      description: "A mysterious character with supernatural powers",
      image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?auto=format&fit=crop&q=80"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % characters.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + characters.length) % characters.length);
  };

  return (
    <section className="py-20 container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Experience AI-Powered Anime Chat</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Connect with your favorite anime characters through advanced AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-b from-purple-900/50 to-black/50 rounded-xl p-8 backdrop-blur-lg border border-purple-500/20">
            <div className="flex items-center space-x-4 mb-6">
              <Bot className="w-8 h-8 text-purple-400" />
              <h3 className="text-2xl font-bold">AI Chatbot</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Engage in natural conversations with AI-powered anime characters
            </p>
            <button
              className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 ${
                isWalletConnected
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-gray-700 cursor-not-allowed'
              }`}
              disabled={!isWalletConnected}
            >
              <MessageSquare className="w-5 h-5" />
              <span>{isWalletConnected ? 'Start Chatting' : 'Connect Wallet to Chat'}</span>
            </button>
          </div>

          <div className="relative">
            <div className="relative h-[400px] rounded-xl overflow-hidden group">
              {characters.map((character, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    currentSlide === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold mb-2">{character.name}</h3>
                      <p className="text-gray-300">{character.description}</p>
                    </div>
                    <button
                      className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 ${
                        isWalletConnected
                          ? 'bg-purple-600 hover:bg-purple-700'
                          : 'bg-gray-700 cursor-not-allowed'
                      }`}
                      disabled={!isWalletConnected}
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span>Chat with {character.name}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-lg transition-colors"
              aria-label="Previous character"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-lg transition-colors"
              aria-label="Next character"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {characters.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductShowcase;