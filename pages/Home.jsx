import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils/globalColors";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Heart, Users, Sparkles, ArrowRight, Play, Target, BookOpen, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

const impactStats = [
  { number: "2,500", label: "Lives Impacted", icon: Heart },
  { number: "150", label: "Therapy Sessions", icon: Users },
  { number: "50", label: "Workshops Held", icon: BookOpen },
  { number: "25", label: "Advocates Trained", icon: UserCheck }
];

const testimonials = [
  {
    text: "Psybriety gave me hope when I had none. The therapy sessions helped me process my trauma and find my strength again.",
    author: "Maria, 23",
    role: "Program Participant"
  },
  {
    text: "Through their workshops, I learned that healing isn't a destination—it's a journey we take together as a community.",
    author: "Carlos, 19", 
    role: "Peer Advocate"
  }
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Healing
              <span className="block bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Communities
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Making mental health care accessible and affordable for underserved communities. 
              Together, we heal, grow, and thrive.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to={createPageUrl("Donate")}>
                <Button className="px-8 py-6 text-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105">
                  <Heart className="w-5 h-5 mr-2" />
                  Donate Now
                </Button>
              </Link>
              
              <Link to={createPageUrl("About")}>
                <Button variant="outline" className="px-8 py-6 text-lg border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-slate-900 transition-all duration-300">
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Video placeholder */}
            <div className="relative max-w-4xl mx-auto bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-teal-500/20">
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center">
                <Button variant="ghost" className="text-white hover:text-teal-400 transition-colors">
                  <Play className="w-16 h-16" />
                </Button>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm opacity-75">Our Story: Building Resilient Communities</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Growing Impact
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Every number represents a life touched, a story transformed, and hope restored.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/80 border-teal-500/20 backdrop-blur-sm hover:bg-slate-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/10">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-2">{stat.number}</h3>
                    <p className="text-gray-300 font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Stories of Transformation
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Real voices from our community sharing their journeys of healing and growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/80 border-teal-500/20 backdrop-blur-sm h-full">
                  <CardContent className="p-8">
                    <div className="flex items-start mb-6">
                      <Sparkles className="w-6 h-6 text-teal-400 mr-3 mt-1 flex-shrink-0" />
                      <blockquote className="text-lg text-gray-300 italic leading-relaxed">
                        "{testimonial.text}"
                      </blockquote>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{testimonial.author}</p>
                        <p className="text-sm text-teal-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-teal-900/20 to-cyan-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Our Movement
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Every action matters. Whether you donate, volunteer, or simply spread the word—you're 
              helping build a world where mental health care is a right, not a privilege.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Donate")}>
                <Button className="px-10 py-6 text-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105">
                  <Heart className="w-5 h-5 mr-2" />
                  Support Our Mission
                </Button>
              </Link>
              
              <Link to={createPageUrl("Programs")}>
                <Button variant="outline" className="px-10 py-6 text-lg border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-slate-900 transition-all duration-300">
                  Explore Programs
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}