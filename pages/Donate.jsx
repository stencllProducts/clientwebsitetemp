import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Heart, Gift, Users, BookOpen, Palette, UserCheck, Sparkles, Target } from "lucide-react";
import { motion } from "framer-motion";

const donationLevels = [
  {
    amount: 50,
    title: "Art Supplies",
    description: "Provides materials for one creative healing workshop",
    icon: Palette,
    impact: "Supplies for 5 participants in art therapy session",
    gradient: "from-purple-500 to-violet-500"
  },
  {
    amount: 100,
    title: "Workshop",
    description: "Funds a complete mental health education workshop",
    icon: BookOpen,
    impact: "Reaches 15-20 community members with vital resources",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    amount: 250,
    title: "Therapy Session",
    description: "Sponsors one individual therapy session",
    icon: Heart,
    impact: "Provides professional mental health care for one person",
    gradient: "from-rose-500 to-pink-500"
  },
  {
    amount: 500,
    title: "Peer Advocate Training",
    description: "Trains one community member as a peer advocate",
    icon: UserCheck,
    impact: "Creates a community leader who can support dozens of others",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    amount: 1000,
    title: "Trauma-Informed Program",
    description: "Launches a comprehensive trauma recovery program",
    icon: Sparkles,
    impact: "Serves 10-15 survivors with specialized care and support",
    gradient: "from-orange-500 to-red-500"
  },
  {
    amount: 5000,
    title: "Community Initiative",
    description: "Establishes a new mental health program in underserved area",
    icon: Target,
    impact: "Creates lasting mental health resources for entire community",
    gradient: "from-teal-500 to-cyan-500"
  }
];

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmount = (value) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

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
              Your Support
              <span className="block bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Matters
              </span>
            </h1>
            
            <div className="max-w-4xl mx-auto mb-8">
              <blockquote className="text-2xl md:text-3xl text-gray-300 italic font-light leading-relaxed border-l-4 border-teal-400 pl-6">
                "Give someone access to healing, and you change their life. 
                Give a community access, and you change the world."
              </blockquote>
            </div>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Every donation transforms lives and fosters resilience. Your support makes 
              mental health care accessible to those who need it most.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Quote */}
      <section className="py-16 bg-gradient-to-r from-teal-900/20 to-cyan-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl md:text-3xl text-white font-light leading-relaxed max-w-4xl mx-auto">
              When you invest in mental health, you're not just funding services—you're 
              <span className="text-teal-400 font-medium"> investing in human potential</span>, 
              building stronger communities, and creating ripples of healing that extend far beyond 
              the individuals we serve directly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donation Levels */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Your Impact</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              See exactly how your donation transforms lives and builds resilient communities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {donationLevels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className={`bg-slate-800/80 border-teal-500/20 backdrop-blur-sm hover:bg-slate-800 transition-all duration-300 hover:scale-105 cursor-pointer h-full ${
                    selectedAmount === level.amount ? 'ring-2 ring-teal-400' : ''
                  }`}
                  onClick={() => handleAmountSelect(level.amount)}
                >
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${level.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <level.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-teal-400 mb-2">${level.amount}</h3>
                      <h4 className="text-xl font-bold text-white mb-3">{level.title}</h4>
                      <p className="text-gray-300 mb-4">{level.description}</p>
                    </div>
                    
                    <div className={`p-4 bg-gradient-to-r ${level.gradient} bg-opacity-10 rounded-lg border border-opacity-20`}>
                      <p className="text-sm text-gray-300 text-center font-medium">
                        <span className="text-teal-400">Impact:</span> {level.impact}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-slate-800/80 border-teal-500/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-4">Complete Your Donation</h3>
                  <p className="text-gray-300">Join us in transforming lives and building resilient communities.</p>
                </div>

                <div className="space-y-6">
                  {/* Amount Selection */}
                  <div>
                    <Label className="text-white text-lg font-semibold mb-4 block">Donation Amount</Label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                      {[25, 50, 100, 250, 500, 1000].map((amount) => (
                        <Button
                          key={amount}
                          variant={selectedAmount === amount ? "default" : "outline"}
                          className={`${
                            selectedAmount === amount 
                              ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white" 
                              : "border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-slate-900"
                          }`}
                          onClick={() => handleAmountSelect(amount)}
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Label htmlFor="custom" className="text-gray-300">Other amount:</Label>
                      <div className="relative flex-1 max-w-xs">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                        <Input
                          id="custom"
                          type="number"
                          placeholder="0.00"
                          className="pl-8 bg-slate-700 border-teal-500/20 text-white"
                          value={customAmount}
                          onChange={(e) => handleCustomAmount(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Donor Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white">Full Name</Label>
                      <Input
                        id="name"
                        className="bg-slate-700 border-teal-500/20 text-white"
                        value={donorInfo.name}
                        onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        className="bg-slate-700 border-teal-500/20 text-white"
                        value={donorInfo.email}
                        onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white">Message (Optional)</Label>
                    <textarea
                      id="message"
                      rows="3"
                      className="w-full px-3 py-2 bg-slate-700 border border-teal-500/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="Share what inspired you to donate..."
                      value={donorInfo.message}
                      onChange={(e) => setDonorInfo({...donorInfo, message: e.target.value})}
                    />
                  </div>

                  {/* Donate Button */}
                  <Button 
                    className="w-full py-6 text-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-[1.02]"
                    disabled={!selectedAmount && !customAmount}
                  >
                    <Heart className="w-6 h-6 mr-3" />
                    Donate ${selectedAmount || customAmount || "0"} Now
                  </Button>

                  <p className="text-sm text-gray-400 text-center">
                    Your donation is secure and helps us continue our mission of making mental health care accessible to all.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Transforming Lives</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your support creates real, measurable impact in our community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-800/80 border-teal-500/20 backdrop-blur-sm h-full">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Community Impact</h3>
                  </div>
                  <p className="text-gray-300 text-center">
                    "Thanks to donations like yours, our community now has access to mental health resources 
                    we never had before. We're stronger together."
                  </p>
                  <p className="text-teal-400 text-center mt-4 font-medium">- Community Leader</p>
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
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Personal Healing</h3>
                  </div>
                  <p className="text-gray-300 text-center">
                    "The therapy sessions funded by generous donors helped me process my trauma and 
                    find hope again. I'm now training to become a peer advocate myself."
                  </p>
                  <p className="text-teal-400 text-center mt-4 font-medium">- Program Participant</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-800/80 border-teal-500/20 backdrop-blur-sm h-full">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Ripple Effect</h3>
                  </div>
                  <p className="text-gray-300 text-center">
                    "Every person we help becomes a source of strength for others. Your donation 
                    creates a ripple effect of healing throughout our entire community."
                  </p>
                  <p className="text-teal-400 text-center mt-4 font-medium">- Program Director</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}