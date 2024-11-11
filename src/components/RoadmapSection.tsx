import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

function RoadmapSection() {
  const milestones = [
    {
      title: 'Phase 1: Launch',
      description: 'Initial release with core chatbot functionality',
      completed: true,
    },
    {
      title: 'Phase 2: Community',
      description: 'Referral program and community features',
      completed: true,
    },
    {
      title: 'Phase 3: Advanced AI',
      description: 'Enhanced conversation capabilities and character customization',
      completed: false,
    },
    {
      title: 'Phase 4: Expansion',
      description: 'New characters and interactive features',
      completed: false,
    },
  ];

  return (
    <section className="py-20 container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Project Roadmap</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Our journey to revolutionize anime character interactions
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className="relative pl-8 pb-8 last:pb-0 before:content-[''] before:absolute before:left-[15px] before:top-8 before:w-[2px] before:h-[calc(100%-32px)] before:bg-purple-500/30 last:before:hidden"
          >
            <div className="absolute left-0 top-1">
              {milestone.completed ? (
                <CheckCircle className="w-8 h-8 text-purple-500" />
              ) : (
                <Circle className="w-8 h-8 text-gray-500" />
              )}
            </div>
            <div className="bg-gradient-to-b from-purple-900/50 to-black/50 rounded-xl p-6 backdrop-blur-lg border border-purple-500/20">
              <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
              <p className="text-gray-400">{milestone.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RoadmapSection;