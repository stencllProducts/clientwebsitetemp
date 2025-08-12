
import React from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import Link from "next/link";

const packages = [
  {
    name: "Basic",
    price: "$299",
    description: "Perfect for single games or practices",
    features: [
      "2-hour coverage",
      "Basic editing",
      "1 highlight reel (2-3 min)",
      "Digital delivery",
      "1 revision included"
    ],
    popular: false
  },
  {
    name: "Premium",
    price: "$599",
    description: "Comprehensive game coverage",
    features: [
      "4-hour coverage",
      "Advanced editing",
      "2 highlight reels",
      "Individual player clips",
      "Social media versions",
      "Digital delivery",
      "3 revisions included"
    ],
    popular: true
  },
  {
    name: "Ultimate",
    price: "$999",
    description: "Full production experience",
    features: [
      "Full day coverage",
      "Cinematic editing",
      "Multiple highlight reels",
      "Individual player packages",
      "Behind-the-scenes content",
      "Social media package",
      "Physical media delivery",
      "Unlimited revisions"
    ],
    popular: false
  }
];

export default function ServicePackages() {
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
            <span className="text-white">Service Packages</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose the perfect package for your basketball videography needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`relative bg-gray-900 border h-full rounded-xl p-6 flex flex-col justify-between ${
                pkg.popular ? 'border-red-500 shadow-2xl scale-105' : 'border-gray-800 hover:border-gray-700'
              } transition-all duration-300`}>
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </span>
                )}
                <div className="text-center pb-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-white mb-2">{pkg.price}</div>
                  <p className="text-gray-400">{pkg.description}</p>
                </div>
                <div className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" passHref legacyBehavior>
                    <a
                      className={`w-full block text-center rounded-lg py-3 px-4 mt-auto ${
                        pkg.popular 
                          ? 'bg-white text-black hover:bg-gray-100 font-semibold' 
                          : 'bg-gray-800 text-white hover:bg-gray-700'
                      } transition-all duration-300`}
                    >
                      Choose {pkg.name}
                    </a>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}