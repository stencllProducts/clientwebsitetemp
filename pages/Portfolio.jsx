
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Play, Award, Users, Calendar, ArrowRight, Star, Camera, Film, Trophy } from "lucide-react";
import { motion } from "framer-motion";

import HeroSection from "../components/portfolio/HeroSection";
import ServicePackages from "../components/portfolio/ServicePackages";
import VideoShowcase from "../components/portfolio/VideoShowcase";
import TestimonialsSection from "../components/portfolio/TestimonialsSection";
import StatsSection from "../components/portfolio/StatsSection";

export default function Portfolio() {
  return (
    <div className="bg-black text-white">
      <HeroSection />
      <StatsSection />
      <VideoShowcase />
      <ServicePackages />
      <TestimonialsSection />
      
      {/* Call to Action */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Trophy className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Capture Your
              <span className="text-white"> Basketball Story</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              From game highlights to recruiting videos, let's create something amazing together.
            </p>
            <Link to={createPageUrl("Contact")}>
              <Button className="bg-white text-black text-lg px-8 py-4 hover:bg-gray-100 transition-colors transform hover:scale-105 duration-300 font-semibold">
                Book Your Session
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}