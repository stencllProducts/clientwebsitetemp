
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CreditCard, Lock, AlertCircle, Calendar, MapPin, Package } from "lucide-react";

export default function PaymentSection({ bookingData, onPayment, isProcessing, error }) {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleSubmit = (e) => {
    e.preventDefault();
    onPayment(paymentData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      {/* Booking Summary */}
      <Card className="bg-gray-950 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Client</span>
            <span className="text-white">{bookingData.client_name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Event Date
            </span>
            <span className="text-white">{bookingData.event_date}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Location
            </span>
            <span className="text-white">{bookingData.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300 flex items-center">
              <Package className="w-4 h-4 mr-2" />
              Package
            </span>
            <span className="text-white capitalize">{bookingData.package_type}</span>
          </div>
          <div className="border-t border-gray-700 pt-4">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span className="text-white">Total Amount</span>
              <span className="text-white">${bookingData.total_amount}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card className="bg-gray-950 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Lock className="w-5 h-5 mr-2 text-gray-400" />
            Secure Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Payment Method Selection */}
          <div className="mb-6">
            <Label className="text-white mb-3 block">Payment Method</Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-4 border rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                  paymentMethod === "card"
                    ? "border-red-500 bg-gray-900 text-white"
                    : "border-gray-700 text-gray-300 hover:border-gray-600"
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Credit Card</span>
              </button>
              
              <button
                type="button"
                onClick={() => setPaymentMethod("paypal")}
                className={`p-4 border rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                  paymentMethod === "paypal"
                    ? "border-red-500 bg-gray-900 text-white"
                    : "border-gray-700 text-gray-300 hover:border-gray-600"
                }`}
              >
                <span className="font-bold">PP</span>
                <span>PayPal</span>
              </button>
            </div>
          </div>

          {paymentMethod === "card" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Cardholder Name</Label>
                <Input
                  value={paymentData.cardholderName}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, cardholderName: e.target.value }))}
                  className="bg-gray-900 border-gray-700 text-white"
                  placeholder="Full name on card"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Card Number</Label>
                <Input
                  value={paymentData.cardNumber}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                  className="bg-gray-900 border-gray-700 text-white"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Expiry Date</Label>
                  <Input
                    value={paymentData.expiryDate}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                    className="bg-gray-900 border-gray-700 text-white"
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">CVV</Label>
                  <Input
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value }))}
                    className="bg-gray-900 border-gray-700 text-white"
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-white text-black hover:bg-gray-100 transition-colors font-semibold"
              >
                {isProcessing ? "Processing Payment..." : `Pay $${bookingData.total_amount}`}
              </Button>
            </form>
          )}

          {paymentMethod === "paypal" && (
            <div className="space-y-4">
              <p className="text-gray-300 text-center">
                You will be redirected to PayPal to complete your payment securely.
              </p>
              <Button
                onClick={() => onPayment({ method: "paypal" })}
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isProcessing ? "Redirecting..." : `Pay with PayPal - $${bookingData.total_amount}`}
              </Button>
            </div>
          )}

          <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-400">
            <Lock className="w-4 h-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}