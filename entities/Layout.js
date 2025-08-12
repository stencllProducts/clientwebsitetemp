
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Camera, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navigationItems = [
    { name: "Portfolio", url: createPageUrl("Portfolio"), icon: Camera },
    { name: "Contact", url: createPageUrl("Contact"), icon: Mail },
  ];

  const isActive = (url) => location.pathname === url;

  return (
    <div className="min-h-screen bg-black">
      <style>{`        
        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to={createPageUrl("Portfolio")} className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gray-900 border border-gray-700 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                <Camera className="w-5 h-5 text-red-500" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white">CourtVision</h1>
                <p className="text-sm text-gray-400">Basketball Videography</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.url}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive(item.url)
                      ? "text-white bg-gray-800"
                      : "text-gray-300 hover:text-white hover:bg-gray-900"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              <Button className="bg-white text-black hover:bg-gray-100 transition-colors font-semibold">
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-900 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              <div className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive(item.url)
                        ? "text-white bg-gray-800"
                        : "text-gray-300 hover:text-white hover:bg-gray-900"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
                <div className="pt-2">
                  <Button className="w-full bg-white text-black hover:bg-gray-100 transition-colors font-semibold">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Camera className="w-4 h-4 text-red-500" />
              </div>
              <span className="text-xl font-bold text-white">CourtVision</span>
            </div>
            <p className="text-gray-400 mb-4">Professional Basketball Videography</p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>© 2024 CourtVision</span>
              <span>•</span>
              <span>Capturing greatness on the court</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}