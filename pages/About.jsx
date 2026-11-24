import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users, Sparkles, Award, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Dr. Sarah Johnson",
    role: "Founder & Executive Director",
    bio: "Licensed clinical psychologist with 15+ years serving underserved communities.",
    image: "https://images.unsplash.com/photo-1594824747379-bbab14d04aee?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Marcus Rodriguez",
    role: "Program Director",
    bio: "Community organizer passionate about trauma-informed care and peer support.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Dr. Aisha Patel",
    role: "Clinical Supervisor",
    bio: "Specializing in culturally responsive therapy and community mental health.",
    image: "https://images.unsplash.com/photo-1638623635702-b7bb8e7e2b35?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "James Wilson",
    role: "Community Outreach Coordinator",
    bio: "Former program participant turned advocate, connecting communities to resources.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
  }
];

const milestones = [
  { year: "2023", event: "Psybriety Founded", description: "Started with a vision to make mental health accessible" },
  { year: "2023", event: "First Workshop", description: "Launched art-based healing sessions for 12 participants" },
  { year: "2024", event: "Therapy Program", description: "Began offering subsidized individual and group therapy" },
  { year: "2024", event: "Peer Training", description: "Trained 25 community members as peer advocates" }
];

export default function AboutPage() {
  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Our
              <span className="block bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Story
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Born from the belief that every person deserves access to quality mental health care, 
              regardless of their background or circumstances.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  Psybriety began when our founder, Dr. Sarah Johnson, witnessed the devastating 
                  gap between mental health needs and available resources in underserved communities. 
                  Too many people were suffering in silence, unable to access the care they deserved.
                </p>
                <p>
                  What started as a small group of passionate advocates has grown into a comprehensive 
                  mental health initiative. We believe that healing happens in community, that 
                  resilience is built through connection, and that everyone has the right to 
                  psychological wellness.
                </p>
                <p>
                  Today, Psybriety stands as a beacon of hope, offering not just treatment, but 
                  transformation. We're building a world where mental health stigma dissolves, 
                  where communities support each other, and where healing is a shared journey.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop" 
                alt="Community healing session" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-800/80 border-teal-500/20 backdrop-blur-sm h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Target className="w-8 h-8 text-teal-400 mr-4" />
                    <h3 className="text-3xl font-bold text-white">Our Vision</h3>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    A world where every person, regardless of their background, zip code, or 
                    financial situation, has access to compassionate, culturally responsive 
                    mental health care. We envision communities where mental wellness is 
                    prioritized, stigma is eliminated, and healing happens collectively.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-800/80 border-teal-500/20 backdrop-blur-sm h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Heart className="w-8 h-8 text-teal-400 mr-4" />
                    <h3 className="text-3xl font-bold text-white">Our Mission</h3>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    To provide accessible, affordable, and culturally responsive mental health 
                    services to underserved communities. We empower individuals through therapy, 
                    peer support, education, and community building, fostering resilience and 
                    breaking down barriers to psychological wellness.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 bg-gradient-to-r from-teal-900/20 to-cyan-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Who We Serve</h2>
            <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
              Our programs are designed specifically for communities that have been historically 
              underserved by traditional mental health systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Black & Latino Youth",
                description: "Ages 16-25 facing systemic barriers to mental health care, providing culturally affirming therapy and peer support."
              },
              {
                icon: Heart,
                title: "Domestic Abuse Survivors",
                description: "Trauma-informed care for individuals healing from intimate partner violence and family abuse."
              },
              {
                icon: Sparkles,
                title: "Underserved Communities",
                description: "Anyone facing financial, geographic, or systemic barriers to accessing quality mental health services."
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/80 border-teal-500/20 backdrop-blur-sm hover:bg-slate-800 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-gray-300">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Progress Timeline */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Progress</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From humble beginnings to transformative impact—here's how we've grown.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-teal-500/30"></div>
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <Card className="bg-slate-800/80 border-teal-500/20 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-3">
                        <Calendar className="w-5 h-5 text-teal-400 mr-2" />
                        <span className="font-bold text-teal-400">{milestone.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{milestone.event}</h3>
                      <p className="text-gray-300">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full border-4 border-slate-900"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Team</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Meet the passionate individuals leading our mission to transform mental health care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/80 border-teal-500/20 backdrop-blur-sm hover:bg-slate-800 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-teal-500/20"
                    />
                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-teal-400 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-300 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}