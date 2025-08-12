
import React from "react";
import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";

const showcaseVideos = [
  {
    title: "Championship Game Highlights",
    description: "State championship final with cinematic coverage",
    thumbnail: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Game Coverage",
    duration: "3:45"
  },
  {
    title: "Player Recruiting Reel",
    description: "Professional recruiting video for college scouts",
    thumbnail: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Recruiting",
    duration: "2:30"
  },
  {
    title: "Team Documentary",
    description: "Behind-the-scenes journey to the playoffs",
    thumbnail: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Documentary",
    duration: "12:15"
  },
  {
    title: "Skills Showcase",
    description: "Individual player skill demonstration",
    thumbnail: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Skills",
    duration: "1:45"
  }
];

export default function VideoShowcase() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Our <span className="text-white">Featured Work</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From game-winning shots to personal milestones, see how we capture basketball excellence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {showcaseVideos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-950 border border-gray-800 overflow-hidden group hover:border-red-500 transition-colors duration-300 rounded-xl flex flex-col">
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-black ml-1" />
                    </div>
                  </div>
                  <span className="absolute top-4 left-4 border border-gray-500 text-white bg-black/50 px-3 py-1 rounded-full text-xs font-semibold">
                    {video.category}
                  </span>
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 flex-1">
                    {video.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#"
            className="inline-flex items-center text-gray-300 hover:text-red-500 font-medium transition-colors duration-300"
          >
            View Full Portfolio
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}