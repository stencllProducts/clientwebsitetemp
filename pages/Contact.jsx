
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Booking } from "@/entities/Booking";
import { SendEmail } from "@/integrations/Core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, CheckCircle, CreditCard, Calendar } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

import ContactInfo from "../components/contact/ContactInfo";
import BookingForm from "../components/contact/BookingForm";
import PaymentSection from "../components/contact/PaymentSection";

export default function Contact() {
  const [bookingStep, setBookingStep] = useState(1); // 1: Form, 2: Payment, 3: Confirmation
  const [bookingData, setBookingData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleBookingSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Calculate total amount based on package
      const packagePrices = { basic: 299, premium: 599, ultimate: 999 };
      const totalAmount = packagePrices[formData.package_type] || 299;

      const bookingDataWithAmount = {
        ...formData,
        total_amount: totalAmount,
        payment_status: "pending",
        booking_status: "pending"
      };

      // Save booking to database
      const booking = await Booking.create(bookingDataWithAmount);
      
      // Send confirmation email
      await SendEmail({
        to: formData.client_email,
        subject: "Booking Confirmation - CourtVision Basketball Videography",
        body: `Hi ${formData.client_name},\n\nThank you for booking with CourtVision! We've received your booking request for ${formData.event_type} on ${formData.event_date}.\n\nBooking Details:\n- Package: ${formData.package_type.toUpperCase()}\n- Total Amount: $${totalAmount}\n- Event Date: ${formData.event_date}\n- Location: ${formData.location}\n\nWe'll contact you within 24 hours to confirm the details and arrange payment.\n\nBest regards,\nCourtVision Team`
      });

      setBookingData({ ...bookingDataWithAmount, id: booking.id });
      setBookingStep(2); // Move to payment step
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError("Error submitting booking. Please try again.");
      console.error("Booking error:", error);
    }
    
    setIsSubmitting(false);
  };

  const handlePayment = async (paymentData) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, you'd integrate with Stripe/PayPal here
      // For now, we'll simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update booking status
      await Booking.update(bookingData.id, {
        payment_status: "paid",
        booking_status: "confirmed"
      });

      setBookingStep(3); // Move to confirmation
    } catch (error) {
      setSubmitError("Payment processing failed. Please try again.");
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Get In <span className="text-red-500">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to capture your basketball story? Let's discuss your project and create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>

          {/* Booking Form / Payment / Confirmation */}
          <div className="lg:col-span-2">
            {bookingStep === 1 && (
              <BookingForm 
                onSubmit={handleBookingSubmit}
                isSubmitting={isSubmitting}
                submitError={submitError}
              />
            )}

            {bookingStep === 2 && (
              <PaymentSection
                bookingData={bookingData}
                onPayment={handlePayment}
                isProcessing={isSubmitting}
                error={submitError}
              />
            )}

            {bookingStep === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gray-950 border-green-500">
                  <CardHeader className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <CardTitle className="text-2xl text-white">Booking Confirmed!</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-300 mb-6">
                      Your booking has been confirmed. We'll be in touch within 24 hours to finalize all details.
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <p className="text-sm text-gray-400 mb-2">Booking Reference</p>
                      <p className="text-lg font-semibold text-white">{bookingData?.id}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}