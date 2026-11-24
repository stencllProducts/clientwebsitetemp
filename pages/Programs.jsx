import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Heart, Users, Palette, BookOpen, UserCheck, Target, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";

const programs = [
  {
    icon: Heart,
    title: "Subsidized Therapy",
    subtitle: "Individual & Group Sessions",
    description: "Professional therapy services at reduced rates, making mental health care accessible regardless of financial situation.",
    features: ["Licensed therapists", "Sliding scale fees", "Trauma-informed care", "Culturally responsive approach"],
    impact: "150+ therapy sessions provided",
    gradient: "from-rose-500 to-pink-500"
  },
  {
    icon: Users,
    title: "Peer Support Groups",
    subtitle: "Community-Led Healing",
    description: "Safe spaces where individuals with shared experiences come together to support each other's healing journey.",
    features: ["Trained peer facilitators", "Weekly group meetings", "Topic-specific groups", "Crisis intervention support"],
    impact: "25 peer advocates trained",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Palette,
    title: "Arts-Based Healing",
    subtitle: "Creative Expression Workshops",
    description: "Art, music, and creative writing workshops that provide alternative pathways to processing trauma and emotions.",
    features: ["Professional art therapists", "All skill levels welcome", "Art supplies provided", "Take-home creations"],
    impact: "50+ workshops completed",
    gradient: "from-purple-500 to-violet-500"
  },
  {
    icon: BookOpen,
    title: "Mental Health Education",
    subtitle: "Community Workshops",
    description: "Educational sessions covering mental health awareness, coping strategies, and stigma reduction.",
    features: ["Interactive workshops", "Bilingual presentations", "Community partnerships", "Free resources"],
    impact: "500+ community members reached",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: UserCheck,
    title: "Advocate Training",
    subtitle: "Peer Leadership Development",
    description: "Comprehensive training program that empowers community members to become mental health advocates.",
    features: ["40-hour certification", "Crisis intervention training", "Community outreach skills", "Ongoing mentorship"],
    impact: "25 advocates certified",
    gradient: "from-orange-500 to-red-500"
  }
];

const howWeWork = [
  {
    step: "01",
    title: "Community Outreach",
    description: "We connect with local organizations, schools, and community centers to identify those who would benefit most from our services."
  },
  {
    step: "02", 
    title: "Initial Assessment",
    description: "Each participant receives a comprehensive assessment to determine the most appropriate services and support level."
  },
  {
    step: "03",
    title: "Personalized Support",
    description: "We create individualized treatment plans that may include therapy, peer support, workshops, or advocacy training."
  },
  {
    step: "04",
    title: "Ongoing Care",
    description: "Continuous support and follow-up ensure participants have the resources they need for long-term success."
  }
];

export default function ProgramsPage() {
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
                Programs
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive mental health services designed to meet communities where they are, 
              providing support that's accessible, culturally responsive, and transformative.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How We Work</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our approach is holistic, community-centered, and designed to create lasting change.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howWeWork.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="bg-slate-800/80 border-teal-500/20 backdrop-blur-sm hover:bg-slate-800 transition-all duration-300 hover:scale-105 h-full">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full text-white font-bold text-xl mb-4">
                        {step.step}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </CardContent>
                </Card>
                
                {index < howWeWork.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-teal-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Programs & Initiatives</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From therapy to advocacy training, our programs address mental health from multiple angles, 
              creating a comprehensive support system for healing and growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/80 border-teal-500/20 backdrop-blur-sm hover:bg-slate-800 transition-all duration-300 hover:scale-[1.02] h-full">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center mb-4">
                          <div className={`w-12 h-12 bg-gradient-to-r ${program.gradient} rounded-lg flex items-center justify-center mr-4`}>
                            <program.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white">{program.title}</h3>
                            <p className="text-teal-400 font-medium">{program.subtitle}</p>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">{program.description}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3">Program Features:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {program.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm text-gray-300">
                            <Check className="w-4 h-4 text-teal-400 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className={`px-4 py-2 bg-gradient-to-r ${program.gradient} bg-opacity-20 rounded-full`}>
                        <p className="text-sm font-medium text-white">{program.impact}</p>
                      </div>
                      <Target className="w-5 h-5 text-teal-400" />
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Involved?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Whether you're seeking support for yourself or a loved one, or looking to contribute 
              to our mission, there's a place for you in the Psybriety community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-10 py-6 text-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105">
                <Heart className="w-5 h-5 mr-2" />
                Apply for Services
              </Button>
              
              <Link to={createPageUrl("Donate")}>
                <Button variant="outline" className="px-10 py-6 text-lg border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-slate-900 transition-all duration-300">
                  Support Our Programs
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