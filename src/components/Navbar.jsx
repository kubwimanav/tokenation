import { useState, useEffect } from "react";
import {
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import navbarBg from "../assets/navbar.jpeg";
import logo from "../assets/logo.png";
import translations from "../translations.json";
import AOS from "aos";

function Navbar({ selectedLanguage, handleLanguageChange, languages }) {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Translation function
  const t = (key) => {
    return translations[selectedLanguage]?.[key] || translations.en[key] || key;
  };

  // Check if user is logged in

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundImage: `url(${navbarBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#2d4a3e",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-[#2d4a3e]/95 to-[#3d5a4e]/95"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="shrink-0 z-10">
            <img
              src={logo}
              alt="Platform Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            <button
              className={`relative text-white font-medium text-[16px] px-3 py-2 transition-all duration-300 hover:text-[#F49B0F] inline-block ${
                location.pathname === "/" && activeSection === "home"
                  ? "after:absolute after:-bottom-0.5 after:left-5 after:right-5 after:h-0.75 after:bg-linear-to-r after:from-[#F49B0F] after:via-[#FFD700] after:to-[#F49B0F] after:rounded-sm"
                  : ""
              }`}
              onClick={() => scrollToSection("home")}
            >
              {t("nav.home")}
            </button>


            <Link
              to="/game"
              className="relative text-white font-medium text-[16px] px-3 py-2 transition-all duration-300 hover:text-[#F49B0F] inline-block"
            >
              {t("Game")}
            </Link>

            <button
              className="relative text-white font-medium text-[16px] px-3 py-2 transition-all duration-300 hover:text-[#F49B0F] inline-block"
              onClick={() => scrollToSection("contact")}
            >
              {t("nav.contact")}
            </button>

            {/* Language Selector */}
            <div className="ml-30 relative">
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="appearance-none bg-white text-gray-800 rounded-lg pl-4 pr-10 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/50 cursor-pointer hover:bg-gray-50 transition-all shadow-sm min-w-40"
                >
                  {languages?.map((lang) => (
                    <option
                      key={lang.code}
                      value={lang.code}
                      className="bg-white text-gray-800"
                    >
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-xs pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all z-10"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-24 bg-[#2d4a3e]/98 backdrop-blur-md transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full px-6 py-8 space-y-1 overflow-y-auto">
          <button
            className={`text-white text-lg font-medium py-3.5 px-4 text-left transition-all duration-300 rounded-lg hover:text-[#F49B0F] hover:bg-white/5 ${
              location.pathname === "/" ? "text-[#F49B0F] bg-white/8" : ""
            }`}
            onClick={() => scrollToSection("home")}
          >
            {t("nav.home")}
          </button>

          <button
            className="text-white text-lg font-medium py-3.5 px-4 text-left transition-all duration-300 rounded-lg hover:text-[#F49B0F] hover:bg-white/5"
            onClick={() => scrollToSection("services")}
          >
            {t("nav.services")}
          </button>

          <button
            className="text-white text-lg font-medium py-3.5 px-4 text-left transition-all duration-300 rounded-lg hover:text-[#F49B0F] hover:bg-white/5"
            onClick={() => scrollToSection("about")}
          >
            {t("nav.about")}
          </button>

          <Link
            to="/game"
            className="text-white text-lg font-medium py-3.5 px-4 text-left transition-all duration-300 rounded-lg hover:text-[#F49B0F] hover:bg-white/5 block"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("game")}
          </Link>

          <button
            className="text-white text-lg font-medium py-3.5 px-4 text-left transition-all duration-300 rounded-lg hover:text-[#F49B0F] hover:bg-white/5"
            onClick={() => scrollToSection("contact")}
          >
            {t("nav.contact")}
          </button>

          {/* Mobile Language Selector */}
          <div className="pt-6 border-t border-white/20 mt-6">
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => {
                  handleLanguageChange(e.target.value);
                  setIsMobileMenuOpen(false);
                }}
                className="appearance-none w-full bg-white text-gray-800 rounded-lg px-4 py-3 pr-10 text-base font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/50 cursor-pointer hover:bg-gray-50 transition-all shadow-sm"
              >
                {languages?.map((lang) => (
                  <option
                    key={lang.code}
                    value={lang.code}
                    className="bg-white text-gray-800"
                  >
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
