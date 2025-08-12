
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Camera } from "lucide-react";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@courtvision.pro",
    link: "mailto:hello@courtvision.pro"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(555) 123-4567",
    link: "tel:+15551234567"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Los Angeles, CA",
    link: null
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    link: null
  }
];

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="bg-gray-950 border-gray-800 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Camera className="w-5 h-5 text-gray-400 mr-2" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {contactDetails.map((detail, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                <detail.icon className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{detail.label}</p>
                {detail.link ? (
                  <a 
                    href={detail.link}
                    className="text-white hover:text-red-500 transition-colors duration-300"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="text-white">{detail.value}</p>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gray-950 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Why Choose CourtVision?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-gray-600 rounded-full mt-2"></div>
            <p className="text-gray-300">Professional-grade equipment and expertise</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-gray-600 rounded-full mt-2"></div>
            <p className="text-gray-300">Fast turnaround times</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-gray-600 rounded-full mt-2"></div>
            <p className="text-gray-300">Competitive pricing packages</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-gray-600 rounded-full mt-2"></div>
            <p className="text-gray-300">100% satisfaction guarantee</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}