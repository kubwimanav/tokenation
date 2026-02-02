import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", { email, password });
  };

  return (
    <div className="fixed inset-0 bg-gray-50 flex items-center justify-center p-4">
      <div
        className="w-full max-w-3xl flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl bg-white"
      >
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

        {/* Login Form Section */}
        <div className="md:w-3/5 w-full flex flex-col p-8">
          {/* Mobile Brand Header */}
          <div className="md:hidden text-center mb-4">
            <div className="w-12 h-12 from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-2">
              <Trophy className="w-7 h-7 text-gray-900" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Tokennation</h1>
          </div>

          {/* Fixed Title - Centered */}
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Sign In
          </h2>

          {/* Scrollable Form Fields */}
          <div className="flex-1 overflow-y-auto px-1">
            <div className="w-full max-w-sm mx-auto">
              <div className="space-y-3">
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
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
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
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2 cursor-pointer"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 text-sm text-gray-900 cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>

                  <a
                    href="#"
                    className="text-sm text-yellow-600 hover:text-yellow-700 hover:underline"
                  >
                    Forgot password?
                  </a>
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
              className="w-full flex items-center justify-center mt-9 gap-2 text-white py-2 px-4 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all shadow-lg text-sm"
              style={{ backgroundColor: "#F49B0F" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#e89510")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#F49B0F")
              }
            >
              Sign In
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Sign Up Link */}
            <p className=" flex gap-3 justify-center text-sm text-gray-500 mt-4">
              New user?
              <Link to= "/signup"
                className="font-medium text-yellow-600 hover:text-yellow-700 hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
