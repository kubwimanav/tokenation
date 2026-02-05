import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import billiardBg from "../assets/billiard.jpeg";
import logo from "../assets/logo.png";
import translations from "../translations.json";

function Otpverification({ selectedLanguage }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);

  // Get email from navigation state
  const email = location.state?.email || "";

  // Translation function
  const t = (key) => {
    return translations[selectedLanguage]?.[key] || translations.en[key] || key;
  };

  // Redirect if no email provided
  useEffect(() => {
    if (!email) {
      Notify.failure("No email provided. Redirecting to registration...");
      navigate("/register");
    }
  }, [email, navigate]);

  // Timer for resend OTP
  useEffect(() => {
    let interval;
    if (resendTimer > 0 && !canResend) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer, canResend]);

  // Handle OTP input change
  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only the last character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);

    if (!/^\d+$/.test(pastedData)) {
      Notify.failure("Please paste only numbers");
      return;
    }

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      Notify.failure("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://token-backend-omega.vercel.app/api/verify-otp/tokenman",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            otp: otpCode,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();

        Notify.success("Email verified successfully! Redirecting to login...");

        // Redirect to login after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        const errorData = await response.json();
        const errorMsg = errorData.message || "Invalid OTP. Please try again.";
        Notify.failure(errorMsg);

        // Clear OTP inputs on error
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      Notify.failure("Network error. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (!canResend) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://token-backend-omega.vercel.app/api/resend-otp/tokenman",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        },
      );

      if (response.ok) {
        Notify.success("OTP has been resent to your email");
        setResendTimer(60);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      } else {
        const errorData = await response.json();
        Notify.failure(errorData.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      Notify.failure("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 min-h-150">
            {/* Left Side - Form */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                  <img src={logo} alt="Tega Logo" className="h-16 w-auto" />
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    Verify Your Email
                  </h1>
                  <p className="text-gray-600 mb-2">
                    We've sent a 6-digit verification code to
                  </p>
                  <p className="text-blue-600 font-semibold text-sm md:text-base break-all px-4">
                    {email}
                  </p>
                </div>

                {/* OTP Form */}
                <form onSubmit={handleVerifyOtp} className="space-y-8">
                  {/* OTP Inputs */}
                  <div className="flex justify-center gap-2 md:gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className={`w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold border-2 rounded-lg 
                          transition-all duration-200 outline-none
                          ${digit ? "border-blue-500 bg-blue-50" : "border-gray-300"}
                          focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:scale-105
                          disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60`}
                        autoFocus={index === 0}
                        disabled={isLoading}
                      />
                    ))}
                  </div>

                  {/* Verify Button */}
                  <button
                    type="submit"
                    disabled={isLoading || otp.join("").length !== 6}
                    className={`w-full py-3.5 px-6 rounded-lg font-semibold text-white text-lg
                      transition-all duration-200 shadow-lg
                      ${
                        isLoading || otp.join("").length !== 6
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 hover:shadow-xl active:scale-95"
                      }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Verifying...
                      </span>
                    ) : (
                      "Verify Email"
                    )}
                  </button>

                  {/* Resend Section */}
                  <div className="text-center">
                    {!canResend ? (
                      <p className="text-gray-600 text-sm">
                        Didn't receive the code?{" "}
                        <span className="font-semibold text-blue-600">
                          Resend in {resendTimer}s
                        </span>
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={isLoading}
                        className="text-blue-600 hover:text-blue-700 font-semibold text-sm 
                          hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Resend Code
                      </button>
                    )}
                  </div>
                </form>

                {/* Back Button */}
                <div className="mt-8 text-center">
                  <button
                    onClick={() => navigate("/register")}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 
                      transition-colors text-sm font-medium"
                  >
                    <FaArrowLeft className="text-xs" />
                    Back to Registration
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Background */}
            <div
              className="relative hidden md:block bg-cover bg-center"
              style={{ backgroundImage: `url(${billiardBg})` }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-blue-900/90 to-blue-800/90">
                <div className="h-full flex flex-col items-center justify-center text-white p-12">
                  {/* Animated Icon */}
                  <div className="mb-8 animate-pulse">
                    <FaCheckCircle className="text-7xl" />
                  </div>

                  {/* Title */}
                  <h2 className="text-4xl font-bold mb-4 text-center">
                    Almost There!
                  </h2>
                  <p className="text-xl text-center mb-12 text-blue-100 max-w-md">
                    Just one more step to complete your registration. Enter the
                    verification code sent to your email.
                  </p>

                  {/* Feature Steps */}
                  <div className="space-y-6 w-full max-w-sm">
                    <div
                      className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm 
                      rounded-lg hover:bg-white/15 transition-all duration-300 hover:translate-x-2"
                    >
                      <div
                        className="shrink-0 w-12 h-12 bg-white/20 rounded-full 
                        flex items-center justify-center text-2xl font-bold"
                      >
                        01
                      </div>
                      <span className="text-lg font-medium">
                        Check your email
                      </span>
                    </div>

                    <div
                      className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm 
                      rounded-lg hover:bg-white/15 transition-all duration-300 hover:translate-x-2"
                    >
                      <div
                        className="shrink-0 w-12 h-12 bg-white/20 rounded-full 
                        flex items-center justify-center text-2xl font-bold"
                      >
                        02
                      </div>
                      <span className="text-lg font-medium">
                        Enter 6-digit code
                      </span>
                    </div>

                    <div
                      className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm 
                      rounded-lg hover:bg-white/15 transition-all duration-300 hover:translate-x-2"
                    >
                      <div
                        className="shrink-0 w-12 h-12 bg-white/20 rounded-full 
                        flex items-center justify-center text-2xl font-bold"
                      >
                        03
                      </div>
                      <span className="text-lg font-medium">
                        Start using Tega
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otpverification;
