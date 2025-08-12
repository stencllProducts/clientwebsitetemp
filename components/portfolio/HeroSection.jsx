
import React from "react";
import Link from "next/link";
// If you have lucide-react and framer-motion installed, keep these imports:
import { Play, ArrowRight, Camera } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="mb-6">
            <span className="inline-flex items-center border border-red-500 text-red-500 px-4 py-2 text-sm font-semibold rounded-full bg-transparent">
              <Camera className="w-4 h-4 mr-2" />
              Professional Videography
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Elevate Your Game
            <span className="block text-white">Through Film</span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Professional basketball videography that captures every moment of greatness.
            From game highlights to recruiting reels, we tell your story on the court.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" passHref legacyBehavior>
              <a className="bg-white text-black text-lg px-8 py-4 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 font-semibold rounded-lg flex items-center justify-center">
                Book Your Session
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Link>

            <button
              type="button"
              className="text-white border border-gray-700 hover:bg-gray-900 hover:border-gray-600 text-lg px-8 py-4 transition-all duration-300 rounded-lg flex items-center justify-center"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Our Work
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-6 h-6 border-2 border-red-500 rounded-full animate-bounce"></div>
      <div className="absolute top-1/2 right-10 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
    </section>
  );
}