import React from 'react';
import { MessageSquare, Github, Twitter } from 'lucide-react';

function CommunitySection() {
  return (
    <section className="py-20 container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Connect with fellow anime enthusiasts and stay updated
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            icon: <Twitter className="w-8 h-8" />,
            title: "Twitter",
            description: "Follow us for the latest updates",
            action: "Follow",
            color: "bg-blue-600"
          },
          {
            icon: <MessageSquare className="w-8 h-8" />,
            title: "Discord",
            description: "Join our growing community",
            action: "Join Server",
            color: "bg-indigo-600"
          },
          {
            icon: <Github className="w-8 h-8" />,
            title: "GitHub",
            description: "Contribute to our project",
            action: "View Repo",
            color: "bg-gray-600"
          }
        ].map((platform, index) => (
          <div key={index} className="bg-gradient-to-b from-purple-900/50 to-black/50 rounded-xl p-8 text-center backdrop-blur-lg border border-purple-500/20 group hover:scale-105 transition-transform">
            <div className="mb-6">{platform.icon}</div>
            <h3 className="text-xl font-bold mb-2">{platform.title}</h3>
            <p className="text-gray-400 mb-6">{platform.description}</p>
            <button className={`px-6 py-2 rounded-lg ${platform.color} hover:opacity-90 transition-opacity`}>
              {platform.action}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CommunitySection;