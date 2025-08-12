import React from "react";
import { motion } from "framer-motion";
import { Trophy, Users, Calendar, Star } from "lucide-react";

const stats = [
  { icon: Trophy, label: "Games Filmed", value: "500+", color: "text-white" },
  { icon: Users, label: "Happy Clients", value: "150+", color: "text-white" },
  { icon: Calendar, label: "Years Experience", value: "8+", color: "text-white" },
  { icon: Star, label: "5-Star Reviews", value: "98%", color: "text-white" }
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Trusted by <span className="text-white">Champions</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Numbers that speak for our commitment to excellence in basketball videography
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center group-hover:bg-gray-800 transition-colors duration-300">
                  <stat.icon className={`w-8 h-8 text-gray-300 group-hover:text-red-500 transition-colors duration-300`} />
                </div>
              </div>
              <div className="text-3xl lg:text-4xl font-bold mb-2 text-white">
                {stat.value}
              </div>
              <div className="text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}