import React from 'react';
import { Brain, Sparkles, Code2, Palette } from 'lucide-react';

function CompanySection() {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Advanced AI Technology",
      description: "Our proprietary AI models are specifically trained on anime and manga content for authentic character interactions."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Character Personality",
      description: "Each AI character maintains consistent personality traits and memories throughout conversations."
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Natural Language Processing",
      description: "State-of-the-art NLP ensures smooth, context-aware conversations in multiple languages."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Custom Character Creation",
      description: "Create and train your own anime characters with unique personalities and backstories."
    }
  ];

  return (
    <section className="py-20 container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Expertise</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Pioneering the future of AI-powered character interactions through cutting-edge technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gradient-to-b from-purple-900/50 to-black/50 rounded-xl p-8 backdrop-blur-lg border border-purple-500/20 hover:scale-105 transition-transform"
            >
              <div className="text-purple-400 mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-b from-purple-900/50 to-black/50 rounded-xl p-8 backdrop-blur-lg border border-purple-500/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Why Choose AnimeAI Chat?</h3>
              <p className="text-gray-400 mb-6">
                We combine cutting-edge AI technology with deep anime knowledge to create the most authentic and engaging character interactions possible. Our team of AI researchers and anime enthusiasts work together to push the boundaries of what's possible in AI-powered entertainment.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span>Industry-leading AI technology</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span>Dedicated anime expertise</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span>Active community involvement</span>
                </li>
              </ul>
            </div>
            <div className="relative h-[300px] rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80"
                alt="AI Technology"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompanySection;