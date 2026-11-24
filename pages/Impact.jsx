import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Target, TrendingUp, Users, Heart, BookOpen, UserCheck, Calendar, Award } from "lucide-react";
import { motion } from "framer-motion";

const currentImpact = [
  { metric: "Lives Impacted", current: 2500, target: 5000, icon: Heart, color: "from-rose-500 to-pink-500" },
  { metric: "Therapy Sessions", current: 150, target: 500, icon: Users, color: "from-blue-500 to-cyan-500" },
  { metric: "Workshops Completed", current: 50, target: 100, icon: BookOpen, color: "from-green-500 to-emerald-500" },
  { metric: "Peer Advocates Trained", current: 25, target: 75, icon: UserCheck, color: "from-purple-500 to-violet-500" },
  { metric: "Crisis Interventions", current: 85, target: 200, icon: Target, color: "from-orange-500 to-red-500" },
  { metric: "Community Partners", current: 12, target: 25, icon: Award, color: "from-teal-500 to-cyan-500" }
];

const impactStories = [
  {
    category: "Mental Health Access",
    stat: "78%",
    description: "of participants report improved access to mental health resources",
    icon: Heart
  },
  {
    category: "Crisis Reduction", 
    stat: "65%",
    description: "reduction in mental health crises among program participants",
    icon: TrendingUp
  },
  {
    category: "Community Engagement",
    stat: "90%",
    description: "of participants continue engaging with community support systems",
    icon: Users
  },
  {
    category: "Peer Support Success",
    stat: "85%",
    description: "of trained advocates actively support their communities",
    icon: UserCheck
  }
];

const yearlyGoals = [
  {
    goal: "Provide 500 therapy sessions",
    description: "Making professional mental health care accessible to individuals who cannot afford traditional therapy rates.",
    progress: 30,
    impact: "Serving 150+ individuals with trauma-informed, culturally responsive care."
  },
  {
    goal: "Train 75 peer advocates",
    description: "Building a network of community members equipped to provide peer support and crisis intervention.",
    progress: 33,
    impact: "Creating sustainable mental health support within communities."
  },
  {
    goal: "Conduct 100 workshops",
    description: "Educational and healing workshops covering mental health awareness, coping strategies, and creative expression.",
    progress: 50,
    impact: "Reaching 2,000+ community members with vital mental health education."
  },
  {
    goal: "Establish 3 new community partnerships",
    description: "Collaborating with schools, community centers, and local organizations to expand our reach.",
    progress: 75,
    impact: "Connecting with underserved populations in new geographic areas."
  }
];

export default function ImpactPage() {
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
                Impact
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Measurable progress toward our vision of accessible mental health care for all. 
              Every number represents a life touched, a community strengthened, and hope restored.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Current Impact Metrics */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Progress Toward Our Goals</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Track our measurable impact as we work toward transforming mental health access in underserved communities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentImpact.map((item, index) => {
              const percentage = (item.current / item.target) * 100;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-slate-800/80 border-teal-500/20 backdrop-blur-sm hover:bg-slate-800 transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">{item.current.toLocaleString()}</p>
                          <p className="text-sm text-gray-400">of {item.target.toLocaleString()}</p>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-3">{item.metric}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Progress</span>
                          <span className="text-teal-400 font-medium">{Math.round(percentage)}%</span>
                        </div>
                        <Progress 
                          value={percentage} 
                          className="h-2 bg-slate-700"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Measuring Success</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Data-driven results that demonstrate the real-world impact of our programs and community support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/80 border-teal-500/20 backdrop-blur-sm hover:bg-slate-800 transition-all duration-300 hover:scale-105 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <story.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-4xl font-bold text-teal-400 mb-2">{story.stat}</h3>
                    <h4 className="text-lg font-semibold text-white mb-3">{story.category}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{story.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2024 Goals */}
      <section className="py-20 bg-gradient-to-r from-teal-900/20 to-cyan-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">2024 Goals</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our ambitious targets for expanding mental health access and building resilient communities. 
              Together, we're making these goals a reality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {yearlyGoals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/80 border-teal-500/20 backdrop-blur-sm hover:bg-slate-800 transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-3">{goal.goal}</h3>
                        <p className="text-gray-300 leading-relaxed mb-4">{goal.description}</p>
                        <p className="text-teal-400 font-medium">{goal.impact}</p>
                      </div>
                      <div className="ml-6 text-right">
                        <div className="text-3xl font-bold text-teal-400 mb-2">{goal.progress}%</div>
                        <div className="text-sm text-gray-400">Complete</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Progress</span>
                        <span className="text-teal-400 font-medium">{goal.progress}%</span>
                      </div>
                      <Progress 
                        value={goal.progress} 
                        className="h-3 bg-slate-700"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Impact Infographic */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">The Ripple Effect</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Every person we help creates waves of positive change throughout their community. 
              See how our impact multiplies.
            </p>
          </motion.div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Individual Impact */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Individual Healing</h3>
                <p className="text-gray-300">
                  One person receives therapy, develops coping skills, and begins their healing journey.
                </p>
              </motion.div>

              {/* Family Impact */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Family Transformation</h3>
                <p className="text-gray-300">
                  Healthier individuals create stronger families, breaking cycles of trauma and building resilience.
                </p>
              </motion.div>

              {/* Community Impact */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-40 h-40 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-20 h-20 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Community Impact</h3>
                <p className="text-gray-300">
                  Stronger families build thriving communities with reduced stigma and increased mental health awareness.
                </p>
              </motion.div>
            </div>

            {/* Connecting arrows (hidden on mobile) */}
            <div className="hidden md:block">
              <div className="absolute top-1/2 left-1/4 w-16 h-0.5 bg-gradient-to-r from-teal-400 to-purple-400 transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 right-1/4 w-16 h-0.5 bg-gradient-to-r from-purple-400 to-green-400 transform -translate-y-1/2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Be Part of Our Impact</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              These numbers represent real people, real healing, and real transformation. 
              Your support helps us reach our goals and expand our impact even further.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="px-10 py-6 text-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-teal-500/25 transition-all duration-300 rounded-lg font-semibold">
                  <Heart className="w-5 h-5 mr-2 inline" />
                  Support Our Mission
                </button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="px-10 py-6 text-lg border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-slate-900 transition-all duration-300 rounded-lg font-semibold">
                  Join Our Community
                  <Users className="w-5 h-5 ml-2 inline" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}