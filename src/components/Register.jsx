import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaArrowUp,
} from "react-icons/fa";
import { MdPhone } from "react-icons/md";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import billiardBg from "../assets/billiard.jpeg";
import logo from "../assets/logo.png";
import translations from "../translations.json";
import { FaLocationPin } from "react-icons/fa6";

function Register({ selectedLanguage }) {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Translation function
  const t = (key) => {
    return translations[selectedLanguage]?.[key] || translations.en[key] || key;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when user types
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      const errorMsg = t("auth.register.passwordMismatch");
      setError(errorMsg);
      Notify.failure(errorMsg);
      return false;
    }
    if (formData.password.length < 6) {
      const errorMsg = t("auth.register.passwordTooShort");
      setError(errorMsg);
      Notify.failure(errorMsg);
      return false;
    }
    return true;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://token-backend-omega.vercel.app/api/register/tokenman",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            companyName: formData.companyName,
            location: formData.location,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();

        // Store token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Show success notification
        Notify.success("Registration successful! Redirecting to login...");

        // Redirect to login after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        const errorData = await response.json();
        const errorMsg = errorData.message || "Registration failed";
        setError(errorMsg);
        Notify.failure(errorMsg);
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMsg = "Network error. Please try again.";
      setError(errorMsg);
      Notify.failure(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page-content">
        <div className="auth-container">
          {/* Left Side - Form */}
          <div className="auth-form-section">
            <div className="auth-form-container">
              <div className="auth-logo">
                <img src={logo} alt="Tega Logo" />
              </div>

              <div className="auth-header">
                <h1 className="notranslate">{t("auth.register.title")}</h1>
                <p className="notranslate">{t("auth.register.subtitle")}</p>
              </div>

              {error && <div className="error-message">{error}</div>}

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="fullName" className="notranslate">
                    FullName
                  </label>
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className=" flex gap-2 ">
                  <div className="form-group">
                    <label htmlFor="companyName" className="notranslate">
                      CompanyName
                    </label>
                    <div className="input-wrapper">
                      <FaUser className="input-icon" />
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="companyName"
                        required
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="notranslate">
                      {t("auth.email")}
                    </label>
                    <div className="input-wrapper">
                      <FaEnvelope className="input-icon" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="EmailAddress"
                        required
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                <div className=" flex gap-2">
                  <div className="form-group">
                    <label htmlFor="phone" className="notranslate">
                      {t("auth.phone")}
                    </label>
                    <div className="input-wrapper">
                      <FaPhone className="input-icon" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t("auth.phonePlaceholder")}
                        required
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="location" className="notranslate">
                      Location
                    </label>
                    <div className="input-wrapper">
                      <FaLocationPin className="input-icon" />
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Location"
                        required
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                <div className=" flex gap-2 ">
                  <div className="form-group">
                    <label htmlFor="password" className="notranslate">
                      {t("auth.password")}
                    </label>
                    <div className="input-wrapper">
                      <FaLock className="input-icon" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder={t("auth.passwordPlaceholder")}
                        required
                        className="form-input"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="notranslate">
                      {t("auth.confirmPassword")}
                    </label>
                    <div className="input-wrapper">
                      <FaLock className="input-icon" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder={t("auth.confirmPasswordPlaceholder")}
                        required
                        className="form-input"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-options">
                  <label className="checkbox-wrapper">
                    <input type="checkbox" required />
                    <span className="checkmark"></span>
                    <span className="notranslate">
                      {t("auth.register.agreeTerms")}
                      <Link to="/terms" className="terms-link">
                        {t("auth.register.termsConditions")}
                      </Link>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="auth-button"
                  disabled={isLoading}
                >
                  {isLoading
                    ? t("auth.registering")
                    : t("auth.register.button")}
                </button>
              </form>

              <div className="auth-footer">
                <p className="notranslate">
                  {t("auth.register.haveAccount")}
                  <Link to="/login" className="auth-link notranslate">
                    {t("auth.register.signIn")}
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Background */}
          <div
            className="auth-bg-section"
            style={{ backgroundImage: `url(${billiardBg})` }}
          >
            <div className="auth-bg-overlay">
              <div className="auth-bg-content">
                <h2 className="notranslate">
                  {t("auth.welcome.registerTitle")}
                </h2>
                <p className="notranslate">
                  {t("auth.welcome.registerSubtitle")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
