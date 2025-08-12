
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, User, Mail, Phone, MapPin, Clock, Package, AlertCircle } from "lucide-react";

export default function BookingForm({ onSubmit, isSubmitting, submitError }) {
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    event_type: "",
    event_date: "",
    event_time: "",
    location: "",
    duration_hours: 2,
    package_type: "",
    special_requests: ""
  });

  const [errors, setErrors] = useState({});

  const packagePrices = {
    basic: { price: 299, duration: "2 hours" },
    premium: { price: 599, duration: "4 hours" },
    ultimate: { price: 999, duration: "Full day" }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.client_name) newErrors.client_name = "Name is required";
    if (!formData.client_email) newErrors.client_email = "Email is required";
    if (!formData.client_phone) newErrors.client_phone = "Phone is required";
    if (!formData.event_type) newErrors.event_type = "Event type is required";
    if (!formData.event_date) newErrors.event_date = "Event date is required";
    if (!formData.event_time) newErrors.event_time = "Event time is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.package_type) newErrors.package_type = "Package selection is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="bg-gray-950 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Book Your Session</CardTitle>
        </CardHeader>
        <CardContent>
          {submitError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  Full Name *
                </Label>
                <Input
                  value={formData.client_name}
                  onChange={(e) => updateFormData('client_name', e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white"
                  placeholder="Enter your full name"
                />
                {errors.client_name && <p className="text-red-400 text-sm">{errors.client_name}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-white flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  Email Address *
                </Label>
                <Input
                  type="email"
                  value={formData.client_email}
                  onChange={(e) => updateFormData('client_email', e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white"
                  placeholder="Enter your email"
                />
                {errors.client_email && <p className="text-red-400 text-sm">{errors.client_email}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                Phone Number *
              </Label>
              <Input
                type="tel"
                value={formData.client_phone}
                onChange={(e) => updateFormData('client_phone', e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
                placeholder="Enter your phone number"
              />
              {errors.client_phone && <p className="text-red-400 text-sm">{errors.client_phone}</p>}
            </div>

            {/* Event Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Event Type *</Label>
                <Select value={formData.event_type} onValueChange={(value) => updateFormData('event_type', value)}>
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="game">Game Coverage</SelectItem>
                    <SelectItem value="practice">Practice Session</SelectItem>
                    <SelectItem value="tournament">Tournament</SelectItem>
                    <SelectItem value="highlight_reel">Highlight Reel</SelectItem>
                    <SelectItem value="recruiting_video">Recruiting Video</SelectItem>
                    <SelectItem value="team_photo">Team Photography</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.event_type && <p className="text-red-400 text-sm">{errors.event_type}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-white">Package *</Label>
                <Select value={formData.package_type} onValueChange={(value) => updateFormData('package_type', value)}>
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                    <SelectValue placeholder="Select package" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic - $299</SelectItem>
                    <SelectItem value="premium">Premium - $599</SelectItem>
                    <SelectItem value="ultimate">Ultimate - $999</SelectItem>
                  </SelectContent>
                </Select>
                {errors.package_type && <p className="text-red-400 text-sm">{errors.package_type}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  Event Date *
                </Label>
                <Input
                  type="date"
                  value={formData.event_date}
                  onChange={(e) => updateFormData('event_date', e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white"
                />
                {errors.event_date && <p className="text-red-400 text-sm">{errors.event_date}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-white flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  Event Time *
                </Label>
                <Input
                  type="time"
                  value={formData.event_time}
                  onChange={(e) => updateFormData('event_time', e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white"
                />
                {errors.event_time && <p className="text-red-400 text-sm">{errors.event_time}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                Event Location *
              </Label>
              <Input
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
                placeholder="Enter venue name and address"
              />
              {errors.location && <p className="text-red-400 text-sm">{errors.location}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-white">Special Requests</Label>
              <Textarea
                value={formData.special_requests}
                onChange={(e) => updateFormData('special_requests', e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
                placeholder="Any specific shots, players to focus on, or special requirements..."
                rows={4}
              />
            </div>

            {/* Package Summary */}
            {formData.package_type && (
              <div className="bg-gray-900 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Package Summary</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 capitalize">{formData.package_type} Package</span>
                  <span className="text-white font-bold text-lg">
                    ${packagePrices[formData.package_type]?.price}
                  </span>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black hover:bg-gray-100 transition-colors font-semibold"
            >
              {isSubmitting ? "Processing..." : "Continue to Payment"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}