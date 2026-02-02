import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaLock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaArrowUp,
} from "react-icons/fa";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import billiardBg from "../assets/billiard.jpeg";
import logo from "../assets/logo.png";
import translations from "../translations.json";

function Login({ selectedLanguage }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://token-backend-omega.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        const data = await response.json();
        // Store token and user in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Show success notification
        Notify.success("Login successful! Redirecting...");

        // Role-based navigation
        setTimeout(() => {
          if (data.user.role === "TOKEN_MAN") {
            navigate("/token");
          } else {
            navigate("/admin");
          }
        }, 1000);
      } else {
        const errorData = await response.json();
        const errorMsg = errorData.message || "Login failed";
        setError(errorMsg);
        Notify.failure(errorMsg);
      }
    } catch (error) {
      console.error("Login error:", error);
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
                <h1 className="notranslate">{t("auth.login.title")}</h1>
                <p className="notranslate">{t("auth.login.subtitle")}</p>
              </div>

              {error && <div className="error-message">{error}</div>}

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email" className="notranslate">
                    {t("auth.email")}
                  </label>
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("auth.emailPlaceholder")}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

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

                <div className="form-options">
                  <label className="checkbox-wrapper">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <span className="notranslate">{t("auth.rememberMe")}</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="forgot-link notranslate"
                  >
                    {t("auth.forgotPassword")}
                  </Link>
                </div>

                <button
                  type="submit"
                  className="auth-button"
                  disabled={isLoading}
                >
                  {isLoading ? t("auth.loggingIn") : t("auth.login.button")}
                </button>
              </form>

              <div className="auth-footer">
                <p className="notranslate">
                  {t("auth.login.noAccount")}
                  <Link to="/register" className="auth-link notranslate">
                    {t("auth.login.signUp")}
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
                <h2 className="notranslate">{t("auth.welcome.title")}</h2>
                <p className="notranslate">{t("auth.welcome.subtitle")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
