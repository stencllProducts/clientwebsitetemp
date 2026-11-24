import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Calendar, Clock, MapPin, Users, Heart, Palette, BookOpen, UserCheck, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

const eventTypes = [
  { id: "all", label: "All Events", icon: Calendar },
  { id: "therapy", label: "Therapy Groups", icon: Heart },
  { id: "workshop", label: "Workshops", icon: BookOpen },
  { id: "arts", label: "Arts Healing", icon: Palette },
  { id: "training", label: "Training", icon: UserCheck }
];

const upcomingEvents = [
  {
    id: 1,
    title: "Art Therapy Workshop: Processing Trauma Through Creativity",
    type: "arts",
    date: "2024-01-15",
    time: "6:00 PM - 8:00 PM",
    location: "Community Center, Downtown",
    capacity: 15,
    registered: 8,
    description: "Join us for a healing art therapy session where we explore creative expression as a tool for processing trauma and building resilience.",
    facilitator: "Dr. Maria Santos, Licensed Art Therapist",
    free: true
  },
  {
    id: 2,
    title: "Peer Support Group: Young Adults (18-25)",
    type: "therapy",
    date: "2024-01-18",
    time: "7:00 PM - 8:30 PM",
    location: "Psybriety Office, Room B",
    capacity: 12,
    registered: 5,
    description: "A safe space for young adults to share experiences, build connections, and support each other's mental health journeys.",
    facilitator: "Carlos Rodriguez, Certified Peer Counselor",
    free: true
  },
  {
    id: 3,
    title: "Mental Health First Aid Training",
    type: "training",
    date: "2024-01-22",
    time: "9:00 AM - 5:00 PM",
    location: "East Side Community College",
    capacity: 25,
    registered: 18,
    description: "Comprehensive 8-hour training to become a certified Mental Health First Aid responder in your community.",
    facilitator: "Dr. Sarah Johnson & Team",
    free: false,
    cost: "$50 (scholarships available)"
  },
  {
    id: 4,
    title: "Domestic Violence Survivor Support Circle",
    type: "therapy",
    date: "2024-01-25",
    time: "6:30 PM - 8:00 PM",
    location: "Safe Location (Address provided upon registration)",
    capacity: 10,
    registered: 7,
    description: "A confidential support group for survivors of domestic violence, focusing on healing, empowerment, and building safety.",
    facilitator: "Licensed Trauma Therapist",
    free: true,
    private: true
  },
  {
    id: 5,
    title: "Community Mental Health Awareness Workshop",
    type: "workshop",
    date: "2024-01-29",
    time: "2:00 PM - 4:00 PM",
    location: "Lincoln High School Auditorium",
    capacity: 100,
    registered: 42,
    description: "Educational workshop covering mental health stigma, warning signs, and available community resources. Open to all ages.",
    facilitator: "Psybriety Community Team",
    free: true
  },
  {
    id: 6,
    title: "Music Therapy: Healing Through Sound",
    type: "arts",
    date: "2024-02-05",
    time: "5:30 PM - 7:30 PM",
    location: "Music Studio, Arts District",
    capacity: 20,
    registered: 12,
    description: "Explore the therapeutic power of music through guided sessions including drumming, singing, and sound meditation.",
    facilitator: "James Wilson, Music Therapist",
    free: true
  }
];

const typeColors = {
  therapy: "bg-rose-100 text-rose-800 border-rose-200",
  workshop: "bg-blue-100 text-blue-800 border-blue-200",
  arts: "bg-purple-100 text-purple-800 border-purple-200",
  training: "bg-green-100 text-green-800 border-green-200"
};

export default function EventsPage() {
  const [selectedType, setSelectedType] = useState("all");

  const filteredEvents = selectedType === "all" 
    ? upcomingEvents 
    : upcomingEvents.filter(event => event.type === selectedType);

  const getAvailabilityColor = (registered, capacity) => {
    const percentage = (registered / capacity) * 100;
    if (percentage >= 90) return "text-red-400";
    if (percentage >= 70) return "text-yellow-400";
    return "text-green-400";
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
              Community
              <span className="block bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Events
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join us for workshops, support groups, and community gatherings designed to 
              promote healing, connection, and mental wellness for all.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Event Filters */}
      <section className="py-12 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-6">
              <Filter className="w-6 h-6 text-teal-400 mr-3" />
              <h3 className="text-2xl font-bold text-white">Filter Events</h3>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {eventTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={selectedType === type.id ? "default" : "outline"}
                  className={`flex items-center gap-2 ${
                    selectedType === type.id
                      ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
                      : "border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-slate-900"
                  }`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <type.icon className="w-4 h-4" />
                  {type.label}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Connect with your community through healing workshops, support groups, and educational sessions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/80 border-teal-500/20 backdrop-blur-sm hover:bg-slate-800 transition-all duration-300 hover:scale-[1.02] h-full">
                  <CardContent className="p-6">
                    {/* Event Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className={`${typeColors[event.type]} border font-medium`}>
                            {event.type.replace('_', ' ').toUpperCase()}
                          </Badge>
                          {event.free && (
                            <Badge className="bg-green-100 text-green-800 border-green-200 border">
                              FREE
                            </Badge>
                          )}
                          {event.private && (
                            <Badge className="bg-amber-100 text-amber-800 border-amber-200 border">
                              PRIVATE
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                          {event.title}
                        </h3>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-300">
                        <Calendar className="w-4 h-4 mr-3 text-teal-400" />
                        <span>{format(new Date(event.date), "EEEE, MMMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Clock className="w-4 h-4 mr-3 text-teal-400" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <MapPin className="w-4 h-4 mr-3 text-teal-400" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Users className="w-4 h-4 mr-3 text-teal-400" />
                        <span className={getAvailabilityColor(event.registered, event.capacity)}>
                          {event.registered}/{event.capacity} registered
                        </span>
                      </div>
                    </div>

                    {/* Event Description */}
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Facilitator */}
                    <div className="mb-6 p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-sm text-gray-400 mb-1">Facilitated by:</p>
                      <p className="text-white font-medium">{event.facilitator}</p>
                      {event.cost && (
                        <p className="text-teal-400 text-sm mt-1">{event.cost}</p>
                      )}
                    </div>

                    {/* Registration Button */}
                    <Button 
                      className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-teal-500/25 transition-all duration-300"
                      disabled={event.registered >= event.capacity}
                    >
                      {event.registered >= event.capacity ? (
                        "Event Full - Join Waitlist"
                      ) : (
                        <>
                          <Heart className="w-4 h-4 mr-2" />
                          Register for Event
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No events found</h3>
              <p className="text-gray-300">
                Check back soon for new {selectedType === "all" ? "" : selectedType} events, or select a different category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-teal-900/20 to-cyan-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Never Miss an Event</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Stay connected with our community by subscribing to our newsletter. 
              Get early access to event registration and mental health resources.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-slate-800 border border-teal-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <Button className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-teal-500/25 transition-all duration-300">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}