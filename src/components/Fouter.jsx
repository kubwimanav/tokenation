import { useState, useEffect } from "react";
import {
  FaMobileAlt,
  FaPhone,
  FaGamepad,
  FaLock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaArrowUp,
} from "react-icons/fa";
import { MdPhone } from "react-icons/md";
import billiardBg from "../assets/billiard.jpeg";
import yellowBg from "../assets/yellow.png";
import imigongoBorder from "../assets/imigongo.png";
import logo from "../assets/logo.png";
import translations from "../translations.json";
import AOS from "aos";
import { Link, Links, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa";
import navbarBg from "../assets/navbar.jpeg";

function Fouter({ selectedLanguage, handleLanguageChange, languages }) {
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Translation function
  const t = (key) => {
    return translations[selectedLanguage]?.[key] || translations.en[key] || key;
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Translation function
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <img src={logo} alt="Platform Logo" />
              </div>
              <p className="footer-description">{t("footer.description")}</p>
              <div className="social-icons">
                <a href="#" className="social-icon" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="#" className="social-icon" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" className="social-icon" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" className="social-icon" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
            <div className="footer-section">
              <h3 className="footer-title">{t("footer.contactUs")}</h3>
              <div className="footer-contact">
                <div className="footer-contact-item">
                  <FaEnvelope className="footer-icon" />
                  <span>info@tega.rw</span>
                </div>
                <div className="footer-contact-item">
                  <MdPhone className="footer-icon" />
                  <span>+250787462570</span>
                </div>
                <div className="footer-contact-item">
                  <FaMapMarkerAlt className="footer-icon" />
                  <span>Kigali, Rwanda</span>
                </div>
              </div>
            </div>
            <div className="footer-section">
              <h3 className="footer-title">{t("footer.quickAccess")}</h3>
              <div className="ussd-codes">
                <div className="ussd-item">
                  <h4>{t("footer.buyTokens")}</h4>
                  <div className="ussd-code">*123#</div>
                </div>
                <div className="ussd-item">
                  <h4>{t("footer.placeBet")}</h4>
                  <div className="ussd-code">*123*1#</div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>{t("footer.copyright")}</p>
              <button
                className="scroll-to-top"
                onClick={scrollToTop}
                aria-label="Scroll to top"
              >
                <FaArrowUp />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Fouter;
