import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Trophy,
  CreditCard,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup submitted:", formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl bg-white max-h-[95vh]">
        {/* Brand Section */}
        <div className="md:w-2/5 w-full relative bg-gradient-to-br from-yellow-500 to-orange-600 p-8 md:flex hidden items-center justify-center">
          <div className="relative z-10 text-center">
            <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
            <h6 className="text-3xl font-bold text-gray-900 mb-2">Tokennation</h6>
            <p className="text-gray-900 font-medium text-sm">
              Rwanda's #1 Platform
            </p>
          </div>
        </div>

        {/* Signup Form Section */}
        <div className="md:w-3/5 w-full flex flex-col p-8">
          {/* Mobile Brand Header */}
          <div className="md:hidden text-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-2">
              <Trophy className="w-7 h-7 text-gray-900" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">tega.rw</h1>
          </div>

          {/* Fixed Title - Centered */}
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Create Account
          </h2>

          {/* Scrollable Form Fields */}
          <div className="flex-1 overflow-y-auto px-1">
            <div className="w-full max-w-sm mx-auto">
              <div className="space-y-3">
                {/* Full Name Field */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-900 mb-1"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="fullName"
                      className="w-full pl-8 pr-3 py-2 text-sm border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                    />
                  </div>
                </div>

                {/* ID Number Field */}
                <div>
                  <label
                    htmlFor="idNumber"
                    className="block text-sm font-medium text-gray-900 mb-1"
                  >
                    ID Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                    <input
                      id="idNumber"
                      name="idNumber"
                      type="text"
                      value={formData.idNumber}
                      onChange={handleChange}
                      placeholder="1 XXXX X XXXXXXX X XX"
                      className="w-full pl-8 pr-3 py-2 text-sm border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900 mb-1"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-8 pr-3 py-2 text-sm border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-900 mb-1"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+250 XXX XXX XXX"
                      className="w-full pl-8 pr-3 py-2 text-sm border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                    />
                  </div>
                </div>

                {/* Location Field */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-900 mb-1"
                  >
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Kigali, Rwanda"
                      className="w-full pl-8 pr-3 py-2 text-sm border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-900 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-8 pr-10 py-2 text-sm border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                    />
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-900 mb-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-8 pr-10 py-2 text-sm border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                    />
                    <div
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Button at Bottom */}
          <div className="w-full max-w-sm mx-auto mt-4">
            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 text-white py-2 px-4 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all shadow-lg text-sm"
              style={{ backgroundColor: "#F49B0F" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#e89510")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#F49B0F")
              }
            >
              Create Account
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Sign In Link */}
            <p className="text-center text-sm text-gray-500 pt-2">
              Already have an account?{" "}
             <Link
                to="/login"
                className="font-medium text-yellow-600 hover:text-yellow-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
